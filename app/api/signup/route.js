import { NextResponse } from 'next/server'
import {
  getSupabaseClient,
  getSupabaseServerClient,
  hasSupabaseConfig,
  hasSupabaseServerConfig,
} from '@/lib/supabase'

const RESEND_API_URL = 'https://api.resend.com/emails'

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)
}

function formatCreatorContentTypes(form) {
  if (!Array.isArray(form.creatorContentTypes) || form.creatorContentTypes.length === 0) {
    return 'None selected'
  }

  return form.creatorContentTypes
    .map((type) =>
      type === 'Other' && form.creatorContentTypeOther?.trim()
        ? `Other (${form.creatorContentTypeOther.trim()})`
        : type
    )
    .join(', ')
}

function formatManagerTools(form) {
  if (!Array.isArray(form.managerTools) || form.managerTools.length === 0) {
    return 'None selected'
  }

  return form.managerTools
    .map((tool) =>
      tool === 'Other' && form.managerToolOther?.trim()
        ? `Other (${form.managerToolOther.trim()})`
        : tool
    )
    .join(', ')
}

function buildTextBody({ roleLabel, form, questions, signupType }) {
  return [
    `Name: ${form.name}`,
    `Email: ${form.email}`,
    `Location: ${form.location || 'Not provided'}`,
    `Signup Type: ${roleLabel}`,
    ...questions.map(({ label, name }) => `${label}: ${form[name] || 'Not provided'}`),
    ...(signupType === 'student-creator'
      ? [`Interested content types: ${formatCreatorContentTypes(form)}`]
      : []),
    ...(signupType === 'campaign-manager'
      ? [`Are you willing to: ${form.managerResponsibilities.join(', ') || 'None selected'}`]
      : []),
    ...(signupType === 'campaign-manager'
      ? [`Comfortable tools: ${formatManagerTools(form)}`]
      : []),
    `Additional Notes: ${form.notes || 'None'}`,
  ].join('\n')
}

function buildHtmlBody({ roleLabel, form, questions, signupType }) {
  const fields = [
    ['Name', form.name],
    ['Email', form.email],
    ['Location', form.location || 'Not provided'],
    ['Signup Type', roleLabel],
    ...questions.map(({ label, name }) => [label, form[name] || 'Not provided']),
    ...(signupType === 'student-creator'
      ? [['Interested content types', formatCreatorContentTypes(form)]]
      : []),
    ...(signupType === 'campaign-manager'
      ? [['Are you willing to', form.managerResponsibilities.join(', ') || 'None selected']]
      : []),
    ...(signupType === 'campaign-manager'
      ? [['Comfortable tools', formatManagerTools(form)]]
      : []),
    ['Additional Notes', form.notes || 'None'],
  ]

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111111;">
      <h2 style="margin-bottom: 16px;">${roleLabel}</h2>
      <table cellpadding="0" cellspacing="0" border="0" style="width: 100%; border-collapse: collapse;">
        ${fields
          .map(
            ([label, value]) => `
              <tr>
                <td style="padding: 10px 12px; border: 1px solid #e5e7eb; width: 220px; font-weight: 600; background: #faf5ff;">
                  ${label}
                </td>
                <td style="padding: 10px 12px; border: 1px solid #e5e7eb;">
                  ${String(value)}
                </td>
              </tr>
            `
          )
          .join('')}
      </table>
    </div>
  `
}

function getSocialHandle(form) {
  return (
    form.instagramHandle?.trim() ||
    form.tiktokHandle?.trim() ||
    form.otherPlatforms?.trim() ||
    null
  )
}

async function checkCreatorSignupsTable(supabase) {
  return supabase.from('creator_signups').select('*', { count: 'exact', head: true }).limit(1)
}

function parseInteger(value) {
  const normalized = String(value || '').replace(/,/g, '')
  const match = normalized.match(/\d+/)
  return match ? Number.parseInt(match[0], 10) : null
}

function formatContentTypesForInsert(form) {
  if (!Array.isArray(form.creatorContentTypes) || form.creatorContentTypes.length === 0) {
    return null
  }

  return form.creatorContentTypes
    .map((type) =>
      type === 'Other' && form.creatorContentTypeOther?.trim()
        ? `Other (${form.creatorContentTypeOther.trim()})`
        : type
    )
    .join(', ')
}

function formatListForInsert(values, fallback = null) {
  return Array.isArray(values) && values.length > 0 ? values.join(', ') : fallback
}

function buildAdditionalNotes({ form, signupType }) {
  if (signupType !== 'campaign-manager') {
    return form.notes?.trim() || null
  }

  return [
    form.managedBefore?.trim() ? `Managed before: ${form.managedBefore.trim()}` : null,
    form.notes?.trim() ? `Notes: ${form.notes.trim()}` : null,
  ]
    .filter(Boolean)
    .join('\n') || null
}

function getScholarshipStudentValue(form) {
  if (form.scholarshipStudent === 'Yes') return true
  if (form.scholarshipStudent === 'No') return false
  return null
}

function getScholarshipStudentLabel(form) {
  if (form.scholarshipStudent === 'Yes' || form.scholarshipStudent === 'No') {
    return form.scholarshipStudent
  }

  return null
}

function isMissingScholarshipColumnError(error) {
  return (
    error?.code === 'PGRST204' ||
    error?.code === '42703' ||
    error?.message?.includes('scholarship_student')
  )
}

function buildCreatorSignupInsertWithoutScholarshipColumn(insertPayload, form) {
  const fallbackPayload = { ...insertPayload }
  delete fallbackPayload.scholarship_student

  const scholarshipLabel = getScholarshipStudentLabel(form)

  if (scholarshipLabel) {
    fallbackPayload.additional_notes = [
      `Scholarship student: ${scholarshipLabel}`,
      fallbackPayload.additional_notes,
    ]
      .filter(Boolean)
      .join('\n\n')
  }

  return fallbackPayload
}

function buildCreatorSignupInsert({ form, roleLabel, signupType }) {
  if (signupType === 'campaign-manager') {
    return {
      signup_type: signupType,
      role_label: roleLabel,
      display_name: (form.name || form.fullName).trim(),
      email: form.email.trim(),
      location: form.location?.trim() || null,
      nickname: null,
      university_program: form.managerProgram?.trim() || null,
      scholarship_student: null,
      year: form.managerYear?.trim() || null,
      phone_number: form.managerPhone?.trim() || null,
      line_id: form.managerLineId?.trim() || null,
      instagram_handle: null,
      tiktok_handle: null,
      other_platforms: null,
      primary_creative_focus: 'Campaign manager',
      follower_count: null,
      experience_level: form.organizationExperience?.trim() || null,
      hours_available: null,
      portfolio_links: null,
      contribution: formatListForInsert(form.managerResponsibilities),
      interested_content_types: formatManagerTools(form),
      additional_notes: buildAdditionalNotes({ form, signupType }),
      status: 'pending_review',
    }
  }

  return {
    signup_type: signupType,
    role_label: roleLabel,
    display_name: (form.name || form.fullName).trim(),
    email: form.email.trim(),
    location: form.location?.trim() || null,
    nickname: form.nickname?.trim() || null,
    university_program: form.school?.trim() || null,
    scholarship_student: getScholarshipStudentValue(form),
    year: form.year?.trim() || null,
    phone_number: form.phoneNumber?.trim() || null,
    line_id: form.preferredContact?.trim() || null,
    instagram_handle: form.instagramHandle?.trim() || null,
    tiktok_handle: form.tiktokHandle?.trim() || null,
    other_platforms: form.otherPlatforms?.trim() || null,
    primary_creative_focus: form.focusArea?.trim() || null,
    follower_count: parseInteger(form.followers),
    experience_level: form.experienceLevel?.trim() || null,
    hours_available: parseInteger(form.hoursPerWeek),
    portfolio_links: form.portfolio?.trim() || null,
    contribution: form.interests?.trim() || null,
    interested_content_types: formatContentTypesForInsert(form),
    additional_notes: buildAdditionalNotes({ form, signupType }),
    status: 'pending_review',
  }
}

async function insertCreatorSignup({ form, roleLabel, signupType }) {
  if (!hasSupabaseServerConfig()) {
    return {
      data: null,
      error: {
        message:
          'Supabase server writes are not configured. Add SUPABASE_SERVICE_ROLE_KEY on the server.',
      },
    }
  }

  const supabase = getSupabaseServerClient()
  const healthCheck = await checkCreatorSignupsTable(supabase)

  if (healthCheck.error) {
    return healthCheck
  }

  const insertPayload = buildCreatorSignupInsert({ form, roleLabel, signupType })
  let insertResult = await supabase
    .from('creator_signups')
    .insert(insertPayload)
    .select()
    .single()

  if (insertResult.error && isMissingScholarshipColumnError(insertResult.error)) {
    console.warn('creator_signups scholarship_student column missing; saving answer in additional_notes.')

    insertResult = await supabase
      .from('creator_signups')
      .insert(buildCreatorSignupInsertWithoutScholarshipColumn(insertPayload, form))
      .select()
      .single()
  }

  if (insertResult.error) {
    console.error('creator_signups insert error:', {
      email: form.email.trim(),
      social_handle: getSocialHandle(form),
      error: insertResult.error.message,
    })
    return insertResult
  }

  console.log('creator_signups insert success:', {
    email: form.email.trim(),
    social_handle: getSocialHandle(form),
  })

  return insertResult
}

export async function GET() {
  try {
    if (!hasSupabaseConfig()) {
      return NextResponse.json(
        {
          error:
            'Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.',
        },
        { status: 500 }
      )
    }

    const supabase = getSupabaseClient()
    const { error } = await checkCreatorSignupsTable(supabase)

    if (error) {
      console.error('creator_signups health check error:', { error: error.message })
      return NextResponse.json({ ok: false, error: error.message }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Unexpected server error while testing Supabase.' },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { signupType, roleLabel, form, questions } = body ?? {}

    console.log('POST /api/signup called:', {
      signup_type: signupType || null,
      email: form?.email?.trim() || null,
      social_handle: form ? getSocialHandle(form) : null,
    })

    if (!signupType || !roleLabel || !form || !Array.isArray(questions)) {
      return NextResponse.json({ error: 'Invalid signup payload.' }, { status: 400 })
    }

    if (!(form.name || form.fullName)?.trim()) {
      return NextResponse.json({ error: 'Name is required.' }, { status: 400 })
    }

    if (!isValidEmail(form.email?.trim())) {
      return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 })
    }

    const { error } = await insertCreatorSignup({ form, roleLabel, signupType })

    if (error) {
      return NextResponse.json(
        { error: `Could not save signup: ${error.message}` },
        { status: 502 }
      )
    }

    const resendApiKey = process.env.RESEND_API_KEY
    const fromEmail = process.env.RESEND_FROM_EMAIL
    const toEmail = process.env.SIGNUP_TO_EMAIL

    if (!resendApiKey || !fromEmail || !toEmail) {
      console.warn(
        'Signup email was skipped because RESEND_API_KEY, RESEND_FROM_EMAIL, or SIGNUP_TO_EMAIL is missing.'
      )
      return NextResponse.json(
        { error: 'Signup was saved, but email delivery is not configured.' },
        { status: 502 }
      )
    }

    const response = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: form.email.trim(),
        subject: roleLabel,
        text: buildTextBody({ roleLabel, form, questions, signupType }),
        html: buildHtmlBody({ roleLabel, form, questions, signupType }),
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json(
        { error: `Email provider rejected the request: ${errorText}` },
        { status: 502 }
      )
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json(
      { error: 'Unexpected server error while processing signup.' },
      { status: 500 }
    )
  }
}

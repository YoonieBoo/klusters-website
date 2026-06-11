import { NextResponse } from 'next/server'
import { getSupabaseClient, hasSupabaseConfig } from '@/lib/supabase'

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

async function checkCreatorProfilesTable(supabase) {
  return supabase.from('creator_profiles').select('*', { count: 'exact', head: true }).limit(1)
}

function buildCreatorProfileInsert({ form, roleLabel, signupType }) {
  return {
    name: form.name.trim(),
    email: form.email.trim(),
    location: form.location?.trim() || null,
    nickname: form.nickname?.trim() || null,
    school: form.school?.trim() || null,
    year: form.year?.trim() || null,
    phone_number: form.phoneNumber?.trim() || null,
    preferred_contact: form.preferredContact?.trim() || null,
    instagram_handle: form.instagramHandle?.trim() || null,
    tiktok_handle: form.tiktokHandle?.trim() || null,
    other_platforms: form.otherPlatforms?.trim() || null,
    focus_area: form.focusArea?.trim() || null,
    followers: form.followers?.trim() || null,
    experience_level: form.experienceLevel?.trim() || null,
    hours_per_week: form.hoursPerWeek?.trim() || null,
    portfolio: form.portfolio?.trim() || null,
    interests: form.interests?.trim() || null,
    content_types: form.creatorContentTypes,
    content_type_other: form.creatorContentTypeOther?.trim() || null,
    notes: form.notes?.trim() || null,
    signup_type: signupType,
    role_label: roleLabel,
  }
}

function buildMinimalCreatorProfileInsert({ form }) {
  return {
    name: form.name.trim(),
    email: form.email.trim(),
  }
}

async function insertCreatorProfile({ form, roleLabel, signupType }) {
  if (!hasSupabaseConfig()) {
    return {
      data: null,
      error: {
        message:
          'Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.',
      },
    }
  }

  const supabase = getSupabaseClient()
  const healthCheck = await checkCreatorProfilesTable(supabase)

  if (healthCheck.error) {
    return healthCheck
  }

  const fullInsert = await supabase
    .from('creator_profiles')
    .insert(buildCreatorProfileInsert({ form, roleLabel, signupType }))
    .select()
    .single()

  if (!fullInsert.error) {
    console.log('creator_profiles insert success:', {
      email: form.email.trim(),
      social_handle: getSocialHandle(form),
    })
    return fullInsert
  }

  console.warn('creator_profiles full insert error:', {
    email: form.email.trim(),
    social_handle: getSocialHandle(form),
    error: fullInsert.error.message,
  })

  const minimalInsert = await supabase
    .from('creator_profiles')
    .insert(buildMinimalCreatorProfileInsert({ form }))
    .select()
    .single()

  if (minimalInsert.error) {
    console.error('creator_profiles minimal insert error:', {
      email: form.email.trim(),
      social_handle: getSocialHandle(form),
      error: minimalInsert.error.message,
    })
    return minimalInsert
  }

  console.log('creator_profiles insert success:', {
    email: form.email.trim(),
    social_handle: getSocialHandle(form),
  })

  return minimalInsert
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
    const { error } = await checkCreatorProfilesTable(supabase)

    if (error) {
      console.error('creator_profiles health check error:', { error: error.message })
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
      email: form?.email?.trim() || null,
      social_handle: form ? getSocialHandle(form) : null,
    })

    if (!signupType || !roleLabel || !form || !Array.isArray(questions)) {
      return NextResponse.json({ error: 'Invalid signup payload.' }, { status: 400 })
    }

    if (!form.name?.trim()) {
      return NextResponse.json({ error: 'Name is required.' }, { status: 400 })
    }

    if (!isValidEmail(form.email?.trim())) {
      return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 })
    }

    if (signupType === 'student-creator') {
      const { error } = await insertCreatorProfile({ form, roleLabel, signupType })

      if (error) {
        return NextResponse.json(
          { error: `Could not save creator profile: ${error.message}` },
          { status: 502 }
        )
      }
    }

    const resendApiKey = process.env.RESEND_API_KEY
    const fromEmail = process.env.RESEND_FROM_EMAIL
    const toEmail = process.env.SIGNUP_TO_EMAIL

    if (resendApiKey && fromEmail && toEmail) {
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
    } else {
      console.warn(
        'Signup email was skipped because RESEND_API_KEY, RESEND_FROM_EMAIL, or SIGNUP_TO_EMAIL is missing.'
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

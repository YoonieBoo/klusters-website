import { NextResponse } from 'next/server'

const RESEND_API_URL = 'https://api.resend.com/emails'

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)
}

function buildTextBody({ roleLabel, form, questions, signupType }) {
  return [
    `Name: ${form.name}`,
    `Email: ${form.email}`,
    `Location: ${form.location || 'Not provided'}`,
    `Signup Type: ${roleLabel}`,
    ...questions.map(({ label, name }) => `${label}: ${form[name] || 'Not provided'}`),
    ...(signupType === 'student-creator'
      ? [`Interested content types: ${form.creatorContentTypes.join(', ') || 'None selected'}`]
      : []),
    ...(signupType === 'campaign-manager'
      ? [`Are you willing to: ${form.managerResponsibilities.join(', ') || 'None selected'}`]
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
      ? [['Interested content types', form.creatorContentTypes.join(', ') || 'None selected']]
      : []),
    ...(signupType === 'campaign-manager'
      ? [['Are you willing to', form.managerResponsibilities.join(', ') || 'None selected']]
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

export async function POST(request) {
  try {
    const resendApiKey = process.env.RESEND_API_KEY
    const fromEmail = process.env.RESEND_FROM_EMAIL
    const toEmail = process.env.SIGNUP_TO_EMAIL

    if (!resendApiKey || !fromEmail || !toEmail) {
      return NextResponse.json(
        {
          error:
            'Email sending is not configured yet. Add RESEND_API_KEY, RESEND_FROM_EMAIL, and SIGNUP_TO_EMAIL on the server.',
        },
        { status: 500 }
      )
    }

    const body = await request.json()
    const { signupType, roleLabel, form, questions } = body ?? {}

    if (!signupType || !roleLabel || !form || !Array.isArray(questions)) {
      return NextResponse.json({ error: 'Invalid signup payload.' }, { status: 400 })
    }

    if (!form.name?.trim()) {
      return NextResponse.json({ error: 'Name is required.' }, { status: 400 })
    }

    if (!isValidEmail(form.email?.trim())) {
      return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 })
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
      { error: 'Unexpected server error while sending signup email.' },
      { status: 500 }
    )
  }
}

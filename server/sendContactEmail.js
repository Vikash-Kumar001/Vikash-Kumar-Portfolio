const DEFAULT_RECIPIENT = 'vikashkumarsudhi8527@gmail.com';

export function validateContactPayload({ name, email, subject, message, website }) {
  if (website?.trim()) {
    return { ok: true, skipped: true };
  }

  const trimmedName = name?.trim() ?? '';
  const trimmedEmail = email?.trim() ?? '';
  const trimmedMessage = message?.trim() ?? '';

  if (!trimmedName) {
    return { ok: false, error: 'Name is required', status: 400 };
  }

  if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    return { ok: false, error: 'Valid email is required', status: 400 };
  }

  if (!trimmedMessage) {
    return { ok: false, error: 'Message is required', status: 400 };
  }

  return {
    ok: true,
    data: {
      name: trimmedName,
      email: trimmedEmail,
      subject: subject?.trim() ?? '',
      message: trimmedMessage,
    },
  };
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function buildContactEmailHtml({ name, email, subject, message }) {
  const safeSubject = subject?.trim() ? escapeHtml(subject) : 'Portfolio contact form';

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
      <h2 style="margin: 0 0 16px;">New portfolio message</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Subject:</strong> ${safeSubject}</p>
      <p style="margin-top: 20px;"><strong>Message</strong></p>
      <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
    </div>
  `;
}

export async function sendContactEmail(payload, env = process.env) {
  const validation = validateContactPayload(payload);

  if (!validation.ok) {
    return { ok: false, error: validation.error, status: validation.status };
  }

  if (validation.skipped) {
    return { ok: true };
  }

  const { name, email, subject, message } = validation.data;
  const resendApiKey = env.RESEND_API_KEY;
  const recipient = env.CONTACT_RECIPIENT_EMAIL || DEFAULT_RECIPIENT;
  const fromEmail = env.CONTACT_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>';
  const emailSubject = subject
    ? `${subject} — Portfolio contact from ${name}`
    : `Portfolio contact from ${name}`;

  if (!resendApiKey) {
    return {
      ok: false,
      error: 'Contact API is not configured. Add RESEND_API_KEY to your environment.',
      status: 503,
    };
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [recipient],
      reply_to: email,
      subject: emailSubject,
      html: buildContactEmailHtml({ name, email, subject, message }),
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Resend API error:', errorText);
    return {
      ok: false,
      error: 'Unable to send your message right now. Please try again shortly.',
      status: 502,
    };
  }

  return { ok: true };
}

export async function readJsonBody(request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

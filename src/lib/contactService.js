import emailjs from '@emailjs/browser';

const DEFAULT_RECIPIENT = 'vikashkumarsudhi8527@gmail.com';

export class ContactServiceError extends Error {
  constructor(message, options = {}) {
    super(message);
    this.name = 'ContactServiceError';
    this.userMessage = options.userMessage || message;
    this.status = options.status;
    this.allowFallback = options.allowFallback ?? false;
  }
}

export function validateContactForm(formData) {
  if (formData.website?.trim()) {
    return null;
  }

  if (!formData.name?.trim()) {
    return 'Name is required';
  }

  if (!formData.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    return 'Valid email is required';
  }

  if (!formData.message?.trim()) {
    return 'Message is required';
  }

  return null;
}

async function parseJsonResponse(response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

async function submitContactApi(formData) {
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT || '/api/contact';

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(formData),
  });

  const payload = await parseJsonResponse(response);

  if (response.ok) {
    return { provider: 'api' };
  }

  const error = new ContactServiceError(payload?.error || 'API submission failed', {
    userMessage: payload?.error || 'Unable to send your message right now.',
    status: response.status,
  });

  if (response.status === 503 || response.status === 404) {
    error.allowFallback = true;
  }

  throw error;
}

async function submitEmailJs(formData) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const recipientEmail = import.meta.env.VITE_EMAILJS_RECIPIENT_EMAIL || DEFAULT_RECIPIENT;

  if (!serviceId || !templateId || !publicKey || publicKey.includes('your_')) {
    throw new ContactServiceError('EmailJS is not configured', { allowFallback: true });
  }

  emailjs.init(publicKey);

  try {
    const response = await emailjs.send(
      serviceId,
      templateId,
      {
        from_name: formData.name,
        from_email: formData.email,
        reply_to: formData.email,
        subject: formData.subject || 'Portfolio contact form',
        message: formData.message,
        to_email: recipientEmail,
      },
      publicKey,
    );

    if (response.status !== 200) {
      throw new ContactServiceError('EmailJS submission failed', { allowFallback: true });
    }

    return { provider: 'emailjs' };
  } catch (error) {
    if (error instanceof ContactServiceError) {
      throw error;
    }

    throw new ContactServiceError(error?.text || 'EmailJS submission failed', { allowFallback: true });
  }
}

async function submitWeb3Forms(formData) {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    throw new ContactServiceError('Web3Forms is not configured', { allowFallback: true });
  }

  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      access_key: accessKey,
      name: formData.name,
      email: formData.email,
      subject: formData.subject || 'Portfolio contact form',
      message: formData.message,
      from_name: 'Vikash Kumar Portfolio',
      botcheck: formData.website || '',
    }),
  });

  const payload = await parseJsonResponse(response);

  if (response.ok && payload?.success) {
    return { provider: 'web3forms' };
  }

  throw new ContactServiceError(payload?.message || 'Web3Forms submission failed', {
    userMessage: payload?.message || 'Unable to send your message right now.',
  });
}

async function submitFormspree(formData) {
  const formspreeId = import.meta.env.VITE_FORMSPREE_ID;

  if (!formspreeId) {
    throw new ContactServiceError('Formspree is not configured', { allowFallback: true });
  }

  const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      name: formData.name,
      email: formData.email,
      subject: formData.subject || 'Portfolio contact form',
      message: formData.message,
      _replyto: formData.email,
    }),
  });

  const payload = await parseJsonResponse(response);

  if (response.ok) {
    return { provider: 'formspree' };
  }

  throw new ContactServiceError(payload?.error || 'Formspree submission failed', {
    userMessage: payload?.error || 'Unable to send your message right now.',
  });
}

const clientProviders = [submitWeb3Forms, submitEmailJs, submitFormspree];

export async function sendContactMessage(formData) {
  const validationError = validateContactForm(formData);

  if (validationError) {
    throw new ContactServiceError(validationError, { userMessage: validationError });
  }

  if (formData.website?.trim()) {
    return { provider: 'honeypot' };
  }

  try {
    return await submitContactApi(formData);
  } catch (apiError) {
    if (!apiError.allowFallback) {
      throw apiError;
    }
  }

  let lastError = null;

  for (const provider of clientProviders) {
    try {
      return await provider(formData);
    } catch (error) {
      lastError = error;
      if (!error.allowFallback) {
        throw error;
      }
    }
  }

  throw new ContactServiceError(
    'Contact form is not configured yet.',
    {
      userMessage:
        'Contact delivery is not configured. Add RESEND_API_KEY for /api/contact or set EmailJS / Web3Forms / Formspree keys in .env. See EMAIL_SETUP.md.',
      cause: lastError,
    },
  );
}

export function isContactConfigured() {
  return Boolean(
    import.meta.env.VITE_CONTACT_ENDPOINT ||
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY ||
      import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ||
      import.meta.env.VITE_FORMSPREE_ID ||
      import.meta.env.DEV,
  );
}

import emailjs from '@emailjs/browser'

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || ''
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || ''
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ''

if (EMAILJS_PUBLIC_KEY) {
  console.log('EMAILJS_PUBLIC_KEY', EMAILJS_PUBLIC_KEY)
  emailjs.init({
    publicKey: EMAILJS_PUBLIC_KEY,
  })
}

export const sendEmail = async (senderEmail: string, message: string) => {

  if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
    return {
      error: 'EmailJS configuration is missing. Please check your environment variables.',
    }
  }

  try {
    const response = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      from_email: senderEmail,
      reply_to: senderEmail,
      message: message,
      to_email: senderEmail,
      sender_email: senderEmail,
    })

    return {
      data: response,
    }
  } catch (error: unknown) {
    console.error('EmailJS Error:', error)

    if (error && typeof error === 'object' && 'text' in error) {
      return {
        error: String(error.text) || 'Failed to send email',
      }
    }

    return {
      error: error instanceof Error ? error.message : 'Failed to send email',
    }
  }
}

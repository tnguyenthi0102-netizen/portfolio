import { useState } from 'react'
import { toast } from 'sonner'
import { sendEmail } from '@/services/contact'
const SUCCESS_DURATION = 3000

function ContactSection() {
  const [senderEmail, setSenderEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const result = await sendEmail(senderEmail, message)

      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success('Email sent successfully!', { duration: SUCCESS_DURATION })
        setSenderEmail('')
        setMessage('')
      }
    } catch (error) {
      toast.error('Failed to send email')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="mb-20 sm:mb-28 w-[min(100%,38rem)] text-center">
      <h2 className="text-[--text-3xl] font-medium capitalize mb-8 text-center">Contact me</h2>

      <p className="text-gray-700 -mt-6 text-[var(--text-base)] mb-10">
        Please contact me directly at{' '}
        <a className="underline" href="mailto:min@5stech.co">
          min@5stech.co
        </a>{' '}
        or through this form.
      </p>

      <form className="mt-10 flex flex-col dark:text-black" onSubmit={handleSubmit}>
        <input
          className="h-14 px-4 rounded-lg border border-black/10 dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white/50"
          type="email"
          required
          maxLength={500}
          placeholder="Your email"
          value={senderEmail}
          onChange={(e) => setSenderEmail(e.target.value)}
          disabled={isSubmitting}
        />
        <textarea
          className="h-52 my-3 rounded-lg border border-black/10 p-4 dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white/50"
          placeholder="Your message"
          required
          maxLength={5000}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={isSubmitting}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="group flex items-center justify-center gap-2 h-[3rem] w-[8rem] bg-[var(--color-border)] text-gray-400 rounded-full border border-black/10
          transition focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105 dark:bg-white/10 dark:hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isSubmitting ? 'Sending...' : 'Submit'}
        </button>
      </form>
    </section>
  )
}

export default ContactSection

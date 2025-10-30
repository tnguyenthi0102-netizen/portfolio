function ContactSection() {
  return (
    <section
      id="contact"
      className="mb-20 sm:mb-28 w-[min(100%,38rem)] text-center"
    >
      <h2 className="text-[--text-3xl] font-medium capitalize mb-8 text-center">Contact me</h2>

      <p className="text-gray-700 -mt-6 dark:text-white/80 mb-10">
        Please contact me directly at{' '}
        <a className="underline" href="mailto:mintrang8899@gmail.com">
          mintrang8899@gmail.com
        </a>{' '}
        or through this form.
      </p>

      <form className="mt-10 flex flex-col dark:text-black" action="#" method="POST">
        <input
          className="h-14 px-4 rounded-lg border border-black/10 dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white/50"
          name="senderEmail"
          type="email"
          required
          maxLength={500}
          placeholder="Your email"
        />
        <textarea
          className="h-52 my-3 rounded-lg border border-black/10 p-4 dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white/50"
          name="message"
          placeholder="Your message"
          required
          maxLength={5000}
        />
        <button
          type="submit"
          className="group flex items-center justify-center gap-2 h-[3rem] w-[8rem] bg-gray-900 text-white rounded-full outline-none transition focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105 dark:bg-white/10 dark:hover:bg-white/20"
        >
          Submit{' '}
          <svg
            className="opacity-70 group-hover:translate-x-1 transition"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            width="16"
            height="16"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </form>
    </section>
  )
}

export default ContactSection

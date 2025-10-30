function Hero() {
  return (
    <section id="home" className="mx-auto max-w-[50rem] text-center mb-28 sm:mb-0 scroll-mt-[100rem]">
      <div className="flex items-center justify-center mb-10">
        <div className="relative">
          <img
            src="https://avatars.githubusercontent.com/u/9919?v=4"
            alt="Trang Nguyen portrait"
            className="h-24 w-24 rounded-full object-cover border-[0.35rem] border-[--color-card] shadow-xl"
          />
          <span className="absolute bottom-0 right-0 text-4xl">👋</span>
        </div>
      </div>

      <h1 className="mb-10 mt-4 px-4 text-[--text-2xl] sm:text-[--text-4xl] font-medium !leading-[1.5]">
        <span className="font-bold">Hello, I'm Trang Nguyen.</span> I'm a{' '}
        <span className="font-bold">Senior JavaScript Developer</span> with{' '}
        <span className="font-bold">10+ years</span> of experience. I enjoy building{' '}
        <span className="italic">web & mobile apps</span>. My focus is{' '}
        <span className="underline">React/React Native</span>.
      </h1>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 px-4 text-[--text-lg] font-medium">
        <a
          href="#contact"
          className="group bg-gray-900 text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105 transition dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          Contact me here
          <span className="opacity-70 group-hover:translate-x-1 transition inline-block"></span>
        </a>
      </div>
    </section>
  )
}

export default Hero

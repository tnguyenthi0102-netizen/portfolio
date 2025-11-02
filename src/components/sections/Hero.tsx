function Hero() {
  return (
    <section id="home" className="mx-auto max-w-[50rem] text-center mb-28 sm:mb-0 scroll-mt-[100rem]">
      <div className="flex items-center justify-center mb-10">
        <div className="relative">
          <img
            src="https://avatars.githubusercontent.com/u/9919?v=4"
            alt="Min portrait"
            className="h-24 w-24 rounded-full object-cover border-[0.35rem] border-[--color-card] shadow-xl"
          />
          <span className="absolute bottom-0 right-0 text-4xl animate-wave origin-bottom-right">👋</span>
        </div>
      </div>

      <h1 className="mb-10 mt-4 px-4 text-[--text-2xl] sm:text-[--text-4xl] font-medium !leading-[1.5]">
        <span className="font-bold">Hello, I'm Min.</span> <br /> I'm a{' '}
        <span className="font-bold">JavaScript Developer.</span> <br />
        I<span className="font-bold"> enjoy </span> 
        <span className="font-bold">building</span> {' '}
        <span className="italic">web & mobile apps</span>. My focus is{' '}
        <span className="underline">React/React Native</span>.
      </h1>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 px-4 text-[--text-lg] font-medium">
        <a
          href="#contact"
          className="group text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none 
          focus:scale-110 hover:scale-110 active:scale-105 transition bg-gray-800 hover:bg-gray-700"
        >
          Contact me here
        </a>
      </div>
    </section>
  )
}

export default Hero

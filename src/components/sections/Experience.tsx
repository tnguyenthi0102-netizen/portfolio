import { experiencesData } from '@/data/portfolio'

function ExperienceSection() {
  return (
    <section id="experience" className="scroll-mt-28 mb-28 sm:mb-40">
      <h2 className="text-[--text-3xl] font-medium capitalize mb-8 text-center">My experience</h2>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-white/20 hidden sm:block" />

        {experiencesData.map((item, index) => (
          <div key={index} className="relative mb-8 sm:mb-12 last:mb-0">
            {/* Icon circle */}
            <div className="absolute left-0 sm:left-6 top-1 w-4 h-4 rounded-full bg-gray-800 dark:bg-white/20 border-2 border-white dark:border-gray-900 z-10 hidden sm:block" />

            {/* Content */}
            <div className="pl-0 sm:pl-24">
              <p className="text-[--text-sm] text-gray-500 dark:text-gray-400 mb-1">{item.date}</p>
              <h3 className="font-semibold capitalize mb-1">{item.title}</h3>
              <p className="font-normal mb-2">{item.location}</p>
              <p className="!mt-1 !font-normal text-gray-700 dark:text-white/75 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ExperienceSection

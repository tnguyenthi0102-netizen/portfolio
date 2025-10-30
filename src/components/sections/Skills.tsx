import { skillsData } from '@/data/portfolio'
import Tag from '@/components/ui/Tag'

function SkillsSection() {
  return (
    <section
      id="skills"
      className="mb-28 max-w-[53rem] scroll-mt-28 text-center sm:mb-40"
    >
      <h2 className="text-[--text-3xl] font-medium capitalize mb-8 text-center">My skills</h2>
      <ul className="flex flex-wrap justify-center gap-2 text-[--text-lg] text-gray-800 dark:text-white/80">
        {skillsData.map((skill, index) => (
          <li key={index}>
            <Tag
              text={skill}
              className="bg-[var(--color-border)] text-[var(--color-fg)] tracking-wider py-1.5 rounded-[4px]"
              size="md"
            />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default SkillsSection

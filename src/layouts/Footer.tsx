function Footer() {
  return (
    <footer className="border-t border-[--color-border] bg-[--color-card]">
      <div className="mx-auto max-w-7xl px-4 py-6 text-[--text-xs] text-[--color-muted]">
        © {new Date().getFullYear()} S5Tech Warrior — Built with React, TypeScript, Tailwind
      </div>
    </footer>
  )
}

export default Footer



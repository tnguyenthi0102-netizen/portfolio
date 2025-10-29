function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-neutral-900/50">
      <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-neutral-400">
        © {new Date().getFullYear()} S5Tech Warrior — Built with React, TypeScript, Tailwind
      </div>
    </footer>
  )
}

export default Footer



function Footer() {
  return (
    <footer className="mb-10 px-4 text-center text-gray-500 dark:text-gray-400">
      <small className="mb-2 block text-[--text-xs]">
        &copy; {new Date().getFullYear()} Trang. All rights reserved.
      </small>
      <p className="text-[--text-xs]">
        <span className="font-semibold">About this website:</span> built with React & Vite, TypeScript, Tailwind CSS, Vercel hosting.
      </p>
    </footer>
  )
}

export default Footer



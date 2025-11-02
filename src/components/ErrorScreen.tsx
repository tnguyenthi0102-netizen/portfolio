type Props = {
  message?: string
}

export default function ErrorScreen({ message }: Props) {
  const text = message || 'An unexpected error occurred'
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-[--text-2xl] font-bold mb-2 text-[--color-fg]">Something went wrong</h1>
        <p className="text-[--color-muted] mb-4">{text}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 rounded-md border border-[--color-border] bg-[--color-card] text-[--color-fg]"
        >
          Reload Page
        </button>
      </div>
    </div>
  )
}

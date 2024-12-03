export function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="w-[768px] h-[768px] border border-zinc-400 rounded space-y-2"
      id="canvas-container"
    >
      {children}
    </div>
  )
}

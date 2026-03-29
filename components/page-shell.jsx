export function PageShell({ children, className = '' }) {
  return (
    <div
      className={`relative flex min-h-screen flex-col overflow-x-clip bg-white text-foreground ${className}`.trim()}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute right-[-4rem] top-[18%] h-[28rem] w-[28rem] rounded-full bg-primary/6 blur-3xl" />
        <div className="absolute left-[10%] top-[48%] h-72 w-72 rounded-full bg-brand-secondary/5 blur-3xl" />
        <div className="absolute left-1/2 top-[72%] h-96 w-96 -translate-x-1/2 rounded-full bg-primary/6 blur-3xl" />
      </div>
      {children}
    </div>
  )
}

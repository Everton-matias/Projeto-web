export function Navigation() {
  return (
    <aside
      id="navigation"
      className="sticky top-0 z-10 w-full border-b border-white/10 bg-[#0F4418] px-4 py-4 shadow-lg lg:sticky lg:top-0 lg:h-screen lg:w-72 lg:flex-col lg:justify-between lg:border-b-0 lg:border-r lg:px-6 lg:py-6"
    >
      <div className="flex items-center justify-between gap-4 lg:flex-col lg:items-start">
        <div>
          <h1 className="text-2xl font-black tracking-[0.2em] text-white">
            Not Fat
          </h1>
          <p className="mt-1 text-sm text-green-100/90">
            Sua saúde, seu estilo de vida!
          </p>
        </div>
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.25em] text-green-100 lg:hidden">
          Menu
        </span>
      </div>

      <nav className="mt-4 lg:mt-8">
        <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-3">
          <li>
            <a
              href="#"
              className="block rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
            >
              Refeições
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-green-100 transition hover:bg-white/10"
            >
              Perfil
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

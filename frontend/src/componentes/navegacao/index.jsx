import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export function Navigation() {
  const { user, signout } = useAuth();

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
            <Link
              to="/"
              className="block rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
            >
              Refeições
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className="block rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-green-100 transition hover:bg-white/10"
            >
              Perfil
            </Link>
          </li>
        </ul>
      </nav>

      {user && (
        <div className="mt-6 rounded-3xl bg-white/5 p-4 text-sm text-white/90">
          <p className="font-semibold">{user.nome_completo || user.name || user.email}</p>
          <button
            onClick={signout}
            className="mt-3 block rounded-xl bg-green-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-400"
          >
            Sair
          </button>
        </div>
      )}
    </aside>
  );
}

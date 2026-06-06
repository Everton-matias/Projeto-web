import { Link, useLocation } from "react-router-dom";
import { Home, User, LogOut, Droplets } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

export function Navigation() {
  const { user, signout } = useAuth();
  const location = useLocation();
  
  let abaAtiva = "inicio";
  if (location.pathname.startsWith("/profile")) {
    abaAtiva = "perfil";
  } else if (location.pathname.startsWith("/agua")) {
    abaAtiva = "agua";
  }

  const itemClass = (ativa) =>
    `mx-3 mb-4 flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
      abaAtiva === ativa
        ? "bg-white/12 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]"
        : "text-green-100/90 hover:bg-white/10 hover:text-white"
    }`;

  return (
    <aside
      id="navigation"
      className="sticky top-0 z-10 flex w-full flex-col border-b border-white/10 bg-[#0F4418] px-4 py-5 shadow-[inset_0_20px_20px_-10px_rgba(0,0,0,0.35)] lg:sticky lg:top-0 lg:h-screen lg:w-72 lg:border-b-0 lg:border-r lg:px-6 lg:py-6"
    >
      <div className="flex items-center justify-between gap-4 lg:flex-col lg:items-start">
        <div>
          <h1 className="text-[24px] font-black tracking-[0.18em] text-white sm:text-[28px] lg:text-[30px]">
            NOT FAT
          </h1>
          <p className="mt-1 text-xs text-green-100/90 sm:text-sm">
            Sua saúde, seu estilo de vida!
          </p>
        </div>
        <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-green-100 lg:hidden">
          Menu
        </span>
      </div>

      <hr className="my-4 border-t border-white/20 lg:my-5" />

      <nav className="mt-2 text-[16px] lg:mt-4 lg:text-[18px]">
        <ul>
          <li>
            <Link to="/" className={itemClass("inicio")}>
              <Home className="h-5 w-5" />
              Início
            </Link>
          </li>
          <li>
            <Link to="/profile" className={itemClass("perfil")}>
              <User className="h-5 w-5" />
              Perfil
            </Link>
          </li>
          <li>
            <Link to="/agua" className={itemClass("agua")}>
              <Droplets className="h-5 w-5" />
              Água
            </Link>
          </li>
        </ul>
      </nav>

      {user && (
        <div className="mt-auto rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-white/90 shadow-xl shadow-black/10 flex flex-col items-center gap-3">
          <p className="font-semibold text-white flex justify-center items-center">
            {user.nome_completo || user.name || user.email}
          </p>
          <button
            type="button"
            onClick={() => signout()}
            className={
              itemClass("sair da conta") +
              " mt-3 w-full justify-center border border-white/10 bg-[#1f734] hover:bg-red-500/20"
            }
          >
            <LogOut className="h-5 w-5" />
            Sair da conta
          </button>
        </div>
      )}
    </aside>
  );
}

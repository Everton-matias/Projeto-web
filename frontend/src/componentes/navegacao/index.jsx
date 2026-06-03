import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, User, LogOut } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

export function Navigation() {
  const { user, signout } = useAuth();
  const [abaAtiva, setAbaAtiva] = useState("inicio");

  const itemClass = (ativa) =>
    `mx-3 mb-4 flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
      abaAtiva === ativa
        ? "bg-white/12 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]"
        : "text-green-100/90 hover:bg-white/10 hover:text-white"
    }`;

  return (
    <aside
      id="navigation"
      className="sticky top-0 z-10 flex h-screen w-full flex-col border-b border-white/10 bg-[#0F4418] px-4 py-5 shadow-[inset_0_20px_20px_-10px_rgba(0,0,0,0.35)] lg:sticky lg:top-0 lg:w-72 lg:border-b-0 lg:border-r lg:px-6 lg:py-6"
    >
      <div className="flex items-center justify-between gap-4 lg:flex-col lg:items-start">
        <div>
          <h1 className="text-[30px] font-black tracking-[0.18em] text-white">
            NOT FAT
          </h1>
          <p className="mt-1 text-sm text-green-100/90">
            Sua saúde, seu estilo de vida!
          </p>
        </div>
        <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-green-100 lg:hidden">
          Menu
        </span>
      </div>

      <hr className="my-4 border-t border-white/20 lg:my-5" />

      <nav className="mt-2 text-[18px] lg:mt-4">
        <ul>
          <li>
            <Link
              to="/"
              onClick={() => setAbaAtiva("inicio")}
              className={itemClass("inicio")}
            >
              <Home className="h-5 w-5" />
              Início
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              onClick={() => setAbaAtiva("perfil")}
              className={itemClass("perfil")}
            >
              <User className="h-5 w-5" />
              Perfil
            </Link>
          </li>
        </ul>
      </nav>

      {user && (
        <div className="mt-auto rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-white/90 shadow-xl shadow-black/10">
          <p className="font-semibold text-white">
            {user.nome_completo || user.name || user.email}
          </p>
          <button
            type="button"
            onClick={() => {
              setAbaAtiva("sair da conta");
              signout();
            }}
            className={
              itemClass("sair da conta") +
              " mt-3 w-full justify-start border border-white/10 bg-red-500/10 hover:bg-red-500/20"
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

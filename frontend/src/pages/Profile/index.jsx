import { useState, useEffect } from "react"; 
import { Navigation } from "../../componentes/navegacao";
import { Link } from "react-router-dom";
import { User } from "lucide-react";

function Profile() {
 
  const [user, setUser] = useState({ nome_completo: "", email: "" });

  useEffect(() => {
    const userStorage = localStorage.getItem('@NotFat:user');
    if (userStorage) {
      setUser(JSON.parse(userStorage));
    }
  }, []);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#0f141b_0%,#151b22_48%,#11161d_100%)] text-white lg:flex">
      <Navigation />

      <main className="flex-1 min-h-screen overflow-y-auto">
        <div className="flex items-start justify-center p-4 pt-4 sm:p-6 sm:pt-6 md:p-8 md:pt-8 lg:pt-10">
          <div className="w-full max-w-5xl rounded-3xl border border-white/10 bg-[#171b22]/95 p-4 shadow-2xl shadow-black/30 sm:p-6 md:p-8">
            {/* CABEÇALHO DO PERFIL */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4 sm:gap-5">
                {/* AVATAR */}
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-[#b8f0c4] via-[#d9ffe1] to-[#8fd19a] text-lg font-black text-[#12331a] shadow-lg shadow-emerald-900/25 sm:h-16 sm:w-16 sm:text-xl">
                  <User className="w-8 h-8 text-[#12331a]" />
                </div>

                {/* NOME E EMAIL */}
                <div>
                  <p className="text-lg font-bold text-white sm:text-xl">
                    {user.nome_completo}
                  </p>
                  <p className="text-sm text-gray-400">
                    {user.email}
                  </p>
                </div>
              </div>

              {/* BOTÃO EDITAR PERFIL */}
              <Link
                to="/editar-perfil"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-400/30 bg-[#1f6d35] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-950/20 transition hover:bg-[#257a3b] sm:w-auto"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828A2 2 0 0110 16.414V19h2.586a2 2 0 001.414-.586l6-6a2 2 0 000-2.828l-3.536-3.536a2 2 0 00-2.828 0L4 15.172V19h3.828a2 2 0 001.414-.586z"
                  />
                </svg>
                Editar perfil
              </Link>
            </div>

            {/* DIVISÓRIA */}
            <hr className="mb-6 border-white/10" />

            {/* DADOS PESSOAIS */}
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-400">
              Dados Pessoais
            </p>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* CAMPO NOME */}
              <div className="rounded-2xl border border-white/8 bg-[#20252d] px-5 py-4 shadow-inner shadow-black/10 transition hover:border-emerald-400/30 hover:bg-[#232a33]">
                <p className="mb-1 text-xs text-gray-400">Nome completo</p>
                <p className="text-base text-white">{user.nome_completo}</p>
              </div>

              {/* CAMPO EMAIL */}
              <div className="rounded-2xl border border-white/8 bg-[#20252d] px-5 py-4 shadow-inner shadow-black/10 transition hover:border-emerald-400/30 hover:bg-[#232a33]">
                <p className="mb-1 text-xs text-gray-400">E-mail</p>
                <p className="text-base text-white">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;

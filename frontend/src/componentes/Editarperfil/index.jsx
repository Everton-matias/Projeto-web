import { useState } from "react";
import { ChevronLeft, Lock } from "lucide-react";
import { Link } from "react-router-dom";

export function EditarPerfil() {
  // Estados para os campos editáveis
  const [nome, setNome] = useState("");

  return (
    <div className="max-w-[1400px] ml-auto">
      <div className="flex-1 h-screen bg-[#121212] text-gray-200 overflow-y-auto p-8 font-sans">
        {/* Cabeçalho */}
        <Link
          to="/profile"
          className="flex items-center gap-2 mb-8 cursor-pointer hover:text-white transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
          <h2 className="text-xl font-semibold">Editar perfil</h2>
        </Link>

        <div className="max-w-4xl bg-[#1A1A1A] mt-45 ml-60 border border-white/5 rounded-2xl p-8 shadow-lg">
          {/* Seção: DADOS PESSOAIS */}
          <div className="mb-10">
            {/* Input Nome */}
            {/* Card do Usuário (Topo) */}
            <div className="flex items-center gap-4 mb-10 pb-8 border-b border-white/10">
              <div className="w-20 h-20 bg-[#E8F5E9] rounded-full flex items-center justify-center text-[#1F7A34] text-2xl font-bold">
                LB
              </div>
              <div>
                {/* SUBSTITUA O TEXTO FIXO PELA VARIÁVEL {nome} AQUI */}
                <h3 className="text-2xl font-semibold text-white">{nome}</h3>
                <p className="text-gray-400">usuario2026@gmail.com</p>
                <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                  <Lock className="w-3 h-3" />
                  <span>E-mail não pode ser alterado</span>
                </div>
              </div>
            </div>
            <h4 className="text-sm font-semibold text-gray-400 mb-4 tracking-wider">
              DADOS PESSOAIS
            </h4>
            <div className="grid grid-cols-2 gap-6">
              {/* ... */}

              {/* Input Nome */}
              <div className="bg-[#242424] rounded-lg p-3 border border-white/5 focus-within:border-white/20 transition-colors h-[72px] flex flex-col justify-center">
                {/* ADICIONE htmlFor E cursor-pointer AQUI */}
                <label
                  htmlFor="input-nome"
                  className="block text-xs text-gray-400 mb-1 cursor-pointer hover:text-gray-300"
                >
                  Nome completo
                </label>
                {/* ADICIONE O MESMO id AQUI */}
                <input
                  id="input-nome"
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full bg-transparent text-white outline-none text-sm"
                />
              </div>

              {/* Input E-mail (Bloqueado) */}
              <div>
                <div className="bg-[#242424] rounded-lg p-3 border border-white/5 opacity-70 h-[72px] flex justify-between items-center">
                  <div className="flex-1">
                    <label className="block text-xs text-gray-400 mb-1">
                      E-mail
                    </label>
                    <input
                      type="email"
                      value="usuario2026@gmail.com"
                      disabled
                      className="w-full bg-transparent text-gray-400 outline-none text-sm cursor-not-allowed"
                    />
                  </div>
                  <Lock className="w-4 h-4 text-gray-500" ml-2 />
                </div>
                <p className="text-xs text-gray-500 mt-1 ml-1">
                  Não pode ser alterado
                </p>
              </div>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-white/10">
            <button className="px-6 py-2.5 rounded-lg border border-gray-600 text-gray-300 hover:bg-white/5 transition-colors text-sm font-medium">
              Cancelar
            </button>
            <button className="px-6 py-2.5 rounded-lg bg-[#1B5E20] hover:bg-[#1F7A34] text-white transition-colors text-sm font-medium">
              Salvar alterações
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

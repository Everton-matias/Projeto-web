import { useState, useEffect } from "react";
import { ChevronLeft, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "lucide-react";

export function EditarPerfil() {
  // Estados para os campos editáveis
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const userStorage = localStorage.getItem('@NotFat:user');
    if (userStorage) {
      const user = JSON.parse(userStorage);
      setNome(user.nome_completo || ""); 
      setEmail(user.email || "");
    }
  }, []);
  
  const handleSave = async () => {
    const userStorage = localStorage.getItem('@NotFat:user');
    if (!userStorage) return;
    const user = JSON.parse(userStorage);

    try {
      const response = await fetch(`http://localhost:3000/usuario/${user.idUsuario}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ novo_nome: nome }), 
      });

      if (response.ok) {
        // Atualiza o localStorage com o novo nome para refletir em todo o app
        user.nome_completo = nome;
        localStorage.setItem('@NotFat:user', JSON.stringify(user));
        
        alert("Perfil atualizado com sucesso!");
        navigate("/profile"); // Volta para a tela de perfil
      } else {
        alert("Erro ao salvar no servidor.");
      }
    } catch (error) {
      console.error("Erro na atualização:", error);
      alert("Erro ao conectar com o servidor.");
    }
  };
  return (
    <div className="w-full rounded-3xl border border-white/10 bg-[#171b22]/95 p-4 shadow-2xl shadow-black/30 sm:p-6 md:p-8">
      <div className="text-gray-200 font-sans">
        {/* Cabeçalho */}
        <Link
          to="/profile"
          className="mb-8 flex items-center gap-2 text-gray-300 transition-colors hover:text-white"
        >
          <ChevronLeft className="w-6 h-6" />
          <h2 className="text-xl font-semibold">Editar perfil</h2>
        </Link>

        <div className="rounded-2xl border border-white/10 bg-[#1a1d24] p-5 shadow-inner shadow-black/10 sm:p-6 md:p-8">
          {/* Seção: DADOS PESSOAIS */}
          <div className="mb-10">
            {/* Input Nome */}
            {/* Card do Usuário (Topo) */}
            <div className="mb-10 flex flex-col gap-4 border-b border-white/10 pb-8 sm:flex-row sm:items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-[#b8f0c4] via-[#d9ffe1] to-[#8fd19a] text-2xl font-black text-[#12331a] shadow-lg shadow-emerald-900/25 sm:h-20 sm:w-20">
                <User className="w-8 h-8 text-[#12331a]" />
              </div>
              <div>
                {/* SUBSTITUA O TEXTO FIXO PELA VARIÁVEL {nome} AQUI */}
                <h3 className="text-2xl font-semibold text-white">{nome}</h3>
                <p className="text-gray-400">{email}</p>
                <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                  <Lock className="w-3 h-3" />
                  <span>E-mail não pode ser alterado</span>
                </div>
              </div>
            </div>
            <h4 className="text-sm font-semibold text-gray-400 mb-4 tracking-wider">
              DADOS PESSOAIS
            </h4>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* ... */}

              {/* Input Nome */}
              <div className="flex h-18 flex-col justify-center rounded-xl border border-white/8 bg-[#242a33] p-3 transition-colors focus-within:border-emerald-400/30">
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
                <div className="flex h-18 items-center justify-between rounded-xl border border-white/8 bg-[#242a33] p-3 opacity-80">
                  <div className="flex-1">
                    <label className="block text-xs text-gray-400 mb-1">
                      E-mail
                    </label>
                    <input
                      type="email"
                      value={email}
                      disabled
                      className="w-full bg-transparent text-gray-400 outline-none text-sm cursor-not-allowed"
                    />
                  </div>
                  <Lock className="ml-2 h-4 w-4 text-gray-500" />
                </div>
                <p className="text-xs text-gray-500 mt-1 ml-1">
                  Não pode ser alterado
                </p>
              </div>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-white/10">
            <button 
              onClick={() => navigate("/profile")} // Volta para o perfil
              className="px-6 py-2.5 rounded-lg border border-gray-600 text-gray-300 hover:bg-white/5 transition-colors text-sm font-medium"
            >
              Cancelar
            </button>
            <button 
              onClick={handleSave} // <--- ESTA É A MUDANÇA MAIS IMPORTANTE!
              className="px-6 py-2.5 rounded-lg bg-[#1B5E20] hover:bg-[#1F7A34] text-white transition-colors text-sm font-medium"
            >
              Salvar alterações
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useGoogleLogin } from "@react-oauth/google";
import logo from "../../assets/logo.png";

function Login() {
  // 1. Criamos a função de login diretamente aqui na página
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("Token recebido do Google:", tokenResponse.access_token);
      
      try {
        // Envia o token obtido para a rota do seu backend Express
        const response = await fetch("http://localhost:3000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: tokenResponse.access_token })
        });

        if (!response.ok) {
          throw new Error("Erro ao autenticar com o servidor backend.");
        }

        const dadosUsuario = await response.json();
        console.log("Usuário autenticado e salvo no banco!", dadosUsuario);
        
        // Salva os dados retornados pelo seu MySQL (idUsuario, nome, email)
        localStorage.setItem("@NotFat:user", JSON.stringify(dadosUsuario));

        // Se você usar react-router-dom, pode descomentar e usar o redirecionamento aqui:
        // window.location.href = "/dashboard"; 

      } catch (error) {
        console.error("Erro na comunicação com o backend:", error);
      }
    },
    onError: (error) => {
      console.error("Falha ao abrir o login do Google:", error);
    },
  });

  return (
    <div className="flex w-full min-h-screen">
      {/* PAINEL ESQUERDO */}
      <div className="flex-1 bg-green-700 flex flex-col items-center justify-center px-10 py-12">
        <div className="w-28 h-28 rounded-full overflow-hidden mb-4">
          <img src={logo} alt="Not Fat Logo" className="w-full h-full object-cover" />
        </div>
        <h1 className="text-white text-3xl font-black tracking-widest mb-1">NOT FAT</h1>
        <p className="text-white/75 text-sm italic mb-10">Your health, your lifestyle.</p>
        <ul className="flex flex-col gap-4 self-start w-full max-w-xs">
          <li className="flex items-center gap-3 text-white/90 text-sm">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
            Monitore suas refeições
          </li>
          <li className="flex items-center gap-3 text-white/90 text-sm">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
            </svg>
            Controle sua hidratação
          </li>
          <li className="flex items-center gap-3 text-white/90 text-sm">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
              <polyline points="17 6 23 6 23 12" />
            </svg>
            Acompanhe sua evolução
          </li>
        </ul>
      </div>

      {/* PAINEL DIREITO */}
      <div className="flex-1 bg-neutral-900 flex flex-col items-center justify-center px-10 py-12">
        <h2 className="text-white text-2xl font-bold mb-1">Bem-vindo de volta!</h2>
        <p className="text-white/50 text-sm mb-9">Acesse sua conta para continuar</p>

        <div className="w-20 h-20 rounded-full border border-green-400 flex items-center justify-center mb-6">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>

        <h3 className="text-white text-lg font-bold mb-2 text-center">Faça login com sua conta Google</h3>
        <p className="text-white/50 text-sm mb-9 text-center max-w-xs leading-relaxed">
          Utilizamos sua conta Google para garantir segurança e praticidade.
        </p>

        {/* 2. Seu botão original modificado com o evento onClick para ativar o login */}
        <button 
          onClick={() => login()}
          className="flex items-center justify-center gap-3 w-full max-w-xs py-3 px-6 rounded-xl border border-white/20 bg-transparent text-white text-sm font-semibold cursor-pointer hover:bg-white/10 transition-all"
        >
          <svg width="20" height="20" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
          </svg>
          Continuar com Google
        </button>
      </div>
    </div>
  );
}

export default Login;
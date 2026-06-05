import { useGoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

function Login() {
  const { user, signin } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setErrorMessage("");
      setLoading(true);
      console.log("Token recebido do Google:", tokenResponse.access_token);

      try {
        const response = await fetch("http://localhost:3000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: tokenResponse.access_token }),
        });

        if (!response.ok) {
          const body = await response.text();
          throw new Error(body || "Erro ao autenticar com o servidor backend.");
        }

        const dadosUsuario = await response.json();
        console.log("Usuário autenticado e salvo no banco!", dadosUsuario);

        signin(dadosUsuario);
        navigate("/");
      } catch (error) {
        console.error("Erro na comunicação com o backend:", error);
        setErrorMessage(
          error?.message || "Não foi possível fazer login. Tente novamente.",
        );
      } finally {
        setLoading(false);
      }
    },
    onError: (error) => {
      console.error("Falha ao abrir o login do Google:", error);
    },
  });

  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row">
      {/* PAINEL ESQUERDO */}
      <div className="w-full bg-green-700 px-6 py-10 md:flex-1 md:px-10 md:py-12 flex flex-col items-center justify-center text-center">
        <div className="mb-5 h-32 w-32 overflow-hidden rounded-full shadow-lg shadow-black/20 sm:h-36 sm:w-36 md:h-45 md:w-45">
          <img src={logo} alt="Not Fat Logo" className="" />
        </div>
        <h1 className="mb-1 text-3xl font-black tracking-[0.25em] text-white sm:text-4xl">
          NOT FAT
        </h1>
        <p className="mb-8 text-sm italic text-white/80 sm:text-base">
          Sua saúde, seu estilo de vida!
        </p>
        <ul className="flex w-full max-w-xs flex-col items-center gap-4 text-center">
          <li className="flex items-center gap-3 text-sm text-white/90 sm:text-base">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
            Monitore suas refeições
          </li>
        </ul>
      </div>

      {/* PAINEL DIREITO */}
      <div className="w-full bg-neutral-900 px-6 py-10 md:flex-1 md:px-10 md:py-12 flex flex-col items-center justify-center">
        <h2 className="text-white text-2xl font-bold mb-1">
          Bem-vindo de volta!
        </h2>
        <p className="text-white/50 text-sm mb-9">
          Acesse sua conta para continuar
        </p>

        <div className="w-20 h-20 rounded-full border border-green-400 flex items-center justify-center mb-6">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#4ade80"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>

        <h3 className="text-white text-lg font-bold mb-2 text-center">
          Faça login com sua conta Google
        </h3>
        <p className="text-white/50 text-sm mb-9 text-center max-w-xs leading-relaxed">
          Utilizamos sua conta Google para garantir segurança e praticidade.
        </p>

        {/* 2. Seu botão original modificado com o evento onClick para ativar o login */}
        <button
          onClick={() => login()}
          disabled={loading}
          className="flex items-center justify-center gap-3 w-full max-w-xs py-3 px-6 rounded-xl border border-white/20 bg-transparent text-white text-sm font-semibold cursor-pointer hover:bg-white/10 transition-all disabled:cursor-not-allowed disabled:opacity-60"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
            />
            <path
              fill="#4285F4"
              d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
            />
            <path
              fill="#FBBC05"
              d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
            />
            <path
              fill="#34A853"
              d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
            />
          </svg>
          Continuar com Google
        </button>
        {loading && (
          <p className="mt-4 text-sm text-white/80">Entrando... aguarde.</p>
        )}
        {errorMessage && (
          <p className="mt-4 text-sm text-red-400">{errorMessage}</p>
        )}
      </div>
    </div>
  );
}

export default Login;

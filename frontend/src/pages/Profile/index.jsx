import { useAuth } from "../../contexts/AuthContext";

export default function Profile() {
    const { user } = useAuth();

    return (
        <main className="min-h-screen bg-[#0f141b] text-white p-6 lg:p-10">
            <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-[#111827] p-8 shadow-xl">
                <h1 className="text-3xl font-bold text-white">Meu Perfil</h1>
                <p className="mt-2 text-sm text-green-100/80">
                    Informações da conta Google sincronizadas ao login.
                </p>

                <div className="mt-8 grid gap-6 md:grid-cols-2">
                    <div className="rounded-3xl bg-[#0f172a] p-6">
                        <p className="text-sm text-green-200">Nome</p>
                        <p className="mt-2 text-xl font-semibold">{user?.nome_completo || user?.name || user?.nome || "Nome não disponível"}</p>
                    </div>
                    <div className="rounded-3xl bg-[#0f172a] p-6">
                        <p className="text-sm text-green-200">Email</p>
                        <p className="mt-2 text-xl font-semibold">{user?.email || "Email não disponível"}</p>
                    </div>
                    <div className="rounded-3xl bg-[#0f172a] p-6 md:col-span-2">
                        <p className="text-sm text-green-200">ID do usuário</p>
                        <p className="mt-2 text-xl font-semibold">{user?.idUsuario || user?.id || "Não disponível"}</p>
                    </div>
                </div>
            </div>
        </main>
    );
}

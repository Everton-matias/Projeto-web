import { Navigation } from "../../componentes/navegacao";
import { EditarPerfil } from "../../componentes/Editarperfil";

export default function telaCompletaEditarPerfil() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#0f141b_0%,#151b22_48%,#11161d_100%)] text-white lg:flex">
      <Navigation />

      <main className="flex-1 min-h-screen overflow-y-auto">
        <div className="flex items-start justify-center p-4 pt-4 sm:p-6 sm:pt-6 md:p-8 md:pt-8 lg:pt-10">
          <div className="w-full max-w-5xl">
            <EditarPerfil />
          </div>
        </div>
      </main>
    </div>
  );
}

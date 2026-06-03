import { Navigation } from '../componentes/navegacao'; // Ajuste o caminho se necessário
import { EditarPerfil } from '../EditarPerfil'; // Ajuste o caminho se necessário

export default function telaCompletaEditarPerfil() {
  return (
    // A classe "flex" coloca um ao lado do outro
    // "h-screen" garante que o layout ocupe a tela toda
    <div className="flex h-screen w-full bg-[#121212]">
      
      {/* O menu lateral fica aqui */}
      <Navigation />
      
      {/* O conteúdo principal ocupa o espaço restante (flex-1) */}
      <div className="flex-1 overflow-y-auto">
        <EditarPerfil />
      </div>
      
    </div>
  );
}
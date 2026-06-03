import { useState } from 'react';
import { Home, User, LogOut } from 'lucide-react';
export function Navigation() {
  const [abaAtiva, setAbaAtiva] = useState('inicio');

  return (
    <div
      id="navigation"
      className="  bg-[#0F4418] h-screen text-[#E5E7EB] w-80 flex-col flex shadow-[inset_0_20px_20px_-10px_rgba(0,0,0,0.8)]"
    >
      <h1 className="text-[30px]  mb-1 mt-6 ml-5 " >NOT FAT</h1>
      <h5  className="text-1xl  mb-4 ml-5">Sua saúde, seu estilo de vida!</h5>
      <hr className= "border-t border-white/30 mb-3"></hr>
      <div className="text-[18px] ml-1 mt-4">
        <ul>
          <li>
            <a href="#" 
              onClick={(e) => {
                e.preventDefault();
                setAbaAtiva('inicio')}}
              className= {`block mx-3 mb-8 flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                abaAtiva === 'inicio' 
                ? 'bg-white/10 text-white' 
                : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }`}>
              <Home className="w-5 h-5" /> Início
              </a>

          </li>
          <li>
            <a href="#" 
            onClick={(e) => {
              e.preventDefault();
              setAbaAtiva('perfil')}}
            className= {`block mx-3 mb-8 flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              abaAtiva === 'perfil' 
              ? 'bg-white/10 text-white' 
              : 'text-gray-300 hover:bg-white/10 hover:text-white'
            }`}>
              <User className="w-5 h-5" /> Perfil</a>
          </li>
          <li>
            <a href="#" 
            onClick={(e) => {
              e.preventDefault();
              setAbaAtiva('sair da conta')}}
            className= {`block mt-130 mx-3 mb-8 flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              abaAtiva === 'sair da conta' 
              ? 'bg-white/10 text-white' 
              : 'text-gray-300 hover:bg-white/10 hover:text-white'
            }`}>
              
              <LogOut className="w-5 h-5" /> Sair da conta</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

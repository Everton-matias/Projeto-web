import { useState } from "react";

export default function CardInformativo() {
  const modelo = [
    { name: "alimento1" },
    { name: "alimento2" },
    { name: "alimento3" },
    { name: "alimento4" },
    { name: "alimento5" },
  ];

  const nomeRefeicoes = [
    {
      name: "Desjejum",
    },
    {
      name: "Café da manhã",
    },
    {
      name: "Almoço",
    },
    {
      name: "Lanche da tarde",
    },
    {
      name: "Jantar",
    },
    {
      name: "Ceia",
    },
  ];

  // Estado para controlar se a área está aberta ou fechada
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="max-w-md mx-auto m-4 p-4 border rounded-lg shadow-sm bg-white">
      {/* Área Principal / Gatilho de Clique */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center cursor-pointer p-2 hover:bg-gray-50 rounded"
      >
        <h3 className="font-medium text-gray-900">Ângulo do Projeto</h3>

        {/* Ícone indicador (gira se estiver aberto) */}
        <svg
          className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {/* Área Expandível (Renderização Condicional) */}
      {isOpen && (
        <div className="mt-3 p-3 bg-gray-50 rounded-md border-t text-sm text-gray-600 animate-fadeIn">
          <p className="font-semibold text-gray-700 mb-1">
            Informações Adicionais:
          </p>
          <ul className="list-disc pl-4 space-y-1">
            <li>Cálculo de inclinação ideal.</li>
            <li>Especificações técnicas do vértice.</li>
            <li>Dados de projeção geométrica.</li>
          </ul>
        </div>
      )}
    </div>
  );
}

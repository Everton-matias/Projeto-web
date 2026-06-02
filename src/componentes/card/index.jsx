import { useState } from "react";
import ModalAlimentos from "../modalAlimentos";

export default function CardInformativo() {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className=" w-full  flex-col flex pt-15">
      <h1 className="text-[#e5e7eb] text-2xl font-bold py-3 pl-21 flex">
        Refeições
      </h1>
      {nomeRefeicoes.map((refeicao, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={refeicao.name}
            className="bg-[#1a1f27]  rounded-xl py-5 mx-20 my-3 flex flex-col gap-3 border border-[#333332]"
          >
            <div className="flex items-center justify-between cursor-pointer rounded mx-5">
              <h3
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="text-[#e5e7eb] font-medium text-gray-100m pr-270 py-3 "
              >
                {refeicao.name}
              </h3>
              <div>
                <button className="border border-[#333332] rounded-sm  mx-10">
                  <p
                    onClick={() => setIsModalOpen(true)}
                    className="m-1 text-[#e5e7eb]"
                  >
                    + Alimento
                  </p>
                </button>
                <button onClick={() => setOpenIndex(isOpen ? null : index)}>
                  <svg
                    className={`w-5 h-5 text-gray-300 transition-transform duration-200  ${isOpen ? "rotate-180" : ""}`}
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
                </button>
              </div>
            </div>

            {/* Área Expandível (Renderização Condicional) */}
            {isOpen && (
              <div className="px-4 pb-4 flex flex-col gap-3 rounded-b-md text-sm  animate-[fadeIn_0.25s_ease-out_forwards]">
                <div className="w-full h-px bg-[#333332] my-4" />
                {modelo.map((alimento) => (
                  <div
                    className="flex items-center justify-between"
                    key={alimento.name}
                  >
                    <div>
                      <p className="text-[#e5e7eb]">{alimento.name}</p>
                      <p id="quantidade" className="text-[#bbbfc7]">
                        1x
                      </p>
                    </div>
                    <div>
                      <button>
                        <p className="text-[#e5e7eb]">remover</p>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
      <ModalAlimentos
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Detalhes do Ângulo"
      >
        {/* Todo conteúdo inserido aqui dentro entra no 'children' do Modal */}
        <p>Aqui ficam as informações detalhadas que você queria mostrar!</p>
        <div className="w-full h-px bg-gray-200 my-2" />{" "}
        {/* Sua listra divisória */}
        <p className="text-xs text-gray-400">
          Dados processados em tempo real.
        </p>
      </ModalAlimentos>
    </div>
  );
}

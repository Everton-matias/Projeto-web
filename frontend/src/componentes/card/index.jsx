import { useState } from "react";
import Modal from "../modal";

export default function CardInformativo() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [busca, setBusca] = useState("");

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

  const alimentosFiltrados = modelo.filter((alimento) =>
    alimento.name.toLowerCase().includes(busca.toLowerCase()),
  );

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="w-full px-4 pb-8 pt-8 sm:px-6 lg:px-8 lg:pt-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4">
        <h1 className="text-2xl font-bold text-[#e5e7eb] sm:text-3xl">
          Refeições
        </h1>
        <p className="max-w-2xl text-sm text-[#cfd4de] sm:text-base">
          Organize sua rotina alimentar e acompanhe os alimentos adicionados em
          cada refeição.
        </p>
      </div>
      {nomeRefeicoes.map((refeicao, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={refeicao.name}
            className="mx-auto mt-4 flex w-full max-w-6xl flex-col gap-3 rounded-2xl border border-[#333332] bg-[#1a1f27] px-4 py-5 shadow-lg shadow-black/10 sm:px-5"
          >
            <div className="flex flex-col gap-3 rounded-xl sm:flex-row sm:items-center sm:justify-between">
              <h3
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="cursor-pointer text-[#e5e7eb] text-lg font-semibold sm:text-xl"
              >
                {refeicao.name}
              </h3>
              <div className="flex flex-wrap items-center gap-3 sm:justify-end">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="rounded-lg border border-[#333332] bg-[#232933] px-3 py-2 text-sm text-[#e5e7eb] transition hover:bg-[#2b3340]"
                >
                  + Alimento
                </button>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="rounded-lg border border-[#333332] bg-[#232933] p-2 text-[#e5e7eb] transition hover:bg-[#2b3340]"
                >
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
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Adicionar alimento"
      >
        {/* <input
          type="text"
          placeholder="Nome do alimento"
          className="w-full p-3 text-sm text-[#e5e7eb] bg-[#181c23] rounded-lg border border-[#333332] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition mb-4"
        />
        {modelo.map((alimento) => (
          <div>
            <p className="text-[#e5e7eb]">{alimento.name}</p>
          </div>
        ))}
        <div className="w-full h-px bg-gray-200 my-2" />{" "}
        <p className="text-xs text-gray-400">
          Dados processados em tempo real.
        </p> */}

        <div className="w-full max-w-md mx-auto p-4 bg-white border rounded-xl shadow-sm">
          <label
            htmlFor="busca-alimento"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Buscar Alimento
          </label>

          {/* Campo de Entrada (Input) */}
          <input
            id="busca-alimento"
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Digite o nome do alimento..."
            className="w-full p-2.5 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition mb-4"
          />

          {/* Listagem dos Resultados Filtrados */}
          <ul className="divide-y divide-gray-100 max-h-60 overflow-y-auto">
            {alimentosFiltrados.length > 0 ? (
              alimentosFiltrados.map((alimento, index) => (
                // Usando o modificador 'even:' para aplicar a listra sutil que vimos antes
                <li
                  key={index}
                  className="p-3 text-sm text-gray-700 hover:bg-blue-50 cursor-pointer transition even:bg-gray-50"
                >
                  {alimento.name}
                </li>
              ))
            ) : (
              // Mensagem caso nenhum resultado seja encontrado
              <li className="p-3 text-sm text-gray-400 text-center italic">
                Nenhum alimento encontrado.
              </li>
            )}
          </ul>
        </div>
      </Modal>
    </section>
  );
}

import { useState } from "react";
import Modal from "../modal";

export default function CardInformativo() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [busca, setBusca] = useState("");
  const [mealIndex, setMealIndex] = useState(0);
  const [quantidades, setQuantidades] = useState({});
  const [itensPorRefeicao, setItensPorRefeicao] = useState({});

  const modelo = [
    { name: "Whey Protein", porcao: "1 scoop", quantidade: 0 },
    { name: "Creatina", porcao: "5 g", quantidade: 0 },
    { name: "Banana", porcao: "1 unidade", quantidade: 0 },
    { name: "Aveia", porcao: "50 g", quantidade: 0 },
    { name: "Iogurte", porcao: "200 ml", quantidade: 0 },
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

  const ajustarQuantidade = (nome, delta) => {
    setQuantidades((prev) => ({
      ...prev,
      [nome]: Math.max(0, (prev[nome] || 0) + delta),
    }));
  };

  const salvarPorcoesSelecionadas = () => {
    const alimentosSelecionados = modelo.filter(
      (alimento) => (quantidades[alimento.name] || 0) > 0,
    );

    if (alimentosSelecionados.length === 0) {
      setIsModalOpen(false);
      return;
    }

    setItensPorRefeicao((prev) => ({
      ...prev,
      [mealIndex]: [
        ...(prev[mealIndex] || []),
        ...alimentosSelecionados.map((alimento) => ({
          ...alimento,
          quantidade: quantidades[alimento.name] || 1,
        })),
      ],
    }));

    setIsModalOpen(false);
    setBusca("");
  };

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
                  onClick={() => {
                    setMealIndex(index);
                    setIsModalOpen(true);
                  }}
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
                {(itensPorRefeicao[index] || []).map((alimento) => (
                  <div
                    className="flex items-center justify-between gap-3 rounded-xl border border-[#333332] bg-[#181c23] p-3"
                    key={`${alimento.name}-${index}`}
                  >
                    <div>
                      <p className="text-[#e5e7eb]">{alimento.name}</p>
                      <p id="quantidade" className="text-[#bbbfc7]">
                        {alimento.quantidade}x · {alimento.porcao}
                      </p>
                    </div>
                    <button className="rounded-lg border border-[#333332] px-3 py-1 text-xs text-[#e5e7eb] hover:bg-[#232933]">
                      remover
                    </button>
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
        title={`Adicionar alimento · ${nomeRefeicoes[mealIndex]?.name || "Refeição"}`}
      >
        <div className="w-full max-w-md mx-auto p-4  ">
          <input
            id="busca-alimento"
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder=" Buscar Alimento"
            className="w-full p-2.5 text-sm bg-[#1a1f27] border border-[#333332] rounded-lg text-[#bbbfc7] focus:ring-2  transition mb-4"
          />

          {alimentosFiltrados.length > 0 ? (
            alimentosFiltrados.map((alimento) => {
              const quantidadeAtual = quantidades[alimento.name] || 0;

              return (
                <div
                  key={alimento.name}
                  className="my-2 flex flex-col gap-3 rounded-2xl border border-[#333332] bg-[#181c23] p-3 text-sm text-[#e5e7eb]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold">{alimento.name}</p>
                      <p className="text-[#bbbfc7]">
                        Porção: {alimento.porcao}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-[#333332] bg-[#1f2631] px-3 py-2">
                    <span className="text-xs uppercase tracking-[0.2em] text-[#cfd4de]">
                      Quantidade
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => ajustarQuantidade(alimento.name, -1)}
                        className="h-8 w-8 rounded-full border border-[#333332] text-[#e5e7eb] hover:bg-[#232933]"
                      >
                        −
                      </button>
                      <span className="min-w-8 text-center text-[#e5e7eb]">
                        {quantidadeAtual}
                      </span>
                      <button
                        type="button"
                        onClick={() => ajustarQuantidade(alimento.name, 1)}
                        className="h-8 w-8 rounded-full border border-[#333332] text-[#e5e7eb] hover:bg-[#232933]"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="p-3 text-sm text-[#e5e7eb] text-center italic">
              Nenhum alimento encontrado.
            </p>
          )}

          <div className="mt-4 flex justify-end gap-2 border-t border-[#333332] pt-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="rounded-lg border border-[#333332] bg-[#181c23] px-4 py-2 text-sm font-medium text-[#e5e7eb] hover:bg-[#232933]"
            >
              Fechar
            </button>
            <button
              type="button"
              onClick={salvarPorcoesSelecionadas}
              className="rounded-lg border border-[#317C3E] bg-[#1f7a34] px-4 py-2 text-sm font-medium text-[#e5e7eb] hover:bg-[#2d8f42]"
            >
              Adicionar alimento
            </button>
          </div>
        </div>
      </Modal>
    </section>
  );
}

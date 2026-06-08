import { useState, useEffect } from "react";
import Modal from "../modal";

export default function CardInformativo() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [busca, setBusca] = useState("");
  const [mealIndex, setMealIndex] = useState(0);
  const [quantidades, setQuantidades] = useState({});
  const [itensPorRefeicao, setItensPorRefeicao] = useState({});
  const [alimentosDb, setAlimentosDb] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const carregarAlimentosDoBanco = async () => {
      try {
        const response = await fetch("http://localhost:3000/alimentos");
        const dados = await response.json();
        setAlimentosDb(dados);
      } catch (error) {
        console.error("Erro ao buscar alimentos:", error);
      }
    };
    carregarAlimentosDoBanco();
  }, []);

  const nomeRefeicoes = [
    { id: 1, name: "Desjejum" },
    { id: 2, name: "Café da manhã" },
    { id: 3, name: "Almoço" },
    { id: 4, name: "Lanche da tarde" },
    { id: 5, name: "Jantar" },
    { id: 6, name: "Ceia" },
  ];

  // Função para buscar alimentos da refeição selecionada
  const carregarItensDaRefeicao = async (index, idRefeicao) => {
    try {
      const userStorage = localStorage.getItem("@NotFat:user");
      if (!userStorage) return;
      const { idUsuario } = JSON.parse(userStorage);

      const response = await fetch(
        `http://localhost:3000/refeicao/${idUsuario}/${idRefeicao}`,
      );
      const dados = await response.json();

      console.log("Dados da refeição:", dados);

      setItensPorRefeicao((prev) => ({
        ...prev,
        [index]: dados,
      }));
    } catch (error) {
      console.error("Erro ao carregar itens da refeição:", error);
    }
  };

  const alimentosFiltrados = alimentosDb.filter((alimento) =>
    alimento.nome?.toLowerCase().includes(busca.toLowerCase()),
  );

  const ajustarQuantidade = (nome, delta) => {
    setQuantidades((prev) => ({
      ...prev,
      [nome]: Math.max(0, (prev[nome] || 0) + delta),
    }));
  };

  const salvarPorcoesSelecionadas = async () => {
    const userStorage = localStorage.getItem("@NotFat:user");
    if (!userStorage) return;
    const { idUsuario } = JSON.parse(userStorage);

    const alimentosSelecionados = alimentosDb.filter(
      (alimento) => (quantidades[alimento.nome] || 0) > 0,
    );

    if (alimentosSelecionados.length === 0) {
      setIsModalOpen(false);
      return;
    }

    try {
      const idDaRefeicao = nomeRefeicoes[mealIndex].id;
      for (const alimento of alimentosSelecionados) {
        await fetch("http://localhost:3000/adicionar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            idUsuario: idUsuario,
            idRefeicao: idDaRefeicao,
            idAlimento: alimento.id,
            quantidade: quantidades[alimento.nome],
          }),
        });
      }
      // Recarrega os itens após salvar
      carregarItensDaRefeicao(mealIndex, idDaRefeicao);
    } catch (error) {
      console.error("Erro ao salvar no banco:", error);
    }

    setIsModalOpen(false);
    setBusca("");
    setQuantidades({});
  };

  const removerAlimentoDaRefeicao = async (index, idRefeicao, idAlimento) => {
    try {
      const userStorage = localStorage.getItem("@NotFat:user");
      if (!userStorage) return;

      const { idUsuario } = JSON.parse(userStorage);

      const response = await fetch(
        `http://localhost:3000/refeicao/${idUsuario}/${idRefeicao}/${idAlimento}`,
        { method: "DELETE" },
      );

      if (!response.ok) {
        throw new Error("Falha ao remover alimento");
      }

      carregarItensDaRefeicao(index, idRefeicao);
    } catch (error) {
      console.error("Erro ao remover alimento da refeição:", error);
    }
  };

  return (
    <section className="w-full px-4 pb-8 pt-8 sm:px-6 lg:px-8 lg:pt-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4">
        <h1 className="text-2xl font-bold text-[#e5e7eb] sm:text-3xl">
          Refeições
        </h1>
      </div>

      {nomeRefeicoes.map((refeicao, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={refeicao.name}
            className="mx-auto mt-4 flex w-full max-w-6xl flex-col gap-3 rounded-2xl border border-[#333332] bg-[#1a1f27] px-4 py-5"
          >
            <div className="flex items-center justify-between gap-3 rounded-xl">
              <button
                type="button"
                onClick={() => {
                  if (!isOpen) carregarItensDaRefeicao(index, refeicao.id);
                  setOpenIndex(isOpen ? null : index);
                }}
                className="flex-1 rounded-xl py-2 pr-2 text-left text-lg font-semibold text-[#e5e7eb] transition hover:bg-[#232933]"
              >
                {refeicao.name}
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    setMealIndex(index);
                    setIsModalOpen(true);
                  }}
                  className="rounded-lg bg-[#232933] px-3 py-2 text-sm text-[#e5e7eb] transition hover:bg-[#2b3340]"
                >
                  + Alimento
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (!isOpen) carregarItensDaRefeicao(index, refeicao.id);
                    setOpenIndex(isOpen ? null : index);
                  }}
                  className="rounded-lg border border-[#333332] bg-[#232933] p-2 text-[#e5e7eb] transition hover:bg-[#2b3340]"
                  aria-label="Expandir detalhes da refeição"
                >
                  <svg
                    className={`h-5 w-5 text-gray-300 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
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

            {isOpen && (
              <div className="mt-4 border-t border-[#333332] pt-4">
                {(itensPorRefeicao[index] || []).map((alimento, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-3 border-b border-[#333332] p-3 text-[#e5e7eb]"
                  >
                    <div>
                      <p className="font-medium">{alimento.nome_alimento}</p>
                      <p className="text-sm text-[#cfd4de]">
                        {alimento.quantidade}x
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        removerAlimentoDaRefeicao(
                          index,
                          refeicao.id,
                          alimento.id_alimento,
                        )
                      }
                      className="rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-100 transition hover:bg-red-500/20"
                    >
                      Remover
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
        <div className="w-full max-w-md mx-auto p-4">
          <input
            id="busca-alimento"
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder=" Buscar Alimento"
            className="w-full p-2.5 text-sm bg-[#1a1f27] border border-[#333332] rounded-lg text-[#bbbfc7] focus:ring-2 transition mb-4 outline-none"
          />

          <div className="max-h-96 overflow-y-auto pr-2">
            {alimentosFiltrados.length > 0 ? (
              alimentosFiltrados.map((alimento) => {
                const quantidadeAtual = quantidades[alimento.nome] || 0;

                return (
                  <div
                    key={alimento.id}
                    className="my-2 flex flex-col gap-3 rounded-2xl border border-[#333332] bg-[#181c23] p-3 text-sm text-[#e5e7eb]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold">{alimento.nome}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between rounded-xl border border-[#333332] bg-[#1f2631] px-3 py-2">
                      <span className="text-xs uppercase tracking-[0.2em] text-[#cfd4de]">
                        Quantidade
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => ajustarQuantidade(alimento.nome, -1)}
                          className="h-8 w-8 rounded-full border border-[#333332] text-[#e5e7eb] hover:bg-[#232933]"
                        >
                          −
                        </button>
                        <span className="min-w-8 text-center text-[#e5e7eb]">
                          {quantidadeAtual}
                        </span>
                        <button
                          type="button"
                          onClick={() => ajustarQuantidade(alimento.nome, 1)}
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
          </div>

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

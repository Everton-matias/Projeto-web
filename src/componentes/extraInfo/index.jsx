import { useState } from "react";

export default function Informativo() {
  const informacoes = [
    {
      name: "Whey Protein",
      info: "Whey protein é uma proteína derivada do soro do leite, de rápida absorção e alto valor biológico, muito utilziada par auxiliar na recuperação muscular e no ganho de massa magra.",
      list: [
        "auxilia no ganho e manutenção da massa muscular",
        "Rápida abosrção e fácil digestão",
        "Ideal para o pós-treino, mas pode ser consumido em outros momentos do dia",
        "Contribui para a recuperação muscular",
        "Prático e versátil no dia a dia",
      ],
    },
    {
      name: "Creatina",
      info: "A creatina é um dos suplementos mais estudados e eficazes para ganho de força e performance. Age aumentando os estoques de fosfocreatina nos músculos, fornecendo energia rápida durante exercícios de alta intensidade.",
      list: [
        "Aumenta força e potência muscular em treinos intensos",
        "Melhora a performance em séries repetidas e sprints",
        "Dose recomendada: 3-5g por dia, todos os dias",
        "Pode ser tomada a qualquer hora - consistência é o que importa",
        "Fase de saturação opcional: 20g/dia por 5 - 7 dias para resultados mais rápidos",
      ],
    },
    {
      name: "Pré-treino",
      info: "O pré-treino combina ingredientes como cafeína, beta-alanina e citrulina para aumentar energia, foco e resistência durante o treino. Ideal para quem busca mais intensidade nas sessões.",
      list: [
        "Consumir 20–30 minutos antes do treino para efeito máximo",
        "Evitar tomar à noite para não prejudicar o sono",
        "Começar com metade da dose para avaliar tolerância à cafeína",
        "Fazer pausas periódicas para evitar tolerância (ex.: 1 semana off a cada mês)",
        "Manter boa hidratação durante o uso",
      ],
    },
    {
      name: "Hipercalórico",
      info: "O hipercalórico é um suplemento rico em carboidratos e proteínas, indicado para quem tem dificuldade em atingir o superávit calórico necessário para o ganho de massa muscular. Ideal para hardgainers e quem tem metabolismo acelerado.",
      list: [
        "Indicado para quem tem dificuldade em ganhar peso com a dieta comum",
        "Consumir preferencialmente após o treino ou entre refeições",
        "Não substitui refeições completas — complementa a alimentação",
        "Atenção à quantidade de açúcar na fórmula ao escolher a marca",
        "Combinar com treino de força para converter calorias em músculo, não em gordura",
      ],
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="w-full flex-col flex pt-15">
      <h1 className="text-[#e5e7eb] text-2xl font-bold py-3 pl-21 flex">
        Informações
      </h1>
      ;
      {informacoes.map((informacao, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={informacao.name}
            className="bg-[#1a1f27] rounded-xl py-5 mx-20 my-3 flex flex-col gap-3 border border-[#333332]"
          >
            <div className="flex items-center justify-between cursor-pointer rounded mx-5">
              <h3
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="text-[#e5e7eb] font-medium py-3 flex-1"
              >
                {informacao.name}
              </h3>
              <button onClick={() => setOpenIndex(isOpen ? null : index)}>
                <svg
                  className={`w-5 h-5 text-gray-300 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
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

            {/* Área Expandível (Renderização Condicional) */}
            {isOpen && (
              <div className="px-4 pb-4 flex flex-col gap-3 text-sm animate-[fadeIn_0.25s_ease-out_forwards]">
                <div className="w-full h-px bg-[#333332]" />
                <p className="text-[#b0b0b0]">{informacao.info}</p>
                <ul className="flex flex-col gap-2 text-[#e5e7eb]">
                  {informacao.list.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#666] mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

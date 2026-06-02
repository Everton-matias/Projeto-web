import { Navigation } from "../../componentes/navegacao";
import CardInformativo from "../../componentes/card";

function Home() {
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

  return (
    <div className="bg-[#0f141b] flex-row flex">
      <Navigation />

      <div
        id="container"
        className="bg-[#0f141b] flex-col items-center flex w-full"
      >
        <CardInformativo />
        {/* <div
          id="mainContent"
          className="bg-amber-100 w-full  flex-col flex pt-15"
        >
          <h1 className="text-[#e5e7eb]">Refeições do dia</h1>
          {nomeRefeicoes.map((refeicao) => (
            <div
              id="refeicao"
              className=" bg-amber-900 justify-between flex w-3x border rounded-xl  py-5 mx-20 my-3"
            >
              <h2 className="text-[#e5e7eb] ml-10">{refeicao.name}</h2>
              <button className="border rounded-xs text-[#e5e7eb] mx-10">
                <p className="m-1">+ Alimento</p>
              </button>
              
            </div>
          ))}
        </div> */}

        {/* <div id="contentInfo" className="w-full flex flex-col items-center">
          {informacoes.map((informacao) => (
            <div>
              <h1>{informacao.name}</h1>
              <p>{informacao.info}</p>
              <ul>
                {informacao.list.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
}

export default Home;

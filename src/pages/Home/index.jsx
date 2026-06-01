import { Navigation } from "../../componentes/navegacao";

function Home() {
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
      info: "",
      list: ["", "", "", "", ""],
    },
    {
      name: "Pré-treino",
      info: "",
      list: ["", "", "", "", ""],
    },
    {
      name: "Vitaminas",
      info: "",
      list: ["", "", "", "", ""],
    },
  ];

  const modelo = [
    { name: "alimento1" },
    { name: "alimento2" },
    { name: "alimento3" },
    { name: "alimento4" },
    { name: "alimento5" },
  ];

  return (
    <div className="bg-amber-800 flex-row flex">
      <Navigation />

      <div
        id="container"
        className="bg-amber-400 flex-col items-center flex w-full"
      >
        <div
          id="mainContent"
          className="bg-amber-100 w-full items-center flex-col flex"
        >
          <h1>Refeições do dia</h1>
          {nomeRefeicoes.map((refeicao) => (
            <div
              id="refeicao"
              className=" bg-amber-900 items-start flex-col flex w-3x border rounded-xl pt-3 pb-3 pr-10 pl-10"
            >
              <h2>{refeicao.name}</h2>
              <button className="border rounded-xs">+ Alimento</button>
            </div>
          ))}
        </div>

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

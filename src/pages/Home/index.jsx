import { Navigation } from "../../componentes/navegacao";
import CardInformativo from "../../componentes/card";
import Informativo from "../../componentes/extraInfo";

function Home() {
  return (
    <div className="bg-[#0f141b] flex-row flex min-h-screen">
      <Navigation />

      <div
        id="container"
        className="bg-[#0f141b] flex-col items-center flex-1 min-h-screen overflow-y-auto"
      >
        <CardInformativo />

        <div id="contentInfo" className="w-full flex flex-col items-center">
          <Informativo />
        </div>
      </div>
    </div>
  );
}

export default Home;

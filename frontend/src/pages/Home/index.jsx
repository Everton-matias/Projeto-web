import { Navigation } from "../../componentes/navegacao";
import Card from "../../componentes/card";
import Informativo from "../../componentes/extraInfo";

function Home() {
  return (
    <div className="min-h-screen bg-[#0f141b] flex flex-col lg:flex-row">
      <Navigation />

      <div
        id="container"
        className="flex-1 min-h-screen overflow-y-auto bg-[#0f141b] lg:pl-72"
      >
        <Card />

        <div id="contentInfo" className="w-full flex flex-col items-center">
          <Informativo />
        </div>
      </div>
    </div>
  );
}

export default Home;

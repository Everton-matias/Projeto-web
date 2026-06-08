import { useState, useEffect } from "react";
import { Navigation } from "../../componentes/navegacao";
import { Droplets, Info, Calculator, ChevronDown } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

export default function Agua() {
  const { user } = useAuth();
  const [consumoHoje, setConsumoHoje] = useState(0);
  const [historico, setHistorico] = useState([]);
  const [metaDiaria, setMetaDiaria] = useState(() => {
    return parseFloat(localStorage.getItem("metaDiaria")) || 2.8;
  });
  const [peso, setPeso] = useState(() => {
    return parseFloat(localStorage.getItem("pesoUsuario")) || 85;
  });
  const [nivelAtividade, setNivelAtividade] = useState(() => {
    return localStorage.getItem("nivelAtividade") || "Moderado";
  });
  const [minimoIdeal, setMinimoIdeal] = useState(() => {
    const p = parseFloat(localStorage.getItem("pesoUsuario")) || 85;
    return (p * 35) / 1000;
  });
  const [diasFiltro, setDiasFiltro] = useState(7);

  const calcularMeta = () => {
    // Cálculo base: 35ml por kg
    let base = peso * 35;
    
    // Adicional por nível de atividade
    if (nivelAtividade === "Moderado") base += 500;
    if (nivelAtividade === "Ativo") base += 1000;

    const metaLitros = base / 1000;
    const min = (peso * 35) / 1000;

    setMetaDiaria(metaLitros);
    setMinimoIdeal(min);

    // Persistir no localStorage
    localStorage.setItem("metaDiaria", metaLitros.toString());
    localStorage.setItem("pesoUsuario", peso.toString());
    localStorage.setItem("nivelAtividade", nivelAtividade);
  };

  useEffect(() => {
    async function fetchWaterData() {
      if (!user) return;
      try {
        const idUsuario = user.idUsuario || user.id;
        const response = await fetch(`http://localhost:3000/agua/${idUsuario}?dias=${diasFiltro}`);
        if (response.ok) {
          const data = await response.json();
          setConsumoHoje(data.consumoHoje / 1000);
          if (data.historico) {
            setHistorico(data.historico);
          }
        }
      } catch (error) {
        console.error("Erro ao carregar dados de água:", error);
      }
    }
    fetchWaterData();
  }, [user, diasFiltro]);

  const addAgua = async (ml) => {
    if (!user) return;
    const previous = consumoHoje;
    setConsumoHoje((prev) => prev + ml / 1000);
    try {
      const idUsuario = user.idUsuario || user.id;
      const response = await fetch("http://localhost:3000/agua", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idUsuario, quantidade_ml: ml }),
      });
      if (!response.ok) throw new Error();
    } catch (error) {
      setConsumoHoje(previous);
    }
  };

  const percent = Math.min(Math.round((consumoHoje / metaDiaria) * 100), 100);
  const size = 240;
  const strokeWidth = 14;
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  const formatarData = (dataStr) => {
    const data = new Date(dataStr + 'T00:00:00');
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const ontem = new Date(hoje);
    ontem.setDate(hoje.getDate() - 1);

    if (data.getTime() === hoje.getTime()) return "Hoje";
    if (data.getTime() === ontem.getTime()) return "Ontem";

    return data.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '');
  };

  const getUltimosDias = () => {
    const dias = [];
    for (let i = 0; i < diasFiltro; i++) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const iso = d.toISOString().split('T')[0];
        dias.push(iso);
    }
    return dias;
  };

  return (
    <div className="flex min-h-screen bg-[#0F0F0F] text-white font-sans selection:bg-green-500/30 overflow-x-hidden">
      <Navigation />

      <main className="flex-1 p-6 lg:pl-72 lg:p-12">
        <div className="max-w-7xl mx-auto">
          {/* HEADER */}
          <div className="flex flex-col lg:flex-row justify-between items-start mb-12 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Droplets className="text-[#4ADE80] w-7 h-7" />
                <h1 className="text-3xl font-bold tracking-tight">
                  Minha água
                </h1>
              </div>
              <p className="text-neutral-500 text-sm">
                Acompanhe sua hidratação diária e mantenha-se no caminho certo.
              </p>
            </div>

            <div className="bg-[#1A2E1C]/30 p-4 rounded-xl max-w-md">
              <p className="text-[11px] text-neutral-400 leading-normal font-medium flex items-start gap-3">
                <Info className="text-[#4ADE80] w-4 h-4 shrink-0 mt-0.5" />A
                água é essencial para o bom funcionamento do corpo, melhora o
                desempenho físico e mental, ajuda na digestão e na regulação da
                temperatura corporal.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* HOJE */}
            <div className="bg-[#141414] rounded-[24px] p-8 flex flex-col items-center">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-10 w-full text-left">
                CONSUMO DE HOJE
              </h2>

              <div
                className="relative flex items-center justify-center mb-4"
                style={{ width: size, height: size, position: "relative" }}
              >
                {/* SVG DO CÍRCULO - ABSOLUTO PARA NÃO EMPURRAR O TEXTO */}
                <svg
                  width={size}
                  height={size}
                  style={{
                    transform: "rotate(-90deg)",
                    display: "block",
                    position: "absolute",
                    top: 0,
                    left: 0,
                  }}
                >
                  <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    stroke="rgba(255,255,255,0.03)"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                  />
                  <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    stroke="#4ADE80"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>

                {/* TEXTO CENTRALIZADO - ABSOLUTO NO CENTRO DO PAI */}
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 10,
                  }}
                >
                  <div className="text-5xl font-black">
                    {consumoHoje.toFixed(1).replace(".", ",")}
                    <span className="text-xl font-light text-neutral-600 ml-1">
                      L
                    </span>
                  </div>
                  <div className="text-sm text-neutral-500 font-bold mt-1">
                    de {metaDiaria.toFixed(1).replace(".", ",")} L
                  </div>
                </div>
              </div>

              {/* PORCENTAGEM ABAIXO DO CÍRCULO */}
              <div className="text-neutral-500 text-sm font-bold mb-10 text-center">
                <span className="text-neutral-300">{percent}%</span> da meta
                diária
              </div>

              <div className="w-full pt-8 border-t border-white/5">
                <h3 className="text-[10px] font-bold text-neutral-600 mb-5 tracking-widest uppercase text-center">
                  ADICIONAR ÁGUA
                </h3>
                <div className="flex flex-wrap gap-3 justify-center">
                  {[200, 300, 500].map((ml) => (
                    <button
                      key={ml}
                      onClick={() => addAgua(ml)}
                      className="bg-transparent border border-[#4ADE80]/40 hover:bg-[#4ADE80]/10 px-7 py-3 rounded-xl text-sm font-bold text-[#4ADE80] transition-all"
                    >
                      + {ml}ml
                    </button>
                  ))}
                  <button 
                    onClick={() => {
                        const amount = prompt("Quantidade em ml:");
                        if (amount && !isNaN(amount)) addAgua(parseInt(amount));
                    }}
                    className="bg-[#4ADE80]/10 border border-[#4ADE80]/40 hover:bg-[#4ADE80]/20 px-7 py-3 rounded-xl text-sm font-bold text-[#4ADE80] flex items-center gap-2"
                  >
                    <Droplets className="w-4 h-4" /> Personalizado
                  </button>
                </div>
              </div>
            </div>

            {/* HISTÓRICO */}
            <div className="bg-[#141414] rounded-[24px] p-8 flex flex-col h-[500px]">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                  HISTÓRICO RECENTE
                </h2>
                <select 
                  value={diasFiltro}
                  onChange={(e) => setDiasFiltro(parseInt(e.target.value))}
                  className="bg-[#1C1C1C] px-3 py-1.5 rounded-lg text-[10px] font-bold text-neutral-500 border-none outline-none cursor-pointer appearance-none text-center"
                >
                  <option value={7}>7 DIAS</option>
                  <option value={15}>15 DIAS</option>
                  <option value={30}>30 DIAS</option>
                </select>
              </div>
              <div className="space-y-8 overflow-y-auto pr-2 custom-scrollbar">
                {getUltimosDias().map((dataIso) => {
                    const registro = historico.find(h => {
                        // O banco pode retornar 'data' como Date ou string formatada
                        const hData = h.data instanceof Date 
                            ? h.data.toISOString().split('T')[0] 
                            : h.data.split('T')[0];
                        return hData === dataIso;
                    });
                    
                    const valorML = registro ? registro.total : 0;
                    const valorL = valorML / 1000;
                    const w = Math.min((valorL / metaDiaria) * 100, 100);
                    
                    return (
                      <div key={dataIso} className="flex items-center gap-4">
                        <div className="text-[11px] font-bold text-neutral-500 w-14 capitalize">
                          {formatarData(dataIso)}
                        </div>
                        <div className="flex-1 bg-[#1C1C1C] h-2 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#4ADE80]/70 rounded-full transition-all duration-1000"
                            style={{ width: `${w}%` }}
                          ></div>
                        </div>
                        <div className="text-[11px] font-bold text-neutral-400 w-10 text-right">
                          {valorL.toFixed(1).replace(".", ",")} L
                        </div>
                      </div>
                    );
                })}
              </div>
            </div>
          </div>

          {/* CALCULADORA */}
          <div className="bg-[#141414] rounded-[24px] p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="space-y-8">
                <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                  CALCULADORA DE META
                </h2>
                <div>
                  <label className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest mb-3 block">
                    Peso Atual
                  </label>
                  <input
                    type="number"
                    value={peso}
                    onChange={(e) => setPeso(e.target.value)}
                    className="w-full bg-[#0F0F0F] rounded-xl px-5 py-4 text-xl font-bold border border-white/5 focus:border-[#4ADE80]/50 outline-none transition-all"
                    placeholder="Peso em kg"
                  />
                </div>
                <button 
                  onClick={calcularMeta}
                  className="w-full bg-[#2D7336] hover:bg-[#3b8e46] text-white font-bold py-4 rounded-xl text-[11px] uppercase tracking-widest transition-all"
                >
                  Calcular meta
                </button>
              </div>
              <div className="space-y-4 pt-10">
                {["Sedentário", "Moderado", "Ativo"].map((n) => (
                  <div
                    key={n}
                    onClick={() => setNivelAtividade(n)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${n === nivelAtividade ? "border-[#4ADE80] bg-[#4ADE80]/10 text-white" : "border-white/5 bg-[#1C1C1C] text-neutral-500 hover:bg-neutral-800"}`}
                  >
                    <div className="text-xs font-bold">{n}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col justify-end">
                <div className="bg-[#1C1C1C] p-8 rounded-2xl flex items-center justify-between border border-white/5">
                  <div>
                    <div className="text-4xl font-black">
                      {minimoIdeal.toFixed(1).replace(".", ",")}
                      <span className="text-sm font-light text-neutral-600 ml-1">
                        L
                      </span>
                    </div>
                    <div className="text-[9px] font-bold text-neutral-600 mt-1">
                      MÍNIMO
                    </div>
                  </div>
                  <div className="h-10 w-px bg-white/10"></div>
                  <div className="text-right">
                    <div className="text-4xl font-black">
                      {metaDiaria.toFixed(1).replace(".", ",")}
                      <span className="text-sm font-light text-neutral-600 ml-1">
                        L
                      </span>
                    </div>
                    <div className="text-[9px] font-bold text-neutral-500 mt-1">
                      IDEAL
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

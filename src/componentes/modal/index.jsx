// Modal.jsx
export default function Modal({ isOpen, onClose, title, children }) {
  // Se isOpen for falso, o componente não renderiza nada
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm ">
      {/* Caixa do Modal */}
      <div className="bg-[#1a1f27] rounded-xl shadow-xl max-w-md w-full overflow-hidden border border-[#333332]">
        {/* Cabeçalho */}
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold text-[#e5e7eb]">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl font-bold p-1"
          >
            &times;
          </button>
        </div>

        {/* Corpo Dinâmico (children) */}
        <div className="p-4 text-gray-600 text-sm">{children}</div>

        {/* Rodapé */}
        <div className="flex justify-end gap-2 p-4 border-t ">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-lg hover:bg-gray-100"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

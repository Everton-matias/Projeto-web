export default function Modal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <div className="w-full max-w-2xl rounded-3xl bg-[#0f172a] p-6 shadow-2xl ring-1 ring-white/10">
                <div className="flex items-center justify-between gap-4 pb-4">
                    <h3 className="text-xl font-bold text-white">{title}</h3>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white transition hover:bg-white/10"
                    >
                        Fechar
                    </button>
                </div>
                <div className="max-h-[60vh] overflow-y-auto">{children}</div>
            </div>
        </div>
    );
}

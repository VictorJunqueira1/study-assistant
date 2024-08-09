"use client"

const NotFound = () => {
    return (
        <div className="relative bg-black text-white h-screen flex flex-col items-center justify-center p-4 text-center overflow-hidden">
            <h1 className="absolute inset-0 flex items-center justify-center text-9xl font-bold opacity-30 transform rotate-12">
                404
            </h1>
            <div className="relative z-10">
                <p className="text-3xl font-semibold mb-4">Ops! Página não encontrada</p>
                <p className="text-lg mb-8">A página que você está procurando não existe.</p>
                <a
                    href="/"
                    className="px-8 py-4 bg-blue-700 hover:bg-blue-600 rounded-lg text-lg font-semibold text-white duration-300 transition-all"
                >
                    Voltar para a Página Inicial
                </a>
            </div>
        </div>
    );
}

export default NotFound;

import { BookText, Calculator, Cpu, Menu, NotebookPen } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Aside = () => {
    const router = useRouter();
    const { pathname } = router;

    return (
        <aside className="w-64 bg-slate-900 p-6 shadow-lg rounded-lg flex flex-col">
            <h2 className="text-2xl font-bold mb-6 text-white">Menu</h2>

            <nav>
                <ul className="space-y-4">
                    <li className='hover:scale-105 duration-300'>
                        <Link href="/" className={`flex items-center p-3 rounded-md transition-colors hover:bg-slate-700 ${pathname === '/' ? 'bg-slate-800 text-white' : 'text-gray-300'}`}>
                            <Menu className="w-6 h-6 mr-3 text-blue-500" />
                            <span className="text-lg font-medium">Início</span>
                        </Link>
                    </li>
                    <li className='hover:scale-105 duration-300'>
                        <Link href="/modules/math" className={`flex items-center p-3 rounded-md transition-colors hover:bg-slate-700 ${pathname === '/modules/math' ? 'bg-slate-800 text-white' : 'text-gray-300'}`}>
                            <Calculator className="w-6 h-6 mr-3 text-red-500" />
                            <span className="text-lg font-medium">Matemática</span>
                        </Link>
                    </li>
                    <li className='hover:scale-105 duration-300'>
                        <Link href="/modules/prog" className={`flex items-center p-3 rounded-md transition-colors hover:bg-slate-700 ${pathname === '/modules/prog' ? 'bg-slate-800 text-white' : 'text-gray-300'}`}>
                            <Cpu className="w-6 h-6 mr-3 text-blue-500" />
                            <span className="text-lg font-medium">Programação</span>
                        </Link>
                    </li>
                    <li className='hover:scale-105 duration-300'>
                        <Link href="/modules/english" className={`flex items-center p-3 rounded-md transition-colors hover:bg-slate-700 ${pathname === '/modules/english' ? 'bg-slate-800 text-white' : 'text-gray-300'}`}>
                            <BookText className="w-6 h-6 mr-3 text-green-500" />
                            <span className="text-lg font-medium">Inglês</span>
                        </Link>
                    </li>
                    <li className='hover:scale-105 duration-300'>
                        <Link href="/future-page" className={`flex items-center p-3 rounded-md transition-colors hover:bg-slate-700 ${pathname === '/some-other-page' ? 'bg-slate-800 text-white' : 'text-gray-300'}`}>
                            <NotebookPen className="w-6 h-6 mr-3 text-yellow-500" />
                            <span className="text-lg font-medium">Anotações</span>
                        </Link>
                    </li>
                </ul>
            </nav>

            <div className="mt-auto text-gray-500 text-sm text-center">
                <p>© 2024 Study Assistant. Todos os direitos reservados.</p>
            </div>
        </aside>
    );
};

export default Aside;
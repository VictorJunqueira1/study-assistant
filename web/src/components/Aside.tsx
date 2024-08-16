import React, { useState } from 'react';
import { BookText, Calculator, Cpu, NotebookPen, Menu } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Aside = () => {
    const router = useRouter();
    const { pathname } = router;
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const toggleSheet = () => {
        setIsSheetOpen(!isSheetOpen);
    };

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex lg:w-64 lg:bg-slate-900 lg:p-6 lg:shadow-lg lg:rounded-lg lg:flex-col lg:fixed lg:left-0 lg:top-0 lg:h-full z-30">
                <h2 className="text-2xl font-bold mb-6">Menu</h2>
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
                            <Link href="/future-page" className={`flex items-center p-3 rounded-md transition-colors hover:bg-slate-700 ${pathname === '/future-page' ? 'bg-slate-800 text-white' : 'text-gray-300'}`}>
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

            {/* Mobile Menu */}
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild>
                    <button
                        onClick={toggleSheet}
                        className="lg:hidden p-4 fixed top-4 left-7 z-50"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 bg-slate-900 p-6 shadow-lg rounded-lg transition-transform duration-300 flex flex-col justify-between">
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
                                <Link href="/future-page" className={`flex items-center p-3 rounded-md transition-colors hover:bg-slate-700 ${pathname === '/future-page' ? 'bg-slate-800 text-white' : 'text-gray-300'}`}>
                                    <NotebookPen className="w-6 h-6 mr-3 text-yellow-500" />
                                    <span className="text-lg font-medium">Anotações</span>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <div className="mt-auto text-gray-500 text-sm text-center">
                        <p>© 2024 Study Assistant. Todos os direitos reservados.</p>
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
};

export default Aside;
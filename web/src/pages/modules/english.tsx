import React, { useState } from 'react';
import "@/app/globals.css";
import Link from 'next/link';
import { CornerDownLeft } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const English = () => {
  const [notes, setNotes] = useState<string>('');

  const courses = [
    { name: 'Curso 1', link: '' },
    { name: 'Curso 2', link: '' },
  ];

  const topics = [
    { category: 'Tópico 1', details: ['Item 1', 'Item 2', 'Item 3'] },
    { category: 'Tópico 2', details: ['Item 1', 'Item 2', 'Item 3'] },
    { category: 'Tópico 3', details: ['Item 1', 'Item 2', 'Item 3'] },
    { category: 'Tópico 4', details: ['Item 1', 'Item 2', 'Item 3'] },
    { category: 'Tópico 5', details: ['Item 1', 'Item 2', 'Item 3'] },
  ];

  return (
    <div className="p-6 bg-slate-950 text-white min-h-screen w-full">
      <div className='mx-auto max-w-7xl'>
        <div className="flex items-center justify-between mb-14">
          <h1 className="text-2xl md:text-4xl font-bold">Olá, Inglês!</h1>
          <Link href="/" className="flex items-center gap-2 px-4 py-3 bg-slate-800 hover:bg-slate-900 rounded-md duration-200">
            <CornerDownLeft className="w-5 h-5" />
            <p className='hidden md:block text-xl'>Voltar ao Início</p>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="mb-8">
            <h2 className="text-xl md:text-3xl font-semibold mb-4">Tópicos de Inglês</h2>
            <Accordion type="single" collapsible>
              {topics.map((topic, index) => (
                <AccordionItem key={index} value={`topic-${index}`}>
                  <AccordionTrigger className="text-lg md:text-2xl font-semibold cursor-pointer">
                    {topic.category}
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="mt-2 list-disc list-inside space-y-2">
                      {topic.details.map((item, i) => (
                        <li key={i} className="flex items-center space-x-2 ml-4">
                          <input
                            type="checkbox"
                            id={`checkbox-${index}-${i}`}
                            className="w-5 h-5 accent-blue-500"
                          />
                          <label
                            htmlFor={`checkbox-${index}-${i}`}
                          >
                            {item}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Links</h2>
            <ul className="list-disc list-inside space-y-2">
              {courses.map((course, index) => (
                <li key={index}>
                  <a href={course.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                    {course.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-3xl font-semibold mb-4">Anotações</h2>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full md:w-full mb-2 h-44 flex flex-col p-4 border border-blue-900 bg-slate-900 rounded-lg resize-none focus:outline"
            placeholder="Escreva suas anotações aqui..."
          ></textarea>
          <Link href="#" className="text-blue-400 hover:underline">Ver todas as anotações</Link>
        </div>
      </div>
    </div>
  );
}

export default English;
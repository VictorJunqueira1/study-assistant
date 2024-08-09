import React, { useState } from 'react';
import "@/app/globals.css";
import Link from 'next/link';
import { CornerDownLeft } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Prog = () => {
  const [notes, setNotes] = useState<string>('');

  const courses = [
    { name: 'B7WEB', link: 'https://alunos.b7web.com.br' },
    { name: 'Curso em Vídeo', link: 'https://www.cursoemvideo.com/meus-cursos/' },
    { name: 'Udemy', link: 'https://www.udemy.com/home/my-courses/learning/' },
    { name: 'FIAP', link: 'https://on.fiap.com.br/local/nanocourses/index.php' },
  ];

  const topics = [
    { category: 'Conceitos e Práticas', details: ['MVC', 'MVVM', 'Microsserviços', 'Serverless', 'Design Patterns', 'DDD (Domain-Driven Design)', 'Clean Code', 'Clean Architecture'] },
    { category: 'Testes', details: ['TDD (Test-Driven Development)', 'BDD (Behavior-Driven Development)', 'Jest', 'Mocha'] },
    { category: 'Segurança e Performance', details: ['OAuth', 'JWT'] },
    { category: 'Servidores e Deploy', details: ['Docker', 'Kubernetes', 'Jenkins', 'CI/CD'] },
    { category: 'Roadmap Linguagens', details: ['JavaScript', 'TypeScript', 'React.js', 'Next.js', 'MySQL', 'PostgreSQL', 'MongoDB', 'Node.js', 'Express.js', 'Nest.js', 'Python', 'React Native', 'C#'] },
  ];

  const roadmapLinguagens = [
    {
      level: 1 + ` - Front-End`,
      subcategories: [
        { category: 'Fundamentos', details: ['HTML', 'CSS', 'JavaScript'] },
        { category: 'Ferramentas e Tecnologias', details: ['Git/GitHub', 'TypeScript', 'TailwindCSS'] },
        { category: 'Frameworks e Bibliotecas', details: ['ReactJS', 'NextJS'] }
      ]
    },
    {
      level: 2 + ` - Banco de Dados`,
      subcategories: [
        { category: 'Relacionais', details: ['MySQL', 'PostgreSQL'] },
        { category: 'NoSQL', details: ['MongoDB', 'Firebase'] }
      ]
    },
    {
      level: 3 + ` - Back-End e Mobile`,
      subcategories: [
        { category: 'Backend', details: ['NodeJS', 'ExpressJS', 'NestJS'] },
        { category: 'Mobile', details: ['React Native'] }
      ]
    },
    {
      level: 4 + ` - Back-End Avançado`,
      subcategories: [
        { category: 'Python', details: ['Flask', 'FastAPI', 'Django'] },
        { category: 'C#', details: ['ASP.NET Core'] }
      ]
    },
    {
      level: 5 + ` - Extras`,
      subcategories: [
        { category: 'Java', details: ['Spring', 'Kotlin'] },
        { category: 'Outras Linguagens', details: ['Golang', 'Flutter'] }
      ]
    }
  ];

  return (
    <div className="p-6 bg-slate-950 text-white min-h-screen w-full">
      <div className='mx-auto max-w-7xl'>
        <div className="flex items-center justify-between mb-14">
          <h1 className="text-2xl md:text-4xl font-bold">Olá, Programação!</h1>
          <Link href="/" className="flex items-center gap-2 px-4 py-3 bg-slate-800 hover:bg-slate-900 rounded-md duration-200">
            <CornerDownLeft className="w-5 h-5" />
            <p className='hidden md:block text-xl'>Voltar ao Início</p>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl md:text-3xl font-semibold mb-4">Tópicos de Programação</h2>
            <Accordion type="single" collapsible>
              {topics.map((topic, index) => (
                topic.category === 'Roadmap Linguagens' ? (
                  <AccordionItem key={index} value={`roadmap`}>
                    <AccordionTrigger className="text-lg md:text-2xl font-semibold cursor-pointer">
                      Roadmap Linguagens
                    </AccordionTrigger>
                    <AccordionContent>
                      {roadmapLinguagens.map((level, levelIndex) => (
                        <Accordion key={levelIndex} type="single" collapsible>
                          <AccordionItem value={`level-${level.level}`}>
                            <AccordionTrigger className="text-lg md:text-xl font-semibold cursor-pointer">
                              {level.level}
                            </AccordionTrigger>
                            <AccordionContent>
                              {level.subcategories.map((subcategory, subIndex) => (
                                <div key={subIndex} className="mb-4">
                                  <h3 className="text-lg md:text-xl font-semibold">{subcategory.category}</h3>
                                  <ul className="mt-2 list-disc list-inside space-y-2">
                                    {subcategory.details.map((item, i) => (
                                      <li key={i} className="flex items-center space-x-2 ml-4">
                                        <input
                                          type="checkbox"
                                          id={`checkbox-${level.level}-${subIndex}-${i}`}
                                          className="w-5 h-5 accent-blue-500"
                                        />
                                        <label htmlFor={`checkbox-${level.level}-${subIndex}-${i}`}>
                                          {item}
                                        </label>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                ) : (
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
                            <label htmlFor={`checkbox-${index}-${i}`}>
                              {item}
                            </label>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                )
              ))}
            </Accordion>
          </div>
          <div>
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
        <div className="mb-8 mt-8">
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

export default Prog;
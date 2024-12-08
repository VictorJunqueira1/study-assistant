export const courses = [
    {name: 'Curso em Vídeo', link: 'https://www.cursoemvideo.com/meus-cursos/'},
    {name: 'B7web', link: 'https://alunos.b7web.com.br'},
    {name: 'Udemy', link: 'https://www.udemy.com/home/my-courses/learning/'},
    {name: 'Balta.io', link: 'https://balta.io/player/assistir/5ef614da-366d-6156-d049-694800000000'},
];

export const topics = [
    {
        category: "Design de Software",
        details: [
            "Programação Orientada a Objetos (POO)",
            "Princípios SOLID",
            "Design Patterns",
            "Clean Code"
        ]
    },
    {
        category: "Arquitetura de Software",
        details: [
            "Clean Architecture",
            "Hexagonal Architecture (Ports and Adapters)",
            "Domain-Driven Design (DDD)"
        ]
    },
    {
        category: "Cloud e Virtualização",
        details: [
            "Conceitos de Cloud (IaaS, PaaS, SaaS)",
            "Containers e Docker",
            "Orquestração de Containers (Kubernetes)"
        ]
    },
    {
        category: "CI/CD e DevOps",
        details: [
            "Integração e Entrega Contínuas",
            "Automação de Builds e Testes",
            "Monitoramento e Observabilidade"
        ]
    },
    {
        category: "Testes e Qualidade",
        details: [
            "Testes Unitários e de Integração",
            "Testes End-to-End",
            "TDD (Test-Driven Development)"
        ]
    }
];

export const languagesRoadmap = [
    {
        level: 1 + ` - Front-End`,
        subcategories: [
            {category: 'Fundamentos', details: ['HTML', 'CSS', 'JavaScript']},
            {category: 'Ferramentas e Tecnologias', details: ['Git/GitHub', 'TypeScript', 'TailwindCSS']},
            {category: 'Frameworks e Bibliotecas', details: ['ReactJS', 'NextJS']}
        ]
    },
    {
        level: 2 + ` - Banco de Dados`,
        subcategories: [
            {category: 'Relacionais', details: ['MySQL', 'PostgreSQL']},
            {category: 'NoSQL', details: ['MongoDB', 'Firebase']}
        ]
    },
    {
        level: 3 + ` - Back-End`,
        subcategories: [
            {category: 'Backend', details: ['NodeJS', 'ExpressJS', 'NestJS']},
            {category: 'C#', details: ['ASP.NET Core']}
        ]
    },
];
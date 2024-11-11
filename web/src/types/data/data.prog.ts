export const courses = [
    {name: 'B7WEB', link: 'https://alunos.b7web.com.br'},
    {name: 'Curso em Vídeo', link: 'https://www.cursoemvideo.com/meus-cursos/'},
    {name: 'Udemy', link: 'https://www.udemy.com/home/my-courses/learning/'},
    {name: 'FIAP', link: 'https://on.fiap.com.br/local/nanocourses/index.php'},
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
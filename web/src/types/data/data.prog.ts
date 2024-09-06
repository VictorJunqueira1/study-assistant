export const courses = [
    { name: 'B7WEB', link: 'https://alunos.b7web.com.br' },
    { name: 'Curso em Vídeo', link: 'https://www.cursoemvideo.com/meus-cursos/' },
    { name: 'Udemy', link: 'https://www.udemy.com/home/my-courses/learning/' },
    { name: 'FIAP', link: 'https://on.fiap.com.br/local/nanocourses/index.php' },
];

export const topics = [
    { category: 'Conceitos e Práticas', details: ['MVC', 'MVVM', 'Microsserviços', 'Serverless', 'Design Patterns', 'DDD (Domain-Driven Design)', 'Clean Code', 'Clean Architecture'] },
    { category: 'Testes', details: ['TDD (Test-Driven Development)', 'BDD (Behavior-Driven Development)', 'Jest', 'Mocha'] },
    { category: 'Segurança e Performance', details: ['OAuth', 'JWT'] },
    { category: 'Servidores e Deploy', details: ['Docker', 'Kubernetes', 'Jenkins', 'CI/CD'] },
];

export const languagesRoadmap = [
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
            { category: 'Golang', details: ['Gin', 'Beego'] }
        ]
    }
];
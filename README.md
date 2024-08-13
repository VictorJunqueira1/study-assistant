# Study Assistant

**Study Assistant** é um sistema web pessoal desenvolvido para ajudar a organizar e gerenciar seus estudos em múltiplas áreas, como Programação, Matemática e Inglês. O sistema permite que você tenha uma visão consolidada do seu progresso, faça anotações digitais e acesse rapidamente seus cursos.

## Sumário

1. [Visão Geral](#visão-geral)
2. [Funcionalidades](#funcionalidades)
3. [Tecnologias Utilizadas](#tecnologias-utilizadas)
4. [Uso do Sistema](#uso-do-sistema)
5. [Licença](#licença)
6. **[English Version](README.en.md)**

---

## Visão Geral

**Study Assistant** é desenvolvido usando um conjunto de tecnologias modernas para fornecer uma interface amigável e funcional para gerenciar seu aprendizado. O sistema tem três principais áreas:

- **Roadmap**: Visualize e planeje seu progresso de estudo.
- **Cursos**: Links diretos para acessar seus cursos e materiais de aprendizado.
- **Anotações**: Mantenha e organize suas notas digitais de forma eficiente.

## Funcionalidades

- **Área de Roadmap**: Planeje e acompanhe seu progresso em Programação, Matemática e Inglês.
- **Links para Cursos**: Acesse rapidamente seus cursos através de links integrados na barra de navegação.
- **Sistema de Anotações**: Faça e gerencie anotações digitais de forma prática e organizada.
- **Interface Responsiva**: Design adaptável para diferentes tamanhos de tela, garantindo uma experiência de usuário consistente.

## Tecnologias Utilizadas

- **Next.js**: Framework React para desenvolvimento de aplicações web com renderização no lado do servidor e geração de sites estáticos.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática para melhorar a robustez do código.
- **Tailwind CSS**: Framework de CSS utilitário para um design responsivo e estilizado.
- **ShadCN**: Biblioteca de componentes para criar interfaces modernas.
- **Zod**: Biblioteca para validação de esquemas e tipos.
- **Lucide React**: Conjunto de ícones SVG para React.
- **Firebase**: Plataforma de desenvolvimento que fornece serviços como autenticação, banco de dados em tempo real e armazenamento de arquivos.
- **Firebase Authentication**: Serviço para gerenciar autenticação de usuários com suporte a login via email/senha, redes sociais e mais.
- **Firebase Realtime Database**: Banco de dados NoSQL que permite armazenar e sincronizar dados entre usuários em tempo real.

## Uso do Sistema

1. **Autenticação**: Ao acessar o sistema, precisará fazer login. O usuário recebe um token que expira diariamente, portanto, será necessário logar novamente a cada dia. O formulário de login é validado usando a biblioteca Zod para garantir dados corretos e seguros.

2. **Área de Estudos**: Após acessar o sistema, você encontrará a página principal com opções para estudar **Matemática**, **Programação** ou **Inglês**.

3. **Navegação na Área de Estudo**:
   - **Roadmap**: Em cada área de estudo, visualize um roadmap com checklists para acompanhar o que já foi estudado. Marcando os itens conforme avança nos estudos.
   - **Links para Cursos**: Acesse os links dos cursos diretamente na página da área de estudo selecionada.
   - **Anotações**: No final da página de cada área, adicione e organize suas anotações. As anotações são armazenadas e podem ser revisadas quando necessário.

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

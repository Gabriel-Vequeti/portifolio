# Funcionalidades

Implementar na ordem de prioridade abaixo, uma por vez, testando cada etapa antes de avançar.

1. **Menu fixo com links para as seções**
   - Menu de navegação fixo, com acesso a Sobre mim, Projetos e Contato.
   - Usar menu de três traços (hambúrguer), inspirado na referência CartoonEast.
   - O menu deve abrir e fechar corretamente, funcionar em computador e celular e permitir navegação por teclado.
   - Animar discretamente os nomes das seções ao passar o mouse ou receber foco.

2. **Seção “Sobre mim” com foto e texto**
   - Apresentar o texto e as informações de `identidade.md`.
   - Incluir espaço para foto pessoal. Como ainda não forneci uma foto, deixar um placeholder fácil de substituir.
   - Destacar conhecimentos em informática, programação, HTML e CSS, redes de computadores, Linux, atendimento ao cliente e metodologias ágeis.

3. **Galeria de projetos com imagem, título e link**
   - Criar galeria visual de projetos.
   - Incluir “Do Zero ao Milhão”, com imagem/captura do projeto, título, breve descrição e link informado em `identidade.md`.
   - Incluir dois espaços para projetos em desenvolvimento, sem inventar nome, descrição ou link.
   - Usar capturas próprias ou imagens com licença adequada.

4. **Animação suave ao rolar a página**
   - Revelar progressivamente os tópicos/seções conforme a rolagem, inspirado em CartoonEast.
   - Manter animações leves, sem atrasar a leitura.
   - Respeitar a configuração `prefers-reduced-motion` e garantir que o conteúdo continue acessível sem animações.

5. **Formulário de contato (sem backend, só validação)**
   - Criar formulário com campos de nome, e-mail e mensagem.
   - Validar os campos no navegador e mostrar mensagens de erro/sucesso de validação.
   - Como não haverá backend, não afirmar que a mensagem foi enviada para um servidor. Informar isso claramente e oferecer abertura do aplicativo de e-mail (`mailto:`) para o usuário concluir o envio.
   - Também mostrar links diretos para WhatsApp, Instagram, e-mail e GitHub.

6. **Modo claro/escuro**
   - Adicionar controle funcional para alternar entre modo claro e modo escuro.
   - Manter legibilidade, contraste e consistência da identidade visual nos dois temas.
   - Se possível, respeitar a preferência de tema do dispositivo na primeira visita e permitir que o usuário alterne manualmente.

## Detalhes visuais complementares
- Aplicar mudanças sutis de cor em links, botões, cards e itens do menu ao passar o mouse.
- Adicionar efeito discreto de pequenos pontos/rastro seguindo o cursor, inspirado em Sandeep Kumar.
- Desativar ou simplificar o efeito em dispositivos com tela touch e quando movimento reduzido estiver ativado.
- Criar hero inicial com meu nome em destaque, frase de apresentação e botão que leve aos projetos.
- Criar footer simples, com meu nome e atalhos de contato; não incluir vídeo.
- Usar a paleta e as fontes especificadas em `identidade.md`.

## Responsividade e qualidade
- Garantir boa apresentação em celular, tablet e computador.
- Garantir foco visível, contraste adequado, navegação por teclado e textos alternativos para imagens.
- Testar menu, links, formulário, alternância de tema, animações e layout em diferentes tamanhos de tela.
- Não remover funcionalidades existentes ao corrigir problemas.

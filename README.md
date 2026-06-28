# 🎭 Automação de API com Playwright

## 💻 Sobre o projeto
Este repositório contém o projeto de automação de testes de API para a aplicação **Restful-Booker**, uma API pública de gerenciamento de reservas de hotel. O objetivo deste projeto é garantir a qualidade, estabilidade e o funcionamento correto dos endpoints principais da aplicação.

## 🤖 IA e Automação Eficiente (MCP)
Neste projeto, integrei o **MCP (Model Context Protocol) do Playwright** com inteligência artificial para otimizar o ciclo de testes:
- **Criação de Casos de Teste:** Após a criação de duas rotas manualmente, foi utilizada a IA para criar os demais casos utilizando o padrão utilizado nas rotas feitas manualmente. Após a geração dos testes pela IA, os mesmos foram avaliados e refinados se necessário.

## 🛠️ Tecnologias Utilizadas
Neste projeto, utilizamos as seguintes ferramentas:
- **[Node.js](https://nodejs.org/en/)**
- **[Playwright](https://playwright.dev/)**  
- **Padrão de Projeto: Request Objects / API Client Pattern**
- **MCP (Model Context Protocol) do Playwright**

## 🌐 Ambiente de Testes

🔗 **Site da API:** [Restful-Booker API Doc](https://restful-booker.herokuapp.com/apidoc/index.html)

## 📝 Planejamento e Casos de Teste Mapeados

### - Autenticação
* **Caso de teste Autenticação 1** – Autenticação com sucesso com credenciais válidas (smoke)
* **Caso de teste Autenticação 2** – Validações de campos obrigatórios na autenticação (usando matriz de dados)

###  – Buscar reserva
* **Caso de teste Busca 1** – Busca de reserva com sucesso (smoke)
* **Caso de teste Busca 2** – Busca de reserva inexistente
* **Caso de teste Busca 3** – Busca de reserva passando ID com caracteres especiais
* **Caso de teste Busca 4** – Busca de reserva passando ID com número inválido (negativo)

###  – Criar reserva
* **Caso de teste Cadastro 1** – Criar reserva com sucesso (smoke)
* **Caso de teste Cadastro 2** – Criar reserva passando payload vazio
* **Caso de teste Cadastro 3** – Validações de campos e tipos de dados no cadastro (usando matriz de dados)

### - Atualizar reserva completa
* **Caso de teste Atualização Completa 1** – Atualizar reserva completa com sucesso (smoke)
* **Caso de teste Atualização Completa 2** – Tentar atualizar reserva inexistente
* **Caso de teste Atualização Completa 3** – Tentar atualizar reserva com payload vazio
* **Caso de teste Atualização Completa 4** – Validar rejeição de atualização sem token válido 

###  – Deletar reserva
* **Caso de teste Exclusão 1** – Deletar reserva com sucesso (smoke)
* **Caso de teste Exclusão 2** – Tentar deletar reserva já excluída
* **Caso de teste Exclusão 3** – Tentar deletar reserva inexistente
* **Caso de teste Exclusão 4** – Validar rejeição de exclusão sem token válido

  ---
  
## ⚙️ Integração Contínua (CI/CD)

O projeto possui uma esteira automatizada de integração contínua implementada com **GitHub Actions**:

- **Gatilho:** A esteira é disparada automaticamente a cada evento de `push` realizado na branch `master`.
- **Ação:** O pipeline executa os testes **Smoke** 
- **Armazenamento:** O relatório é armazenado como artifact no GitHub por **30 dias**, permitindo análise dos resultados mesmo após a conclusão do pipeline.

  
## 🛠️ Como Executar os Testes Localmente

### Pré-requisitos: Node.js (versão 18 ou superior recomendada)

### Passo a Passo (Configuração e Execução)
```bash
git clone https://github.com/matheuszanellasma/automacao-api-playwright.git
cd automacao-api-playwright
npm install
npx playwright install
npx playwright test --ui
```

## 👤 Autor

* **Matheus Koehler Zanella** - Quality Assurance Engineer

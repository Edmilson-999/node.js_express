File API com Express.js
Este projeto é uma API simples criada com Node.js e Express que permite ler e escrever arquivos JSON no servidor, além de realizar uma leitura de baixo nível utilizando fs.read.
Funcionalidades
•	 Leitura de um arquivo JSON (data.json)
•	 Escrita de conteúdo em data.json
•	Leitura binária de um arquivo texto (example.txt) com buffer
Tecnologias Utilizadas
•	Node.js
•	Express
•	File System (fs)
•	Path
________________________________________
Estrutura do Projeto
├── server.js          # Código principal da aplicação
├── data.json          # Arquivo de dados (criado automaticamente)
├── example.txt        # Arquivo de texto para testes
├── README.md          # Este arquivo
└── package.json       # Configurações do projeto
|__ package.log.json
________________________________________
Como Executar
1.	Clone o repositório:
  git clone https://github.com/seu-usuario/seu-repositorio.git
  cd seu-repositorio
2.	Instale as dependências:
  npm install express
3.	Inicie o servidor:
  node server.js
4.	Acesse a API:
  http://localhost:3000
________________________________________
 Rotas Disponíveis
  GET /read-file
Lê o conteúdo de data.json. Se o arquivo não existir, ele é criado com um array vazio.
Resposta de sucesso:
  {
    "success": true,
    "content": [ /* conteúdo do arquivo */ ]
  }
________________________________________
POST /write-file
Escreve um conteúdo fornecido no corpo da requisição para o data.json.
Exemplo de corpo (JSON****):
  {
    "content": [
      { "id": 1, "nome": "Exemplo" }
      
    ]
  }
Resposta de sucesso:
  {
    "success": true,
    "message": "Arquivo salvo com sucesso"
  }
________________________________________
GET /read-bytes
Lê o conteúdo do arquivo example.txt em formato binário com um Buffer.
Resposta de sucesso:
  {
    "success": true,
    "content": "Conteúdo do arquivo como string"
  }
________________________________________
 Observações
•	O arquivo example.txt deve existir no diretório raiz para que a rota /read-bytes funcione corretamente.
•	A API trabalha com dados em formato JSON.


Autor
Edmilson Alves	


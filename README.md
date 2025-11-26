# Trabalho Back-end: API RESTful

Este projeto consiste em uma API RESTful containerizada com Docker, documentada via Swagger e protegida por autenticação via token.

## 🚀 Como Executar

Para subir o projeto e todas as suas dependências, execute o comando abaixo na raiz do diretório:

```bash
docker-compose up --build

* **📖 Documentação (Swagger UI)**
Após iniciar o container, a documentação interativa da API estará disponível. Utilize-a para testar as requisições.

URL: http://localhost:3000/docs

* **🔐 Autenticação e Segurança**
Os endpoints que utilizam os métodos POST, PUT e DELETE são protegidos e requerem um token de autenticação para serem acessados.

* **1. Obter Token (Login)**
Para conseguir o token de acesso, utilize a rota /login com as seguintes credenciais padrão:

{
  "name": "usuario@teste",
  "password": "123456"
}

* **2. Autorizar no Swagger**
Copie o token retornado na resposta do login.

No Swagger UI, clique no botão Authorize (no canto superior direito).

Insira o token (geralmente precedido por Bearer se necessário, ou apenas o token conforme sua configuração).

Clique em Authorize novamente.

✅ Pronto! Agora você terá permissão para testar todos os endpoints da API.


## 👨‍💻 Desenvolvedores

* **Letícia Melo** - *2324291012* 
* **Matheus Santos** - *2324291037*
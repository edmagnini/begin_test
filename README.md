# Begin Donation Books System

## Primeiros Passos

* Clonar este repositório
* Executar `npm install` para adicionar as dependências
* Criar um arquivo .env na raiz do projeto e preencher as chaves a seguir com os valores apropriados:
   ```
   DATABASE_URL=

   JWT_KEY =
   JWT_EXPIRES_IN = 

   BCRYPT_COST =

   NODEMAILER_USER =
   NODEMAILER_PASS =
   ```

* Executar `npx prisma migrate dev` para adicionar as tabelas ao banco de dados e nomear a migration (em caso de sucesso, o servidor já estará pronto para receber requisições)

## Sobre o projeto

API que representa o sistema de doação de livros.

Possui 3 entidades importantes:

Institution

Administrator

Book

As funcionalidades são:

→ Criar instituição;

→ Criar administrador;

→ Criar livro;

→ Receber as informações de todas instituição e seu respectivo acervo;

→ Receber as informações de uma instituição e seu acervo;

→ Ativar conta de administrador;

→ Logar conta de administrador;

→ Editar conta de administrador;

→ Confirmar alteração de e-mail de conta de administrador;

→ Deletar conta de administrador;

→ Editar livro;

→ Doar livro;

→ Adicionar quantidade de livro ao acervo;

📋 Documentação:
https://documenter.getpostman.com/view/18385426/UVsJy7ft

🛠️ Tecnologias utilizadas:

→ PostgreSQL;

→ Express;

→ ORM Prisma;

→ Node.js:

→ Typescript;

→ Dotenv;

→ Cors;

→ BCRYPT;

→ Nodemailer;

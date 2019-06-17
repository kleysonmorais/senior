# Senior - Desafio Concluído!

Desafio Fábrica de Software - Programador de Sistemas Fullstack - BPM
:grinning: :computer: :office:

## Aplicação Web

O desafio se baseia em construir uma Aplicação de fluxo de aprovação para compra de
material de escritório.

## Instalação

A aplicação foi desenvolvida utilizando Angular 8 no Front-end e Node.js no Back-end. A seguir instruções de como executar a aplicação.

### Ambiente de Desenvolvimento

- Instale o ambiente [Node.js](https://nodejs.org/en/);
    - Você pode verificar se a instalação foi bem sucedida com `node -v` e `npm -v` ;
- Instale o banco [MySQL](https://www.mysql.com/);
- Dentro do ambiente do node, instale o [Angular Cli](https://cli.angular.io/) com: `npm install -g @angular/cli` e para verificar se a instalação foi bem sucedida, execute `ng --version` .

## Instalação do Projeto

- Clone ou baixe este repositório;
- Inicialize dois ambientes de **linha de comando** no root da pasta `senior` ;
- Realize a instalação das dependências, em cada ambiente iniciado, atente-se em executar o comando dentro das pastas `client` e `server`:

    ```bash
    $Bash1
    cd client
    npm install
    ```

    ```bash
    $Bash2
    cd server
    npm install
    ```
### Banco de dados

- Inicialize seu ambiente MySQL e crie o banco **senior** rodando o comando:

    ```sql
    CREATE DATABASE senior;
    ```

#### Conectando Projeto ao Banco
- Para configurar o projeto com o seu banco criado, basta editar o arquivo [knexfile.js](https://github.com/Kleysonb/senior/blob/master/server/knexfile.js), localizado na raiz da pasta **server**;
    - Edite com seu host, user, password e database;

        ```javascript
        connection: {
            host : '127.0.0.1',
            user: 'root',
            password: 'administrador',
            database: 'senior'
        }
        ```
- Esta configuração já será suficiente para a criação automática das tabelas, quando a aplicação for iniciada.

## Executando a Aplicação

- Utilizando os mesmos ambientes de **linha de comando** inicializados, execute os seguintes comandos para rodar a aplicação:

    ```bash
    $Bash1
    ng serve --open
    ```

    ```bash
    $Bash2
    npm start
    ```
- A configuração padrão irá executar o [Front-end](http://localhost:4200) na porta 4200 e o Back-end na porta 3000.

## Minificação de Arquivos

- Os arquivos foram minificados utilizando o próprio **Angular Cli**, os mesmos estão localizados na pasta **client\dist\client**. Dessa forma, evitou-se criar as pastas css e js isoladas para não gerar nenhum tipo de conflito de caminho relativo.

## Material Complementar

- [Angular Cli](https://cli.angular.io/)
- [Angular Material](https://material.angular.io/)
- [Angular Bootstrap](https://ng-bootstrap.github.io/#/home)
- [Bootstrap](https://getbootstrap.com/)
- [MySQL](https://www.mysql.com/)
- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)

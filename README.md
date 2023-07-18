Documentação da Aplicação

BeerController

O BeerController é responsável por lidar com as requisições relacionadas a cervejas. Ele contém os seguintes métodos:

findBeer: 

async findBeer(req, res)
Este método é responsável por buscar todas as cervejas existentes no banco de dados. Ele utiliza o Knex, um construtor de consultas SQL, para selecionar todas as cervejas da tabela Beers. O resultado é retornado como uma resposta JSON.

insertBeer:

async insertBeer(req, res)
Este método é responsável por inserir uma nova cerveja no banco de dados. Ele recebe os dados da cerveja a ser inserida através do corpo da requisição (req.body) e utiliza o Knex para realizar a inserção na tabela Beers. Caso a inserção seja bem-sucedida, retorna uma resposta com status 200 e uma mensagem informando que a cerveja foi inserida. Caso contrário, retorna uma resposta com status 400 e uma mensagem informando que a cerveja não pôde ser inserida.

updateBeer

async updateBeer(req, res)
Este método é responsável por atualizar uma cerveja existente no banco de dados. Ele recebe o ID da cerveja a ser atualizada através dos parâmetros da URL (req.params.id) e os novos dados da cerveja através do corpo da requisição (req.body). Utilizando o Knex, ele busca a cerveja pelo ID na tabela Beers e realiza a atualização dos dados. Se a cerveja for encontrada e a atualização for bem-sucedida, retorna uma resposta com status 200 e uma mensagem informando que a cerveja foi atualizada. Caso contrário, retorna uma resposta com status 400 e uma mensagem informando que a cerveja não existe.

deleteBeer

async deleteBeer(req, res)
Este método é responsável por excluir uma cerveja do banco de dados. Ele recebe o ID da cerveja a ser excluída através dos parâmetros da URL (req.params.id). Utilizando o Knex, ele busca a cerveja pelo ID na tabela Beers e a remove. Se a cerveja for encontrada e a exclusão for bem-sucedida, retorna uma resposta com status 200 e uma mensagem informando que a cerveja foi excluída. Caso contrário, retorna uma resposta com status 400 e uma mensagem informando que a cerveja não existe.

findBeerStyleByTemperature

async findBeerStyleByTemperature(req, res)
Este método é responsável por buscar um estilo de cerveja com base em uma temperatura fornecida. Ele recebe a temperatura desejada através do corpo da requisição (req.body). Utilizando o Knex, ele busca todas as cervejas na tabela Beers e encontra o estilo de cerveja mais próximo da temperatura fornecida. Se houver mais de um estilo com a mesma proximidade, eles são ordenados alfabeticamente. Em seguida, é feita uma integração com o Spotify para buscar uma playlist relacionada ao estilo de cerveja encontrado. Se uma playlist válida for encontrada, retorna as informações do estilo de cerveja e da playlist como resposta JSON. Caso contrário, retorna uma resposta com status 404 e uma mensagem informando que não foi encontrada uma playlist para o estilo de cerveja.

Roteamento
beer.routes.js
Este arquivo é responsável por definir as rotas relacionadas às cervejas. Ele utiliza o framework Express para criar um objeto de roteamento (router) e associa cada rota a um método do BeerController. As rotas definidas são:

GET /seeAll - Rota para buscar todas as cervejas. Chama o método findBeer do BeerController.
POST /create - Rota para inserir uma nova cerveja. Chama o método insertBeer do BeerController.
PUT /update/:id - Rota para atualizar uma cerveja existente. Chama o método updateBeer do BeerController.
DELETE /delete/:id - Rota para excluir uma cerveja. Chama o método deleteBeer do BeerController.
POST /findBeer - Rota para buscar um estilo de cerveja com base na temperatura. Chama o método findBeerStyleByTemperature do BeerController.

Frameworks

Knex:
O Knex é um construtor de consultas SQL para Node.js. Ele simplifica a interação com o banco de dados, permitindo a criação de consultas de forma mais legível e oferecendo recursos como seleção, inserção, atualização e exclusão de dados. No código fornecido, o Knex é utilizado para realizar as consultas ao banco de dados, buscando, inserindo, atualizando e excluindo cervejas na tabela "Beers". A escolha do Knex em vez do tradicional Sequelize foi pela simplicidade, pois com o Knex é possível trocar o banco de dados de MySQL para SQL Server apenas trocando o driver, pois todas as queries estão em JavaScript. Caso seja necessário performance, é possível criar no banco de dados algumas views e stored procedures para retornar os dados mais rapidamente, como qualquer outro ORM.

Express:
O Express é um framework web rápido e minimalista para Node.js. Ele fornece uma estrutura para o desenvolvimento de aplicativos web e APIs RESTful, simplificando o roteamento, o tratamento de requisições e respostas, e a implementação de middlewares. No código fornecido, o Express é utilizado para definir as rotas relacionadas às cervejas, mapeando as requisições HTTP para os métodos correspondentes do BeerController.

Spotify Web API Node:
O Spotify Web API Node é um pacote que permite interagir com a API Web do Spotify em aplicativos Node.js. Ele fornece métodos para autenticação, pesquisa de playlists, obtenção de informações de músicas e muito mais. No código fornecido, é utilizado para buscar playlists relacionadas a estilos de cerveja no método findBeerStyleByTemperature do BeerController. É necessário fornecer um Client ID e Client Secret válidos do Spotify na configuração do pacote para obter acesso à API.

dotenv:
O dotenv é um pacote que permite carregar variáveis de ambiente de um arquivo .env no ambiente de execução do Node.js. Ele simplifica a configuração de variáveis de ambiente, como chaves de API e senhas de acesso a bancos de dados, entre outros. No código fornecido, o pacote dotenv é utilizado para carregar as variáveis de ambiente do arquivo .env e torná-las disponíveis no aplicativo. Isso é feito através da linha require('dotenv').config(), que carrega as variáveis definidas no arquivo .env no ambiente de execução do Node.js.

nodemon:
O nodemon é uma ferramenta de desenvolvimento que monitora as alterações nos arquivos do projeto e reinicia automaticamente o servidor Node.js quando detecta alguma alteração. No arquivo package.json, é definido um script chamado "dev" que utiliza o nodemon para iniciar o servidor em modo de desenvolvimento. Isso facilita o desenvolvimento, pois você não precisa reiniciar manualmente o servidor a cada alteração no código.

Diagrama conceitual:

![image](https://github.com/ygorxds/BEER-CHALLANGE/assets/80071063/399a0b8d-5e46-4f5f-8e7a-8f8ad734d66d)

Como iniciar o projeto?

Passo 1: Instale o Node no seu computador
Passo 2: Clone esse repositório na sua maquina
Passo 3: Abra a pasta raiz do projeto
Passo 4: Execute o comando "npm install"
Passo 5: Execute o comando "npm test" para executar o teste automatizado com o Jest
Passo 6: Execute o comando "npm run dev" para iniciar o projeto com o Nodemon

Como fazer o deploy da aplicação?

Passo 1: Crie uma conta na Google Cloud Platform.
Passo 2: Acesso o console de desenvolvedor da GCP.
Passo 3: Crie um novo projeto na GCP e dê um nome e selecione a região mais barata
Passo 4: Abra o Cloud Shell no console da GCP,  O Cloud Shell é uma máquina virtual com as ferramentas necessárias para gerenciar e implantar seus recursos na GCP.
Passo 5: Certifique-se de ter o código do backend em uma pasta localmente.
Passo 6: No Cloud Shell, use o comando cd para navegar até o diretório do seu projeto.
Passo 7:Execute o comando gcloud init para inicializar o SDK da GCP e configurar o projeto.
Passo 8: Execute o comando gcloud init para inicializar o SDK da GCP e configurar o projeto.
passo 9: No arquivo package.json, verifique se o campo "main" está apontando corretamente para o arquivo de entrada do aplicativo (src/context.js).
Passo 10: No Cloud Shell, execute o comando gcloud app deploy para implantar o aplicativo no App Engine da GCP.
Passo 11: Aguarde o processo de implantação ser concluído. Isso pode levar alguns minutos.
Passo 12: Após a implantação bem-sucedida, você receberá um URL para acessar o backend implantado na GCP.

O banco de dados Já está na Nuvem da Railway.


PRINTS DO FUNCIONAMENTO:

LISTANDO TODAS AS CERVEJAS
![image](https://github.com/ygorxds/BEER-CHALLANGE/assets/80071063/b85dbcad-dc39-4cbf-b117-b5bdda3c76da)

CRIANDO CERVEJA: 
![image](https://github.com/ygorxds/BEER-CHALLANGE/assets/80071063/0657eb7c-a684-44c1-84d7-2d91fdcaf322)

ATUALIZANDO CERVEJA:
![image](https://github.com/ygorxds/BEER-CHALLANGE/assets/80071063/e9e0ef08-0222-45fb-853a-054d571e13e1)

DELETANDO CERVEJA:
![image](https://github.com/ygorxds/BEER-CHALLANGE/assets/80071063/4d61dc06-a351-4971-98ce-2570e5fd31c6)

ENVIANDO TEMPERATURA E RECEBENDO A CERVEJA E A PLAYLIST:
![image](https://github.com/ygorxds/BEER-CHALLANGE/assets/80071063/410baa93-5f86-4842-99ab-d86d97186fe2)










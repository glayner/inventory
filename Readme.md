# Inventory
![Javascript Badge](https://img.shields.io/badge/-Javascript-yellow?style=flat&logo=javascript&logoColor=black)
![React Native Badge](https://img.shields.io/badge/-React_Native-silver?&style=flat&logo=react&logoColor=61DAFB)
![Node.js Badge](https://img.shields.io/badge/-Node.js-339933?style=flat&logo=node.js&logoColor=white)

> Projeto Integrado para Desenvolvimento de Aplicações
> UniProjeçãoEAD

Um dos grandes desafio que as empresas enfrentam é a gestão do estoque. Nessa nossa nova realidade de pandemia, muitas pessoas começaram a empreender em pequenos negócios em casa. Ter um controle adequado de estoque é essencial para o sucesso de seu negócio. Um gerenciamento ineficiente do estoque pode afetar todas as áreas da empresa.
Existem duas técnicas principais de controle de estoque FIFO ou LIFO, nesse sistema iremos utilizar a técnica FIFO conhecida também como PEPS para auxiliar os empreenderes a terem um melhor controle de seu estoque.

## Como inicar o projeto
após clonar o projeto na sua maquina entre nas pastas backend e frontend e instale as dependencias em ambos.
```
cd ./backend

yarn

cd ../frontend

yarn

cd ..
```
depois de instaladas as dependencias inicie a api.
```
cd ./backend

yarn dev:server
```
abra um novo terminal e entre na pasta frontend do projeto para inicia-lo
```
cd ./frontend

yarn web
```
### Base de dados:
categories:
| column |type   |
|---|---|
|  id | UUID  |
|  description |  varchar |
|  created_at | timestamp  |
| updated_at | timestamp |

products:
| column |type   |
|---|---|
|  id | UUID  |
|  description |  varchar |
|  category_id |  UUID |
|  created_at | timestamp  |
| updated_at | timestamp |

transactions:
| column |type   |
|---|---|
|  id | UUID  |
|  date |  timestamp |
| purchased_qnt | numeric|
| purchased_unt | numeric|
| purchased_amt | numeric|
| sold_qnt | numeric|
| sold_unt | numeric|
| sold_amt | numeric|
| balance_qnt | numeric|
| balance_unt | numeric|
| balance_amt | numeric|
|  product_id |  UUID |
|  created_at | timestamp  |
| updated_at | timestamp |

### Funcionalidades:
##### Backend:
- [x] Crud de categoria
- [x] Crud de produto
- [x] Inserção de nova compra de produto
- [x] Inserção de nova venda de produto
- [x] Listagem tabela PEPS por produto

##### Frontend:
- [x] Tela de listagem das categorias
- [x] Tela de criação da categoria
- [x] Tela de alteração da categoria
- [x] Tela de listagem dos produtos por categoria
- [x] Tela de criação do produto
- [x] Tela de alteração do produto
- [x] Tela de inserção de compra do produto
- [x] Tela de inserção de venda do produto
- [x] Tela de listagem das transações modelo PEPS do produto


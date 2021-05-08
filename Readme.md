# Inventory
![Javascript Badge](https://img.shields.io/badge/-Javascript-yellow?style=flat&logo=javascript&logoColor=black)
![React Native Badge](https://img.shields.io/badge/-React_Native-silver?&style=flat&logo=react&logoColor=61DAFB)
![Node.js Badge](https://img.shields.io/badge/-Node.js-339933?style=flat&logo=node.js&logoColor=white)

> Projeto Integrado para Desenvolvimento de Aplicações
> UniProjeçãoEAD

Um dos grandes desafio que as empresas enfrentam é a gestão do estoque. Nessa nossa nova realidade de pandemia, muitas pessoas começaram a empreender em pequenos negócios em casa. Ter um controle adequado de estoque é essencial para o sucesso de seu negócio. Um gerenciamento ineficiente do estoque pode afetar todas as áreas da empresa.
Existem duas técnicas principais de controle de estoque FIFO ou LIFO, nesse sistema iremos utilizar a técnica FIFO conhecida também como PEPS para auxiliar os empreenderes a terem um melhor controle de seu estoque.

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
[ ] Crud de categoria
[ ] Crud de produto
[ ] Inserção de nova compra de produto
[ ] Inserção de nova venda de produto
[ ] Listagem tabela PEPS por produto

##### Frontend:
[ ] Tela de categorias
[ ] Tela de produtos por categoria
[ ] Tela de inserção de compra do produto
[ ] Tela de inserção de venda do produto
[ ] Tela de tabela PEPS do produto

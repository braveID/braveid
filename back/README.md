## Como rodar?

1. Rode `mongod` em um terminal de comando para inicializar o MongoDB
2. Rode `npm run start` ou `yarn start` neste diretório para inicializar a API

## Banco de Dados

Caso queira inspecionar o database, abra uma shell do mongo (`mongo --shell`) e:
1. `use gamer-id`
2. `db.NOME_DA_COLLECTION.QUERY_DO_MONGO'

Ex: `db.user.find()`
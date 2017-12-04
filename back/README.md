## Como rodar?

1. Rode `mongod` em um terminal de comando para inicializar o MongoDB
2. Rode `npm run start` ou `yarn start` neste diretório para inicializar a API

## Banco de Dados

Caso queira inspecionar o database, abra uma shell do mongo (`mongo --shell`) e:
1. `use gamer-id`
2. `db.NOME_DA_COLLECTION.QUERY_DO_MONGO'

Ex: `db.user.find()`

Criação de usuários testes no mongo:
```
db.user.insert({ "_id": "32d0wkan", "facebook_id": "123", "username": "Marcelo", "real_name": "Marcelo Prado", "profile_pic": "http://teste.com.br" })
db.user.insert({ "_id": "j2d0lcdv", "facebook_id": "345", "username": "Daniel", "real_name": "Daniel Ruhman", "profile_pic": "http://ruhnan.com.br" })
db.user.insert({ "_id": "00239dmq", "facebook_id": "999", "username": "Frederico", "real_name": "Fred Curti", "profile_pic": "http://fred.com.br" })
```
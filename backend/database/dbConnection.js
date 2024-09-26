const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'api5';

let dbInstance = null; // VARIAVEL ARMAZENAMENTO ESTÂNCI DO BANCO INICIA VAZIA

const connectToDatabase = async () => {
    if (dbInstance) {
        return dbInstance; // CASO HAJA ALGUMA ESTÂNCIA RETORNA A ATUAL.
    }

    try {
        const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log('Conectado ao MongoDB');
        dbInstance = client.db(dbName);
        return dbInstance;
    } catch (error) {
        throw new Error('Erro ao conectar ao MongoDB: ' + error.message);
    }
};

module.exports = connectToDatabase;

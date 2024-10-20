const { MongoClient, ServerApiVersion } = require('mongodb');

/*
const url = 'mongodb://localhost:27017'; // ENDEREÇO DEFAULT DO BANCO DE DADOS MONGODB

const connectToDatabase = async () => {
    if (dbInstance) {
        return dbInstance; // CASO HAJA ALGUMA ESTÂNCIA RETORNA A ATUAL.
        }
        
        try {
            let dbInstance = null; // VARIAVEL ARMAZENAMENTO ESTÂNCI DO BANCO INICIA VAZIA
        const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log('Conectado ao MongoDB');
        dbInstance = client.db(dbName);
        return dbInstance;
    } catch (error) {
        throw new Error('Erro ao conectar ao MongoDB: ' + error.message);
    }
};

*/

const dbName = 'api5';

const uri = "mongodb+srv://fatec:fatec@fullstack.pt0hp.mongodb.net/?retryWrites=true&w=majority&appName=fullstack";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
const connectToDatabase = async function()  {
  try {

    let dbInstance = null; // VARIAVEL ARMAZENAMENTO ESTÂNCI DO BANCO INICIA VAZIA
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("api5").command({ ping: 1 });
    console.log("Pinged api5. You successfully connected to MongoDB!");

    dbInstance = client.db(dbName);
    return dbInstance;

  } catch (error) {
    throw new Error('Erro ao conectar ao MongoDB: ' + error.message);

  } 
}
connectToDatabase().catch(console.dir);




module.exports = connectToDatabase;

const connectToDatabase = require('../database/dbConnection');

exports.login = async (email, password) => {
    try {
        const db = await connectToDatabase();
        
        // AGUARDA USUARIO
        const user = await db.collection('usuarios').findOne({ email_usuario: email });
        
        // SE USUARIO NÃO EXISTIR OU FOR NULO RETORNA NULL
        if (!user || user.senha_usuario !== password) {
            return null;
        }

        // RETORNO DOS DADOS
        return {
            id: user._id,
            nome_usuario: user.nome_usuario,
            email_usuario: user.email_usuario
        };
    } catch (error) {
        throw new Error(error.message);
    }
};

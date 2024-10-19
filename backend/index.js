require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
const http = require('http');

// Importação das rotas do backend
const userRoutes = require('./routes/userRoute');
const pointRoutes = require('./routes/pointRoute');
const notificationRoutes = require('./routes/notificationRoute');
const reportRoutes = require('./routes/reportRoute');
const loginRoutes = require('./routes/loginRoute');
const logoutRoutes = require('./routes/logoutRoute');
const cookieRoutes = require('./routes/cookieRoute');
const nasaRoutes = require('./services.nasa_api');

// Configuração do servidor
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

// Limitação de requisições (rate limiting)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 2000 // limit each IP to 2000 requests per windowMs
});

// Configuração do middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './')));
app.use(express.json());
app.use(helmet());
app.use(limiter);
app.use(cors({
    origin: 'http://localhost:5173',  // Ajustar para refletir a origem correta do frontend
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    credentials: true
}));

// Configuração da view engine
app.set('view engine', 'ejs');

// Configuração de cookies e sessão
app.use(cookieParser());

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 // Um dia
    },
    name: 'userLogged'
}));

// Definição de rotas
app.use('/user', userRoutes);  // Rotas de usuário [PONTOS E NOTIFICAÇÕES VEM POR AQUI]
app.use('/user/:userId/points', pointRoutes); // Rotas para pontos
app.use('/user/:userId/points/:pointId/notifications', notificationRoutes); // Rotas para notificações
app.use('/user/:userId/reports', reportRoutes); // Rotas para relatórios

// Rotas independentes de login, logout e cookies
app.use('/login', loginRoutes);
app.use('/logout', logoutRoutes);
app.use('/ck', cookieRoutes);
app.use('/nasa', nasaRoutes);

// Inicialização do servidor
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

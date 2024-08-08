import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import connectDB from './config/config';
import { Authenticate } from './controllers/auth';
import cookieParser, { CookieParseOptions } from "cookie-parser"

const app = express();

// Configure o CORS
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Conectar ao MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Rotas de Autenticação
app.use('/auth', Authenticate);

const Guard = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    console.log(req.cookies.token) // ISSO AQUI É O TOKEN
    const token = req.cookies.token
    if (authHeader && authHeader === 'LOGICA PARA LER O COOKIE') {
        next();
    } else {
        res.status(403).send('Forbidden');
    }
};

app.use('/ping', Guard, (req, res) => {
    return res.status(200).json({
        message: "Connected!"
    })
})

app.listen(8000, () => {
    console.log('Server running on http://localhost:8000');
});

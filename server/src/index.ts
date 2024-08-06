import express from 'express';
import connectDB from './config/config';
import { Authenticate } from './controllers/auth';

const app = express();

// Conectar ao MongoDB
connectDB();

// Middleware
app.use(express.json());

// Rotas de Autenticação
app.use('/auth', Authenticate);

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
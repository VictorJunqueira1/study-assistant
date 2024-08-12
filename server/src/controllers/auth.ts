import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, { IUser } from "../models/userModel";

const getTimeUntilMidnight = (): number => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    return midnight.getTime() - now.getTime();
};

export const Authenticate = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;

    try {
        const user: IUser | null = await User.findOne({ username: username });
        console.log(user)
        if (!user) {
            res.status(401).send('User not found');
            return;
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).send('Invalid credentials');
            return;
        }

        const expiresIn = getTimeUntilMidnight();
        const token = jwt.sign({ username: user.username }, 'B7B7B7B7B7B7B7', { expiresIn });
        res.cookie('token', token, { httpOnly: true });
        res.send('Logged in successfully');

    } catch (error) {
        res.status(500).send('Internal server error');
        console.log(error);
    }
}

export const createUser = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;

    // Validação básica
    if (!username || !password) {
        res.status(400).send('Username and password are required');
        return;
    }

    try {
        // Verificar se o usuário já existe
        const existingUser: IUser | null = await User.findOne({ username });
        if (existingUser) {
            res.status(400).send('Username already exists');
            return;
        }

        // Criptografar a senha
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Criar o novo usuário
        const newUser = new User({
            username,
            password: hashedPassword,
        });

        // Salvar o usuário no banco de dados
        await newUser.save();

        // Responder com sucesso
        res.status(201).send('User created successfully');

    } catch (error) {
        res.status(500).send('Internal server error');
        console.log(error);
    }
};
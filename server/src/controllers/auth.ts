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
        const user: IUser | null = await User.findOne(  { where: { username: username} });
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
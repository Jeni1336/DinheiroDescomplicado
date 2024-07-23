import express, { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();


const router = express.Router();

const users: { id: number, name: string, email: string, password: string }[] = [{
    id: 1,
    name: 'Jeniffer',
    email: 'jeniffer@email.com.br',
    password: '$2a$10$wZ5QJ6fM5dI0Y5tL..uEvO9ZR5.Zq5H3J/i4G76L/6CZkpO8j1oV2' 
}];

router.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Senha incorreta' });
    }

    const token=jwt.sign(user, process.env.JWTPASSWORD!, {expiresIn: "1d",})
    const dados = jwt.verify(token, process.env.JWTPASSWORD!)

    res.json({ message: 'Login feito com sucesso', token});
});

router.post('/register', (req: Request, res: Response, next: NextFunction) => {
    const authToken = req.headers.authorization
    if (authToken==null){
        return res.status(400).json({ message: 'Token invalido' });
    }
    const [isBearer, token] = authToken.split(" ");
}, async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const userExists = users.find(u => u.email === email);
    if (userExists) {
        return res.status(400).json({ message: 'Email já cadastrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
        id: users.length + 1,
        name,
        email,
        password: hashedPassword
    };

    users.push(newUser);

    res.status(201).json({ message: 'Usuário cadastrado com sucesso', user: newUser });
});

export default router;

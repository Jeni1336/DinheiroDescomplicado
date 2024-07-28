"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const router = express_1.default.Router();
const users = [{
        id: 1,
        name: 'Jeniffer',
        email: 'jeniffer@gmail.com.br',
        password: '$2a$10$wZ5QJ6fM5dI0Y5tL..uEvO9ZR5.Zq5H3J/i4G76L/6CZkpO8j1oV2'
    }];
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    const isMatch = yield bcryptjs_1.default.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Senha incorreta' });
    }
    const token = jsonwebtoken_1.default.sign(user, process.env.JWTPASSWORD, { expiresIn: "1d", });
    const dados = jsonwebtoken_1.default.verify(token, process.env.JWTPASSWORD);
    res.json({ message: 'Login feito com sucesso', token });
}));
router.post('/register', (req, res, next) => {
    const authToken = req.headers.authorization;
    if (authToken == null) {
        return res.status(400).json({ message: 'Token invalido' });
    }
    const [isBearer, token] = authToken.split(" ");
}, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const userExists = users.find(u => u.email === email);
    if (userExists) {
        return res.status(400).json({ message: 'Email já cadastrado' });
    }
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    const newUser = {
        id: users.length + 1,
        name,
        email,
        password: hashedPassword
    };
    users.push(newUser);
    res.status(201).json({ message: 'Usuário cadastrado com sucesso', user: newUser });
}));
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const config_1 = __importDefault(require("./config"));
const cors = require('cors');
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(cors());
app.use(routes_1.default);
app.get('/', (req, res) => {
    res.send('Hello ');
});
config_1.default.sync().then(() => {
    app.listen(3000, () => {
        console.log('Listening on port 3000');
    });
}).catch((err) => {
    console.error('Unable to connect to the database:', err);
});

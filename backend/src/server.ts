import express from 'express';
import routes from './routes';
import sequelize from './config';
const cors = require('cors');
const app = express();


app.use(express.json());
app.use(cors());
app.use(routes);


app.get('/', (req, res) => {
    res.send('Hello ');
});


sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('Listening on port 3000');
    });
}).catch((err: any) => {
    console.error('Unable to connect to the database:', err);
});

import express from 'express';
import postsRouter from './routers/posts.js'
import notFound from './middlewares/notFound.js';
import connection from './data/db.js'; // Importa la connessione configurata


const app = express();

app.use(express.json());

const PORT = process.env.PORT;
const URL = process.env.URL;

app.use('/posts', postsRouter);
// Not found
app.use(notFound);

app.listen(PORT, (error) => {
    if (error) {
        console.error(error);
        return;
    }
    console.log(`Server avviato alla porta ${PORT}`);

})
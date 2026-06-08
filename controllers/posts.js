import connection from "../data/db.js";
import posts from "../data/posts.js";
import findSlug from "../middlewares/findSlug.js";
import { createConnection } from 'mysql2/promise';


async function index(request, response) {

    // Parametri per la query string
    const {
        title,
        maxPrepTime,
        tag
    } = request.query;

    const query = `SELECT * FROM posts;`;

    try {
        // query() restituisce un array complesso. Usiamo la destrutturazione [rows]
        // per estrarre solo la prima posizione, che contiene i dati effettivi.
        const [rows] = await connection.query(query);
        console.log(rows);

    } catch (error) {
        console.error('Errore nella query: ' + error.message);
    }

    // Quando abbiamo finito di usare il database, chiudiamo SEMPRE la connessione!
    await connection.end();

    // Filter unico
    const filteredPosts = posts.filter(post => {
        // Filtro prep time
        const prepTimeReal = Number(maxPrepTime);
        // Escludo i post con prep time non validi
        if (!isNaN(prepTimeReal) && post.prep_time > prepTimeReal) {
            return false;
        }
        // Filtro nome
        if (title !== undefined && name !== '') {
            const nameLower = name.toLowerCase();
            const postNameLower = post.title.toLowerCase();

            if (!postNameLower.includes(nameLower)) {
                return false;
            }
        }
        // Filtro tag
        if (tag !== undefined && tag !== '') {
            const tagLower = tag.toLowerCase();

            const hasTag = post.tags.map(tag => tag.toLowerCase()).includes(tagLower);

            if (!hasTag) {
                return false;
            }
        }
        return true;
    })
    response.status(200).json(filteredPosts);
}

function show(request, response) {
    // Recuper l'ID dai params

    const { slug, ...altro } = request.postFind;

    response.json({
        error: null,
        messaggio: `Stai visualizzando il post con slug ${slug}`,
        results: {
            ...altro
        }
    });

}

function create(request, response) {

    const { slug, ...altro } = request.body;

    response.json({
        error: null,
        messaggio: `Hai creato il post con slug ${slug}`,
        results: {
            slug,
            ...altro
        }
    });
}

function destroy(request, response) {
    const { slug, ...altro } = request.postFind;

    response.json({
        error: null,
        messaggio: `Stai eliminando il post con slug ${slug}`,
        results: {
            ...altro
        }
    });
}

function modify(request, response) {
    const { slug } = request.postFind;

    // Recupero l'oggetto salvato in modifyPost
    const { updPost } = request

    response.json({
        error: null,
        messaggio: `Richiesta di modifica per post con slug ${slug}`,
        results: updPost
    })
}


export {
    index, show, create, destroy, modify
}
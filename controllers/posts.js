import connection from "../data/db.js";
import posts from "../data/posts.js";
import findSlug from "../middlewares/findSlug.js";
import { createConnection } from 'mysql2/promise';


async function index(request, response) {
    try {
        const [rows] = await connection.query('SELECT id, title, content, image FROM posts;');
        
        response.json({
            error: null,
            results: rows
        });
    } catch (error) {
        console.error(error);
        
        response.status(500).json({
            error: 'Errore caricamento',
            results: []
        });
    }
}

function show(request, response) {

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
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

async function show(request, response) {

    const {id} = request.params;

    // query con placeholder per sicurezza
    const query = `
        select id, title, content, image
        from posts p
        where p.id = ?
    `;

    try {
        const [rows] = await connection.execute (query, [id]);

        // controllo se array vuoto
        if (rows.length === 0){
            return response.status(404).json({
                error: 'Post non trovato',
                results: null
            });
        }
        // se il post esiste
        const post = rows[0];

        // query per i tag
        const queryTags = `
        select
        from post_tag pt
            join tags t 
                on pt.tag_id = t.id
        where pt.post.id = ?
        `;
    }

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
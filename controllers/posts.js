import connection from "../data/db.js";
import posts from "../data/posts.js";
import findSlug from "../middlewares/findSlug.js";
import { createConnection } from 'mysql2/promise';
import { queryInsertPost, queryInsertTag, queryLinkTagPost, querySearchTag } from "../utils/queries.js";
import { id } from "zod/locales";


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

    const { id } = request.params;

    // query con placeholder per sicurezza
    const query = `
        select id, title, content, image
        from posts p
        where p.id = ?
    `;

    try {
        const [rows] = await connection.execute(query, [id]);

        // controllo se array vuoto
        if (rows.length === 0) {
            return response.status(404).json({
                error: 'Post non trovato',
                results: null
            });
        }
        // se il post esiste
        const post = rows[0];

        // query per i tag
        const queryTags = `
        select t.label
        from post_tag pt
            join tags t 
                on pt.tag_id = t.id
        where pt.post_id = ?
        `;

        // con lo stesso id associo i tag correlati
        const [tags] = await connection.execute(queryTags, [id]);

        // al post attacco i tag associati
        post.tags = tags;

        response.json({
            error: null,
            results: post
        });

    } catch (error) {
        response.status(500).json({
            error: 'È successo qualcosa',
            results: null
        });
        console.log(error);

    }
}

async function create(request, response) {

    const {title, content, image, label} = request.body;

    
    try {
        const [resultPost] = await connection.execute(queryInsertPost, [title, content, image]);

        // recupero il nuovo id autoincrementato
        const postNewId = resultPost.insertId;

        // ciclo tag
        for (let i = 0; i < label.length; i++){
            const tagName = label[i];
            let tagId;

            // check tag già presente
            const [tagFound] = await connection.execute(querySearchTag, [tagName]);

            // se il tag non c'è lo inserisco
            if (tagFound.length === 0) {
                const [newTag] = await connection.execute(queryInsertTag, [tagName]);
                tagId = newTag.insertId;
            } else {
                tagId = tagFound[0].id;
            }

            // collego l'id del post con i tag
            await connection.execute(queryLinkTagPost, [postNewId, tagId]);
        }

        // risposta in caso di successo
        response.status(201).json({
            error: null,
            results: {
                id: postNewId,
                message: `Nuovo post creato con successo`
            }
        });

    } catch (error) {
        console.log(error);
        response.status(500).json({
            error: error.message,
            results: null
        });
    }
}

async function destroy(request, response) {

    const { id } = request.params;

    // query con placeholder per sicurezza
    const query = `
        delete
        from posts p
        where p.id = ?
    `;

    try {
        const [results] = await connection.execute(query, [id]);

        // controllo se array vuoto
        if (results.affectedRows === 0) {
            return response.status(404).json({
                error: 'Post non trovato',
                results: null
            });
        }
        // se il post esiste
        response.json({
            message: `Post con ID ${id} eliminato con successo`
        })

    }catch (error) {
        response.status(500).json({
            error: 'È successo qualcosa',
            results: null
        });
        console.log(error);

    }
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
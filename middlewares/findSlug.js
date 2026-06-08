import posts from "../data/posts.js";

function findSlug (request, response, next) {
    // Estraggo il parametro
    const {slug} = request.params;

    const postFind = posts.find(post => {
        return post.slug === slug;
    });

    // Gestione dell'errore
    if (!postFind){
        return response.status(404).json({
            error: 'Post non trovato',
            results: null
        });
        return
    }

    // Passaggio di dati e continuazione
    request.postFind = postFind;
    next();

};

export default findSlug;
import posts from "../data/posts.js";


function createNewPost (request, response, next) {
    const {title, tags, prep_time, slug, published = false} = request.body;
    
    // Campi obbligatori
    if (!title || title.length < 5){
        return response.status(400).json({
            error: `Titolo mancante o troppo corto`,
            result: null
        });
    }

    // Generazione slug
    const finalSlug = title
    .toLowerCase()
    .trim()
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .replaceAll(' ','-');

    const slugExists = posts.some(post=>post.slug===finalSlug);
    if (slugExists){
        return response.status(400).json({
            error: 'Titolo/slug già presenti',
            result: null
        });
    }

    // Generazione id
    const newId = posts.length > 0 ? posts[posts.length - 1].id + 1 : 1;

    const newPost = {
        id: newId,
        title,
        slug: finalSlug,
        prep_time: Number(prep_time),
        tags: tags || []
    }

    posts.push(newPost);
    console.log(posts);
    
    next();
};

export default createNewPost;
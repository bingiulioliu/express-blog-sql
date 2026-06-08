export const createPost = (postArray, obj) =>{

    const {title, tags, prep_time, slug, published = false} = obj;
    
    // Campi obbligatori
    if (!title || title.length < 5){
        return {
            status: 400,
            error: 'Titolo mancante o più corto di 5 caratteri',
            result: null
        };
    }

    // Generazione slug
    const newSlug = title.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, '');
    const finalSlug = newSlug.trim()
    const slugExists = postArray.some(post=>post.slug===newSlug);
    if (slugExists){
        return {
            status: 400,
            error: 'Titolo/slug già presenti',
            result: null
        };
    }

    // Generazione id
    const newId = postArray.length > 0 ? postArray[postArray.length - 1].id + 1 : 1;

    const newPost = {
        id: newId,
        title,
        slug: finalSlug,
        prep_time: Number(prep_time),
        tags: tags || []
    }

    return{
        status: 201,
        error: null,
        data: newPost
    }
};
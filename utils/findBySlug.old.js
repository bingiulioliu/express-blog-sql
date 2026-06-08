export const findBySlug = (posts, slug) => {

    const postFound = posts.find(post => post.slug === slug);

    if (!postFound) {
        return {
            status: 404,
            error: 'Post non trovato, cerca meglio',
            result: null
        };
    }

    return {data: postFound}

};
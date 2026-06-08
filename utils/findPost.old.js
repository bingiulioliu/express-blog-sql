export const findPost = (posts, id) => {
    const realId = Number(id);

    // Se non è un numero intero
    if (isNaN(realId)) {
        return {
            status: 400,
            error: 'ID non corretto',
            result: null
        };
    }

    if (realId <= 0) {
        return {
            status: 400,
            error: 'ID minore di 0',
            result: null
        };
    }

    if (realId > 5) {
        return {
            status: 404,
            error: 'Post non ancora creato',
            result: null
        };
    }

    const postFound = posts.find(post => post.id === realId);

    if (!postFound) {
        return {
            status: 404,
            error: 'Post non trovato',
            result: null
        };
    }

    return {data: postFound}

};
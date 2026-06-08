import posts from "../data/posts.js";

function modifyPost(request, response, next) {
    const originalPost = request.params;
    const {slug} = originalPost;

    const updPost = {
        ...originalPost,
        ...request.body,
    };

    console.log(updPost);

    const postIndex = posts.findIndex(post => post.slug === slug);
    // Elimino
    posts.splice(postIndex, 1, updPost);

    console.log(posts);

    // Passo l'oggetto al controller tramite request
    request.updPost = updPost;

    next();
};

export default modifyPost;
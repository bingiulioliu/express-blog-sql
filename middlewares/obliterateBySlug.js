import posts from "../data/posts.js";

function obliterateBySlug (request, response, next){

    const {slug} = request.params;

    const postIndex = posts.findIndex(post => post.slug === slug);
    // Elimino
    posts.splice(postIndex, 1);

    
    next()
};

export default obliterateBySlug;
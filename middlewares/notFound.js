function notFound (request, response, next) {
    response.status(404).json({
        error: `Errore 404: pagina non trovata`,
        results: null
    });
}

export default notFound;
const queryInsertPost = `
    insert
    into posts (title, content, image)
    values (?, ?, ?);
`;

const querySearchTag = `
    select id
    from tags t
    where t.label = ?;
`;

const queryInsertTag = `
    insert
    into tags (label)
    values (?);
`;

const queryLinkTagPost = `
    insert
    into post_tag (post_id, tag_id)
    values(?, ?);
`;

export {queryInsertPost, querySearchTag, queryInsertTag, queryLinkTagPost}
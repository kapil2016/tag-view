function removeIdProperty(tree) {
    if (!tree || typeof tree !== 'object') {
        return tree;
    }

    const { id, ...rest } = tree;

    if (Array.isArray(tree.childs)) {
        rest.childs = tree.childs.map(child => removeIdProperty(child));
    }

    return rest;
}

export default removeIdProperty;
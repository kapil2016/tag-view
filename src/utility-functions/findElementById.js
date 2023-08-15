function findElementById(root, id) {
    if (root.id === id) {
        return root;
    }

    if (root.childs) {
        for (const child of root.childs) {
            const found = findElementById(child, id);
            if (found) {
                return found;
            }
        }
    }

    return null;
}

export default findElementById;
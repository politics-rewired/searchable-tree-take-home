const filter = (currentNode, searchTerm) => {
  let newChildren = [];

  currentNode.hasOwnProperty("children") && currentNode.children.forEach(child => {
    let keepChild = filter(child, searchTerm);

    if (keepChild) {
      newChildren.push(child);
    }
  });

  if (currentNode.hasOwnProperty("children")) {
    currentNode.children = newChildren;
  }

  let result = (
    currentNode.systemName.toLowerCase().includes(searchTerm) ||
    currentNode.displayName.toLowerCase().includes(searchTerm) ||
    (currentNode.hasOwnProperty("children") && currentNode.children.length)
  );

  return !!result;
}

const search = (data, searchTerm = '') => {
  if (searchTerm.trim() === '') {
    return data;
  }

  var cloned = JSON.parse(JSON.stringify(data));

  cloned.map(schema => filter(schema, searchTerm.toLowerCase()));

  return cloned;
}

export { search };

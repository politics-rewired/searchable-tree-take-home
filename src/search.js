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
    currentNode.systemName === searchTerm ||
    currentNode.displayName === searchTerm ||
    (currentNode.hasOwnProperty("children") && currentNode.children.length)
  );

  return !!result;
}

const search = (data, searchTerm) => {
  var cloned = JSON.parse(JSON.stringify(data));

  cloned.map(schema => filter(schema, searchTerm));

  return cloned;
}

export { search };

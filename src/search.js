const checkMatch = (value, searchTerm) => value.toLowerCase().includes(searchTerm);

const filter = (currentNode, searchTerm, onlyPublic) => {
  let newChildren = [];
  let isPublic = true;
  let result = false;
  let hasChildren;

  currentNode.hasOwnProperty("children") && currentNode.children.forEach(child => {
    let keepChild = filter(child, searchTerm, onlyPublic);

    if (keepChild) {
      newChildren.push(child);
    }
  });

  if (currentNode.hasOwnProperty("children")) {
    currentNode.children = newChildren;
  }

  hasChildren = (currentNode.hasOwnProperty("children") && currentNode.children.length);

  let matched = (
    searchTerm === '' ||
    checkMatch(currentNode.systemName, searchTerm) ||
    checkMatch(currentNode.displayName, searchTerm) ||
    hasChildren
  );

  isPublic = (currentNode.hasOwnProperty('public')) ? currentNode.public : true;

  if (!!matched) {
    result = onlyPublic ? isPublic : true;
  }

  return result;
};

const search = (data, searchTerm = '', onlyPublic = false) => {
  var cloned = JSON.parse(JSON.stringify(data));

  cloned.map(schema => filter(schema, searchTerm.trim().toLowerCase(), onlyPublic));

  return cloned;
};

export { search };

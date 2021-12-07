import { Schema } from "./data";

export const dataFormatter = (data: Schema[]) : any[] => {
  return data.map(schema => {
    const { tables, ...schemaRest } = schema;

    return {
      ...schemaRest,
      children: tables.map(table => {
        const { forms, views, columns, ...tableRest } = table;

        return {
          ...tableRest,
          children: [
            {
              displayName: "Forms",
              systemName: "forms",
              children: forms
            },
            {
              displayName: "Views",
              systemName: "views",
              children: views
            },
            {
              displayName: "Columns",
              systemName: "columns",
              children: columns
            }
          ]
        }
      })
    }
  })
};

const generateTreeFormat = (items, parentKey = 'schema') => {
  return items.map((item, index) => {
    let key = `${parentKey}-${item.systemName}-${index}`
    let result = { title: item.displayName, key }

    if (item.hasOwnProperty('children') && item.children.length) {
      result['children'] = generateTreeFormat(item.children, key)
    }

    return result
  })
}

export const treeFormatter = (data: any[]) => {
  return generateTreeFormat(data);
}

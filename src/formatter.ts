import { Schema } from "./data";

const format = (data: Schema[]) => {
  return data.map((schema, schemaIndex) => {
    return {
      title: schema.displayName,
      key: `${schema.systemName}-${schemaIndex}-node`,
      // icon: <FormIcon />,
      children: schema.tables.map((table) => {
        return {
          title: table.displayName,
          key: `${schema.systemName}-${table.systemName}-table`,
          children: [
            {
              title: "Forms",
              key: `${schema.systemName}-${table.systemName}-forms`,
              children: table.forms.map((form) => {
                return {
                  title: form.displayName,
                  key: `${schema.systemName}-${table.systemName}-${form.systemName}`
                }
              }),
            },
            {
              title: "Views",
              key: `${schema.systemName}-${table.systemName}-views`,
              children: table.views.map((view) => {
                return {
                  title: view.displayName,
                  key: `${schema.systemName}-${table.systemName}-${view.systemName}`
                }
              }),
            },
            {
              title: "Columns",
              key: `${schema.systemName}-${table.systemName}-cols`,
              children: table.columns.map((column, colIndex) => {
                return {
                  title: column.displayName,
                  key: `col-${column.systemName}-${colIndex}`,
                  // icon: <ColumnIcon />
                }
              })
            }
          ]
        }
      })
    };
  });
};

export default format;

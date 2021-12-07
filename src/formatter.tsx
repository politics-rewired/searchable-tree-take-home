import React from "react";
import {
  FormOutlined,
  TableOutlined,
  FilterOutlined,
  NumberOutlined,
} from "@ant-design/icons";

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
  });
};

const generateTreeFormat = (items, showIcons, withSystemName, parentKey = 'schema') => {
  return items.map((item, index) => {
    let key = `${parentKey}-${item.systemName}-${index}`;
    let result = { title: item.displayName, key };

    if (withSystemName) {
      result.title = `${result.title} (${item.systemName})`;
    }

    if (showIcons) {
      let Icon;

      if (parentKey === 'schema') {
        Icon = TableOutlined;
      }

      if (item.systemName === 'forms') {
        Icon = FormOutlined;
      }

      if (item.systemName === 'views') {
        Icon = FilterOutlined;
      }

      if (item.systemName === 'columns') {
        Icon = NumberOutlined;
      }

      if (Icon) {
        result['icon'] = <Icon />;
      }
    }

    if (item.hasOwnProperty('children') && item.children.length) {
      result['children'] = generateTreeFormat(item.children, showIcons, withSystemName, key);
    }

    return result;
  });
};

export const treeFormatter = (data: any[], showIcons: boolean, withSystemName: boolean) => {
  return generateTreeFormat(data, showIcons, withSystemName);
};

import React from "react";
import { Tree } from "antd";
import {
  FormOutlined,
  // TableOutlined,
  // FilterOutlined,
  NumberOutlined,
} from "@ant-design/icons";

import { Schema } from "./data";
import { search } from "./search";
import { dataFormatter, treeFormatter } from "./formatter";

type MyTreeProps = {
  data: Schema[];
  searchTerm?: string;
  onlyPublic?: boolean;
  showIcons?: boolean;
};

const FormIcon = FormOutlined;
// const TableIcon = TableOutlined;
// const ViewIcon = FilterOutlined;
const ColumnIcon = NumberOutlined;

export const MyTree = (props: MyTreeProps) => {
  const formattedData = dataFormatter(props.data);
  const filteredData = search(formattedData, props.searchTerm, props.onlyPublic);
  const treeData = treeFormatter(filteredData);

  return <Tree showIcon treeData={treeData} autoExpandParent={true} />;
};

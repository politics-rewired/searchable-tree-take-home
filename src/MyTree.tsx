import { Tree } from "antd";
import { Schema } from "./data";
import {
  FormOutlined,
  // TableOutlined,
  // FilterOutlined,
  NumberOutlined,
} from "@ant-design/icons";
import format from "./formatter";
import React from "react";
import { search } from "./search";

type MyTreeProps = {
  data: Schema[];
  searchTerm?: string;
};

const FormIcon = FormOutlined;
// const TableIcon = TableOutlined;
// const ViewIcon = FilterOutlined;
const ColumnIcon = NumberOutlined;

export const MyTree = (props: MyTreeProps) => {
  const treeData = format(props.data);
  const filteredData = search(treeData, props.searchTerm);

  return <Tree showIcon treeData={filteredData} autoExpandParent={true} />;
};

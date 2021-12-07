import React from "react";
import { Tree } from "antd";

import { Schema } from "./data";
import { search } from "./search";
import { dataFormatter, treeFormatter } from "./formatter";

type MyTreeProps = {
  data: Schema[];
  searchTerm?: string;
  onlyPublic?: boolean;
  showIcons?: boolean;
};

export const MyTree = (props: MyTreeProps) => {
  const formattedData = dataFormatter(props.data);
  const filteredData = search(formattedData, props.searchTerm, props.onlyPublic);
  const treeData = treeFormatter(filteredData, props.showIcons);

  return <Tree showIcon treeData={treeData} autoExpandParent={true} />;
};

import {Tree} from "antd";
import {NamedEntity, Schema, Table} from "./data";
import {
    FormOutlined,
    TableOutlined,
    FilterOutlined,
    NumberOutlined,
} from "@ant-design/icons";
import React, {useMemo} from "react";
import {DataNode} from "rc-tree/lib/interface";
import {filterSchemas} from "./searchFunctions";

type FormatDisplayName = (e: NamedEntity) => string
type MyTreeProps = {
    data: Schema[];
    search?: string
    publicOnly?: boolean
    useIcons: boolean
    formatDisplayName?: FormatDisplayName
};

const FormIcon = FormOutlined;
const TableIcon = TableOutlined;
const ViewIcon = FilterOutlined;
const ColumnIcon = NumberOutlined;

function makeTitle(item: NamedEntity, formatDisplayName?: FormatDisplayName): string {
    return formatDisplayName ? formatDisplayName(item) : item.displayName
}

function toDataNode(path: string, item: NamedEntity, icon: React.ReactNode | undefined, formatDisplayName?: FormatDisplayName): DataNode {
    const fullPath = `${path}.${item.systemName}`
    return {title: makeTitle(item, formatDisplayName), key: fullPath, icon}
}

function tableToTreeData(path: string, table: Table, useIcons: boolean, formatDisplayName?: FormatDisplayName): DataNode {
    const fullPath = `${path}.${table.systemName}`
    const forms = table.forms.map(x => toDataNode(fullPath, x, useIcons ? <FormIcon/> : undefined, formatDisplayName))
    const views = table.views.map(x => toDataNode(fullPath, x, useIcons ? <ViewIcon/> : undefined, formatDisplayName))
    const columns = table.columns.map(x => toDataNode(fullPath, x, useIcons ?
        <ColumnIcon/> : undefined, formatDisplayName))
    const children: DataNode[] = [...forms, ...views, ...columns]

    return {
        title: makeTitle(table, formatDisplayName),
        key: fullPath,
        children: children,
        icon: useIcons ? <TableIcon/> : undefined
    }
}

function schemaToTreeData(schema: Schema, useIcons: boolean, formatDisplayName?: FormatDisplayName): DataNode {
    return {
        title: makeTitle(schema, formatDisplayName),
        key: schema.systemName,
        children: schema.tables.map(table => tableToTreeData(schema.systemName, table, useIcons, formatDisplayName)),
    }
}

// If you don't want to use typescript, use line 10 instead of 11 and comment out the type `MyTreeProps` above
// export const MyTree = (props) => {
export const MyTree = (props: MyTreeProps) => {
    const {data, search, publicOnly, useIcons, formatDisplayName} = props
    const filtered = useMemo(() => filterSchemas({
        schemas: data,
        searchString: search,
        publicOnly: publicOnly
    }), [data, search, publicOnly])

    const treeData = useMemo(() => filtered.map(schema => schemaToTreeData(schema, useIcons, formatDisplayName)), [
        filtered, useIcons, formatDisplayName
    ])

    return <Tree showIcon treeData={treeData} autoExpandParent={true}/>;
};

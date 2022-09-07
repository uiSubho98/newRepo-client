import React, { useState, useEffect } from "react";
import { Table, Input, Button, Icon } from "antd";
// @ts-ignore
import Highlighter from "react-highlight-words";

interface IState {
    searchText: string;
    searchedColumn: string;
}

const VisionTable = (props: any) => {
    const defaultState = {
        searchText: "",
        searchedColumn: "",
    };
    const [state, setState] = useState<IState>(defaultState);
    let searchInput:any;
    const getColumnSearchProps = (dataIndex: any) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={(node) => {
                        searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: "block" }}
                />
                <Button
                    type="primary"
                    onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
                </Button>
                <Button
                    onClick={() => handleReset(clearFilters)}
                    size="small"
                    style={{ width: 90 }}
                >
                    Reset
                </Button>
            </div>
        ),
        filterIcon: (filtered:any) => (
            <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
        ),
        onFilter: (value:any, record: any) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible: any) => {
            if (visible) {
                setTimeout(() => searchInput.select());
            }
        },
        render: (text:any) =>
            state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                    searchWords={[state.searchText]}
                    autoEscape
                    textToHighlight={text.toString()}
                />
            ) : (
                text
            ),
    });

    const handleSearch = (selectedKeys:any, confirm:any, dataIndex:any) => {
        confirm();
        setState(prev => ({
            ...prev,
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        }));
    };

    const handleReset = (clearFilters: any) => {
        clearFilters();
        setState(prev => ({ ...prev, searchText: "" }));
    };

    const applyFiltersToColumn = (columns:any) => {
        return columns.map((obj:any) => {
            let newObj = obj;
            if (obj.search && obj.search === true) {
                newObj = { ...newObj, ...getColumnSearchProps(obj.key) };
            }
            return newObj;
        });
    };


    let { columns, data, loading } = props;
    if (props.edit && props.edit === "false") {
        columns = columns.slice(0, -1);
    }

    return (
        <>
            <Table
                columns={applyFiltersToColumn(columns)}
                dataSource={data}
                loading={loading}
                rowKey={"_id"}
                rowClassName={(record:any, index) => {
                    let color = "";
                    if (record.att && record.att === "A") color = "mark-absent";
                    else if (record.att && record.att === "P") color = "mark-present";
                    return color;
                }}
            />
            <style jsx>
                {`
                    .mark-absent {
                        background-color: hsla(0, 100%, 70%, 0.3);
                    }

                    .mark-present {
                        background-color: hsla(89, 67%, 60%, 0.4);
                    }
                `}
            </style>
        </>
    );
}

export default VisionTable;

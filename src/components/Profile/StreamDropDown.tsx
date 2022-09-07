import React, { ReactElement, useEffect, useState } from "react";
import { AutoComplete, Form, Select } from "antd";
import axios from "axios";
import { G_API_URL } from "../../constants/constants";

interface StreamDropDownProps {
    message: string;
    name: string;
    stream?: string;
    getFieldDecorator: Function;
    placeholder: string;
    isRequired: boolean;
}

const StreamDropDown = (props: StreamDropDownProps) => {
    const { Option } = AutoComplete;

    const [options, setOptions] = useState<Array<string>>([]);
    const [isSearchActive, setSearchActive] = useState<boolean>(false);

    const { message, name, stream, getFieldDecorator, isRequired } = props;

    const handleInput = (value: string) => {
        axios
            .get(G_API_URL + "global/department/")
            .then((res) => {
                const { status, data } = res.data;
                let datas = data[0];
                let departments = Object.values(datas).map((d: any) => {
                    return d.dept;
                });
                departments = Array.prototype.concat.apply([], departments);
                let options: Array<string> = departments
                    .filter((data: any) => {
                        if (data) {
                            return data;
                        }
                        return null;
                    })
                    .map((data: any) => data.name);
                options = [...new Set(options)];
                if (status) setOptions(options);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        handleInput("");
    }, []);

    let optionsList = [];
    if (!isSearchActive) {
        optionsList.unshift(
            <Option key={"title"} disabled>
                Type and select your branch/stream
            </Option>
        );
    } else {
        optionsList = options.map((data: string, key: number) => (
            <Option key={key} value={data}>
                {data}
            </Option>
        ));
    }

    return (
        <Form.Item label="Branch/Stream">
            {getFieldDecorator(name, {
                initialValue: stream,
                rules: [{ required: { isRequired }, message: { message } }],
            })(
                <Select
                    showSearch
                    optionFilterProp="children"
                    placeholder={"Select"}
                    onSearch={() => !isSearchActive && setSearchActive(true)}
                    filterOption={(input: string, option: ReactElement) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    // disabled={stream !== undefined}
                >
                    {optionsList}
                </Select>
            )}
        </Form.Item>
    );
};

export default StreamDropDown;

import React, { ReactElement, useEffect, useState } from "react";
import { AutoComplete, Form, Select } from "antd";
import axios from "axios";
import { G_API_URL } from "../../constants/constants";

interface CollegeDropDownProps {
    message: string;
    name: string;
    college?: string;
    getFieldDecorator: Function;
    placeholder: string;
    isRequired: boolean;
}

const CollegeDropDown = (props: CollegeDropDownProps) => {
    const { Option } = AutoComplete;

    const [options, setOptions] = useState<Array<string>>([]);
    const [isSearchActive, setSearchActive] = useState<boolean>(false);

    const { message, name, college, getFieldDecorator, isRequired } = props;

    const handleInput = (value: string) => {
        axios
            .get(G_API_URL + "resource/colleges", {
                params: {
                    name: value
                }
            }).then((res: any) => {
                res = res.data;
                let colleges = [];
                if(res.status === 1) {
                    colleges = res.data.map((college: any) => college.name + ", " + college.city);
                    const options:any = [...new Set(colleges)];
                    setOptions([...options, "Others"]);
                }
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
                Type and select your college
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
        <Form.Item label="Name of the College/University">
            {getFieldDecorator(name, {
                initialValue: college,
                rules: [{ required: { isRequired }, message: { message } }],
            })(
                <Select
                    showSearch
                    optionFilterProp="children"
                    placeholder={"Select"}
                    onSearch={() => !isSearchActive && setSearchActive(true)}
                    filterOption={(input: string, option: ReactElement) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                        option.props.children.toLowerCase() === "others"
                    }
                    onInputKeyDown={(e: any)=> handleInput(e.target.value)}
                >
                    {optionsList}
                </Select>
            )}
        </Form.Item>
    );
};

export default CollegeDropDown;

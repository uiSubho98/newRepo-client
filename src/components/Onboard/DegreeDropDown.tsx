import React, { ReactElement, useEffect, useState } from "react";
import { AutoComplete, Form, Select } from "antd";
import axios from "axios";
import { G_API_URL } from "../../constants/constants";

interface DegreeDropDownProps {
    message: string
    name: string
    degree?: string
    getFieldDecorator: Function
    placeholder: string
    isRequired: boolean
}

const DegreeDropDown = (props: DegreeDropDownProps) => {
    const { Option } = AutoComplete;

    const [options, setOptions] = useState<Array<string>>([]);

    const { 
        message, 
        name, 
        degree, 
        getFieldDecorator, 
        isRequired } = props;

    const handleInput = (value:string) => {
        axios
            .get(G_API_URL+`resource/degrees?degree=${value}`)
            .then((res) => {
                const { status, data } = res.data;
                let options:Array<string> = data.map((data: any) => data.degree)
                if (status) setOptions(options);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        handleInput("");
    },[])

    let optionsList = options.map((data:string, key:number) => (
        <Option key={key} value={data}>
            {data}
        </Option>
    ));

    optionsList.push(
        <Option key={optionsList.length} value={"Others"}>
            Others
        </Option>
    )

    return (
        <Form.Item label={"Degree"}>
        {getFieldDecorator( name, {
            initialValue: degree,
            rules: [{required: {isRequired}, message: {message}}]
        })(
            <Select
                showSearch
                optionFilterProp="children"
                placeholder={"Select"}
                onSearch={(event) => handleInput(event)}
                filterOption={(input: string, option: ReactElement) => 
                    option.props.children.toLowerCase().indexOf(
                        input.toLowerCase()) >= 0 ||
                    option.props.children.toLowerCase() === "others"
                }
                // disabled={degree !== undefined}
            >
                {optionsList}
            </Select>
            )
        }
        </Form.Item>
    )


}

export default DegreeDropDown;
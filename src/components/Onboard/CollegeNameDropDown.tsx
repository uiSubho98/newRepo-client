import React, { ReactElement, useState } from "react";
import { AutoComplete, Form, Select } from "antd";
import axios from "axios";
import { G_API_URL } from "../../constants/constants";

interface IOption {
    name: string;
    city: string;
}


interface CollegeNameDropDownProps {
    message: string
    name: string
    collegeName?: string
    getFieldDecorator: Function
    placeholder: string
    isRequired: boolean
}

const CollegeNameDropDown = (props:CollegeNameDropDownProps) => {
    const { Option } = AutoComplete;

    const [options, setOptions] = useState<Array<IOption>>([]);
    const handleInput = (value:string) => {
        axios
            .get(G_API_URL+`resource/colleges?name=${value}`)
            .then((res) => {
                const { status, data } = res.data;
                let options:Array<IOption> = [...data,{ name:"Others", city:"" }];
                if (status) setOptions(options);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // useEffect(() => {
    //     handleInput("");
    // },[])

    const { 
        message, 
        name, 
        collegeName, 
        getFieldDecorator, 
        isRequired } = props;

    let optionsList = options.map((data:IOption, key:number) => (
        <Option key={key} value={data.name}>
            {data.name + ( data.city ? "," + data.city : "" ) }
        </Option>
    ));

    if(options.length === 0) {
        optionsList.unshift(<Option key={'title'} 
            disabled>Type and select your college name</Option>);
    }
    return (
        <Form.Item label={"College Name"}>
            {getFieldDecorator( name, {
                initialValue: collegeName,
                rules: [{required: {isRequired}, message: {message}}]
            })(
                <Select
                    showSearch
                    optionFilterProp="children"
                    placeholder={"Select"}
                    onSearch={(event) => handleInput(event)}
                    filterOption={(input: string, option: ReactElement) =>
                        option.props.children.toLowerCase().indexOf(
                            input.toLowerCase()) >= 0
                    }
                    // disabled={collegeName !== undefined}
                >
                    {optionsList}
                </Select>
                )
            }
        </Form.Item>
    );
}

export default CollegeNameDropDown;
import React from 'react';
import {Form, Select} from "antd";

interface ISDCodesDropDownProps {
    getFieldDecorator: Function;
    apiData?: any;
    isDisabled?: string;
}

const ISDCodesDropDown = (props: ISDCodesDropDownProps) => {
    const {getFieldDecorator, apiData, isDisabled} = props;
    const {Option} = Select;
    const options = ["91","1","852","61","65","92","94","975","880",
    "977","93","230","60","66","33","34","971","44","968","973","966",
    "353","974","965","64","49","52"];

    const renderOptions = () => {
        return options.map(option => 
            <Option key={option} value={option}>+{option}</Option>
        );
    }

    return (
        <Form.Item className="mobile-prefix">
            {getFieldDecorator('prefix', {
                initialValue: apiData !== undefined && apiData.prefix !== undefined ? apiData.prefix : "91",
            })(
                <Select style={{width: 75}} disabled={isDisabled === 'yes' ? true : false}>
                    {/* <Option value="91">+91</Option>
                    <Option value="1">+1</Option>
                    <Option value="852">+852</Option>
                    <Option value="61">+61</Option>
                    <Option value="65">+65</Option>
                    <Option value="92">+92</Option>
                    <Option value="94">+94</Option>
                    <Option value="975">+975</Option>
                    <Option value="880">+880</Option>
                    <Option value="977">+977</Option>
                    <Option value="93">+93</Option>
                    <Option value="230">+230</Option>
                    <Option value="60">+60</Option>
                    <Option value="66">+66</Option>
                    <Option value="33">+33</Option>
                    <Option value="34">+34</Option>
                    <Option value="971">+971</Option>
                    <Option value="44">+44</Option>
                    <Option value="968">+968</Option>
                    <Option value="973">+973</Option>
                    <Option value="966">+966</Option>
                    <Option value="353">+353</Option>
                    <Option value="974">+974</Option>
                    <Option value="965">+965</Option>
                    <Option value="64">+64</Option>
                    <Option value="49">+49</Option>
                    <Option value="52">+52</Option> */}
                    { renderOptions() }
                </Select>
            )}
        </Form.Item> 
    );
}

export default ISDCodesDropDown;

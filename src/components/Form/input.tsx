import React from "react";
import { Input, Form, Select, DatePicker, InputNumber, Radio, TimePicker } from "antd";

const { Option } = Select;
const { RangePicker } = DatePicker;

const FormInput = (props: any) => {
    const { getFieldDecorator, label, rules, name, placeholder } = props;
    let disabled = false;
    if (props.disabled) disabled = props.disabled;

    const getInitialValue = () => {
        if (props.value) {
            return props.value;
        } else if(props.defaultValue)return props.defaultValue;
                 else {
            return null;
        }
    };

    return (
        <Form.Item label={label}>
            {getFieldDecorator(name, {
                rules: rules,
                initialValue: getInitialValue(),
            })(<Input placeholder={placeholder} disabled={disabled} />)}
        </Form.Item>
    );
};

const FormInputMobile = (props: any) => {
    const { getFieldDecorator, label, name, placeholder } = props;
    const prefixSelector = getFieldDecorator("prefix", {
        initialValue: "91",
    })(
        <Select style={{ width: 70 }}>
            <Option value="91">+91</Option>
            <Option value="1">+1</Option>
        </Select>
    );
    return (
        <Form.Item label={label}>
            {getFieldDecorator(name, {
                rules: [{ required: true, message: "Please input your phone number!" }],
            })(<Input addonBefore={prefixSelector} id={"mobile-no"} placeholder={placeholder} />)}
        </Form.Item>
    );
};

const FormInputSelect = (props: any) => {
    const { getFieldDecorator, handleChange, label, rules, name, options, placeholder } = props;

    let initialValue = null;
    if (props.value) {
        initialValue = props.value;
    }

    let select_options = null;

    if (props.select_options) select_options = props.select_options;
    else
        select_options = options.map((op: any, idx: any) => (
            <Option value={op} key={idx}>
                {op}
            </Option>
        ));
    return (
        <>
            <Form.Item label={label}>
                {getFieldDecorator(name, {
                    rules: rules,
                    ...( initialValue && {
                        initialValue: initialValue
                    }),
                })(
                    <Select
                        placeholder={placeholder}
                        onChange={
                            props.onSelectChange
                                ? (value) => props.onSelectChange(value, name)
                                : (value) => {
                                    name === "slot_type" &&
                                    handleChange(value);
                                }
                        }
                    >
                        {select_options}
                    </Select>
                )}
            </Form.Item>
        </>
    );
};

const FormInputAutoCompleteRev = (props: any) => {
    const { getFieldDecorator, label, rules, name, options, placeholder, onSelectChange } = props;

    let select_options = <></>;

    if (["dept", "ug_dept"].includes(name)) {
        select_options = options.map((op: any) => {
            if (op.status === 1)
                return (
                    <Option value={op.name} key={op.name}>
                        {op.name}
                    </Option>
                );
            return null;
        });
    } else if (name === "group_name") {
        select_options = options.map((op: any) => (
            <Option value={op["group_id"]} key={op["group_id"]}>
                {op["group_name"]}
            </Option>
        ));
    } else {
        select_options = options.map((op: any, idx: any) => (
            <Option value={op} key={idx}>
                {op}
            </Option>
        ));
    }

    return (
        <>
            <Form.Item label={label}>
                {getFieldDecorator(name, {
                    rules: rules,
                })(
                    <Select
                        showSearch
                        defaultActiveFirstOption={false}
                        placeholder={placeholder}
                        onChange={(value) => onSelectChange(value, name)}
                        optionFilterProp="children"
                        filterOption={
                            name === "college"
                                ? false
                                : (input, option: any) =>
                                      option.props.children
                                          .toLowerCase()
                                          .indexOf(input.toLowerCase()) >= 0
                        }
                        onSearch={
                            props.onInputKeyDown ? (e) => props.onInputKeyDown(e, name) : (e) => {}
                        }
                    >
                        {select_options}
                    </Select>
                )}
            </Form.Item>
        </>
    );
};

const FormSelectTime = (props: any) => {
    const { getFieldDecorator, label, rules, name, placeholder } = props;
    return (
        <>
            <Form.Item label={label}>
                {getFieldDecorator(name, {
                    rules: rules,
                })(<DatePicker showTime placeholder={placeholder} />)}
            </Form.Item>
        </>
    );
};

const FormRangeTime = (props: any) => {
    const { getFieldDecorator, label, rules, name } = props;
    return (
        <>
            <Form.Item label={label}>
                {getFieldDecorator(name, {
                    rules: rules,
                })(
                    <RangePicker
                        showTime={{ format: "HH:mm" }}
                        format="YYYY-MM-DD HH:mm"
                        placeholder={["Start Time", "End Time"]}
                    />
                )}
            </Form.Item>
        </>
    );
};

const FormDatePicker = (props: any) => {
    const { getFieldDecorator, label, rules, name, placeholder } = props;
    return (
        <>
            <Form.Item label={label}>
                {getFieldDecorator(name, {
                    rules: rules,
                })(<DatePicker format="DD/MM/YYYY" placeholder={placeholder} />)}
            </Form.Item>
        </>
    );
};

const CustomInputNumber = (props: any) => {
    const { placeholder, onChange, label, name } = props;
    return (
        <div className={`input-number ${name}`}>
            <div className="input-label">{label}</div>
            <InputNumber
                min={1}
                defaultValue={1}
                placeholder={placeholder}
                onChange={(e) => onChange(e, "input-number")}
            />
        </div>
    );
};

const FormInputRadio = (props: any) => {
    const { getFieldDecorator, label, rules, name, values } = props;
    let radio_options_jsx = values.map((val: any) => <Radio value={val}>{val}</Radio>);

    return (
        <>
            {name === "spare_time" ? (
                <div style={{ fontSize: 16, color: "rgba(255, 255, 255, 255)", fontWeight: 500 }}>
                    {label}
                </div>
            ) : (
                <></>
            )}
            <Form.Item label={name === "spare_time" ? null : label}>
                {getFieldDecorator(name, {
                    rules: rules,
                })(
                    <Radio.Group
                        id={name}
                        key={name}
                        onChange={(e) => props.onRadioChange ? props.onRadioChange(e, name) : null}
                    >
                        {radio_options_jsx}
                    </Radio.Group>
                )}
            </Form.Item>
        </>
    );
};

const FormInputNumber = (props: any) => {
    const { getFieldDecorator } = props;
    const { name, label, placeholder, rules, defaultValue } = props;

    return (
        <>
            <Form.Item label={label}>
                {getFieldDecorator(`${name}`, {
                    initialValue: defaultValue,
                    rules: rules,
                })(
                    <InputNumber
                        className="form-input-number"
                        min={0}
                        id={name}
                        placeholder={placeholder}
                    />
                )}
            </Form.Item>
        </>
    );
};

const FormInputTimePicker = (props: any) => {
    const { getFieldDecorator } = props;
    const { name, label, placeholder, config, format } = props;

    return (
        <>
            <Form.Item label={label}>
                {getFieldDecorator(
                    `${name}`,
                    config
                )(<TimePicker format={format} placeholder={placeholder} />)}
            </Form.Item>
        </>
    );
};

const FormInputSelectMultiple = (props: any) => {
    const { getFieldDecorator, label, rules, name, options, placeholder } = props;

    let select_options;

    if (name === "mentors") {
        select_options = options.map((op: any, idx: any) => (
            <Option value={op.uid} key={idx}>
                {op.userName}
            </Option>
        ));
    } else if (name === "extra_mentors") select_options = props.select_options;
    else {
        select_options = options.map((op: any, idx: any) => (
            <Option value={op} key={idx}>
                {op}
            </Option>
        ));
    }

    return (
        <>
            <Form.Item label={label}>
                {getFieldDecorator(name, {
                    rules: rules,
                })(
                    <Select
                        mode={"multiple"}
                        placeholder={placeholder}
                        onChange={(value) => 
                            props.onSelectChange
                                ? props.onSelectChange(value, name)
                                : null
                        }
                    >
                        {select_options}
                    </Select>
                )}
            </Form.Item>
        </>
    );
};

export {
    FormInput,
    FormInputMobile,
    FormInputSelect,
    FormInputAutoCompleteRev,
    FormSelectTime,
    FormRangeTime,
    CustomInputNumber,
    FormDatePicker,
    FormInputRadio,
    FormInputNumber,
    FormInputTimePicker,
    FormInputSelectMultiple,
};

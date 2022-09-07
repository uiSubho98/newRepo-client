import React, { useState } from "react";
// import { ReactNode } from "react";
import { Form, Input, InputNumber, Radio, Select } from "antd";
// import { Upload } from "antd";
import { FormComponentProps } from "antd/lib/form/Form";
// import axios from "axios";
import "./formInput.css";
// import * as Constants from "../../constants/constants";
// import { G_API_URL } from "../../constants/constants";
// import { RadioChangeEvent } from "antd/lib/radio";

const { Option } = Select;

interface FormInputProps extends FormComponentProps {
    initialValue?: any
    revertLocation: () => void
    centerRadioChange?: () => void
    message?: string, 
    type?: string, 
    name: string, 
    label?: string, 
    placeholder?: string, 
    isRequired?: boolean, 
    hideStar?: string,
    disabled?: boolean
}

interface FormInputState {
    to_display: boolean,
    value2: string,
    value3: string
}

const FormInput = (props: FormInputProps) => {
    const defaultState: FormInputState = {
        to_display: false,
        value2: "online",
        value3: ""
    }

    const [state, setState] = useState<FormInputState>(defaultState);

    const getInitialValue = () => {
        if (props.initialValue) {
            return props.initialValue;
        } else {
            return null;
        }
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let city = e.target.value;
        city = city.toLowerCase();
        if (city === "bengaluru" || city === "bangalore" || city === "hyderabad") {
            setState(previousState => ({
                ...previousState,
                to_display: true 
            }));
        } else {
            if (state.to_display) {
                setState(previousState => ({
                    ...previousState, 
                    to_display: true 
                }));
                props.revertLocation();
            }
        }
    };

    // centerRadioChange = e => {
    //     this.setState({
    //         value2: e.target.value
    //     });
    // };

    const testModeRadioChange = (e: any) => {
        setState(previousState => ({
            ...previousState,
            value3: e.target.value
        }));
    };

    const netSpeed = (getFieldDecorator: any) => {
        const options = [
            { label: "Yes, I have", value: "yes" },
            { label: "No, I Don't", value: "no" }
        ];

        if (state.value2 === "Online") {
            return (
                <>
                    <div className="centre-selection-info">
                        Do you have access to a stable/reliable internet connection with a minimum
                        speed of 1 Mbps?
                    </div>

                    <Form.Item colon={false} required={false}>
                        {getFieldDecorator(
                            `net_speed`,
                            {
                                initialValue: "no"
                            },

                            {
                                rules: [{ required: false, message: { message } }]
                            }
                        )(<Radio.Group options={options} onChange={testModeRadioChange} />)}
                    </Form.Item>
                </>
            );
        }
    };

    const displayAtCentre = (name: string, getFieldDecorator: any) => {
        const options = [
            { label: "Online", value: "Online" },
            { label: "At the Centre", value: "At the Centre" }
        ];

        if (name === "location" && state.to_display) {
            return (
                <>
                    <div className="centre-selection-info">
                        You can take this program from our centre in your city too. Please let us
                        know your preference. Know more
                    </div>

                    <Form.Item colon={false} required={false}>
                        {getFieldDecorator(
                            `test_location`,
                            {
                                initialValue: "Online"
                            },
                            {
                                rules: [{ required: false, message: { message } }]
                            }
                        )(
                            <Radio.Group
                                options={options}
                                onChange={props.centerRadioChange}
                            />
                        )}
                    </Form.Item>
                </>
            );
        }
    };

    const { getFieldDecorator } = props.form;
    const { message, type, name, label, placeholder, isRequired, hideStar } = props;

    let classes = "";

    if (!hideStar) {
        if (isRequired) {
            classes = "l-star";
        } else {
            classes = "no-l-star";
        }
    } else {
        classes = "no-l-star";
    }

    return (
        <>
            <label htmlFor={name} className={classes}>
                {label}
            </label>
            <Form.Item colon={false} required={false}>
                {getFieldDecorator(`${name}`, {
                    initialValue: getInitialValue(),
                    rules: [{ type: type }, { required: isRequired, message: { message } }]
                })(
                    <div>
                        <Input
                            className="form-input-no-icon"
                            onChange={onChange}
                            defaultValue={getInitialValue()}
                            disabled={props.disabled}
                            id={name}
                            placeholder={placeholder}
                        />
                    </div>
                )}
            </Form.Item>

            {displayAtCentre(name, getFieldDecorator)}
            {netSpeed(getFieldDecorator)}
        </>
    );
}

// Radio Button ANT DESIGN
// interface FormInputRadioProps extends FormComponentProps {
//     getFieldDecorator?: any
//     message: string
//     name: string
// }

// interface FormInputRadioState {
//     value2: string
// }

// const FormInputRadio = (props: FormInputRadioProps) => {
//     const defaultState: FormInputRadioState = {
//         value2: "Yes"
//     }

//     const [state, setState] = useState<FormInputRadioState>(defaultState);

//     const onChange2 = (e: any) => {
//         setState(previousState => ({
//             ...previousState,
//             value2: e.target.value
//         }));
//     };

//     const options = [
//         { label: "Yes", value: "Yes" },
//         { label: "No", value: "No" }
//     ];

//     const { getFieldDecorator } = props;
//     const { message, name } = props;

//     return (
//         <Form.Item colon={false} required={false}>
//             {getFieldDecorator(`${name}`, {
//                 rules: [{ required: true, message: { message } }]
//             })(<Radio.Group options={options} onChange={onChange2} />)}
//         </Form.Item>
//     );
// }

interface FormInputMobileProps {
    getFieldDecorator?: any,
    message: string, 
    name: string, 
    label: string, 
    placeholder: string, 
    defaultValue: string
}

const FormInputMobile: React.FC<FormInputMobileProps> = (props) => {
    const prefixSelector = props.getFieldDecorator("prefix", {
        initialValue: "91"
    })(
        <Select style={{ width: 70 }}>
            <Option value="91">+91</Option>
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
            <Option value="52">+52</Option>
        </Select>
    );
    const { getFieldDecorator } = props;
    const { message, name, label, placeholder, defaultValue } = props;
    // @ts-ignore
    const validatePassword = (rule, value, callback) => {
        if (value && isNaN(value)) {
            callback("Invalid number entered!");
        } else {
            callback();
        }
    };
    return (
        <>
            <label htmlFor={name} className="l-star">
                {label}
            </label>
            <Form.Item htmlFor={name} colon={false} required={false}>
                {getFieldDecorator(`${name}`, {
                    initialValue: defaultValue,
                    rules: [
                        { validator: validatePassword },
                        {
                            required: true,
                            message: { message }
                        }
                    ]
                })(
                    <Input
                        id={name}
                        maxLength={10}
                        placeholder={placeholder}
                        addonBefore={prefixSelector}
                    />
                )}
            </Form.Item>
        </>
    );
};

// Years Select Dropdown

// let getYear = () => {
//     let finalYear = new Date().getFullYear() + 10;
//     let yearsArray = [];
//     let initialYear = 1980;
//     for (var i = initialYear; i <= finalYear; i++) {
//         yearsArray.push(initialYear++);
//     }

//     return yearsArray;
// }

// interface FormInputYearsProps extends FormComponentProps {
//     getFieldDecorator?: any,
//     message: string, 
//     name: string, 
//     label: string
// }

// const FormInputYears = (props: FormInputYearsProps) => {

//     const { getFieldDecorator } = props;
//     const { message, name, label } = props;

//     return (
//         <>
//             <label htmlFor={name} className="l-star">
//                 {label}
//             </label>
//             <Form.Item htmlFor={name} colon={false} required={false}>
//                 {getFieldDecorator(`${name}`, {
//                     rules: [
//                         {
//                             required: true,
//                             message: { message }
//                         }
//                     ]
//                 })(
//                     <Select
//                         placeholder="Select a year"
//                         optionFilterProp="children"
//                         filterOption={(input, option) =>
//                             option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
//                         }
//                     >
//                         {
//                             getYear().map((item, index) => {
//                                 return <Option key={index + 1} value={item}>{item}</Option>
//                             })
//                         }
//                     </Select>
//                 )}
//             </Form.Item>
//         </>
//     );
// };

// Password Input Field

interface FormInputPswdProps {
    getFieldDecorator?: any
    message: string, 
    name: string, 
    label: string, 
    placeholder: string, 
    isRequired: boolean, 
    getInValue?: any,
    value?: string
}

const FormInputPswd = (props: FormInputPswdProps) => {
    const { getFieldDecorator } = props;
    const { message, name, label, placeholder, isRequired, getInValue } = props;

    let classes = "";

    if (isRequired) {
        classes = "l-star";
    } else {
        classes = "no-l-star";
    }

    return (
        <>
            <label htmlFor={name} className={classes}>
                {label}
            </label>
            <Form.Item htmlFor={name} colon={false} required={false}>
                {getFieldDecorator(`${name}`, {
                    rules: [
                        {
                            required: true,
                            message: { message }
                        }
                    ]
                })(
                    <Input.Password
                        id={name}
                        placeholder={placeholder}
                        onChange={getInValue}
                    />
                )}
            </Form.Item>
        </>
    );
};


// // Dropdown Field Component (Pure Functional)
// interface FormInputDropDownProps {
//     getFieldDecorator?: any
//     message: string,
//     name: string,
//     label: string,
//     values: [],
//     defaultValue: boolean,
// }

// const FormInputDropDown = (props: FormInputDropDownProps) => {
//     const { getFieldDecorator } = props;
//     const { message, name, label, values, defaultValue } = props;
//     return (
//         <>
//             <label htmlFor={name} className="l-star">
//                 {label}
//             </label>
//             <Form.Item
//                 htmlFor={name}
//                 className="form-input-drop-down"
//                 colon={false}
//                 required={false}
//             >
//                 {getFieldDecorator(`${name}`, {
//                     initialValue: defaultValue,
//                     rules: [{ required: true, message: { message } }]
//                 })(
//                     <Select placeholder="Select" name={name} style={{ height: "50px" }}>
//                         {values.map((value, index) => {
//                             return (
//                                 <Option key={index + 1} value={value}>
//                                     {value}
//                                 </Option>
//                             );
//                         })}
//                     </Select>
//                 )}
//             </Form.Item>
//         </>
//     );
// };

// Upload resume Functionality

// const FormFileUpload = ({ message: msg, name, label, values, placeholder, getFieldDecorator }) => {
//     const props = {
//         customRequest({
//             action,
//             data,
//             file,
//             filename,
//             headers,
//             onError,
//             onProgress,
//             onSuccess,
//             withCredentials
//         }) {
//             var formData = new FormData();
//             formData.append("image", file);
//             formData.append("file_source", "progradRegister");

//             let api_file_upload = Constants.G_API_URL + "fileupload/image-upload/";

//             axios
//                 .post(api_file_upload, formData, {
//                     headers: {
//                         "Content-Type": "multipart/form-data"
//                     }
//                 })
//                 .then(result => {
//                     // Do somthing
//                     onSuccess(data.response, file);
//                     let cookie_consent = localStorage.getItem('Nocookie');
//                     localStorage.clear();
//                     localStorage.setItem('Nocookie', cookie_consent);
//                     localStorage.setItem("url", result.data.file);
//                     message.success("Resume uploaded Successfully");
//                 })
//                 .catch(err => {
//                     // Do somthing
//                     console.log(err);
//                 });
//         }
//     };

//     return (
//         <>
//             <label htmlFor={name} className="no-l-star">
//                 {label}
//             </label>
//             <Form.Item
//                 htmlFor={name}
//                 className="form-input-drop-down"
//                 colon={false}
//                 required={false}
//             >
//                 <Upload
//                     {...props}
//                     name={name}
//                     showUploadList={false}
//                     accept={
//                         ".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//                     }
//                 >
//                     <div className="button-secondary btn-border-upload">{placeholder}</div>
//                 </Upload>
//             </Form.Item>
//         </>
//     );
// };

// // Select with AutoSearch Component
// interface FormInputAutoCompleteProps extends FormComponentProps {
//     getFieldDecorator?: any
//     message: any
//     name: string
//     label?: () => void
//     placeholder: string,
//     isRequired: string,
//     defaultValue: string,
// }

// class FormInputAutoComplete extends Component<FormInputAutoCompleteProps, {}> {
//     x = 0;
//     api_getColleges = G_API_URL + "colleges/";

//     state = {
//         colleges: [],
//         option_display: false,
//         op_list: [],
//         value: undefined
//     };

//     others_college = ["Others"];
//     onInputKeyDown = e => {
//         let op_list = [];
//         axios
//             .get(this.api_getColleges, {
//                 params: { name: e.target.value }
//             })
//             .then(response => {
//                 let colleges = response.data;

//                 colleges = colleges.data.map(item => item.name + ", " + item.city);
//                 op_list = [];
//                 this.setState({ op_list });

//                 if (colleges.length === 0) this.setState({ op_list: this.others_college });
//                 else {
//                     op_list = [...colleges];
//                     this.setState({ op_list, colleges });
//                 }
//             })
//             .catch(err => {
//                 console.log(err);
//             });
//     };

//     render() {
//         const { getFieldDecorator } = this.props;
//         const { message, name, label, placeholder, isRequired, defaultValue } = this.props;
//         let classes = "";

//         if (isRequired) {
//             classes = "l-star";
//         } else {
//             classes = "no-l-star";
//         }

//         const options = this.state.op_list.map(item => <Option key={item}>{item}</Option>);
//         return (
//             <>
//                 <label htmlFor={name} className={classes}>
//                     {label}
//                 </label>
//                 <Form.Item colon={false} required={false}>
//                     {getFieldDecorator(`${name}`, {
//                         initialValue: defaultValue,
//                         rules: [{ required: isRequired, message: { message } }]
//                     })(
//                         <Select
//                             showSearch
//                             defaultActiveFirstOption={false}
//                             filterOption={false}
//                             notFoundContent={null}
//                             placeholder={placeholder}
//                             onInputKeyDown={this.onInputKeyDown}
//                         >
//                             {options}
//                         </Select>
//                     )}
//                 </Form.Item>
//             </>
//         );
//     }
// }

interface FormInputNumberProps {
    getFieldDecorator?: any
    message: any
    name: string
    label?: () => void
    placeholder: string,
    isRequired: string,
    defaultValue: string,
}

const FormInputNumber = (props: FormInputNumberProps) => {
    const { getFieldDecorator } = props;
    const { message, name, label, placeholder, isRequired, defaultValue } = props;
    let classes = "";

    if (isRequired) {
        classes = "l-star";
    } else {
        classes = "no-l-star";
    }

    return (
        <>
            <label htmlFor={name} className={classes}>
                {label}
            </label>
            <Form.Item colon={false} required={false}>
                {getFieldDecorator(`${name}`, {
                    initialValue: defaultValue,
                    rules: [{ required: isRequired, message: { message } }]
                })(
                    <InputNumber
                        className="form-input-number"
                        min={1980}
                        id={name}
                        placeholder={placeholder}
                    />
                )}
            </Form.Item>
        </>
    );
};

export {
    FormInput,
    FormInputMobile,
    // FormInputDropDown,
    // FormFileUpload,
    // FormInputAutoComplete,
    // FormInputRadio,
    FormInputNumber,
    FormInputPswd,
    // FormInputYears
};

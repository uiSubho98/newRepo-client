import { Button, Form, Input, Radio, Select, Upload } from "antd";
import React, { FormEvent, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Layout from "../../components/Layout";
import { useHistory } from 'react-router';
import { check_login, login_user } from "../../utils/login.util";
import { G_API_URL } from "../../constants/constants";
import { __getFirstName, __getProfilePicture, __getToken, __getUID } from "../../utils/user-details.util";
import axios, { AxiosResponse } from "axios";
import { RcCustomRequestOptions } from "antd/lib/upload/interface";
import ImgCrop from "antd-img-crop";
import { FormComponentProps } from "antd/lib/form";
import DegreeDropDown from "../../components/ProfileOld/DegreeDropDown";
import StreamDropDown from "../../components/ProfileOld/StreamDropDown";
import { openNotification } from "../../utils/common.util";
const { Option } = Select;


interface SetupProfileProps extends FormComponentProps {
    
}

interface ISetupProfileForm {
    college: string
    company: string
    degree: string
    designation: string
    firstName: string
    githubUrl: string
    isWorking: boolean
    lastName: string
    linkedinUrl: string
    stream: string
    website: string
    yop: string
}

interface IProfile {
    firstName: string
    lastName: string
    website: string
    linkedinUrl: string
    githubUrl: string
    company: string
    designation: string
    college: string
    yop: string
    degree: string
    stream: string
}

function getBase64(img: any, callback: any) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

const SetupProfileForm = (props: SetupProfileProps) => {
    const [imageUrl, setImageUrl] = useState<string>(__getProfilePicture());
    const [imageFile, setImageFile] = useState<any>();
    const [isWorking, setIsWorking] = useState<boolean>(true);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [profile, setProfile] = useState<IProfile>({
        firstName: "",
        lastName: "",
        website: "",
        linkedinUrl: "",
        githubUrl: "",
        company: "",
        designation: "",
        college: "",
        yop: "",
        degree: "",
        stream: ""
    });

    const {getFieldDecorator} = props.form;
    const history = useHistory();
    if(!check_login()) {
        history.push('/login');
    }

    // Check if user profile is not already setup
    useEffect(() => {
        axios.get(
            G_API_URL+"profile/?uid="+__getUID()
        ).then((response: AxiosResponse) => {
            const resp = response.data;
            if(resp.status === 1) {
                history.replace('/profile/'+__getUID());
            } else if (resp.status === 2) {
                setProfile(previousState => ({
                    ...previousState,
                    firstName: resp.profile.firstName,
                    lastName: resp.profile.lastName,
                    website: resp.profile.website,
                    linkedinUrl: resp.profile.linkedinUrl,
                    githubUrl: resp.profile.githubUrl,
                    company: resp.profile.company,
                    designation: resp.profile.designation,
                    college: resp.profile.college,
                    yop: resp.profile.yop,
                    degree: resp.profile.degree,
                    stream: resp.profile.stream
                }));
                // if(resp.profile.profilePic !== undefined) {
                    // setImageUrl(resp.profile.profilePic)
                // }
                setIsWorking(resp.profile.isWorking);
            }
        });
    }, [history]);

    const handleUpload = (req: RcCustomRequestOptions) => {
        // Get Base64 to preview Thumbnail
        getBase64(req.file, (imageUrl: any) => {
            setImageUrl(imageUrl)
            setImageFile(req.file)
        });
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.form.validateFields((err: null | object, values: ISetupProfileForm) => {
            if (!err) {
                // Set Button Loading
                setLoading(true);
                const data = new FormData();
                data.append('firstName', values.firstName);
                data.append('lastName', values.lastName);
                data.append('website', values.website);
                data.append('linkedinUrl', values.linkedinUrl);
                data.append('githubUrl', values.githubUrl);
                data.append('isWorking', values.isWorking.toString());
                data.append('company', values.company);
                data.append('designation', values.designation);
                data.append('college', values.college);
                data.append('yop', values.yop);
                data.append('degree', values.degree);
                data.append('stream', values.stream);
                
                if(imageFile) {
                    imageFile !== undefined && data.append('file', imageFile);
                    imageFile && data.append('fileName', imageFile.name);
                }
                // Save profile information
                axios.post(G_API_URL+"profile/setup", data,{
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: __getToken()
                    }
                }).then((response: AxiosResponse) => {
                    const resp = response.data;
                    if(resp.status) {
                        // Set Loading False
                        setLoading(false);
                        openNotification('success', "Profile setup successfully", 3);

                        // Update user token
                        login_user({token: resp.token});
                        // Redirect to profile
                        history.replace('/profile/'+__getUID());
                    } else {
                        setLoading(false);
                        openNotification('fail', resp.message, 0);
                    }
                }).catch(err => {
                    console.log(err);
                    setLoading(false);
                    openNotification('fail', err.message, 0);
                });
            } else {
                console.log(err)
            }
        })
    }

    const getYearOfGraduation = () => {
        let yearOptions = [];
        let maxYear = new Date().getFullYear() + 4;
        for (let i = 2010; i <= maxYear; i++) {
            yearOptions.push(<Option key={i} value={i}>{i}</Option>)
        }
        return yearOptions;
    }

    let isDefaultProfilePic = false;
    if(imageUrl === "https://cdn.prograd.org/upp/default.png") {
        isDefaultProfilePic = true;
    }

    return (
        <>
        <Layout>
            <Helmet>
                <title>ProGrad | Setup Profile</title>
            </Helmet>
            <div className="setup-profile-wrapper g-d g-col-1 g-h-c tb-pad-d lr-pad-d tb-pad-m lr-pad-m">
                <div className="setup-profile-container">
                    <h3 className="text-xl font-heading title text-c-m">Set up your profile</h3>
                    <div className="f-d f-h-sb f-vt-m">
                        <div className="left-pane f-m f-vt-m f-v-c-m">
                        {
                            !isDefaultProfilePic
                            ?
                            <img src={imageUrl} alt="avatar" className="avatar" />
                            :
                            <div className="f-d f-h-c f-v-c img-skeleton default-avatar">
                                { __getFirstName().charAt(0).toUpperCase() }
                            </div>
                        }
                        <ImgCrop>
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader f-d f-h-c"
                                showUploadList={false}
                                customRequest={handleUpload}
                            >
                                <div className="add-photo-btn text-regular">
                                    Add photo
                                </div>
                            </Upload>
                        </ImgCrop>
                        </div>
                        <div className="right-pane">
                            <Form onSubmit={handleSubmit} className="setup-profile-form">
                                <div className="f-d col-2 f-vt-m">
                                    <div className="form-input w-100">
                                        <Form.Item>
                                            <div className="text-small text-faded-2 input-label">First Name<span className="text-tomato">*</span></div>
                                            {getFieldDecorator('firstName', {
                                                rules: [{ required: true, message: 'First name is required!' }],
                                                initialValue: profile.firstName
                                            })(
                                                <Input type="text" placeholder="First Name" />,
                                            )}
                                        </Form.Item>
                                    </div>
                                    <div className="form-input w-100">
                                        <Form.Item>
                                            <div className="text-small text-faded-2 input-label">Last Name<span className="text-tomato">*</span></div>
                                            {getFieldDecorator('lastName', {
                                                rules: [{ required: true, message: 'Last name is required!' }],
                                                initialValue: profile.lastName
                                            })(
                                                <Input type="text" placeholder="Last Name" />,
                                            )}
                                        </Form.Item>
                                    </div>
                                </div>
                                <div className="f-d">
                                    <div className="form-input w-100">
                                        <Form.Item>
                                            <div className="text-small text-faded-2 input-label">Website/Portfolio</div>
                                            {getFieldDecorator('website', {
                                                initialValue: profile.website
                                            })(
                                                <Input type="text" placeholder="Link to codepen or your portfolio website" />,
                                            )}
                                        </Form.Item>
                                    </div>
                                </div>
                                <div className="f-d">
                                    <div className="form-input w-100">
                                        <Form.Item>
                                            <div className="text-small text-faded-2 input-label">LinkedIn profile</div>
                                            {getFieldDecorator('linkedinUrl',{
                                                initialValue: profile.linkedinUrl
                                            })(
                                                <Input type="text" placeholder="www.linkedin.com/profile" />,
                                            )}
                                        </Form.Item>
                                    </div>
                                </div>
                                <div className="f-d">
                                    <div className="form-input w-100">
                                        <Form.Item>
                                            <div className="text-small text-faded-2 input-label">GitHub profile</div>
                                            {getFieldDecorator('githubUrl',{
                                                initialValue: profile.githubUrl
                                            })(
                                                <Input type="text" placeholder="www.github.com/profile" />,
                                            )}
                                        </Form.Item>
                                    </div>
                                </div>
                                <h5 className="font-heading text-big section-heading">Professional Information</h5>
                                <div className="f-d">
                                    <div className="form-input w-100">
                                        <Form.Item>
                                            <div className="text-small text-faded-2 input-label">Are you currently working?<span className="text-tomato">*</span></div>
                                            {getFieldDecorator('isWorking', {
                                                rules: [
                                                    { required: true, message: 'Please select an option!' },
                                                ],
                                                initialValue: isWorking
                                            })(
                                                <Radio.Group onChange={(e) => {setIsWorking(e.target.value)}}>
                                                    <Radio value={true} className="text-regular radio">Yes</Radio>
                                                    <Radio value={false} className="text-regular radio">No</Radio>
                                                </Radio.Group>,
                                            )}
                                        </Form.Item>
                                    </div>
                                </div>
                                {isWorking &&
                                    <div className="f-d col-2 f-vt-m">
                                        <div className="form-input w-100">
                                            <Form.Item>
                                                <div className="text-small text-faded-2 input-label">Company Name</div>
                                                {getFieldDecorator('company',{
                                                initialValue: profile.company
                                            })(
                                                    <Input type="text" placeholder="ACME Corp." />,
                                                )}
                                            </Form.Item>
                                        </div>
                                        <div className="form-input w-100">
                                            <Form.Item>
                                                <div className="text-small text-faded-2 input-label">Role</div>
                                                {getFieldDecorator('designation',{
                                                initialValue: profile.designation
                                            })(
                                                    <Input type="text" placeholder="Your designation" />,
                                                )}
                                            </Form.Item>
                                        </div>
                                    </div>
                                }
                                <h5 className="font-heading text-big section-heading">Educational Information</h5>
                                <div className="f-d col-2 f-vt-m">
                                    <div className="form-input w-300">
                                        <Form.Item>
                                            <div className="text-small text-faded-2 input-label">College Name<span className="text-tomato">*</span></div>
                                            {getFieldDecorator('college', {
                                                rules: [{required: true, message: 'College name cannot be empty'}],
                                                initialValue: profile.college
                                            })(
                                                <Input type="text" placeholder="Enter college name" />,
                                            )}
                                        </Form.Item>
                                    </div>
                                    <div className="form-input w-300">
                                        <Form.Item>
                                            <div className="text-small text-faded-2 input-label">Year of graduation<span className="text-tomato">*</span></div>
                                            {getFieldDecorator('yop', {
                                                rules: [{required: true, message: 'Please select your year of graduation'}],
                                                initialValue: profile.yop
                                            })(
                                                <Select placeholder="Select">
                                                    {getYearOfGraduation()}
                                                </Select>
                                            )}
                                        </Form.Item>
                                    </div>
                                </div>
                                <div className="f-d col-2 f-vt-m">
                                    <div className="form-input w-300">
                                        <DegreeDropDown
                                            message="Degree cannot be empty!"
                                            name="degree"
                                            degree = {profile.degree}
                                            placeholder="Degree"
                                            getFieldDecorator={getFieldDecorator}
                                            isRequired={true}
                                        />
                                    </div>
                                    <div className="form-input w-300">
                                        <StreamDropDown
                                            message="Stream cannot be empty!"
                                            name="stream"
                                            stream = {profile.stream}
                                            placeholder="Stream"
                                            getFieldDecorator={getFieldDecorator}
                                            isRequired={true}
                                        />
                                    </div>
                                </div>
                                <Button type="primary" htmlType="submit" className="default-blue-btn save-btn" disabled={isLoading}>
                                    Save
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
        <style jsx>
        {`
            .setup-profile-wrapper .setup-profile-container {
                width: 70%;
            }

            .setup-profile-wrapper .title {
                margin-bottom: var(--peaky-gap-64);
            }

            .setup-profile-wrapper .left-pane .img-skeleton {
                height: 200px;
                width: 200px;
                border: 2px solid var(--snowfall);
                border-radius: 50%;
            }

            .setup-profile-wrapper .left-pane .avatar {
                height: 200px;
                width: 200px;
                border: 2px solid var(--snowfall);
                border-radius: 50%;
            }

            .setup-profile-wrapper .left-pane .default-avatar {
                background-color: var(--primary);
                font-size: 100px;
                font-weight: 400;
                font-family: Inconsolata;
            }

            .setup-profile-wrapper .left-pane .avatar-uploader {
                margin-top: var(--peaky-gap-32);
            }

            .setup-profile-wrapper .left-pane .ant-upload.ant-upload-select-picture-card {
                border: 1px solid white;
                margin: 0;
                height: auto;
                width: auto;
                background: transparent;
                color: var(--smoke);
                border-radius: 2px;
            }

            .setup-profile-wrapper .left-pane .ant-upload.ant-upload-select-picture-card > .ant-upload {
                padding: 14px 32px;
            }

            .setup-profile-wrapper .right-pane {
                flex: 1;
                margin-left: var(--peaky-gap-128);
            }

            .setup-profile-wrapper .right-pane .form-input {
                margin-bottom: var(--peaky-gap-32);
            }

            .setup-profile-wrapper .right-pane .input-label {
                font-weight: 700;
                margin-bottom: var(--peaky-gap-8);
            }

            .setup-profile-wrapper .right-pane .form-input .ant-input {
                color: var(--dove);
                background-color: #383838;
                padding: 14px 16px;
                font-size: 16px;
                border: none;
                border-radius: 2px;
                height: auto;
                outline: none;
            }
            
            .setup-profile-wrapper .right-pane .form-input .ant-input:focus {
                box-shadow: 0 0 0 2px var(--primary);
                outline: none;
            }
            
            .setup-profile-wrapper .right-pane .form-input.w-300 {
                width: 300px;
            }
            
            .setup-profile-wrapper .right-pane .col-2 > div:not(:first-child) {
                margin-left: var(--peaky-gap-64);
            }
            
            .text-tomato {
                color: var(--tomato);
            }
            
            .setup-profile-wrapper .right-pane .section-heading {
                margin-top: var(--peaky-gap-32);
                margin-bottom: var(--peaky-gap-32);
            }

            .setup-profile-wrapper .right-pane .radio:not(:first-child) {
                margin-left: var(--peaky-gap-64);
            }

            .setup-profile-wrapper .right-pane .ant-radio-inner {
                border: 2px solid var(--primary);
                background-color: var(--spider);
                height: 20px;
                width: 20px;
            }

            .setup-profile-wrapper .right-pane .ant-radio-inner::after {
                height: 10px;
                width: 10px;
            }

            .setup-profile-wrapper .right-pane .ant-select-selection--single {
                height: 50px;
                font-weight: 300;
                color: var(--dove);
                background-color: #383838;
                border-radius: var(--peaky-br-2);
            }

            .setup-profile-wrapper .right-pane .ant-select-selection__placeholder {
                color: var(--dove);
                opacity: 0.38;
            }

            .setup-profile-wrapper .right-pane .ant-select-selection--single {
                padding: unset;
                font-size: 16px;
            }

            .setup-profile-wrapper .right-pane .ant-select-selection__rendered {
                line-height: 50px;
            }

            .setup-profile-wrapper .right-pane .ant-select-selection {
                border: unset;
                box-shadow: none;
            }

            .setup-profile-wrapper .right-pane .ant-select-arrow .anticon  {
                color: var(--sandstone);
            }

            .ant-select-dropdown {
                background-color: var(--spider)!important;
            }

            .ant-select-dropdown-menu-item {
                color: var(--dove) !important;
            }
            
            .ant-select-dropdown-menu-item-selected,
            .ant-select-dropdown-menu-item-active {
                background-color: var(--charcoal) !important;
            }

            .ant-empty-description {
                color: var(--dove);
            }

            .ant-form-item {
                margin-bottom: 0;
            }

            .ant-form-item-control {
                line-height: 1.5;
            }

            .setup-profile-wrapper .right-pane .save-btn {
                height: 50px !important;
                margin-top: var(--peaky-gap-32);
            }

            @media only screen and (max-device-width: 760px) {
                .setup-profile-wrapper .setup-profile-container {
                    width: 100%;
                }

                .setup-profile-wrapper .title {
                    margin-bottom: var(--peaky-gap-32);
                }

                .setup-profile-wrapper .right-pane {
                    margin-left: 0;
                    margin-top: var(--peaky-gap-32);
                }

                .setup-profile-wrapper .right-pane .col-2 > div:not(:first-child) {
                    margin-left: 0;
                }
            }
        `}
        </style>
        </>
    )
}

const SetupProfile = Form.create<SetupProfileProps>({ name: "" })(SetupProfileForm);
export default SetupProfile;
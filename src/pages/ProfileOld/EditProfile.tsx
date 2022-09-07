import { Button, Form, Input, Popover, Radio, Select, Upload } from "antd";
import React, { FormEvent, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Layout from "../../components/Layout";
import { useHistory } from 'react-router';
import { check_login, login_user } from "../../utils/login.util";
import { G_API_URL } from "../../constants/constants";
import { __getFirstName, __getToken, __getUID } from "../../utils/user-details.util";
import axios, { AxiosResponse } from "axios";
import { RcCustomRequestOptions } from "antd/lib/upload/interface";
import ImgCrop from "antd-img-crop";
import { FormComponentProps } from "antd/lib/form";
import DegreeDropDown from "../../components/ProfileOld/DegreeDropDown";
import StreamDropDown from "../../components/ProfileOld/StreamDropDown";
import { openNotification } from "../../utils/common.util";
import { IProfile } from "../../components/ProfileOld/profile";
import Spinner from "../../components/Spinner/spinner";

const { Option } = Select;


interface EditProfileProps extends FormComponentProps {
    
}

interface IEditProfile extends IProfile {
    email: string
    mobileNumber: string
}

interface IEditProfileForm {
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

function getBase64(img: any, callback: any) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

const EditProfileForm = (props: EditProfileProps) => {
    const [imageUrl, setImageUrl] = useState<string>("");
    const [imageFile, setImageFile] = useState<any>();
    const [isWorking, setIsWorking] = useState<boolean>(true);
    const [isPageLoading, setPageLoading] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [isSettingActive, setSettingActive] = useState<boolean>(false);
    const [profile, setProfile] = useState<IEditProfile>({
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
        stream: "",
        isWorking: false,
        profilePic: "",
        email: "",
        mobileNumber: ""
    });

    const {getFieldDecorator} = props.form;
    const history = useHistory();
    if(!check_login()) {
        history.push('/login');
    }
    const uid = __getUID();

    const fetchProfile = () => {
        // Fetch profile data
        axios.get(
            G_API_URL+"profile/?uid=" + uid +"&mode=edit"
        ).then((response: AxiosResponse) => {
            const resp = response.data;
            if(resp.status === 1) {
                setProfile(prev => ({
                    ...prev,
                    firstName: resp.profile.firstName,
                    lastName: resp.profile.lastName,
                    website: resp.profile.website,
                    linkedinUrl: resp.profile.linkedinUrl,
                    githubUrl: resp.profile.githubUrl,
                    isWorking: resp.profile.isWorking,
                    company: resp.profile.company,
                    designation: resp.profile.designation,
                    college: resp.profile.college,
                    yop: resp.profile.yop,
                    degree: resp.profile.degree,
                    stream: resp.profile.stream,
                    profilePic: resp.profile.profilePic,
                    email: resp.profile.email,
                    mobileNumber: resp.profile.mobileNumber
                }));
                setIsWorking(resp.profile.isWorking);
                setImageUrl(resp.profile.profilePic);
                setPageLoading(false);
            } else if(resp.status === 2) {
                history.push('/setup-profile');
            } else {
                history.push('/profile');
            }
        });
    }

    // Fetch user profile
    useEffect(() => {
        setPageLoading(true);
        fetchProfile();
    }, [uid, history]);

    const handleUpload = (req: RcCustomRequestOptions) => {
        // Get Base64 to preview Thumbnail
        getBase64(req.file, (imageUrl: any) => {
            setImageUrl(imageUrl)
            setImageFile(req.file)
        });
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.form.validateFields((err: null | object, values: IEditProfileForm) => {
            if (!err) {
                // Set Button Loading
                setLoading(true);
                const data = new FormData();
                data.append('fName', values.firstName);
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
                data.append('pp', imageUrl);
                
                if(imageFile) {
                    imageFile !== undefined && data.append('file', imageFile);
                    imageFile && data.append('fileName', imageFile.name);
                }
                // Save profile information
                axios.post(G_API_URL+"profile/update", data,{
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: __getToken()
                    }
                }).then((response: AxiosResponse) => {
                    const resp = response.data;
                    if(resp.status) {
                        // Set Loading False
                        setLoading(false);
                        openNotification('success', "Profile updated successfully", 3);

                        // Update user token
                        login_user({token: resp.token});
                        // Redirect to profile
                        history.push('/profile/'+__getUID());
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

    const toggleSettings = () => {
        if(isSettingActive) {
            fetchProfile();
            setSettingActive(false);
        } else {
            setSettingActive(true);
        }
    }

    let isDefaultProfilePic = false;
    if(imageUrl === "https://cdn.prograd.org/upp/default.png") {
        isDefaultProfilePic = true;
    }

    return (
        <>
        {
            !isPageLoading?
            <Layout isSettingEnabled={isSettingActive} toggleSettings={toggleSettings}>
                <Helmet>
                    <title>ProGrad | Edit Profile</title>
                </Helmet>
                <div className="edit-profile-wrapper g-d g-col-1 g-h-c tb-pad-d lr-pad-d tb-pad-m lr-pad-m">
                    <div className="edit-profile-container">
                        <h3 className="text-xl font-heading text-c-m title">Edit profile</h3>
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
                            <Popover 
                                placement="bottom" 
                                content={(
                                    <div className="popover-wrapper">
                                        <div className="upload-photo text-small c-pointer">
                                            <ImgCrop>
                                                <Upload
                                                    name="file"
                                                    className="avatar-uploader"
                                                    showUploadList={false}
                                                    customRequest={handleUpload}
                                                >
                                                    <div className="add-photo-btn text-small">
                                                        Upload Photo
                                                    </div>
                                                </Upload>
                                            </ImgCrop>
                                        </div>
                                        <div className="remove-photo text-small text-tomato c-pointer" onClick={()=>{setImageUrl('https://cdn.prograd.org/upp/default.png')}}>Remove Photo</div>
                                    </div>
                                )} 
                                trigger="click"
                            >
                                <span className="f-d f-h-c f-v-c c-pointer change-img-btn default-black-btn" >
                                    <span className="strong-text">
                                        Change
                                    </span>
                                    <i className="icon icon-chevron-down"></i>
                                </span>
                            </Popover>
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
                                    <h5 className="font-heading text-big section-heading">Account Information</h5>
                                    <div className="f-d">
                                        <div className="form-input w-100">
                                            <Form.Item>
                                                <div className="text-small text-faded input-label">Email</div>
                                                <div className="text-regular">{profile.email} <span className="text-primary c-pointer" onClick={()=> toggleSettings()}><u>Change</u></span></div>
                                            </Form.Item>
                                        </div>
                                    </div>
                                    {   profile.mobileNumber !== "" && profile.mobileNumber !== undefined &&
                                        <div className="f-d">
                                            <div className="form-input w-100">
                                                <Form.Item>
                                                    <div className="text-small text-faded input-label">Mobile</div>
                                                    <div className="text-regular">{profile.mobileNumber} <span className="text-primary c-pointer" onClick={()=> toggleSettings()}><u>Change</u></span></div>
                                                </Form.Item>
                                            </div>
                                        </div>
                                    }
                                    <Button type="primary" htmlType="submit" className="default-blue-btn save-btn" disabled={isLoading}>
                                        Update
                                    </Button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout> :
            <Spinner />
        }
        <style jsx>
        {`
            .edit-profile-wrapper .edit-profile-container {
                width: 70%;
            }

            .edit-profile-wrapper .title {
                margin-bottom: var(--peaky-gap-64);
            }

            .edit-profile-wrapper .left-pane .img-skeleton {
                height: 200px;
                width: 200px;
                border: 2px solid var(--snowfall);
                border-radius: 50%;
            }

            .edit-profile-wrapper .left-pane .change-img-btn {
                margin: var(--peaky-gap-32) auto 0;
            }

            .avatar {
                height: 200px;
                width: 200px;
                border: 2px solid var(--snowfall);
                border-radius: 50%;
            }

            .edit-profile-wrapper .left-pane .default-avatar {
                background-color: var(--primary);
                font-size: 100px;
                font-weight: 400;
                font-family: Inconsolata;
            }

            .ant-popover-placement-bottom, .ant-popover-placement-bottomLeft, .ant-popover-placement-bottomRight {
                padding-top: 0;
            }
            .ant-popover-arrow {
                display: none;
            }
            .ant-popover-inner {
                background-color: var(--secondary-bg);
            }
            .ant-popover-inner-content {
                padding: 16px;
            }
            .ant-popover-inner .upload-photo {
                margin-bottom: var(--peaky-gap-16);
            }

            .edit-profile-wrapper .right-pane {
                flex: 1;
                margin-left: var(--peaky-gap-128);
            }

            .edit-profile-wrapper .right-pane .form-input {
                margin-bottom: var(--peaky-gap-32);
            }

            .edit-profile-wrapper .right-pane .input-label {
                font-weight: 700;
                margin-bottom: var(--peaky-gap-8);
            }

            .edit-profile-wrapper .right-pane .form-input .ant-input {
                color: var(--dove);
                background-color: #383838;
                padding: 14px 16px;
                font-size: 16px;
                border: none;
                border-radius: 2px;
                height: auto;
                outline: none;
            }
            
            .edit-profile-wrapper .right-pane .form-input .ant-input:focus {
                box-shadow: 0 0 0 2px var(--primary);
                outline: none;
            }
            
            .edit-profile-wrapper .right-pane .form-input.w-300 {
                width: 300px;
            }

            .edit-profile-wrapper .right-pane .col-2 > div:not(:first-child) {
                margin-left: var(--peaky-gap-64);
            }
            
            .text-tomato {
                color: var(--tomato);
            }
            
            .edit-profile-wrapper .right-pane .section-heading {
                margin-top: var(--peaky-gap-32);
                margin-bottom: var(--peaky-gap-32);
            }

            .edit-profile-wrapper .right-pane .radio:not(:first-child) {
                margin-left: var(--peaky-gap-64);
            }

            .edit-profile-wrapper .right-pane .ant-radio-inner {
                border: 2px solid var(--primary);
                background-color: var(--spider);
                height: 20px;
                width: 20px;
            }

            .edit-profile-wrapper .right-pane .ant-radio-inner::after {
                height: 10px;
                width: 10px;
            }

            .edit-profile-wrapper .right-pane .ant-select-selection--single {
                height: 50px;
                font-weight: 300;
                color: var(--dove);
                background-color: #383838;
                border-radius: var(--peaky-br-2);
            }

            .edit-profile-wrapper .right-pane .ant-select-selection__placeholder {
                color: var(--dove);
                opacity: 0.38;
            }

            .edit-profile-wrapper .right-pane .ant-select-selection--single {
                padding: unset;
                font-size: 16px;
            }

            .edit-profile-wrapper .right-pane .ant-select-selection__rendered {
                line-height: 50px;
            }

            .edit-profile-wrapper .right-pane .ant-select-selection {
                border: unset;
                box-shadow: none;
            }

            .edit-profile-wrapper .right-pane .ant-select-arrow .anticon  {
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

            .edit-profile-wrapper .right-pane .save-btn {
                height: 50px !important;
                margin-top: var(--peaky-gap-32);
            }

            ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
                color: rgba(255, 255, 255, 0.38);
            }
            :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
                color: rgba(255, 255, 255, 0.38);
            }
            ::-moz-placeholder { /* Mozilla Firefox 19+ */
                color: rgba(255, 255, 255, 0.38);
            }
            :-ms-input-placeholder { /* Internet Explorer 10-11 */
                color: rgba(255, 255, 255, 0.38);
            }
            ::-ms-input-placeholder { /* Microsoft Edge */
                color: rgba(255, 255, 255, 0.38);
            }
            
            ::placeholder { /* Most modern browsers support this now. */
                color: rgba(255, 255, 255, 0.38);
            }

            @media only screen and (max-device-width: 480px) {
                .edit-profile-wrapper .edit-profile-container {
                    width: 100%;
                }

                .edit-profile-wrapper .right-pane {
                    margin-left: 0;
                    margin-top: var(--peaky-gap-32);
                }

                .edit-profile-wrapper .right-pane .col-2 > div:not(:first-child) {
                    margin-left: 0;
                }
            }
        `}
        </style>
        </>
    )
}

const EditProfile = Form.create<EditProfileProps>({ name: "" })(EditProfileForm);
export default EditProfile;
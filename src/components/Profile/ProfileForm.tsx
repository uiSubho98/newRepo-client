import React, { useState } from "react";
import { useHistory } from 'react-router';
import { Button, DatePicker, Divider, Form, Input, InputNumber, Radio, Select, Upload } from "antd";
import { FormComponentProps } from "antd/lib/form/Form";
import IntlTelInput from "react-intl-tel-input";
// @ts-ignore
import { Document, Page, pdfjs } from "react-pdf";
import { InboxOutlined } from '@ant-design/icons';
import { RcCustomRequestOptions } from "antd/lib/upload/interface";
import WorkExperienceForm from "../Profile/WorkExperienceForm";
import ProjectForm from "./ProjectForm";
import ProfilePictureModal from "./ProfilePictureModal";
import ProjectCard from "./ProjectCard";
import CompanyCard from "./CompanyCard";
import { G_API_URL } from "../../constants/constants";
import { __getToken } from "../../utils/user-details.util";
import { login_user } from "../../utils/login.util";
import axios from "axios";
import moment from "moment";
import StreamDropDown from "./StreamDropDown";
import CollegeDropDown from "./CollegeDropDown";
import { openNotification } from "../../utils/common.util";
import InterpersonalSkills from "../../json/interpersonal_skills.json";
import Technologies from "../../json/technologies.json";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
interface IProps extends FormComponentProps {
    activeStep: number;
    degrees: any;
    states: any;
    progress: number;
    profile: any;
    programId: string;
    setActiveStep: Function;
}

const { TextArea } = Input;
const { Option } = Select;
const { Dragger } = Upload;

const ProfileForm = (props: IProps) => {
    const { 
        form, 
        activeStep, 
        degrees, 
        states, 
        progress, 
        profile, 
        setActiveStep, 
        programId 
    } = props;
    const { getFieldDecorator, getFieldValue } = form;

    const isProfileSetup = profile.isProfileSetup;

    const defaultProfilePicture = "https://cdn.prograd.org/upp/default.png";

    const defaultState = {
        profilePicture: profile.profilePic,
        profilePictureFile: [],
        isProfilePicModalVisible: false,
        userNumber: {
            prefix: profile.prefix ? profile.prefix : "",
            mobileNumber: profile.mobileNumber ? profile.mobileNumber : ""
        },
        altUserNumber: {
            prefix: profile.altPrefix ? profile.altPrefix : "",
            mobileNumber: profile.altMobileNumber ? profile.altMobileNumber : ""
        },
        numberNotEntered: false,
        isNumberValid: true,
        projects: profile.projects,
        companies: profile.workStatus ? profile.companies : [],
        isAddProjectCardActive: !isProfileSetup,
        isAddCompanyCardActive: !isProfileSetup,
        activeProjectId: undefined,
        activeCompanyId: undefined,
        isLoading: false,
        resume: profile.resume ? profile.resume : "",
        resumeFile:[]
    }

    const [ state, setState ] = useState(defaultState);

    const history = useHistory();

    const source = localStorage.getItem("source");
    const medium = localStorage.getItem("medium");

    const { 
        profilePicture, 
        profilePictureFile,
        isProfilePicModalVisible, 
        isAddProjectCardActive, 
        isAddCompanyCardActive,
        isLoading,
        projects,
        companies,
        resume,
        resumeFile,
        userNumber,
        altUserNumber,
        activeProjectId,
        activeCompanyId
    } = state;

    const updateProfilePicture = (imageSource:any = defaultProfilePicture, 
    imageFile:any = []) => {
        setState(prev => ({
            ...prev,
            profilePicture: imageSource,
            profilePictureFile: imageFile
        }));
    }

    const getBase64 = (img: any, callback: any) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    const uploadResume = (req: RcCustomRequestOptions) => {
        // Get Base64 for resume preview
        getBase64(req.file, (pdfUrl: any) => {
            setState((prev:any) => ({
                ...prev,
                resume: pdfUrl,
                resumeFile: req.file
            }));
        });
    }

    const setProfilePicModalStatus = () => {
        setState(prev => ({
            ...prev,
            isProfilePicModalVisible: !isProfilePicModalVisible
        }));
    }

    const setAddProjectCardActive = () => {
        setState(prev => ({
            ...prev,
            activeProjectId: undefined,
            isAddProjectCardActive: true
        }));
    }

    const setAddCompanyCardActive = () => {
        setState(prev => ({
            ...prev,
            activeCompanyId: undefined,
            isAddCompanyCardActive: true
        }));
    }

    const setActiveProjectId = (activeProjectId: number) => {
        setState((prev: any)=> ({
            ...prev,
            activeProjectId,
            isAddProjectCardActive: false
        }));
    }

    const setActiveCompanyId = (activeCompanyId: number) => {
        setState((prev: any)=> ({
            ...prev,
            activeCompanyId,
            isAddCompanyCardActive: false
        }));
    }

    const setProjects = (project:any, id?:number) => {
        let updatedProjects = [...projects];
        if(id !== undefined) {
            updatedProjects[id] = project;
        } else {
            updatedProjects.push(project);
        }
        setState((prev:any) => ({
            ...prev,
            projects: updatedProjects,
            activeProjectId: undefined,
            isAddProjectCardActive: false
        }));
    }

    const setCompanies = (company:any, id?: number) => {
        let updatedCompanies = [...companies];
        if(id !== undefined) {
            updatedCompanies[id] = company;
        } else {
            updatedCompanies.push(company);
        }
        setState((prev:any) => ({
            ...prev,
            companies: updatedCompanies,
            activeCompanyId: undefined,
            isAddCompanyCardActive: false
        }));
    }

    const deleteCompany = (id?: number) => {
        if(companies.length > 1) {
            const updatedCompanies = companies.filter((company:any, key:number) => key !== id);
            setState((prev:any) => ({
                ...prev,
                companies: updatedCompanies,
                activeCompanyId: undefined
            }))
        }
    }

    const renderYears = () => {
        const currentYear = new Date().getFullYear();
        let years = [];
        for(let index = 2000; index <= currentYear + 5; index++) {
            years.push(<Option value={index}>{ index }</Option>);
        }
        return years;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        props.form.validateFields((err: Error, values: any) => {
            if(!err) {
                if(activeStep < 4) {
                    setActiveStep(activeStep + 1)
                } else {

                    if(values.workStatus && companies.length < 1) {
                        openNotification('error', "Please add atleast one work experience", 2);
                    } else if(values.projectStatus && projects.length < 1) {
                        openNotification('error', "Please add atleast one project experience", 2);
                    } else {
                        setState(prev => ({
                            ...prev,
                            isLoading: true
                        }));
    
                        values = {
                            ...values,
                            ...userNumber,
                            ...(programId && {
                                program_id: programId
                            }),
                            ...(source && { source }),
                            ...(medium && { medium }),
                            altPrefix: altUserNumber.prefix,
                            altMobileNumber: altUserNumber.mobileNumber,
                            projects: values.projectStatus ? projects : [],
                            companies: values.workStatus ? companies : [],
                        }

                        if(values.joiningDate) {
                            values.joiningDate = moment(values.joiningDate).unix();
                        }
    
                        const data = new FormData();
                        Object.entries(values).forEach(([key, value]:any) => {
                            if(["projects", "companies"].includes(key)) {
                                data.append(key, JSON.stringify(value));
                            } else if(key !== "resume") {
                                data.append(key, value);
                            }
                        });
    
                        const resume:any = resumeFile;
                        const profilePic:any = profilePictureFile;
    
                        data.append("files", resume);
                        data.append("files", profilePic);
    
                        axios.post(G_API_URL + "profile/save", data, {
                            headers: {
                                Authorization: __getToken()
                            }
                        }).then((response: any) => {
                            response = response.data;
                            if(response.status === 1) {
                                login_user({token: response.token});

                                if(source) localStorage.removeItem("source");
                                if(medium) localStorage.removeItem("medium");

                                if(programId) {
                                    history.push({
                                        pathname: "/application/success",
                                        state: {
                                            slug: "/programs"
                                        }
                                    });
                                } else {
                                    window.location.reload();
                                }
                            }
                            setState(prev => ({
                                ...prev,
                                isLoading: false
                            }));
                        }).catch(err => {
                            if(err.response && err.response.status === 413) {
                                setState(prev => ({
                                    ...prev,
                                    isLoading: false
                                }));
                                openNotification("error", "File size exceeds the maximum limit!", 3);
                            } else {
                                console.log(err);
                            }
                        });
                    }
                }
            }
        });
    }

    const getCollegeFields = (type = "ug") => {
        return (
            <>
                <div className="form-block">
                    <CollegeDropDown
                        message="College/University name cannot be empty!"
                        name={type === "pg" ? "pgCollege" : "college"}
                        college = {profile[type === "pg" ? "pgCollege" : "college"]}
                        placeholder="Harvard University"
                        getFieldDecorator={getFieldDecorator}
                        isRequired={true}
                    />
                </div>
                <div className="form-block">
                    <StreamDropDown
                        message="Please select your branch/stream!"
                        name={type === "pg" ? "pgStream" : "stream"}
                        stream = {profile[type === "pg" ? "pgStream" : "stream"]}
                        placeholder="Computer Science and Engineering"
                        getFieldDecorator={getFieldDecorator}
                        isRequired={true}
                    />
                </div>
                <div className="form-block">
                    <Form.Item label="Year of Graduation">
                        {getFieldDecorator(type === "pg" ? "pgYop" : "yop", {
                            rules: [{required: true, 
                                message: 'Please select your year of graduation'}],
                                initialValue: profile[type === "pg" ? "pgYop" : "yop"]
                        })(
                            <Select placeholder="2022">
                                { renderYears() }
                            </Select>
                        )}
                    </Form.Item>
                </div>
                <div className="form-block">
                    <Form.Item label="Select your College's State/UT">
                        {getFieldDecorator(type === "pg" ? "pgClgState" : "clgState", {
                            rules: [{
                                required: true, 
                                message: "Please select your college's State/UT"}],
                                initialValue: profile[type === "pg" ? "pgClgState" : "clgState"]
                        })(
                            <Select placeholder="Karnataka" showSearch
                            filterOption={(input:any, option:any) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }>
                                { renderStates() }
                            </Select>
                        )}
                    </Form.Item>
                </div>
                <div className="form-block">
                    <Form.Item label="History of arrears">
                        {getFieldDecorator(type === "pg" ? "pgHoa" : "hoa", {
                            rules: [
                                {required: true, message: 'Please select an option!'},
                            ],
                            initialValue: profile[type === "pg" ? "pgHoa" : "hoa"] !== undefined ? profile[type === "pg" ? "pgHoa" : "hoa"] : 0
                        })(
                            <Radio.Group onChange={(e) => {}}>
                                <Radio value={1}>Yes</Radio>
                                <Radio value={0}>No</Radio>
                            </Radio.Group>,
                        )}
                    </Form.Item>
                </div>
                {
                    (getFieldValue(type === "pg" ? "pgHoa" : "hoa") && 
                    getFieldValue(type === "pg" ? "pgHoa" : "hoa") === 1) === true &&
                    <div className="form-block">
                        <Form.Item label="No of standing arrears">
                            {getFieldDecorator(type === "pg" ? "pgNoa" : "noa", {
                                rules: [{ required: true, 
                                    message: 'No of standing arrears cannot be empty!' }],
                                initialValue: profile[type === "pg" ? "pgNoa" : "noa"] !== undefined ? profile[type === "pg" ? "pgNoa" : "noa"] : 0
                            }) ( 
                                <InputNumber placeholder="1" min={1} max={100} />
                            )}
                        </Form.Item>
                    </div>
                }
                <div className="form-block">
                    <Form.Item label="Percentage">
                        {getFieldDecorator(type === "pg" ? "pgPercentage" : "percentage", {
                            rules: [{ required: true, 
                            message: 'Percentage cannot be empty!' }],
                            initialValue: profile[type === "pg" ? "pgPercentage" : "percentage"]
                        }) ( 
                            <InputNumber placeholder="98" min={0} max={100} />
                        )}
                    </Form.Item>
                </div>
            </>
        )
    }

    const renderCompanyCards = () => {
        if(companies) {
            return companies.map((company:any, key:number) => (
                activeCompanyId !== key ? 
                <CompanyCard {...company} activeCompanyId={activeCompanyId} id={key} key={key} setActiveCompanyId={setActiveCompanyId} isEditable={true} /> :
                <WorkExperienceForm data={company} setCompanies={setCompanies} deleteCompany={deleteCompany} id={key} isDeletable={companies.length > 1} />
            ));
        }
    }

    const renderProjectCards = () => {
        if(projects) {
            return projects.map((project:any, key:number) => (
                activeProjectId !== key ?
                <ProjectCard {...project} activeProjectId={activeProjectId} id={key} key={key} setActiveProjectId={setActiveProjectId} isEditable={true} /> :
                <ProjectForm data={project} setProjects={setProjects} id={key} />
            ));
        }
    }

    const renderDegrees = () => {
        return degrees.map((degree: string, key: number) => 
            <Option value={degree} key={key}>{ degree }</Option>
        );
    }

    const renderStates = () => {
        return states.map((state: string, key: number) => 
            <Option value={state} key={key}>{ state }</Option>
        );
    }

    const renderLanguagues = () => {
        const languages= ["C","C++", "Java", "C#","JavaScript","Python","Mysql","Shift","PHP","Kotlin","Ruby"];
        return languages.map((language, key) => 
            <Option value={language} key={key}>{ language }</Option>
        )
    }

    const renderTechnologies = () => {
        return Technologies.map((technology, key) =>
            <Option value={technology} key={key}>{ technology }</Option>
        );
    }

    const renderInterpersonalSkills = () => {
        return InterpersonalSkills.map((skill, key) => 
            <Option value={skill} key={key}>{ skill }</Option>
        );
    }

    return (
        <>
            <div className="profile-form-wrapper">
                <Form className="g-d g-h-c" onSubmit={handleSubmit}>
                    {
                        // Personal Information
                        <section id="personal-information" className="w-80">
                            <div className="input-group g-d g-h-c profile-pic-wrapper">
                                <img src={profilePicture} alt="profile-pic" 
                                className="profile-pic c-pointer" 
                                onClick={() => setProfilePicModalStatus()} />
                            </div>
                            <ProfilePictureModal profilePicture={profilePicture} 
                            updateProfilePicture={updateProfilePicture} 
                            isModalVisible={isProfilePicModalVisible}
                            setProfilePicModalStatus={setProfilePicModalStatus}
                            getBase64={getBase64} />
                            <div className="input-group g-d g-col-2 g-col-1-m">
                                <div className="form-block">
                                    <Form.Item label="First Name">
                                        {getFieldDecorator('firstName', {
                                            rules: [{ required: true, 
                                            message: 'First Name cannot be empty!' }],
                                            initialValue: profile.firstName
                                        }) ( 
                                            <Input placeholder="John" autoComplete="name"/>
                                        )}
                                    </Form.Item>
                                </div>

                                <div className="form-block">
                                    <Form.Item label="Last Name">
                                        {getFieldDecorator('lastName', {
                                            rules: [{ required: true, 
                                            message: 'Last Name cannot be empty!' }],
                                            initialValue: profile.lastName
                                        }) ( 
                                            <Input placeholder="Doe" autoComplete="name"/>
                                        )}
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="input-group g-d g-col-1">
                                <Form.Item label="About Yourself">
                                    {getFieldDecorator('about', {
                                        initialValue: profile.about
                                    })(
                                        <TextArea 
                                            placeholder="Elucide about yourself" 
                                            autoSize={{ minRows: 4 }} 
                                        />
                                    )}
                                </Form.Item>
                                <div className="form-block">
                                    <Form.Item label="Website/Portfolio">
                                        {getFieldDecorator('website', {
                                            initialValue: profile.website
                                        })(
                                            <Input placeholder="Link to codepen or your portfolio website" />,
                                        )}
                                    </Form.Item>
                                </div>
                                <div className="form-block">
                                    <Form.Item label="LinkedIn profile">
                                        {getFieldDecorator('linkedin',{
                                            initialValue: profile.linkedin
                                        })(
                                            <Input placeholder="www.linkedin.com/profile" />,
                                        )}
                                    </Form.Item>
                                </div>
                                <div className="form-block">
                                    <Form.Item label="GitHub profile">
                                        {getFieldDecorator('github',{
                                            initialValue: profile.github
                                        })(
                                            <Input placeholder="www.github.com/profile" />,
                                        )}
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="input-group g-d g-col-2 g-col-1-m">
                                <div className="form-block mobile-group f-d">
                                    <Form.Item className="mobile-number" label="Mobile Number">
                                        <IntlTelInput
                                            containerClassName="intl-tel-input"
                                            inputClassName="form-control"
                                            preferredCountries={['in', 'us', 'ca', 'sa', 'qa', 'ae', 'om', 'kw', 'sg']}
                                            defaultCountry={'in'}
                                            fieldName={'mobileNumber'}
                                            autoComplete="phone"
                                            placeholder={"9999999999"}
                                            format
                                            defaultValue={profile.mobileNumber}
                                            onPhoneNumberBlur={(status: boolean, value: string, countryData: any) => {
                                                // 1. Get rid of white spaces, dash, # that's formatted during entry to avoid literal string conflict
                                                // 2. Get rid of first character if its zero
                                                let mobileNumber = `${value}`.replace(/[\s-#()]/g, "");
                                                mobileNumber = `${parseInt(mobileNumber)}`;
                                                setState(prev => ({
                                                    ...prev,
                                                    userNumber: {
                                                        prefix: countryData.dialCode,
                                                        mobileNumber
                                                    },
                                                    numberNotEntered: false,
                                                    isNumberValid: true
                                                }));
                                            }}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-block mobile-group f-d">
                                    <Form.Item label="Alternate Mobile Number">
                                        <IntlTelInput
                                            containerClassName="intl-tel-input"
                                            inputClassName="form-control"
                                            preferredCountries={['in', 'us', 'ca', 'sa', 'qa', 'ae', 'om', 'kw', 'sg']}
                                            defaultCountry={'in'}
                                            fieldName={'mobileNumber'}
                                            autoComplete="phone"
                                            placeholder={"9999999999"}
                                            format
                                            defaultValue={profile.altMobileNumber}
                                            onPhoneNumberBlur={(status: boolean, value: string, countryData: any) => {
                                                // 1. Get rid of white spaces, dash, # that's formatted during entry to avoid literal string conflict
                                                // 2. Get rid of first character if its zero
                                                let mobileNumber = `${value}`.replace(/[\s-#()]/g, "");
                                                mobileNumber = `${parseInt(mobileNumber)}`;
                                                setState(prev => ({
                                                    ...prev,
                                                    altUserNumber: {
                                                        prefix: countryData.dialCode,
                                                        mobileNumber
                                                    }
                                                }));
                                            }}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-block">
                                    <Form.Item label="Email">
                                        {getFieldDecorator('email', {
                                            rules: [{ 
                                            required: true, 
                                            message: 'Email cannot be empty!' }],
                                            initialValue: profile.email
                                        }) ( 
                                            <Input placeholder="johndoe@xyz.com" autoComplete="email" disabled />
                                        )}
                                    </Form.Item>
                                </div>
                                <div className="form-block">
                                    <Form.Item label="College Email">
                                        {getFieldDecorator('clgEmail', {
                                            rules: [{ 
                                            required: false, 
                                            message: 'College Email cannot be empty!' }],
                                            initialValue: profile.clgEmail
                                        }) ( 
                                            <Input placeholder="johndoe@stanford.com" autoComplete="email"/>
                                        )}
                                    </Form.Item>
                                </div>
                                <div className="form-block">
                                    <Form.Item label="Current Location/City">
                                        {getFieldDecorator('city', {
                                            rules: [{ 
                                                required: true, 
                                                message: 'City cannot be empty!' }],
                                                initialValue: profile.city
                                        }) ( 
                                            <Input placeholder="Bangalore" autoComplete="city"/>
                                        )}
                                    </Form.Item>
                                </div>
                                <div className="form-block custom-year">
                                    <Form.Item label="State/UT">
                                        {getFieldDecorator('state', {
                                            rules: [{required: true, 
                                                message: 'Please select your state'}],
                                                initialValue: profile.state
                                        })(
                                            <Select placeholder="Karnataka" showSearch
                                            filterOption={(input:any, option:any) =>
                                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }>
                                                { renderStates() }
                                            </Select>
                                        )}
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="input-group g-d g-col-2 g-col-1-m">
                                <div className="form-block">
                                    <Form.Item label="Gender">
                                        {getFieldDecorator("gender", {
                                            rules: [{
                                                required: true, 
                                                message: "Please select your Gender"}],
                                                initialValue: profile.gender
                                        })(
                                            <Select placeholder="Gender">
                                                <Option value="Male">Male</Option>
                                                <Option value="Female">Female</Option>
                                                <Option value="Others">Others</Option>
                                            </Select>
                                        )}
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="input-group g-d g-col-1">
                                <div className="form-block">
                                    <Form.Item label="Residential Address">
                                        {getFieldDecorator('address', {
                                            rules: [{ required: true, 
                                            message: 'Residential Address cannot be empty!' }],
                                            initialValue: profile.address
                                        }) ( 
                                            <Input placeholder="19948 S Fowler Ave Laton, California(CA), 93242" autoComplete="name"/>
                                        )}
                                    </Form.Item>
                                </div>
                            </div>
                        </section>
                    }
                    {
                        // Educational Information
                        (isProfileSetup || progress >= 1) &&
                        <section id="educational-information" className="w-80">
                            <div className="input-group g-d g-col-2 g-col-1-m">
                                <div className="form-block">
                                    <Form.Item label="10th Percentage">
                                        {getFieldDecorator('sslcPercentage', {
                                            rules: [{ required: true, 
                                                message: '10th Percentage cannot be empty!' }],
                                            initialValue: profile.sslcPercentage
                                        }) ( 
                                            <InputNumber placeholder="95" min={0} max={100} />
                                        )}
                                    </Form.Item>
                                </div>
                                <div className="form-block">
                                    <Form.Item label="12th Percentage">
                                        {getFieldDecorator('hscPercentage', {
                                            rules: [{ required: true, 
                                                message: '12th Percentage cannot be empty!' }],
                                            initialValue: profile.hscPercentage
                                        }) ( 
                                            <InputNumber placeholder="95" min={0} max={100} />
                                        )}
                                    </Form.Item>
                                </div>
                                <div className="form-block">
                                    <Form.Item label="Degree">
                                        {getFieldDecorator('degree', {
                                            rules: [{required: true, 
                                                message: 'Please select a degree'}],
                                                initialValue: profile.degree ? profile.degree : "BE/B.Tech"
                                        })(
                                            <Select placeholder="BE/B.Tech" showSearch
                                            filterOption={(input:any, option:any) => 
                                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }>
                                                { renderDegrees() }
                                            </Select>
                                        )}
                                    </Form.Item>
                                </div>
                                {  
                                    getFieldValue("degree") && 
                                    !getFieldValue("degree").includes("M") && 
                                    getCollegeFields() 
                                }
                            </div>
                            {
                                getFieldValue("degree") && 
                                getFieldValue("degree").includes("M") && 
                                <>
                                    <Divider />
                                    <h3 className="font-heading text-medium text-l-m">PG Details</h3>
                                    <div className="input-group g-d g-col-2 g-col-1-m">
                                        { getCollegeFields("pg") }
                                    </div>
                                    <Divider />
                                    <h3 className="font-heading text-medium text-l-m">UG Details</h3>
                                    <div className="input-group g-d g-col-2 g-col-1-m">
                                        { getCollegeFields() }
                                    </div>
                                </>
                            }
                        </section>
                    }

                    {
                        // Professional Information
                        (isProfileSetup || progress >= 2) &&
                        <section id="professional-information" className="w-80">
                            <div className="input-group g-d g-col-1">
                                <div className="form-block">
                                    <Form.Item label="Are you currently working/having work experience in any company?">
                                        {getFieldDecorator('workStatus', {
                                            rules: [
                                                {required: true, message: 'Please select an option!'},
                                            ],
                                            initialValue: profile.workStatus !== undefined ? profile.workStatus : 1
                                        })(
                                            <Radio.Group onChange={(e) => {}}>
                                                <Radio value={1}>Yes</Radio>
                                                <Radio value={0}>No</Radio>
                                            </Radio.Group>,
                                        )}
                                    </Form.Item>
                                </div>
                            </div>
                            {
                                getFieldValue("workStatus") &&
                                <>
                                    { renderCompanyCards() }
                                    {
                                        isAddCompanyCardActive &&
                                        <WorkExperienceForm setCompanies={setCompanies} deleteCompany={deleteCompany} isDeletable={companies.length > 1} />
                                    }
                                    <div className="g-d g-h-e add-experience-btn-wrapper">
                                        <Button className="default-blue-btn btn-small outline-blue" 
                                        onClick={ () => setAddCompanyCardActive()}>
                                            Add an Experience
                                        </Button>
                                    </div>
                                </>
                            }
                            {
                                !((getFieldValue("yop") && getFieldValue("yop") >= 2022) ||
                                (getFieldValue("pgYop") && getFieldValue("pgYop") >= 2022)) &&
                                <>
                                    <Divider />
                                    <div className="input-group g-d g-col-1">
                                        <div className="form-block">
                                            <Form.Item label="Do you have any full-time offers (from campus placements / off-campus drives)?">
                                                {getFieldDecorator('hasOffers', {
                                                    rules: [
                                                        {required: true, message: 'Please select an option!'},
                                                    ],
                                                    initialValue: profile.hasOffers ? profile.hasOffers : 1
                                                })(
                                                    <Radio.Group onChange={(e) => {}}>
                                                        <Radio value={1}>Yes</Radio>
                                                        <Radio value={0}>No</Radio>
                                                    </Radio.Group>,
                                                )}
                                            </Form.Item>
                                        </div>
                                    </div>
                                    {
                                        getFieldValue("hasOffers") &&
                                        <div className="input-group g-d g-col-2 g-col-1-m">
                                            <div className="form-block">
                                                <Form.Item label="Name of the Company">
                                                    {getFieldDecorator('companyName', {
                                                        rules: [{ 
                                                        required: true, 
                                                        message: 'Company name cannot be empty!' }],
                                                        initialValue: profile.companyName
                                                    }) ( 
                                                        <Input placeholder="Google India Pvt. Ltd" autoComplete="company"/>
                                                    )}
                                                </Form.Item>
                                            </div>
                                            <div className="form-block">
                                                <Form.Item label="Designation">
                                                    {getFieldDecorator('designation', {
                                                        rules: [{ 
                                                        required: true, 
                                                        message: 'Designation cannot be empty!' }],
                                                        initialValue: profile.designation
                                                    }) ( 
                                                        <Input placeholder="Software Developer" autoComplete="designation"/>
                                                    )}
                                                </Form.Item>
                                            </div>
                                            <div className="form-block">
                                                <Form.Item label="CTC - Fixed + variable">
                                                    {getFieldDecorator('ctc', {
                                                        rules: [{ 
                                                        required: true, 
                                                        message: 'CTC cannot be empty!' }],
                                                        initialValue: profile.ctc
                                                    }) ( 
                                                        <InputNumber placeholder="450000" min={0} />
                                                    )}
                                                </Form.Item>
                                            </div>
                                            <div className="form-block">
                                                <Form.Item label="Tentative Joining Date">
                                                    {getFieldDecorator('joiningDate', {
                                                        rules: [{ required: true, 
                                                        message: 'Joining date cannot be empty!' }],
                                                        initialValue: profile.joiningDate ? moment(profile.joiningDate * 1000) : ""
                                                    }) ( 
                                                        <DatePicker placeholder="Joining Date" />
                                                    )}
                                                </Form.Item>
                                            </div>
                                        </div>
                                    }
                                </>
                            }
                            <Divider />
                            <div className="input-group g-d g-col-1">
                                <div className="form-block">
                                    <Form.Item label="Add your Resume">
                                        {getFieldDecorator('resume', {
                                            rules: [{ 
                                            required: !resume ? true: false, 
                                            message: 'Please upload your resume!' }],
                                            initialValue: ""
                                        }) ( 
                                            <Dragger accept=".pdf" showUploadList={false}
                                            customRequest={uploadResume}>
                                                <p className="ant-upload-drag-icon">
                                                    <InboxOutlined />
                                                </p>
                                                <p className="ant-upload-text">
                                                    Click or drag file to this area to upload
                                                </p>
                                            </Dragger>
                                        )}
                                    </Form.Item>
                                </div>
                                {
                                    resume &&
                                    <div className="f-d f-h-c resume-preview">
                                        <Document file={resume} className='skeleton-card' loading=''>
                                            <Page pageNumber={1} height={225} width={225}/>
                                        </Document>
                                    </div>
                                }
                            </div>
                        </section>
                    }

                    {
                        // Skills
                        (isProfileSetup || progress >= 3) &&
                        <section id="skills-section" className="w-80">
                            <div className="input-group g-d g-col-1">
                                <div className="form-block">
                                    <Form.Item label="Preffered Language">
                                        {getFieldDecorator('preferred_lang', {
                                                initialValue: profile.preferred_lang
                                        })(
                                            <Select placeholder="Select Tools & Technologies / Coding languages">
                                                { renderLanguagues() }
                                            </Select>
                                        )}
                                    </Form.Item>
                                </div>
                                <div className="form-block">
                                    <Form.Item label="Interpersonal Skills">
                                        {getFieldDecorator('interpersonalSkills', {
                                                initialValue: profile.interpersonalSkills
                                        })(
                                            <Select mode={"multiple"} placeholder="Select Interpersonal Skills">
                                                { renderInterpersonalSkills() }
                                            </Select>
                                        )}
                                    </Form.Item>
                                </div>

                                <div className="form-block">
                                    <Form.Item label="Tools & Technologies / Coding languages">
                                        {getFieldDecorator('technologiesKnown', {
                                                initialValue: profile.technologiesKnown
                                        })(
                                            <Select mode={"multiple"} placeholder="Select Tools & Technologies / Coding languages">
                                                 { renderTechnologies() }
                                            </Select>
                                        )}
                                    </Form.Item>
                                </div>
                            </div>
                        </section>
                    }
                    {
                        // Project Experience
                        (isProfileSetup || progress >= 4) &&
                        <section id="project-experience" className="w-80">
                            <div className="input-group g-d g-col-1">
                                <div className="form-block">
                                    <Form.Item label="Would you like to add your project experience?">
                                        {getFieldDecorator('projectStatus', {
                                            rules: [
                                                {required: true, message: 'Please select an option!'},
                                            ],
                                            initialValue: profile.projectStatus !== undefined ? profile.projectStatus : 1
                                        })(
                                            <Radio.Group onChange={(e) => {}}>
                                                <Radio value={1}>Yes</Radio>
                                                <Radio value={0}>No</Radio>
                                            </Radio.Group>,
                                        )}
                                    </Form.Item>
                                </div>
                            </div>
                            {
                                getFieldValue("projectStatus") &&
                                <>
                                    <div>
                                        { renderProjectCards() }
                                    </div>
                                    {
                                        isAddProjectCardActive &&
                                        <ProjectForm setProjects={setProjects} />
                                    }
                                    <div className="g-d g-h-e add-project-btn-wrapper">
                                        <Button className="default-blue-btn btn-small outline-blue" 
                                        onClick={ () => setAddProjectCardActive()}>
                                            Add a Project
                                        </Button>
                                    </div>
                                </>
                            }
                        </section>
                    }
                  
                  {
                        // Project Experience
                        (isProfileSetup || progress >= 5) &&
                        <section id="project-experienceabc" className="w-80">
                            <div className="input-group g-d g-col-1">
                                <div className="form-block">
                                    <Form.Item label="Would you like to add your project experience?">
                                        {getFieldDecorator('projectStatus', {
                                            rules: [
                                                {required: true, message: 'Please select an option!'},
                                            ],
                                            initialValue: profile.projectStatus !== undefined ? profile.projectStatus : 1
                                        })(
                                            <Radio.Group onChange={(e) => {}}>
                                                <Radio value={1}>Yes</Radio>
                                                <Radio value={0}>No</Radio>
                                            </Radio.Group>,
                                        )}
                                    </Form.Item>
                                </div>
                            </div>
                            {
                                getFieldValue("projectStatus") &&
                                <>
                                    <div>
                                        { renderProjectCards() }
                                    </div>
                                    {
                                        isAddProjectCardActive &&
                                        <ProjectForm setProjects={setProjects} />
                                    }
                                    <div className="g-d g-h-e add-project-btn-wrapper">
                                        <Button className="default-blue-btn btn-small outline-blue" 
                                        onClick={ () => setAddProjectCardActive()}>
                                            Add a Project
                                        </Button>
                                    </div>
                                </>
                            }
                        </section>
                    }
                  
                    
                    <div className="input-group g-d g-h-e w-80
                    next-btn-wrapper">
                        <Button className="default-blue-btn btn-small"
                        htmlType="submit" loading={isLoading}>
                            { 
                                !isProfileSetup ? 
                                (activeStep === 4 ? "Finish" : "Next") : "Update" 
                            }
                        </Button>
                    </div>
                </Form>
            </div>
            <style jsx>{`
                .profile-form-wrapper {
                    margin: var(--peaky-gap-128) 0 0;
                }

                .profile-form-wrapper .info {
                    margin: var(--peaky-gap-8) 0 0 0;
                    opacity: 0.87;
                }

                .profile-form-wrapper .input-group {
                    grid-column-gap: 4rem;
                    // width: max-content;
                }

                // .profile-form-wrapper .form-block {
                //     width: 300px;
                // }

                .profile-form-wrapper .form-block input,
                .profile-form-wrapper .input-group textarea,
                .profile-form-wrapper .ant-select-selection--single {
                    background-color: #383838;
                    border-radius: var(--peaky-br-2);
                    color: var(--dove);
                    font-weight: 300;
                    height: 50px;
                    padding: 0 var(--peaky-pad-16);
                }

                .profile-form-wrapper .form-block .ant-input-number {
                    height: 100%;
                    background-color: #383838 !important;
                    border-radius: var(--peaky-br-2);
                    border-width: 2px !important;
                    border-color: transparent;
                    width: 100%;
                }

                .ant-input-number-focused {
                    border-color: var(--primary) !important;
                }

                .ant-input-number-handler-wrap {
                    display: none;
                }

                .profile-form-wrapper .input-group textarea {
                    min-height: 110px !important;
                    padding: 16px;
                    resize: none;
                    width: 100%;
                }

                .profile-form-wrapper .form-block
                .ant-select-search__field__wrap input {
                    padding: 0 !important;
                }

                .profile-form-wrapper .form-block input:focus {
                    background-color: #383838 !important;
                }

                .profile-form-wrapper .form-block .ant-select-search__field__wrap input:focus {
                    background-color: unset !important;
                }

                .profile-form-wrapper .form-block input::placeholder,
                .profile-form-wrapper .intl-tel-input input::placeholder,
                .profile-form-wrapper .input-group textarea::placeholder,
                .profile-form-wrapper .ant-select-selection__placeholder {
                    color: var(--dove);
                    opacity: 0.38;
                }

                .profile-form-wrapper .ant-form-item-required::before,
                .profile-form-wrapper .ant-form-item-label > label::after {
                    margin: unset;
                    content: unset;
                }

                .profile-form-wrapper .ant-form-item-label 
                .ant-form-item-required::after, .profile-form-wrapper 
                .mobile-number .ant-form-item-label > label::after {
                    display: inline-block;
                    margin-right: 4px;
                    color: #f5222d;
                    font-size: 14px;
                    font-family: SimSun, sans-serif;
                    line-height: 1;
                    content: '*';
                }

                .profile-form-wrapper .ant-form-item-label > label {
                    color: var(--dove);
                    font-weight: 600;
                    opacity: 0.87;
                }

                .profile-form-wrapper .ant-input {
                    border: unset;
                    border-radius: unset;
                    font-size: 16px;
                }
                
                .profile-form-wrapper input:-webkit-autofill,
                .profile-form-wrapper input:-webkit-autofill:hover,
                .profile-form-wrapper input:-webkit-autofill:focus,
                .profile-form-wrapper input:-webkit-autofill:active {
                    -webkit-transition: "color 9999s ease-out, background-color 9999s ease-out";
                    -webkit-transition-delay: 9999s;
                }
                
                .profile-form-wrapper .intl-tel-input.allow-dropdown input {
                    color: var(--dove);
                    font-size: 16px;
                    width: 100%;
                }

                .profile-form-wrapper .intl-tel-input .country-list {
                    z-index: 5;
                }

                .profile-form-wrapper .intl-tel-input, 
                .profile-form-wrapper .intl-tel-input .country-list {
                    width: 100%;
                }

                .profile-form-wrapper .intl-tel-input input {
                    height: 50px;
                    border-radius: var(--peaky-br-2);
                    border: none;
                    width: 100%;
                    font-weight: 300;
                    color: var(--carbon);
                    transition: all 0.4s;
                }

                .profile-form-wrapper .intl-tel-input input:focus,
                .profile-form-wrapper .intl-tel-input .selected-flag {
                    outline: none;
                }

                .profile-form-wrapper .intl-tel-input .country-list 
                .country.highlight {
                    background-color: var(--charcoal);
                }

                .profile-form-wrapper .intl-tel-input .selected-flag {
                    width: 50px;
                }

                .profile-form-wrapper .intl-tel-input input::placeholder {
                    font-weight: 400;
                }

                .profile-form-wrapper .intl-tel-input input::placeholder,
                .profile-form-wrapper .intl-tel-input .country-list .country {
                    font-family: "Open Sans", sans-serif;
                }

                .profile-form-wrapper .intl-tel-input 
                .flag-container .arrow  {
                    color: var(--sandstone);
                }

                .form-block.has-error input,
                .form-block.has-error-2 input {
                    border-color: var(--organred);
                }

                .form-block.has-error .intl-tel-input::after {
                    content: "Mobile Number is required!";
                }

                .form-block.has-error-2 .intl-tel-input::after {
                    content: "Please enter a valid mobile number!";
                }

                .form-block.has-error .intl-tel-input::after,
                .form-block.has-error-2 .intl-tel-input::after {
                    font-weight: 400;
                    font-family: "Open Sans", sans-serif;
                    color: var(--organred);
                    position: absolute;
                    top: 40px;
                    left: 0;
                }

                .profile-form-wrapper .intl-tel-input .country-list {
                    z-index: 5;
                    overflow-x: hidden;
                    background-color: #383838;
                    color: var(--dove);
                    border: 1px solid var(--crow);
                }

                .profile-form-wrapper .ant-select-selection--single {
                    padding: unset;
                    font-size: 16px;
                }

                .profile-form-wrapper .ant-select-selection__rendered {
                    line-height: 50px;
                    margin-left: var(--peaky-gap-16);
                }

                .profile-form-wrapper .ant-select-selection {
                    border: unset;
                }

                .profile-form-wrapper .ant-select-arrow .anticon  {
                    color: var(--sandstone);
                }

                .profile-form-wrapper .ant-select-selection:hover {
                    border-color: unset;
                }

                .profile-form-wrapper .work-status .ant-form-item-required,
                .profile-form-wrapper .laptop-radio .ant-form-item-required,
                .profile-form-wrapper .stable-internet-radio .ant-form-item-required,
                .profile-form-wrapper .ant-radio-wrapper {
                    font-weight: 400;
                    font-size: 16px;
                    font-family: 'Open Sans', sans-serif;
                    color: var(--dove);
                }

                .profile-form-wrapper .ant-radio-inner {
                    border: 2px solid var(--primary);
                    background-color: var(--spider);
                    height: 20px;
                    width: 20px;
                }

                .profile-form-wrapper .ant-radio-inner::after {
                    height: 10px;
                    width: 10px;
                }

                .profile-form-wrapper .divider {
                    border: 1px solid var(--spider);
                    margin: var(--peaky-gap-32) 0;
                }

                .profile-form-wrapper .ant-radio-wrapper:nth-of-type(1) {
                    margin-right: 50px;
                }

                .profile-form-wrapper .ant-radio-wrapper span.ant-radio + * {
                    padding-left: var(--peaky-pad-16);
                    padding-right: var(--peaky-pad-16);
                }

                .profile-form-wrapper .work-status .ant-form-item,
                .profile-form-wrapper .laptop-radio .ant-form-item,
                .profile-form-wrapper .stable-internet-radio .ant-form-item {
                    margin-bottom: var(--peaky-gap-8);
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

                .information-consent-wrapper .information-consent {
                    color: rgba(255, 255, 255, 0.87);
                    font-size: 14px;
                    white-space: pre-wrap;
                }

                .information-consent-wrapper {
                    margin: var(--peaky-gap-8) 0 var(--peaky-gap-32);
                }

                .mobile-group .ant-row.ant-form-item {
                    width: 100%;
                }

                .profile-form-wrapper .ant-input:focus,
                .profile-form-wrapper .intl-tel-input input:focus,
                .profile-form-wrapper .intl-tel-input.allow-dropdown input:focus,
                .profile-form-wrapper .ant-select-focused .ant-select-selection, 
                .profile-form-wrapper .ant-select-selection:focus, 
                .profile-form-wrapper .ant-select-selection:active
                .profile-form-wrapper .ant-select-selection--single:focus {
                    box-shadow: none;
                    border: 2px solid var(--primary) !important;
                }

                .profile-form-wrapper .ant-divider-horizontal{
                    min-width: unset;
                }

                .profile-form-wrapper .ant-calendar-picker {
                    width: 100%;
                }

                .profile-form-wrapper .ant-calendar-picker-icon {
                    color: #848484;
                }

                .profile-form-wrapper .add-experience-btn-wrapper {
                    margin: 0 0 var(--peaky-gap-32);
                }

                .profile-form-wrapper .add-project-btn-wrapper {
                    margin: 0 0 var(--peaky-gap-32);
                }

                .profile-form-wrapper .work-experience-form,
                .profile-form-wrapper .project-experience-form {
                    padding: var(--peaky-pad-32);
                    margin: 0 0 var(--peaky-gap-32);
                    background-color: #222222;
                }

                .ant-upload.ant-upload-drag p.ant-upload-drag-icon .anticon {
                    color: var(--primary);
                }

                .ant-upload.ant-upload-drag {
                    background: #383838;
                }

                .ant-upload.ant-upload-drag p.ant-upload-text {
                    color: var(--dove);
                }

                .profile-form-wrapper .ant-select-selection {
                    background-color: #383838;
                }

                .ant-select-selection--multiple {
                    padding: 8px;
                    padding-bottom: 10px !important;
                }

                .ant-select-selection--multiple .ant-select-search--inline 
                .ant-select-search__field {
                    background-color: transparent;
                    height: 45px;
                }

                .ant-select-selection--multiple .ant-select-selection__rendered {
                    height: auto;
                    margin-bottom: -3px;
                    margin-left: 5px;
                }

                .ant-select-selection--multiple .ant-select-search--inline .ant-select-search__field {
                    height: unset;
                }

                .ant-checkbox-wrapper {
                    color: var(--dove);
                }

                .ant-checkbox-checked .ant-checkbox-inner {
                    background-color: var(--primary);
                    border-color: var(--primary);
                }

                .ant-checkbox-wrapper:hover .ant-checkbox-inner, 
                .ant-checkbox:hover .ant-checkbox-inner {
                    border-color: var(--primary);
                }

                .ant-checkbox-inner {
                    background-color: var(--transparent);
                    border-width: 2px;
                    border-radius: 4px;
                    height: 21px;
                    width: 21px;
                }

                .ant-checkbox-inner::after {
                    height: 12px;
                    width: 6px;
                }

                .ant-checkbox-checked::after {
                    border-width: 2px;
                    border-radius: 4px;
                    border-color: var(--primary);
                }

                .profile-form-wrapper .next-btn-wrapper {
                    margin: var(--peaky-gap-64) 0 0;
                }

                .profile-form-wrapper .profile-pic-wrapper {
                    margin: 0 0 var(--peaky-gap-32);
                }

                .profile-form-wrapper .profile-pic-wrapper 
                .profile-pic {
                    height: 150px;
                    width: 150px;
                    border-radius: 50%;
                }

                .profile-form-wrapper .project-card,
                .profile-form-wrapper .company-card {
                    background-color: #383838;
                    border-radius: var(--peaky-br-4);
                    color: var(--dove);
                    padding: var(--peaky-pad-32);
                    margin: 0 0 var(--peaky-gap-32);
                }

                .profile-form-wrapper .project-card .name,
                .profile-form-wrapper .company-card .designation {
                    color: var(--primary);
                }

                .profile-form-wrapper .project-card .description {
                    margin: var(--peaky-gap-16) 0 0;
                    color: #999999;
                }


                .profile-form-wrapper .company-card > p {
                    margin: var(--peaky-gap-4) 0 0;
                }

                .ant-upload-list-item-card-actions {
                    opacity: 1;
                }

                .ant-upload-list-item-info .anticon-paper-clip, 
                .ant-upload-list-item-card-actions .anticon,
                .ant-upload-list-item-name {
                    color: var(--primary);
                }

                .skeleton-card {
                    width: max-content;
                    height: unset;
                    color: var(--dove);
                    min-height:300px;
                    min-width: 230px;
                }

                .react-pdf__Page__annotations.annotationLayer {
                    display: none;
                }

                .profile-form-wrapper .resume-preview {
                    margin: 0 0 var(--peaky-gap-24);
                }

                .ant-select-selection-selected-value {
                    max-width: 250px;
                }

                @media only screen and (max-device-width: 760px) {
                    .profile-form-wrapper .input-group,
                    .profile-form-wrapper .form-block,
                    .profile-form-wrapper .intl-tel-input,
                    .profile-form-wrapper .intl-tel-input.allow-dropdown input {
                        width: 100%;
                    }

                    .information-consent-wrapper .information-consent {
                        white-space: unset;
                    }

                    .intl-tel-input .country-list .country .country-name {
                        color: var(--carbon);
                        font-size: 14px;
                    }
                }

                @media only screen and (max-device-width: 760px) {
                    .profile-form-wrapper {
                        margin: var(--peaky-gap-32) 0 0;
                    }

                    .profile-form-wrapper .w-80 {
                        width: 100%;
                    }
                }
            `}</style>
        </>
    )
}

const EditProfile = Form.create<IProps>({ name: "" })(ProfileForm);
export default EditProfile;
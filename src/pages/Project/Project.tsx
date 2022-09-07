import React,{ useState,useEffect } from "react";
// @ts-ignore
import { Helmet } from 'react-helmet';
import { Input,Upload,message } from "antd";
import { InboxOutlined } from '@ant-design/icons';
import { G_API_URL, G_URL } from "../../constants/constants";
import { __getCookie } from "../../utils/cookie.util";
import keys from "../../config/keys";
import axios from "axios";
import Layout from "../../components/Layout";
import { RouteComponentProps } from "react-router";

interface IContent {
    projectId?: number;
    name?: string;
    description?: string;
}

interface IState {
    fileList: Array<any>;
    githubLink: string;
    isLoading:boolean;
}

interface MatchParams {
    slug: string
}

interface IProjectProps extends RouteComponentProps<MatchParams> {
}

const Project = (props: IProjectProps) => {

    const { Dragger } = Upload;

    const defaultState = {
        fileList: [],
        githubLink:"",
        isLoading:false
    }

    const [content,setContent] = useState<IContent>({});
    const [state,setState] = useState<IState>(defaultState);
    const fileList = state.fileList;
    let githubLink = "";
    
    useEffect(() => {
        const {slug} = props.match.params;
        setState(prev => ({...prev,isLoading:true}));
        axios.get(G_API_URL+"project/",{
            params: {
                projectId:slug
            }
        }).then((response) => {
            response = response.data;
            if(response) {
                setContent(response.data);
                setState(prev => ({...prev,isLoading:false}));
            }
        })
    }, [props.match.params]);

    const handleFile = {
        multiple: false,
        onRemove: (file:any) => {
          setState(prev => ({...prev,fileList:[]}))
        },
        beforeUpload: (file:any) => {
            if(file.type === "application/zip") {
                setState(prev => ({...prev,fileList:[file]}));
                message.success("File uploaded successfully!");
            } else {
                message.warn("Please upload a zip file!");
            }
            return true;
        },
        fileList,
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        githubLink = event.target.value;
        setState(prev => (
            {...prev,githubLink: githubLink}
        ));
    }

    const submitProject = () => {
        const projectId:string = content.projectId ? 
        content.projectId.toString(): "";
        if( projectId && content.name && 
            (state.fileList.length > 0 || state.githubLink)) {
            const data = new FormData();
            if(state.fileList[0])
                data.append("file", state.fileList[0]);
            data.append("githubLink", state.githubLink);
            data.append("projectId", projectId);
            data.append("topic", content.name);
            data.append("ts", Math.round(new Date().getTime()/1000).toString());
            axios.post(G_API_URL+"project/",data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": __getCookie(keys.cookiePrefix + "ut").cookieValue
                }
            }).then(response => {
                response = response.data;
                if(response.status) {
                    message.success("Project submission successful!");
                    setTimeout(() => {
                        window.location.href = G_URL+"learning-dashboard/bootcamp";
                    },2000);
                } else {
                    message.error("Something went wrong, Please try again!")
                }
            });
        } else {
            message.error("Please upload a zip file or input your github link!")
        }
    }

    const handleClick = () => {
        window.location.href = G_URL+"learning-dashboard/bootcamp";
    }

    return (
        <>
        {
            !state.isLoading &&
            <Layout>
                <Helmet>
                    <title>ProGrad | Project Submission</title>
                </Helmet>
                <div className="project-content-wrapper lr-pad-d lr-pad-m
                tb-pad-d tb-pad-m">
                    <div className="go-back-btn body-small c-pointer
                    strong-text f-d f-v-c" onClick={() => handleClick()}>
                        <i className="icon icon-arrow-left"></i>Go Back
                    </div>
                    <h2 className="h2-heading">
                        { content && content.name }
                    </h2>
                    <span className="f-d w-80 body-regular description">
                        { content && content.description }
                    </span>
                    <div className="action-block" >
                        <h3 className="h3-heading">
                            Submit your code here
                        </h3>
                        <Dragger 
                            className="input-dragger" 
                            {...handleFile} 
                            accept=".zip"
                        >
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">
                                Click or drag file to this area to upload
                            </p>
                            <p>
                                Upload the zip files here
                            </p>
                        </Dragger>

                        <span className="f-d f-h-c body-big strong-text
                        sub-heading cap-letter">
                            or
                        </span>

                        <div className="input-wrapper w-50">
                            <Input placeholder="Enter your Github link here"
                            onChange={(event) => onChange(event) } />
                        </div>
                        <button className="f-d default-pink-btn filled-pink 
                        submit-btn" onClick={() => submitProject()}>
                            Submit Project
                        </button>
                    </div>
                </div>
            </Layout>
        }
            <style jsx>{`

                .project-content-wrapper .go-back-btn {
                    margin-bottom: 2rem;
                    width: max-content;
                    text-transform: uppercase;
                }

                .project-content-wrapper .go-back-btn .icon {
                    padding: 4px;
                    margin-right: 8px;
                    border: 1px solid var(--snowfall);
                    border-radius: var(--peaky-br-full);
                }

                .project-content-wrapper .go-back-btn:hover {
                    color: var(--purple);
                }

                .project-content-wrapper .description {
                    margin: var(--peaky-gap-32) 0 0;
                    white-space: pre-wrap;
                    line-height:2;
                }

                .project-content-wrapper .action-block {
                    margin: var(--peaky-gap-64) 0 0;
                }

                .project-content-wrapper .action-block 
                .input-wrapper {
                    margin: var(--peaky-gap-32) 0 0;
                }

                .project-content-wrapper .action-block 
                .input-wrapper .ant-input {
                    height: 45px;
                }

                .project-content-wrapper .action-block 
                .input-dragger {
                    margin: var(--peaky-gap-32) 0 0;
                }

                .project-content-wrapper .action-block 
                .input-wrapper .upload-btn {
                    text-decoration: underline;
                }

                .project-content-wrapper .action-block 
                .input-wrapper .upload-btn:hover {
                    color: var(--purple);
                }

                .project-content-wrapper .action-block 
                .submit-btn {
                    margin: var(--peaky-gap-32) 0 0;
                }

                .project-content-wrapper .action-block 
                .sub-heading {
                    margin: var(--peaky-gap-32) 0 0;
                }

                @media only screen and (max-device-width: 760px) {
                    .project-content-wrapper .description {
                        width: 100%;
                    }

                    .project-content-wrapper .action-block 
                    .input-wrapper {
                        width: 100%;
                    }
                }

            `}</style>
        </>
    )
}

export default Project;
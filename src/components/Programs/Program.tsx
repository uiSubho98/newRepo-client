import { Button } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { G_API_URL } from "../../constants/constants";
import { IProgram } from "../../interfaces/students";
import { openNotification } from "../../utils/common.util";
import { check_login } from "../../utils/login.util";
import { __getToken, __getProfileSetupStatus } from "../../utils/user-details.util";

interface IProps {
    data: IProgram
}

const Program = (props: IProps) => {

    const { name, gist, application_status, status, logo, slug } = props.data;
    console.log(props)
    const history = useHistory();

    const [isLoading, setLoading] = useState(false);

    const apply = () => {
        if(check_login()) {
            if(__getProfileSetupStatus()) {
                setLoading(true);
                const source = localStorage.getItem("source");
                const medium = localStorage.getItem("medium");
                axios.post(G_API_URL + "jobsboard/job/apply", {
                    program_id: slug,
                    source,
                    medium
                }, {
                    headers: {
                        Authorization: __getToken()
                    }
                }).then((response:any) => {
                    response = response.data;
                    setTimeout(() => {
                        setLoading(false);
                        if(response.status === 1) {
                            if(source) localStorage.removeItem("source");
                            if(medium) localStorage.removeItem("medium");
                            history.push({
                                pathname: "/application/success",
                                state: {
                                    slug: "/programs"
                                }
                            });
                        } else {
                            openNotification("fail", response.message, 3);
                        }
                    }, 800);
                }).catch(err => {
                    console.log(err);
                });
            } else {
                localStorage.setItem('test', '01');
                history.push({
                    pathname: "/profile",
                    state: { program_id: slug }
                });
            } 
        } else {
           
            history.push("/login?rurl=/programs");
        }
    }

    return (
        <div className="program">
            <div className="company-logo-wrapper">
                <div className="bg-image-full company-logo" 
                style={{ backgroundImage: "url(" + logo + ")" }} />
            </div>
            <div className="info">
                <h4 className="font-inconsolata name text-large">
                    { name }
                </h4>
                <p className="gist text-medium">{ gist }</p>
                <div className="f-d f-v-c action-block">
                    <Button className="default-blue-btn btn-small 
                    apply-now-btn" disabled={status === 0 || application_status === 1} 
                    onClick={() => apply()} loading={isLoading}>
                        { application_status === 0 ? "Apply Now" : "Applied" }
                    </Button>
                    <button className="c-pointer learn-more-btn" 
                    disabled={status === 0} onClick={() => 
                    history.push("/program/" + slug)}>
                        Learn More
                    </button>
                </div>
                {
                    status ?
                    <p className="active status">Limited Seats Only</p> :
                    <p className="status">Applications Closed</p>
                }
            </div>
        </div>
    )
}

export default Program;
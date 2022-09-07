import React, { useEffect, useState } from "react";
import { RouteComponentProps, useHistory } from "react-router";
import axios from "axios";
import { G_API_URL } from "../../constants/constants";
import Layout from "../../components/Layout";
import Spinner from "../../components/Spinner/spinner";
import Hero from "../../components/ProgramInfo/Hero";
import ProgramOverview from "../../components/ProgramInfo/ProgramOverview";
import EligibilityCriteria from "../../components/ProgramInfo/EligibilityCriteria";
import CompanyInfo from "../../components/ProgramInfo/CompanyInfo";
import Banner from "../../components/ProgramInfo/Banner";
import { check_login } from "../../utils/login.util";
import { __getProfileSetupStatus, __getToken, __getUID } from "../../utils/user-details.util";
import { getSearchParam, openNotification } from "../../utils/common.util";

interface MatchParams {
    slug: string;
}

interface IProgramInfoProps extends RouteComponentProps<MatchParams> {
}

const ProgramInfo = (props: IProgramInfoProps) => {
    const { slug } = props.match.params;
    const [isLoading, setLoading] = useState<boolean>(false);
    const [applicationState, setApplicationState] = useState<number>(-1);
    const [content, setContent] = useState<any>();
    const history = useHistory();
    const source = getSearchParam('source');
    const medium = getSearchParam('medium');

    useEffect(() => {

        if(source) {
            localStorage.setItem("source", source);
        }

        if(medium) {
            localStorage.setItem("medium", medium);
        }

        setLoading(true);
        axios.get(G_API_URL + "jobsboard/job/info", {
            params: {
                slug,
                uid: __getUID()
            }
        }).then((response) => {
            response = response.data;
            if (response.status === 1) {
                setContent(response.data);
                setTimeout(() => {
                    setLoading(false);
                },1500);
            } else {
                history.push("/404");
            }
        }).catch((error) => {
            console.log(error);
        });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const apply = (state = -1) => {
        if(check_login()) {
            if(__getProfileSetupStatus()) {
                setApplicationState(state);
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
                        setApplicationState(-1);
                        if(response.status === 1) {
                            if(source) localStorage.removeItem("source");
                            if(medium) localStorage.removeItem("medium");
                            history.push({
                                pathname: "/application/success",
                                state: {
                                    slug: "/program/" + slug
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
                history.push({
                    pathname: "/profile",
                    state: { program_id: slug }
                });
            }
        } else {
            history.push("/login?rurl=/program/"+ slug);
        }
    }


    return (
        <>
            {
                !isLoading && content ?
                <Layout footer={true}>
                    <Hero 
                        apply={apply} 
                        hasApplied={content.has_applied}
                        isLoading={applicationState === 0} 
                        status={content.status}
                        {...content.hero_content} 
                    />
                    <ProgramOverview {...content.program_overview} />
                    <EligibilityCriteria conditions={content.eligibility_criteria} />
                    <CompanyInfo { ...content.company_info } />
                    <Banner 
                        apply={apply} 
                        hasApplied={content.has_applied} 
                        isLoading={applicationState === 1} 
                        status={content.status}
                        {...content.banner} 
                    />
                </Layout> :
                <Spinner />
            }
        </>
    )
}

export default ProgramInfo;
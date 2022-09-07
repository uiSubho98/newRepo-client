import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Layout from "../../components/Layout";
import { IBadge, ICertificate, IProfile, IProgram } from "../../components/ProfileOld/profile";
import { useHistory, useParams } from 'react-router';
import { check_login } from "../../utils/login.util";
import { G_API_URL, G_URL } from "../../constants/constants";
import { __getUID } from "../../utils/user-details.util";
import axios, { AxiosResponse } from "axios";
import Hero from "../../components/ProfileOld/Hero";
import ProfileBody from "../../components/ProfileOld/ProfileBody";
import Spinner from "../../components/Spinner/spinner";

interface IProfileExt extends IProfile {
    certifications: Array<ICertificate>
    badges: IBadge
    programs: Array<IProgram>
}

const Profile:React.FC = () => {
    const [profile, setProfile] = useState<IProfileExt>({
        firstName: "",
        lastName: "",
        website: "",
        linkedinUrl: "",
        githubUrl: "",
        isWorking: false,
        company: "",
        designation: "",
        college: "",
        yop: "",
        degree: "",
        stream: "",
        profilePic: "",
        certifications: [],
        badges: {earned:[], earnable:[]},
        programs: []
    });

    const params = useParams<{ uid: string }>();
    const uid = parseInt(params.uid);
    const history = useHistory();
    const [loading, setLoading] = useState<boolean>(false);

    if(uid === undefined && check_login()) {
        window.location.href = G_URL + 'profile/' + __getUID();
    }

    useEffect(() => {
        if(!isNaN(uid)) {
            setLoading(true);
            // Fetch profile data
            axios.get(
                G_API_URL+"profile/?uid="+uid
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
                        certifications: resp.profile.certificates,
                        badges: resp.profile.badges,
                        programs: resp.profile.programs
                    }));
                    setLoading(false);
                } else if(resp.status === 2 && uid === __getUID()) {
                    history.push('/setup-profile');
                } else {
                    history.push('/');
                }
            });
        }
    },[uid, history]);

    return (
        <>
            {
                !loading?
                <Layout>
                    <Helmet>
                        <title>ProGrad | Profile</title>
                    </Helmet>
                    <div className="profile-wrapper g-d g-col-1 g-h-c tb-pad-d tb-pad-m">
                        <div className="profile-container">
                            <Hero 
                                name={profile.firstName + " " + profile.lastName}
                                isWorking={profile.isWorking}
                                linkedinUrl={profile.linkedinUrl}
                                githubUrl={profile.githubUrl}
                                website={profile.website}
                                profilePic={profile.profilePic}
                                place={profile.isWorking ? profile.company : profile.college}
                                allowEditing={__getUID() === uid}
                            />
                            <ProfileBody firstName={profile.firstName} certs={profile.certifications} badges={profile.badges} programs={profile.programs} showEarnable={__getUID() === uid}/>
                        </div>
                    </div> 
                </Layout> :
                <Spinner />
            }
            <style jsx>
            {`
                .profile-wrapper .profile-container {
                    width: 70%;
                }
                
                @media only screen and (max-device-width: 760px) {
                    .profile-wrapper .profile-container {
                        width: 100%;
                    }
                }
            `}
            </style>
        </>
    )
}

export default Profile;
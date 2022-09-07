import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Lottie from "react-lottie";
import animationData from "../../assets/lottie/application_success.json";

const ApplicationSuccess = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
    };

    const history = useHistory();
    const location = useLocation();
    const slug = location?.state?.slug;
    useEffect(() => {
        if(slug) {
            setTimeout(() => {
                history.push("/jobsboard");
            }, 2500);
        } else {
            history.push("/programs");
        }
    }, [history, slug]);

    return (
        <div className="f-d f-vt f-v-c f-h-c lr-pad-d 
        lr-pad-m tb-pad-d tb-pad-m">
            <Lottie 
                options={defaultOptions}
                height={400}
                width={400}
            />
            <h2 className="font-heading text-large text-c-d">
                We have received your application
            </h2>
        </div>
    )
}

export default ApplicationSuccess;
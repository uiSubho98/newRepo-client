import React from "react";
import { Button } from "antd";
import { IBanner } from "../../interfaces/program-info";

interface IProps extends IBanner {
    apply: Function;
    hasApplied: boolean;
    isLoading: boolean;
    status: number;
}

const Banner = (props: IProps) => {
    const { apply, hasApplied, heading, info, isLoading, status } = props;
    return (
        <>
            <div className="apply-banner-wrapper lr-pad-d lr-pad-m">
                <div className="heading">{ heading }</div>
                <div className="info">{ info }</div>
                <div className="apply-btn-sec f-d f-h-c">
                    <Button type="primary" className="default-blue-btn"
                    id="apply-btn-sec" onClick={() => apply()}
                    loading = {isLoading} disabled={status === 0 || hasApplied}>
                        { hasApplied ? "Applied" : "Apply Now" }
                    </Button>
                </div>
            </div>
            <style jsx>
                {`
                    .apply-banner-wrapper {
                        background-color: var(--primary-grad);
                        padding-top: 80px;
                        padding-bottom: 80px;
                        font-family: "Nunito sans", sans-serif;
                    }

                    .apply-banner-wrapper .heading {
                        color: var(--dove);
                        font-weight: 500;
                        text-align: center;
                        font-size: 30px;
                        font-family: "Poppins";
                    }

                    .apply-banner-wrapper .info {
                        color: var(--dove);
                        font-weight: 300;
                        text-align: center;
                        font-size: 21px;
                        margin-top: 18px;
                    }
        
                    .apply-banner-wrapper .apply-btn-sec {
                        margin-top: 48px;
                        text-align: center;
                    }

                    #apply-btn-sec {
                        width: 160px;
                        border: none;
                        background: var(--primary-bg) !important;
                        color: var(--dove);
                    }
                `}
            </style>
        </>
    )
}

export default Banner;
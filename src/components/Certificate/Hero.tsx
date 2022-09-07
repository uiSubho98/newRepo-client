import React, { useState } from "react";
import { Button } from "antd";
// @ts-ignore
import {Document, Page, pdfjs} from "react-pdf";
import { isMobile } from "react-device-detect";
import { __getToken, __getUserName } from "../../utils/user-details.util";
import axios from "axios";
import { G_API_URL } from "../../constants/constants";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface IContent {
    cert_link?: string;
    folder?: string;
    unique_id?: string;
    download_status?: number;
    update_active_milestone?: string;
}

interface IProps {
    data?: IContent;
    slug?: string;
    programType?: string;
}

const Hero = (props:IProps) => {
    const [isLoading, setLoading] = useState<boolean>(false);

    const { data, slug, programType } = props;

    let userName:string = __getUserName();
    userName = userName.split(" ")
    .map((value:string) => value[0].toUpperCase() + 
    value.slice(1)).join(" ");
    
    const handleClick = () => {
        let url: string;
        let downloadCondition:boolean;
        if (programType === "microdegree") {
            url = `https://cdn.prograd.org/${data?.folder ? data?.folder : "Milestone-Certificates"}/${slug}.pdf`
            downloadCondition = (data?.download_status === 0 || 
                data?.update_active_milestone) ? true : false;
        } else {
            url = `https://cdn.prograd.org/${data?.folder ? data?.folder : "Bootcamp-Certificates"}/${slug}.pdf`
            downloadCondition = (data?.download_status === 0) ? true : false;
        }

        setLoading(true);

        if(downloadCondition) {
            let params = {
                unique_id: slug,
                programType,
                update_active_milestone : data?.update_active_milestone
            };

            let headers = {
                headers: {
                    Authorization: __getToken()
                }
            }

            axios.put(G_API_URL+"progress/download-certificate/", params, headers)
            .then((response) => {
                response = response.data;
                if(response.status === 1) {
                    setTimeout(() => {
                        setLoading(false);
                        window.location.href = url;
                    },500);
                }
            }).catch((error) => {

            });
        } else {
            setTimeout(() => {
                setLoading(false);
                window.location.href = url;
            },500);
        }
    }

    return (
        <>
            <div className="g-d g-h-c certificate-content-wrapper
            lr-pad-d lr-pad-m tb-pad-d tb-pad-m">
                <span className="f-d body-large 
                strong-text">
                    Congratulations, {userName}!
                </span>
                <span className="f-d f-vt text-c-d body-regular
                complement">
                    <span>Many congratulations and we wish you all the very best 
                    for the future.</span>
                    <span>Share this achievement with your friends and family</span>
                </span>
                <Button className="download-btn cap-letter
                default-blue-btn btn-small" 
                onClick={() => handleClick() }
                loading = {isLoading}>
                    Download Now
                </Button>
                <div className="w-100 certificate">
                    <Document file={data?.cert_link} className='skeleton-card' loading=''>
                        <Page pageNumber={1} height={isMobile ? 300 : 789} width={isMobile ? 250 : 1280}/>
                    </Document>
                </div>
            </div>
            <style jsx>{`
                .certificate-content-wrapper .complement {
                    margin: var(--peaky-gap-8) 0 var(--peaky-gap-32);
                }

                .certificate-content-wrapper .download-btn {
                    padding-left: 2rem;
                    padding-right: 2rem;
                }

                .certificate-content-wrapper .certificate {
                    margin: var(--peaky-gap-128) 0 0;
                }

                .certificate-content-wrapper .certificate .skeleton-card {
                    height: 900px;
                    box-shadow: var(--peaky-shadow-high-2);
                }

                .certificate-content-wrapper .certificate 
                .react-pdf__Page__canvas {
                    width: 100% !important;
                }

                @media only screen and (max-device-width: 760px) {

                    .certificate-content-wrapper .certificate {
                        margin-top: var(--peaky-gap-64);
                    }

                    .certificate-content-wrapper .certificate 
                    .skeleton-card {
                        height: 240px;
                    }

                    .certificate-content-wrapper .certificate 
                    .react-pdf__Page__canvas {
                        width: 100% !important;
                        height: 100% !important;
                    }
                }
            `}</style>
        </>
    )
}

export default Hero;
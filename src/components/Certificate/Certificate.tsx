import React, { useState } from "react";
import pro_junior_logo from "../../assets/brand/prograd_logo.svg";
import ShareBtn from "../Vision/ShareBtn";
import { G_URL } from "../../constants/constants";
// @ts-ignore
import { Document, Page, pdfjs } from "react-pdf";
import { isMobile } from "react-device-detect";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import styled from "styled-components";

const CerificateContainer = styled.div`
    text-align: center;

    .congrats-msg {
        margin-top: 64px;
    }

    .share-container {
        margin-top: 32px;
        margin-bottom: 64px;

        .share-text {
            margin-bottom: 16px;
        }

        .share-btn-container {
            justify-content: center;

            .share-icon {
                border: 2px solid rgba(255, 255, 255, 0.87);
                border-radius: var(--peaky-br-full);
                color: rgba(255, 255, 255, 0.87);
                height: 50px;
                width: 50px;
            }

            .share-icon .fa {
                font-size: 23px;
            }

            .whatsapp-icon:hover {
                border-color: #25D366;
                color: #25D366;
            }


            .fb-icon:hover {
                border-color: #1877F2;
                color: #1877F2;
            }

            .linkedin-icon:hover {
                border-color: #0077B5;
                color: #0077B5;
            }


            .twitter-icon:hover {
                border-color: #1DA1F2;
                color: #1DA1F2;
            }
        }
    }

    .SocialMediaShareButton {
        width: 50px;
        height: 50px;
        margin-right: 16px;
        outline: none;

        div {
            width: 50px;
            height: 50px;
        }
    }

    .divider {
        border: 1px solid rgba(255, 255, 255, 0.1);
        width: 60%;
        margin: 0 auto;
    }

    .action-block {
        margin: 64px 0px;

        .default-blue-btn {
            margin-bottom: 16px;
        }

        .cert-dwnld-btn {
            margin-right: 16px;
        }
    }

    .certificate-container {
        padding-bottom: 64px;
    }

    .skeleton-card {
        width: 1280px;
        height: 904px;
    }

    @media only screen and (max-device-width: 760px) {
        .divider {
            width: 100%;
        }

        .action-block {
            .cert-dwnld-btn {
                width: 100%;
                margin-right: 0;
            }

            .linkedin-cert-btn {
                width: 100%;
            }
        }

        .certificate-container {
            padding: 0 0 64px;
        }

        .skeleton-card {
            height: 240px;
            width: 100%;
            padding: 0;
        }

        .react-pdf__Page__canvas {
            height: 100%;
            width: 100%;
        }
    }
`;

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface IData {
    profile_type?: number;
    ptile?: number;
    slug?: string;
    student_name?: string;
    cert_link?: string;
    cred_id?: number;
    cert_title?: string;
}

const Certificate = ({ data, fromPage }: { data: IData; fromPage: string }) => {
    const [isDownloading, setDownloading] = useState<boolean>(false);

    const antIcon = <LoadingOutlined style={{ fontSize: 24, color: "var(--dove)" }} spin />;
    const handleClick = () => {
        const url = `https://cdn.prograd.org/Workshop-Certificates/${data.slug}.pdf`;
        setDownloading(true);
        setTimeout(() => {
            setDownloading(false);
            window.location.href = url;
        }, 1000);
    };
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const certificateLink = `${G_URL}vision/certificate/${data.slug}`;
    const certificateTitle = data.cert_title ? data.cert_title : "";
    return (
        <CerificateContainer className="lr-pad-m certificate-wrapper">
            <div className="brand-logo c-pointer " onClick={() => (window.location.href = G_URL)}>
                <img src={pro_junior_logo} alt="logo" className="prograd-logo" />
            </div>

            <div className="font-heading text-xl congrats-msg">
                Congratulations, {data.student_name}!
            </div>

            <div className="share-container">
                <div className="share-text body-large">
                    Share this achievement with your friends and family
                </div>
                <ShareBtn
                    name={data.student_name}
                    msg={`Check out my achievement at ProGrad - ${window.location.href}.\n\nJoin ProGrad today and learn the most in-demand tech skills -`}
                    tw_msg={`Check out my achievement at ProGrad - ${window.location.href}.\n\nJoin ProGrad today and learn the most in-demand tech skills -`}
                    w_url={"https://bit.ly/3fsLuPI"}
                    fb_url="https://bit.ly/39ryjdT"
                    li_url="https://bit.ly/3ddQghi"
                    tw_url="https://bit.ly/3fsLE9M"
                    fromPage={fromPage}
                />
            </div>

            <div className="divider"></div>

            <div className="f-d f-h-c f-v-c f-vt-m action-block">
                <div className="cert-dwnld-btn default-blue-btn" onClick={() => handleClick()}>
                    {!isDownloading ? "Download certificate" : <Spin indicator={antIcon} />}
                    {!isDownloading ? "" : <span>&nbsp;&nbsp;DOWNLOADING</span>}
                </div>
                <div
                    className="linkedin-cert-btn default-blue-btn outline-white"
                    onClick={() =>
                        window.open(
                            `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURI(
                                certificateTitle
                            )}&organizationId=66704084&issueYear=${year}&issueMonth=${month}&certUrl=${encodeURI(
                                certificateLink
                            )}&certId=${data.cred_id}`,
                            "_blank"
                        )
                    }
                >
                    Add Certificate To Linkedin
                </div>
            </div>

            <div
                className={`certificate-container lr-pad-d f-vt  f-d f-h-c f-v-c  ${
                    isMobile ? "f-d f-h-c" : ""
                }`}
            >
                <Document file={data.cert_link} className="skeleton-card" loading="">
                    <Page
                        pageNumber={1}
                        height={isMobile ? 300 : 789}
                        width={isMobile ? 250 : 1280}
                    />
                </Document>
            </div>
        </CerificateContainer>
    );
};

export default Certificate;

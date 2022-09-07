import React from "react";

import {
    EmailIcon,
    EmailShareButton,
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    LinkedinShareButton,
} from "react-share";
// import {G_HOME_URL} from "../../constants/constants";
import link from "../../assets/imgs/link.svg";
import {getGATag, openNotification} from "../../utils/common.util";

interface ILinkShareProps {
    type?: string
    backColor?: string
    icon?: React.ReactNode
    url: string
}

let handleMediaShare = (content:any, platform: string) => {

    let action = "vision_report_shared";
    let category = "WorkshopReport";

    if(content.type === "certificate") {
        action = "vision_certificate_shared"; 
        category = "WorkshopCertificate";
    } else if(content.type === "project") {
        action = "vision_project_shared";
        category = "WorkshopProject";
    }
    // Send Video Share Event to GA
    const tag = getGATag(action,
    category, content.url + `?platform=${platform}`,0);
    document.body.appendChild(tag);
}

const LinkShare = (props: ILinkShareProps) => {
    let style: React.CSSProperties = { backgroundImage: "url('" + link + "')" }
    let className = "link-share"
    let icon_jsx = null
    let message = "Link copied to clipboard. Share away!"

    if(props.type && props.type === "copy-link") {
        className = "copy-share"
        style = {backgroundColor: props.backColor}
        icon_jsx = props.icon;
        message = "Link copied to clipboard."
    }

    return (
        <>
        <div
            className={`bg-image c-pointer SocialMediaShareButton ${className}`}
            style={style}
            onClick={() => {
                openNotification( 'success',message,6)
                navigator.clipboard.writeText(props.url);
                handleMediaShare(props, 'direct')
            }}
        >   
            {icon_jsx}
        </div>
        <style jsx>
            {`
                .copy-share {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            `}
        </style>    
        </>
    );
};


const EmailShare = (props: any) => {
    return (
        <EmailShareButton
            url={props.url}
            onShareWindowClose={() => handleMediaShare(props, 'email')}
        >
            <EmailIcon round={true} size={36} />
        </EmailShareButton>
    );
};

const WhatsAppShare = (props: any) => {
    return (
        <WhatsappShareButton
            url={props.url}
            title={props.title}
            separator={props.separator}
            onShareWindowClose={() => handleMediaShare(props, 'whatsapp')}
            windowWidth = {1280}
            windowHeight ={720}
        >
            {props.div}
        </WhatsappShareButton>
    );
};

const FacebookShare = (props: any) => {
    return (
        <FacebookShareButton
            url={props.url}
            quote={props.quote}
            hashtag='#ProGrad'
            onShareWindowClose={() => handleMediaShare(props, 'facebook')}
            windowWidth = {1280}
            windowHeight ={720}
        >
            {props.div}
        </FacebookShareButton>
    );
};

const TwitterShare = (props: any) => {
    return (
        <TwitterShareButton
            url={props.url}
            title={props.title}
            // via={G_HOME_URL}
            hashtags={['ProGrad']}
            // related={['@rajesh_face']}
            windowWidth = {1280}
            windowHeight ={720}
            onShareWindowClose={() => handleMediaShare(props, 'twitter')}
        >
            {props.div}
        </TwitterShareButton>
    );
};

const LinkedinShare = (props: any) => {
    return (
        <LinkedinShareButton
            url={props.url}
            // title={'dawda'}
            // summary={'dawda'}
            // source={'dawda'}
            // title = {props.title}
            // source={G_HOME_URL}
            windowWidth = {1280}
            windowHeight ={720}
            onShareWindowClose={() => handleMediaShare(props, 'linkedin')}
        >
            {props.div}
        </LinkedinShareButton>
    );
};



export { EmailShare, WhatsAppShare, FacebookShare, TwitterShare,LinkedinShare,LinkShare };

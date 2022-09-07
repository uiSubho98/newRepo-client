import React from 'react';
// import lock_icon from '../../assets/icons/svg_icons/lock.svg';
import achievement_badge from '../../assets/icons/svg_icons/achievement_badge.svg';

interface IProps {
    certificateContent: {
        title: string
        desc: string
        tags: string
    }
}
const CourseCertificate = (props: IProps) => {
    const { title, desc, tags } = props.certificateContent;

    let getTags = () => {
        let splitTags = tags.split(',');
        let tagsHolder = Array<React.ReactNode>();
        splitTags.forEach((tag: string, index: number) => {
            tagsHolder.push(
                <div key={index} className="tag-block f-d f-v-c">
                    <div className="achievement-badge bg-image-full" style={{backgroundImage: 'url(' + achievement_badge + ')'}}></div>
                    {tag}
                </div>
            )
        })
        return tagsHolder;
    }

    return (
        <>
            <div className="course-certificate f-d f-vt-m f-v-c f-h-sb">
                <div className="certificate-left">
                    <h3 className="h3-heading">{title}</h3>
                    <div className="desc">{desc}</div>
                    <div className="tags-container f-d f-v-c">
                        {getTags()}
                    </div>
                </div>
                {/* <div className="certificate-right">
                    <div className="certificate-btn">View</div>
                    <div className="certificate-btn default-inactive-btn fill-inactive btn-small f-d f-v-c">
                        <div className="lock-icon bg-image-full" style={{backgroundImage: 'url(' + lock_icon + ')'}}></div>
                    </div>
                </div> */}
            </div>
        </>
    );
}

export default CourseCertificate;

import React from 'react';
import lock_icon from '../../assets/icons/svg_icons/lock.svg';
import { G_URL } from '../../constants/constants';

interface ICourseStar {
    title: string
    desc: string
}

interface ICertificate {
    term: string
    milestone_name: string

}

interface IProps {
    courseStar: ICourseStar
    status: boolean
    termName: string
    term: string
    userProgress?: any
}

const CourseStar = (props: IProps) => {
    var { courseStar, status, termName, term, userProgress } = props;

    let isMilestoneUnlocked = false;
    let slug;
    if (status && userProgress.progress &&
        userProgress.progress.certificates) {
        termName = termName.split("\n").join(" ").toLowerCase();
        const filteredCertificates = userProgress.progress.certificates
            .filter((certificate: ICertificate) =>
                certificate.term === term &&
                certificate.milestone_name === termName);
        if (filteredCertificates.length) {
            isMilestoneUnlocked = true;
            slug = "/" + filteredCertificates[0].slug;
        }
    }

    return (
        <>
            <div className="course-completion-star">
                <h3 className="title h3-heading">{courseStar.title}</h3>
                <div className="desc body-small">{courseStar.desc}</div>
                {
                    courseStar.title.toLowerCase() !== "milestone 10" &&
                    ((isMilestoneUnlocked && slug) ?
                        <a
                            href={G_URL + "certificate/microdegree" + slug}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <button
                                className="default-pink-btn filled-pink milestone-action-btn"
                            >
                                Download
                        </button>
                        </a>
                        :
                        <div className="milestone-action-btn default-inactive-btn 
                    fill-inactive f-d f-v-c">
                            <div className="lock-icon bg-image-full"
                                style={{ backgroundImage: 'url(' + lock_icon + ')' }}></div>
                        </div>)
                }
            </div>
        </>
    );
}

export default CourseStar;
import React from 'react';
import { ICountryData } from './microdegreeDashboard';

interface IProps {
    courseName?:any
    courseContent?:any
    courseExpanded?:any
    setCourseExpand?:any
    userProgress?: any
    learningPath?: any
    countryData?: ICountryData
    onetimePrice?: any
    timeZones?: object
}
const CourseDetails = (props: IProps) => {
    const { courseName, courseContent, courseExpanded, setCourseExpand, userProgress } = props
    var showPaymentButton = userProgress.progress.ongoing.course === 1 && userProgress.progress.next.course === courseContent.courseId;


    var handlePayment = () => {
        // var termData = courseContent.termsContent[Object.keys(courseContent.termsContent)[0]];
        // Object.keys(courseContent.termsContent).forEach(termKey => {
        //     if(courseContent.termsContent[termKey]['termId'] === userProgress.progress.next.term) {
        //         termData = courseContent.termsContent[termKey]
        //     }
        // })
        // let pricingCountry = countryData && countryData.countryName && termData.price[countryData.countryName] ? countryData.countryName : "India";

        // let pricingOption1 = {
        //     "type": termData.name,
        //     "name": "term",
        //     "terms": termData.termId,
        //     "termIds": [termData.termId],
        //     "courses": courseContent.courseId.toString(),
        //     "courseIds": [courseContent.courseId],
        //     "title": "Term-wise Installment",
        //     "symbol": termData.price[pricingCountry].symbol,
        //     "actualPrice": termData.price[pricingCountry].mrp,
        //     "sellingPrice": termData.price[pricingCountry].sp,
        //     "planPrice": termData.price[pricingCountry].sp,
        //     "planId": "term",
        //     "courseTermMap": JSON.stringify({ [courseContent.courseId.toString()]: [termData.termId] })
        // }
        // let courseTermMap2 = {
        //     [courseContent.courseId.toString()]: Object.keys(courseContent.termsContent).map((term: string) => courseContent.termsContent[term].termId)
        // }
        // let pricingOption2 = {
        //     "type": courseContent.name,
        //     "name": "year",
        //     "terms": Object.keys(courseContent.termsContent).map((term: string) => courseContent.termsContent[term].termId).join(','),
        //     "termIds": Object.keys(courseContent.termsContent).map((term: string) => courseContent.termsContent[term].termId),
        //     "courses": courseContent.courseId.toString(),
        //     "courseIds": [courseContent.courseId],
        //     "title": "Year-wise Installment",
        //     "symbol": courseContent.price[pricingCountry].symbol,
        //     "actualPrice": courseContent.price[pricingCountry].mrp,
        //     "sellingPrice": courseContent.price[pricingCountry].sp,
        //     "planPrice": courseContent.price[pricingCountry].sp,
        //     "planId": "course",
        //     "courseTermMap": JSON.stringify(courseTermMap2)
        // }
        // let courseTermMap3 = {
        //     [courseContent.courseId.toString()]: Object.keys(courseContent.termsContent).map((term: string) => courseContent.termsContent[term].termId)
        // }
        // learningPath?.map((course:any) => course.courseId)
        //     .forEach((x: any, i:number) => {
        //         courseTermMap3[x] = Object.keys(learningPath[i].termsContent).map((term: string) => learningPath[i].termsContent[term].termId)
        //     })
        // let pricingOption3 = {
        //     "type": "Microdegree",
        //     "name": "one-time",
        //     "terms": learningPath?.map((course:any) => Object.keys(course.termsContent).map((term: string) => course.termsContent[term].termId).join(',')).join(','),
        //     "termIds": learningPath?.map((course:any) => Object.keys(course.termsContent).map((term: string) => course.termsContent[term].termId)).flat(),
        //     "courses": learningPath?.map((course:any) => course.courseId).join(','),
        //     "courseIds": learningPath?.map((course:any) => course.courseId),
        //     "title": "One time pay",
        //     "symbol": onetimePrice[pricingCountry].symbol,
        //     "actualPrice": onetimePrice[pricingCountry].mrp,
        //     "sellingPrice": onetimePrice[pricingCountry].sp,
        //     "planPrice": onetimePrice[pricingCountry].sp,
        //     "planId": "one-time",
        //     "courseTermMap": JSON.stringify(courseTermMap3)
        // }
        // let paymentOptions = {
        //     microdegree: [pricingOption1, pricingOption2, pricingOption3]
        // }

        // Update Store
        // dispatch(updatePlan({
        //     type: "microdegree",
        //     symbol: countryData?.countryName && courseContent.price[countryData.countryName].symbol,
        //     international_status: countryData?.countryName !== "India",
        //     country: countryData?.countryName,
        //     countryCode: countryData?.countryCode,
        //     timeZones,
        //     paymentOptions,
        //     slots: termData.slots
        // }));

        // Redirect to Payment Page
        setTimeout(() => {
            window.location.href = `/payment/microdegree`;
        }, 300)
    }
    return (
        <>
            <div className={`course-details f-d f-vt-m f-v-c f-h-sb ${showPaymentButton ? 'with-pymt-btn' : ''}`}>
                <div className="details-left">
                    <div className="course-tag body-small">{courseContent.courseTag}</div>
                    <h2 className="name h2-heading">{courseName}</h2>
                    {/* <a 
                        className={`go-to-details-btn default-pink-btn outline-pink ${!courseExpanded ? 'not-visible' : 'visible'}`}
                        href={`${process.env.PUBLIC_URL}/${courseContent.courseSlug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        View Details
                    </a> */}
                    <div 
                        className={`pay-now-btn default-pink-btn filled-pink ${showPaymentButton ? '' : 'hide-d'}`}
                        onClick={()=>{handlePayment()}}
                    >
                        Pay to enroll Now
                    </div>
                </div>
                <div className={`details-expand-btn default-inactive-btn c-pointer f-d f-v-c ${showPaymentButton ? 'with-pymt-btn' : ''}"`} onClick={() => setCourseExpand()} >
                    <i className="icon icon-chevron-down"></i>
                    <p className="hide-m">{courseExpanded?'Collapse':'Expand'}</p>
                </div>
            </div>
            <style jsx>
                {`
                .ant-modal-close {
                    width: 32px;
                    height: 32px;
                    margin: 18px 24px;
                    border-radius: 50px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #f2f2f2;
                }

                .purchase-modal .ant-notification {
                    top: 55px !important;
                    position: absolute;
                }

                .course-details .course-action-btn {
                    padding: 0 2rem;
                }

                .purchase-modal .ant-notification-notice {
                    padding: 1rem 2rem !important;
                }

                .purchase-modal .ant-notification-notice-close {
                    right: 2rem !important;
                }
                `}
            </style>
        </>
    );
}

export default CourseDetails;

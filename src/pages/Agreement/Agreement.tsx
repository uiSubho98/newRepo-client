import React from "react";
// @ts-ignore
import { Helmet } from 'react-helmet';
import { RouteComponentProps } from "react-router";
import Layout from "../../components/Layout";

interface MatchParams {
    slug: string
}

interface IAgreementProps extends RouteComponentProps<MatchParams> {
}

const Agreement = (props: IAgreementProps) => {
    const { slug } = props.match.params;
    return (
        <Layout>
            <Helmet>
                <title>ProGrad | Terms and Conditions</title>
            </Helmet>
            <>
            {
                slug === "bootcamp" ?
                <div className="bootcamp-agreement-container lr-pad-d lr-pad-m">
                    <h1 className="h1-heading">Terms and Conditions</h1>
                    <p className= "body-small body-spacing" >Effective 1st November 2020</p>
                    <h3 className="h3-heading">Applicable Law</h3>
                    <p className= "body-small body-spacing">This Course Agreement (hereinafter, "Agreement") is made by and between Focus 4-D Career Education Pvt. Ltd, a company incorporated under the Companies Act 1956, having registration number U74999TZ2009PTC014973 and GSTIN 33AABCF3266F1ZZ with registered office at No.12, Lakshmi Nagar, Thottipalayam Pirivu, Off Avinashi Road, Coimbatore-641014 hereinafter referred to as "Course Provider," and you, further defined below, as a participant in the Course, also defined below.</p>
                    <p className= "body-small body-spacing">All parts and sub-parts of this Agreement are specifically incorporated by reference here. This Agreement shall govern the use of all pages and screens in and on the Course (all collectively referred to as "Course") and any services provided by or on this Course Provider through the Course ("Services") and/or on the Course Provider's website ("Website").</p>
                    <ol>
                        <li>
                            <h3 className="h3-heading">DEFINITIONS</h3>
                            <ol type="A">
                                <li>
                                    <h3 className="h3-heading body-spacing">The parties referred to in this Agreement shall be defined as follows:</h3>
                                    <ol type="i">
                                        <li>
                                            <p className="body-small body-spacing"><b>Course Provider, us, we:</b> Course Provider, as the creator, operator, and publisher of the Course, is responsible for providing the Course publicly. Course Provider, us, we, our, ours and other first-person pronouns will refer to the Course Provider, as well as, if applicable, all employees and affiliates of the Course Provider.</p>
                                        </li>
                                        <li>
                                            <p className= "body-small body-spacing"><b>You, the user, the participant:</b> You, as the participant in the course and user of the Website, will be referred to throughout this Agreement with second-person pronouns such as you, your, yours, or as user or participant.</p>
                                        </li>
                                        <li>
                                            <p className="body-small body-spacing"><b>Parties:</b> Collectively, the parties to this Agreement (Course Provider and You) will be referred to as Parties.</p>
                                        </li>
                                    </ol>
                                </li>
                                <li>
                                    <h3 className= "h3-heading body-spacing">The Course details are as follows:</h3>
                                    <ol type="i">
                                        <li>
                                            <p className="body-small body-spacing"><b>Course Name:</b> ProGrad Full Stack Developer MERN</p>
                                        </li>
                                        <li>
                                            <p className="body-small body-spacing"><b>Course Fees ("Fees"):</b> Course Fees vary periodically. The fees at the time of student enrolment will be specified by the Admission Counsellors, who are part of the Course Provider Team.</p>
                                        </li>
                                        <li>
                                            <p className="body-small body-spacing"><b>Course Duration:</b> 9 weeks, 6 days a week</p>
                                        </li>
                                        <li>
                                            <p className="body-small body-spacing"><b>Course Validity:</b> The course will happen over 9 weeks, and platform validity will be for 1 year from the date of purchase.</p>
                                        </li>
                                    </ol>
                                </li>
                            </ol>
                        </li>
                        <li>
                            <h3 className="h3-heading">COURSE DETAILS</h3>
                            <p className="body-small body-spacing">This Course is delivered as a full-time online coding bootcamp, that up skills you to pick MERN Full Stack skills in 9 weeks. You will undergo training as part of a squad containing other squad members.</p>
                            <p className= "body-small body-spacing">The training program will include 5 Training weeks and 4 Project weeks. The Saturday in every week will be allocated for any pending work, project presentations, or additional training modules / events scheduled at the discretion of the Course Provider. Hence you are advised to reserve Saturdays for Course work.</p>
                            <p className= "body-small body-spacing">You will receive access to a Mentor who will assist you with weekly code reviews, project guidance, tech support, career guidance, professional skills, work ethic, and also to provide general guidance with various aspects of the Course.</p>
                            <p className="body-small body-spacing">Dedicated support from the Mentor team for technical issues and programming advice will be available on the team-communication platform Discord within the Code-Help channel. Timings: 10 AM to 6 PM - Mondays to Saturdays.</p>
                            <p className="body-small body-spacing">The training program consists of a variety of learning elements that make up the Course experience. These include interactive lessons on the Course platform, Code Labs, Solo Projects, Live group sessions (Huddles), interaction with peers and mentors on Discord, and more. These elements are put together to form a learning experience that will help you in transforming yourself to a professional developer.</p>
                            <p className= "body-small body-spacing">The medium of instruction of the training program will be in English, and all Course content and modules will be in English.</p>
                            <p className= "body-small body-spacing">The Student will receive access to an HR representative who will assist with administrative concerns, squad and placement operations.</p>
                            <p className= "body-small body-spacing">During the Training phase, if you are lagging behind the planned schedule, support can be provided via Code Help only. You will be required to complete the pending requirements in Self-Paced mode and catch up with the schedule to continue receiving mentor support as per original schedule.</p>
                            <p className= "body-small body-spacing">You can request for a Squad Transfer through the HR, which will be facilitated if there's a subsequent squad available for the same program. This would be facilitated at a one-time fee of INR 10,000 (applicable taxes to be charged additionally).</p>
                        </li>
                        <li>
                            <h3 className="h3-heading">ASSENT & ACCEPTANCE</h3>
                            <p className="body-small body-spacing">By purchasing and participating in the Course, you warrant that you have read and reviewed this Agreement and that you agree to be bound by it. If you do not agree to be bound by this Agreement, please cease your participation in the Course immediately. If you do so after purchase, you will not be entitled to any refund. Course Provider only agrees to provide the Course to you if you assent to this Agreement.</p>
                        </li>
                        <li>
                            <h3 className="h3-heading">AGE RESTRICTION</h3>
                            <p className= "body-small body-spacing">You must be at least 16 (sixteen) years of age to use this Website, participate in the Course or access any Services contained herein. By participating in the Course, you represent and warrant that you are at least 16 years of age and may legally agree to this Agreement. Course Provider assumes no responsibility or liability for any misrepresentation of your age.</p>
                        </li>
                        <li>
                            <h3 className="h3-heading">LICENSE TO USE WEBSITE & ACCESS COURSE MATERIALS</h3>
                            <p className= "body-small body-spacing">We may provide you with certain information as a result of your accessing of the Course through the Website. Such information may include, but is not limited to, documentation, data, or information developed by us and other materials which may assist in your participation in the Course ("Materials"). Subject to this Agreement, we grant you a non-exclusive, limited, non-transferable and revocable license to use the Materials solely in connection with your participation in the Course and your use of the Website. The Materials may not be used for any other purpose, and this license terminates upon your completion of the Course, your cessation of use of the Course or the Website, or at the termination of this Agreement.</p>
                        </li>
                        <li>
                            <h3 className="h3-heading">COURSE TERMS</h3>
                            <p className= "body-small body-spacing">After purchasing the Course, you may not be able to begin until the specified Course Start Date. You must complete the Course by the specified Course End Date. Whether or not the Course has been completed by the specified Course End Date, it will expire in 1 year from the date of purchase of the Course.</p>
                            <p className= "body-small body-spacing">At the successful completion of the Course based on specified completion criteria including periodic evaluations, you will receive a certificate evidencing your participation in, and completion of, the Course.</p>
                            <p className= "body-small body-spacing">We do not offer any promises or guarantees with regard to our Course or Course Materials.</p>
                        </li>
                        <li>
                            <h3 className="h3-heading">INTELLECTUAL PROPERTY</h3>
                            <p className= "body-small body-spacing">You agree that the Materials, the Course, the Website, and any other Services provided by the Course Provider are the property of the Course Provider, including all copyrights, trademarks, trade secrets, patents, and other intellectual property ("Company IP"). You agree that the Company owns all right, title and interest in and to the Company IP and that you will not use the Company IP for any unlawful or infringing purpose. You agree not to reproduce or distribute the Company IP in any way, including electronically or via registration of any new trademarks, trade names, service marks or Uniform Resource Locators (URLs), without express written permission from the Company.</p>
                        </li>
                        <li>
                            <h3 className="h3-heading">FAIR USAGE OF STUDENT DATA</h3>
                            <p className= "body-small body-spacing">In accordance with the current data privacy law, your personal data will be used for operational and administrative activities held by the Course Provider for the execution of the program. You agree that the data provided to the Course Provider for the purpose of Course enrollment may be transferred to public and/or private companies described herein (Public Administrations, Companies associated with the Course Provider, etc.) with the sole purpose of complying with the specific obligations and rights covered in this relationship.</p>
                            <p className= "body-small body-spacing">In the same way you authorize the use and reproduction of your image and the testimonials that you give the Course Provider for any type of advertising, promotion, publication or any other means, for commercial or informational purposes, without remuneration of any kind.</p>
                        </li>
                        <li>
                            <h3 className="h3-heading">YOUR OBLIGATIONS</h3>
                            <p className="body-small body-spacing">As a participant in the Course, you will be asked to register with us. When you do so, you will choose a user identifier, which may be your email address or another term, as well as a password. You may also provide personal information, including, but not limited to, your name. You are responsible for ensuring the accuracy of this information. This identifying information will enable you to participate in the Course. You must not share such identifying information with any third party, and if you discover that your identifying information has been compromised, you agree to notify us immediately in writing. Email notification will suffice. You are responsible for maintaining the safety and security of your identifying information as well as keeping us apprised of any changes to your identifying information.</p>
                            <p className= "body-small body-spacing">Providing false or inaccurate information, or using the Course or the Website to further fraud or unlawful activity is grounds for immediate termination of this Agreement.</p>
                            <p className= "body-small body-spacing">This educational Course is a full-time program that aims to transform you to become a professional Full Stack developer. This requires active participation from your end throughout the Course in order to succeed.</p>
                            <p className= "body-small body-spacing"><b>OBLIGATIONS:</b> As a participant in the Course, you will be asked to undertake and complete the following obligations:</p>
                            <ol type="a">
                                <li>
                                    <p className= "body-small body-spacing">Attend all sessions and Course events without fail</p>
                                </li>
                                <li>
                                    <p className= "body-small body-spacing">Spend 8 – 10 hours every Course day in training, particularly being available between 9 AM to 6 PM.</p>
                                </li>
                                <li>
                                    <p className= "body-small body-spacing">Submit required deliverables, assignments and projects on time</p>
                                </li>
                                <li>
                                    <p className= "body-small body-spacing">Be responsive on Discord (team communication), email and call to all members of the Course team</p>
                                </li>
                                <li>
                                    <p className= "body-small body-spacing"><b>Proactively ask for support when you are facing issues:</b></p>
                                    <ul>
                                        <li>
                                            <p className= "body-small body-spacing">Technical concerns to be addressed on Code Help on Discord</p>
                                        </li>
                                        <li>
                                            <p className= "body-small body-spacing">Administrative concerns to be addressed with HR</p>
                                        </li>
                                        <li>
                                            <p className= "body-small body-spacing">Escalations to Technical Director and Program Director</p>
                                        </li>
                                    </ul>
                                </li>
                                <p className= "body-small body-spacing">An escalation hierarchy and process will be shared via email upon start of the Course.</p>
                                <li>
                                    <p className= "body-small body-spacing">Learn, Think, Explore, Build, Experiment, Fail, Relearn, Rebuild, and Succeed.</p>
                                </li>
                                <li>
                                    <p className= "body-small body-spacing"> Interact with fellow squad members and the Course team with professionalism in conduct and speech</p>
                                </li>
                            </ol>
                        </li>
                        <li>
                            <h3 className="h3-heading">PAYMENT & FEES</h3>
                            <p className= "body-small body-spacing">As noted above, Course Fees vary periodically. The fees at the time of student enrolment will be specified by the Admission Counsellors, who are part of the Course Provider Team</p>
                            <p className= "body-small body-spacing">If payment is not complete by the specified Course Start Date, you will forfeit your place in the Course.</p>
                            <p className= "body-small body-spacing">In case of availing education loans from our partner agencies to purchase the Course, any default or delay in payment will lead to revoking of Course access.</p>
                            <p className= "body-small body-spacing">If you are provided an option to pay the Course Fees in instalments, any default or delay in payment according to the instalment payment date(s) will lead to revoking of Course access.</p>
                        </li>
                        <li>
                            <h3 className="h3-heading">ACCEPTABLE USE</h3>
                            <p className= "body-small body-spacing">You agree not to use the Course, the Website, or any Team Communication channel made available for the Course for any unlawful purpose or any purpose prohibited under this clause. You agree not to use the Course, the Website, or any Team Communication channel made available for the Course in any way that could damage the Course, Website, Services, or general business of the Course Provider.</p>
                            <ol type="a">
                                <li>
                                    <p className= "body-small body-spacing"><b>You further agree not to use the Course, Website or Team Communication channel:</b></p>
                                    <ol type="i">
                                        <li>
                                            <p className= "body-small body-spacing">To harass, abuse, or threaten others or otherwise violate any person's legal rights;</p>
                                        </li>
                                        <li>
                                            <p className= "body-small body-spacing">To violate any intellectual property rights of the Course Provider or any third party;</p>
                                        </li>
                                        <li>
                                            <p className= "body-small body-spacing">To upload or otherwise disseminate any computer viruses or other software that may damage the property of another;</p>
                                        </li>
                                        <li>
                                            <p className= "body-small body-spacing">To perpetrate any fraud;</p>
                                        </li>
                                        <li>
                                            <p className= "body-small body-spacing">To engage in or create any unlawful gambling, sweepstakes, or pyramid scheme;</p>
                                        </li>
                                        <li>
                                            <p className= "body-small body-spacing">To publish or distribute any obscene or defamatory material;</p>
                                        </li>
                                        <li>
                                            <p className= "body-small body-spacing">To publish or distribute any material that incites violence, hate, or discrimination towards any group;</p>
                                        </li>
                                        <li>
                                            <p className= "body-small body-spacing">To unlawfully gather information about others.</p>
                                        </li>
                                    </ol>
                                </li>
                            </ol>
                        </li>
                        <li>
                            <h3 className="h3-heading">NO LIABILITY</h3>
                            <p className= "body-small body-spacing">The Course and Website are provided for informational purposes only. You acknowledge and agree that any information posted in the Course, in the Materials, or on the Website is not intended to be legal advice or financial advice. You further agree that your participation in the Course is at own risk. We do not assume responsibility or liability for any advice or other information given in the Course, in the Materials, or on the Website.</p>
                        </li>
                        <li>
                            <h3 className="h3-heading">REVERSE ENGINEERING & SECURITY</h3>
                            <p className= "body-small body-spacing">You agree not to undertake any of the following actions:</p>
                            <ol type="a">
                                <li>
                                    <p className="body-small body-spacing">Reverse engineer, or attempt to reverse engineer or disassemble any code or software from or on the Course or Website;</p>
                                </li>
                                <li>
                                    <p className="body-small body-spacing">Violate the security of the Course or Website through any unauthorized access, circumvention of encryption or other security tools, data mining or interference to any host, user or network.</p>
                                </li>
                            </ol>
                        </li>
                        <li>
                            <h3 className="h3-heading">DATA LOSS</h3>
                            <p className="body-small body-spacing">We do not assume or accept responsibility for the security of your account or content. You agree that your participation in the Course or use of the Website is at your own risk.</p>
                        </li>
                        <li>
                            <h3 className="h3-heading">INDEMNIFICATION</h3>
                            <p className="body-small body-spacing">You agree to defend and indemnify the Course Provider and any of our affiliates (if applicable) and hold us harmless against any and all legal claims and demands, including reasonable lawyer’s fees, which may arise from or relate to your participation in the Course, your use or misuse of the Website, your breach of this Agreement, or your conduct or actions. You agree that we shall be able to select our own legal counsel and may participate in our own defense, if we wish.</p>
                        </li>
                        <li>
                            <h3 className="h3-heading">SPAM POLICY</h3>
                            <p className= "body-small body-spacing">You are strictly prohibited from using Course for illegal spam activities, including gathering email addresses and personal information from others or sending any mass commercial emails.</p>
                        </li>
                        <li>
                            <h3 className="h3-heading">MODIFICATION & VARIATION</h3>
                            <p className= "body-small body-spacing">We may, from time to time and at any time without notice to you, modify this Agreement. You agree that we have the right to modify this Agreement or revise anything contained herein. You further agree that all modifications to this Agreement are in full force and effect immediately upon posting on the Website and that modifications or variations will replace any prior version of this Agreement, unless prior versions are specifically referred to or incorporated into the latest modification or variation of this Agreement.</p>
                            <p className= "body-small body-spacing">To the extent any part or sub-part of this Agreement is held ineffective or invalid by any court of law, you agree that the prior, effective version of this Agreement shall be considered enforceable and valid to the fullest extent.</p>
                        </li>
                        <li>
                            <h3 className="h3-heading">ENTIRE AGREEMENT</h3>
                            <p className="body-small body-spacing">This Agreement constitutes the entire understanding between the Parties with respect to the Course. This Agreement supersedes and replaces all prior or contemporaneous agreements or understandings, written or oral.</p>
                        </li>
                        <li>
                            <h3 className="h3-heading">SERVICE INTERRUPTIONS</h3>
                            <p className="body-small body-spacing">We may need to interrupt your access to the Course to perform maintenance or emergency services on a scheduled or unscheduled basis. You agree that your access to the Course and/or Website may be affected by unanticipated or unscheduled downtime, for any reason, but that we shall have no liability for any damage or loss caused as a result of such downtime.</p>
                        </li>
                        <li>
                            <h3 className="h3-heading">TERM, TERMINATION & SUSPENSION</h3>
                            <p className="body-small body-spacing">We may terminate this Agreement with you at any time for any reason, with or without cause. We specifically reserve the right to terminate this Agreement if you violate any of the terms outlined herein, including, but not limited to, violating the intellectual property rights of us or a third party, failing to comply with applicable laws or other legal obligations, and/or publishing or distributing illegal material. You may also terminate this Agreement at any time by contacting us and requesting termination. At the termination of this Agreement, any provisions that would be expected to survive termination by their nature shall remain in full force and effect.</p>
                            <p className= "body-small body-spacing">Please be advised that terminating this Agreement does not entitle you to a refund on any monies spent with us.</p>
                        </li>
                        <li>
                            <h3 className="h3-heading">DISPUTE RESOLUTION</h3>
                            <p className= "body-small body-spacing">All disputes arising out of or in connection with this Agreement shall be attempted to be settled through negotiation between us and you. If any Dispute arising between the parties is not amicably settled within a reasonable period of one month of commencement of attempt to settle the same, the Disputes shall be referred to arbitration under the provisions of the Indian Arbitration and Conciliation Act 1996 as amended from time to time. The parties agree (i) that the Arbitration proceedings will be conducted in Coimbatore and (ii) the panel of arbitration shall consist of three (3) members, one each appointed by the parties and the third appointed by the nominee arbitrators by consensus. In the case of failure to resolve any disputes through arbitration, legal proceedings shall be initiated only in the courts of Coimbatore.</p>
                        </li>
                        <li>
                            <h3 className="h3-heading">CAREER SERVICES</h3>
                            <p className= "body-small body-spacing">On successful completion of the Course on the basis of prescribed completion criteria, you will be eligible to opt in for Career Services. If you opt-in, you will have to sign a separate Career Services agreement. Through our Career Services, we will provide you placement readiness training and facilitate interview opportunities for developer roles with recruiting partner firms and will charge a fee for the same on successful placement.</p>
                        </li>
                    </ol>
                </div> :
                <div className="microdegree-agreement-container lr-pad-d lr-pad-m">
                    <h1 className="h1-heading">Course Agreement</h1>
                    <p className= "body-small body-spacing" >Effective 1st November 2020</p>
                    <h3 className="h3-heading">Applicable Law</h3>
                    <p className= "body-small body-spacing">This Course Agreement (hereinafter, "Agreement") is made by and between Focus 4-D Career Education Pvt. Ltd, a company incorporated under the Companies Act 1956, having registration number U74999TZ2009PTC014973 and GSTIN 33AABCF3266F1ZZ with registered office at No.12, Lakshmi Nagar, Thottipalayam Pirivu, Off Avinashi Road, Coimbatore-641014 hereinafter referred to as "Course Provider," and you, further defined below, as a participant in the Course, also defined below.</p>
                    <p className= "body-small body-spacing">All parts and sub-parts of this Agreement are specifically incorporated by reference here. This Agreement shall govern the use of all pages and screens in and on the Course (all collectively referred to as "Course") and any services provided by or on this Course Provider through the Course ("Services") and/or on the Course Provider's website ("Website").</p>
                    <ol>
                        <li>
                            <h3 className="h3-heading">DEFINITIONS</h3>
                            <ol type="A">
                                <li>
                                    <h3 className= "h3-heading body-spacing">The parties referred to in this Agreement shall be defined as follows:</h3>
                                    <ol type="i">
                                        <li>
                                            <p className= "body-small body-spacing">Course Provider, us, we: Course Provider, as the creator, operator, and publisher of the Course, is responsible for providing the Course publicly. Course Provider, us, we, our, ours and other first-person pronouns will refer to the Course Provider, as well as, if applicable, all employees and affiliates of the Course Provider.</p>
                                        </li>
                                        <li>
                                            <p className= "body-small body-spacing">You, the user, the participant: You, as the participant in the course and user of the Website, will be referred to throughout this Agreement with second-person pronouns such as you, your, yours, or as user or participant.</p>
                                        </li>
                                        <li>
                                            <p className= "body-small body-spacing">Parties: Collectively, the parties to this Agreement (Course Provider and You) will be referred to as Parties.</p>
                                        </li>
                                    </ol>
                                </li>
                                <li>
                                    <h3 className= "h3-heading body-spacing">The Course details are as follows:</h3>
                                    <ol type="i">
                                        <li>
                                            <p className= "body-small body-spacing">Course Name: ProGrad Microdegree</p>
                                        </li>
                                        <li>
                                            <p className= "body-small body-spacing">Course Fees ("Fees"): Course Fees vary periodically, and based on payment plan opted for between Term-wise, Year-Wise and One-Time Full Course fee payment. The fees at the time of student enrolment will be specified by the Admission Counsellors, who are part of the Course Provider Team.</p>
                                        </li>
                                        <li>
                                            <p className= "body-small body-spacing">Course Duration: According to the payment plan opted for, the Course Duration will be 12 weeks per term, 3-4 terms a year, and 3 years for the Microdegree.</p>
                                        </li>
                                        <li>
                                            <p className="body-small body-spacing">Course Validity: The course will be valid until 1 year from the completion date of the last Term that you are enrolled.</p>
                                        </li>
                                    </ol>
                                </li>
                            </ol>
                        </li>
                        <li>
                            <h3 className="h3-heading">COURSE DETAILS</h3>
                            <p className="body-small body-spacing">This Course is delivered as a weekend online coding bootcamp. You will undergo training as part of a squad containing other squad members.</p>
                            <p className= "body-small body-spacing">The training program will include 12 Training weeks with training days running over the weekends on Saturday and Sunday (9 AM to 6 PM), with coding assignments to be completed over the course of the week. You are expected to spend 16 – 24 hours every week in training.</p>
                            <p className= "body-small body-spacing">You will receive access to a Mentor who will assist you with code reviews, project guidance, tech support, career guidance, professional skills, work ethic, and also to provide general guidance with various aspects of the Course.</p>
                            <p className= "body-small body-spacing">Dedicated support from the Mentor team for technical issues and programming advice will be available on the team-communication platform Discord within the Code-Help channel. Timings: 9 AM to 6 PM on Course training days.</p>
                            <p className= "body-small body-spacing">The training program consists of a variety of learning elements that make up the Course experience. These include interactive lessons on the Course platform, Code Labs, Solo Projects, Live group sessions (Huddles), interaction with peers and mentors on Discord, and more. These elements are put together to form a learning experience that will help you in transforming yourself to a professional developer.</p>
                            <p className="body-small body-spacing">The medium of instruction of the training program will be in English, and all Course content and modules will be in English.</p>
                            <p className= "body-small body-spacing">The Student will receive access to an HR representative who will assist with administrative concerns and squad operations.</p>
                            <p className= "body-small body-spacing">During the Training phase, if you are lagging behind the planned schedule, support can be provided via Code Help only. You will be required to complete the pending requirements in Self-Paced mode and catch up with the schedule to continue receiving mentor support as per original schedule.</p>
                            <p className= "body-small body-spacing">You can request for a Squad Transfer through the HR, which will be facilitated if there's a subsequent squad available for the same program. This would be facilitated at a one-time fee of INR 10,000 (applicable taxes to be charged additionally).</p>
                        </li>
                        <li>
                            <h3 className="h3-heading">ASSENT & ACCEPTANCE</h3>
                            <p className="body-small body-spacing">By purchasing and participating in the Course, you warrant that you have read and reviewed this Agreement and that you agree to be bound by it. If you do not agree to be bound by this Agreement, please cease your participation in the Course immediately. If you do so after purchase, you will not be entitled to any refund. Course Provider only agrees to provide the Course to you if you assent to this Agreement.</p>
                        </li>
                        <li>
                            <h3 className="h3-heading">AGE RESTRICTION</h3>
                            <p className="body-small body-spacing">You must be at least 15 (fifteen) years of age to use this Website, participate in the Course or access any Services contained herein. By participating in the Course, you represent and warrant that you are at least 15 years of age and may legally agree to this Agreement. Course Provider assumes no responsibility or liability for any misrepresentation of your age.</p>
                        </li>
                        <li>
                            <h3 className="h3-heading">LICENSE TO USE WEBSITE & ACCESS COURSE MATERIALS</h3>
                            <p className="body-small body-spacing">We may provide you with certain information as a result of your accessing of the Course through the Website. Such information may include, but is not limited to, documentation, data, or information developed by us and other materials which may assist in your participation in the Course ("Materials"). Subject to this Agreement, we grant you a non-exclusive, limited, non-transferable and revocable license to use the Materials solely in connection with your participation in the Course and your use of the Website. The Materials may not be used for any other purpose, and this license terminates upon your completion of the Course, your cessation of use of the Course or the Website, or at the termination of this Agreement.</p>
                        </li>
                        <li>
                            <h3 className="h3-heading">COURSE TERMS</h3>
                            <p className= "body-small body-spacing">After purchasing the Course, you may not be able to begin until the specified Course Start Date. You must complete the Course by the specified Course End Date. Whether or not the Course has been completed by the specified Course End Date, it will expire in 1 year from the last date of last term that you are enrolled in.</p>
                            <p className= "body-small body-spacing">At the successful completion of the Course based on specified completion criteria including periodic evaluations, you will receive a certificate evidencing your participation in, and completion of, the Course. Certificates will be provided for every term that you are enrolled in.</p>
                            <p className= "body-small body-spacing">We do not offer any promises or guarantees with regard to our Course or Course Materials.</p>
                        </li>
                        <li>
                            <h3 className="h3-heading">INTELLECTUAL PROPERTY</h3>
                            <p className= "body-small body-spacing">You agree that the Materials, the Course, the Website, and any other Services provided by the Course Provider are the property of the Course Provider, including all copyrights, trademarks, trade secrets, patents, and other intellectual property ("Company IP"). You agree that the Company owns all right, title and interest in and to the Company IP and that you will not use the Company IP for any unlawful or infringing purpose. You agree not to reproduce or distribute the Company IP in any way, including electronically or via registration of any new trademarks, trade names, service marks or Uniform Resource Locators (URLs), without express written permission from the Company.</p>
                        </li>
                        <li>
                            <h3 className="h3-heading">FAIR USAGE OF STUDENT DATA</h3>
                            <p className="body-small body-spacing">In accordance with the current data privacy law, your personal data will be used for operational and administrative activities held by the Course Provider for the execution of the program. You agree that the data provided to the Course Provider for the purpose of Course enrollment may be transferred to public and/or private companies described herein (Public Administrations, Companies associated with the Course Provider, etc.) with the sole purpose of complying with the specific obligations and rights covered in this relationship.</p>
                            <p className= "body-small body-spacing">In the same way you authorize the use and reproduction of your image and the testimonials that you give the Course Provider for any type of advertising, promotion, publication or any other means, for commercial or informational purposes, without remuneration of any kind.</p>
                        </li>
                        <li>
                            <h3 className="h3-heading">YOUR OBLIGATIONS</h3>
                            <p className="body-small body-spacing">As a participant in the Course, you will be asked to register with us. When you do so, you will choose a user identifier, which may be your email address or another term, as well as a password. You may also provide personal information, including, but not limited to, your name. You are responsible for ensuring the accuracy of this information. This identifying information will enable you to participate in the Course. You must not share such identifying information with any third party, and if you discover that your identifying information has been compromised, you agree to notify us immediately in writing. Email notification will suffice. You are responsible for maintaining the safety and security of your identifying information as well as keeping us apprised of any changes to your identifying information.</p>
                            <p className= "body-small body-spacing">Providing false or inaccurate information, or using the Course or the Website to further fraud or unlawful activity is grounds for immediate termination of this Agreement.</p>
                            <p className= "body-small body-spacing">This educational Course is a program that aims to guide you on the path to become a professional developer. This requires active participation from your end throughout the Course in order to succeed.</p>
                            <p className= "body-small body-spacing"><b>OBLIGATIONS:</b> As a participant in the Course, you will be asked to undertake and complete the following obligations:</p>
                            <ol type="a">
                                <li>
                                    <p className= "body-small body-spacing">Attend all sessions and Course events without fail</p>
                                </li>
                                <li>
                                    <p className= "body-small body-spacing">Spend 8 – 10 hours every Course day in training, particularly being available between 9 AM to 6 PM.</p>
                                </li>
                                <li>
                                    <p className= "body-small body-spacing">Submit required deliverables, assignments and projects on time</p>
                                </li>
                                <li>
                                    <p className= "body-small body-spacing">Be responsive on Discord (team communication), email and call to all members of the Course team</p>
                                </li>
                                <li>
                                    <p className= "body-small body-spacing"><b>Proactively ask for support when you are facing issues:</b></p>
                                    <ul>
                                        <li>
                                            <p className= "body-small body-spacing">Technical concerns to be addressed on Code Help on Discord</p>
                                        </li>
                                        <li>
                                            <p className= "body-small body-spacing">Administrative concerns to be addressed with HR</p>
                                        </li>
                                        <li>
                                            <p className= "body-small body-spacing">Escalations to Technical Director and Program Director</p>
                                        </li>
                                    </ul>
                                </li>
                                <p className= "body-small body-spacing"> An escalation hierarchy and process will be shared via email upon start of the Course.</p>
                                <li>
                                    <p className= "body-small body-spacing">Learn, Think, Explore, Build, Experiment, Fail, Relearn, Rebuild, and Succeed.</p>
                                </li>
                                <li>
                                    <p className= "body-small body-spacing">Interact with fellow squad members and the Course team with professionalism in conduct and speech</p>
                                </li>
                            </ol>
                        </li>
                        <li>
                            <h3 className="h3-heading">PAYMENT & FEES</h3>
                            <p className="body-small body-spacing">As noted above, Course Fees vary periodically. The fees at the time of student enrolment will be specified by the Admission Counsellors, who are part of the Course Provider Team.</p>
                            <p className= "body-small body-spacing">If payment is not complete by the specified Course Start Date, you will forfeit your place in the Course.</p>
                            <p className= "body-small body-spacing">In case of availing education loans from our partner agencies to purchase the Course, any default or delay in payment will lead to revoking of Course access.</p>
                            <p className= "body-small body-spacing">If you are provided an option to pay the Course Fees in instalments, any default or delay in payment according to the instalment payment date(s) will lead to revoking of Course access.</p>
                        </li>
                        <li>
                            <h3 className="h3-heading">ACCEPTABLE USE</h3>
                            <p className= "body-small body-spacing">You agree not to use the Course, the Website, or any Team Communication channel made available for the Course for any unlawful purpose or any purpose prohibited under this clause. You agree not to use the Course, the Website, or any Team Communication channel made available for the Course in any way that could damage the Course, Website, Services, or general business of the Course Provider.</p>
                            <ol type="a">
                                <li>
                                    <h3 className= "h3-heading body-spacing">You further agree not to use the Course, Website or Team Communication channel:</h3>
                                    <ol type="i">
                                        <li>
                                            <p className="body-small body-spacing">To harass, abuse, or threaten others or otherwise violate any person's legal rights;</p>
                                        </li>
                                        <li>
                                            <p className="body-small body-spacing">To violate any intellectual property rights of the Course Provider or any third party;</p>
                                        </li>
                                        <li>
                                            <p className= "body-small body-spacing">To upload or otherwise disseminate any computer viruses or other software that may damage the property of another;</p>
                                        </li>
                                        <li>
                                            <p className="body-small body-spacing">To perpetrate any fraud;</p>
                                        </li>
                                        <li>
                                            <p className= "body-small body-spacing">To engage in or create any unlawful gambling, sweepstakes, or pyramid scheme;</p>
                                        </li>
                                        <li>
                                            <p className= "body-small body-spacing">To publish or distribute any obscene or defamatory material;</p>
                                        </li>
                                        <li>
                                            <p className= "body-small body-spacing">To publish or distribute any material that incites violence, hate, or discrimination towards any group;</p>
                                        </li>
                                        <li>
                                            <p className= "body-small body-spacing">To unlawfully gather information about others.</p>
                                        </li>
                                    </ol>
                                </li>
                            </ol>
                        </li>
                        <li>
                            <h3 className="h3-heading">NO LIABILITY</h3>
                            <p className="body-small body-spacing">The Course and Website are provided for informational purposes only. You acknowledge and agree that any information posted in the Course, in the Materials, or on the Website is not intended to be legal advice or financial advice. You further agree that your participation in the Course is at own risk. We do not assume responsibility or liability for any advice or other information given in the Course, in the Materials, or on the Website.</p>
                        </li>
                        <li>
                            <h3 className="h3-heading">REVERSE ENGINEERING & SECURITY</h3>
                            <p className= "body-small body-spacing">You agree not to undertake any of the following actions:</p>
                            <ol>
                                <li>
                                    <p className= "body-small body-spacing">Reverse engineer, or attempt to reverse engineer or disassemble any code or software from or on the Course or Website;</p>
                                </li>
                                <li>
                                    <p className= "body-small body-spacing">Violate the security of the Course or Website through any unauthorized access, circumvention of encryption or other security tools, data mining or interference to any host, user or network.</p>
                                </li>
                            </ol>
                        </li>
                        <li>
                            <h3 className="h3-heading">DATA LOSS</h3>
                            <p className="body-small body-spacing">We do not assume or accept responsibility for the security of your account or content. You agree that your participation in the Course or use of the Website is at your own risk.</p>
                        </li>
                        <li>
                            <h3 className="h3-heading">INDEMNIFICATION</h3>
                            <p className="body-small body-spacing">You agree to defend and indemnify the Course Provider and any of our affiliates (if applicable) and hold us harmless against any and all legal claims and demands, including reasonable lawyer’s fees, which may arise from or relate to your participation in the Course, your use or misuse of the Website, your breach of this Agreement, or your conduct or actions. You agree that we shall be able to select our own legal counsel and may participate in our own defense, if we wish.</p>
                        </li>
                        <li>
                            <h3 className="h3-heading">SPAM POLICY</h3>
                            <p className= "body-small body-spacing">You are strictly prohibited from using Course for illegal spam activities, including gathering email addresses and personal information from others or sending any mass commercial emails.</p>
                        </li>
                        <li>
                            <h3 className="h3-heading">MODIFICATION & VARIATION</h3>
                            <p className= "body-small body-spacing">We may, from time to time and at any time without notice to you, modify this Agreement. You agree that we have the right to modify this Agreement or revise anything contained herein. You further agree that all modifications to this Agreement are in full force and effect immediately upon posting on the Website and that modifications or variations will replace any prior version of this Agreement, unless prior versions are specifically referred to or incorporated into the latest modification or variation of this Agreement.</p>
                            <p className= "body-small body-spacing">To the extent any part or sub-part of this Agreement is held ineffective or invalid by any court of law, you agree that the prior, effective version of this Agreement shall be considered enforceable and valid to the fullest extent.</p>
                        </li>
                        <li>
                            <h3 className="h3-heading">ENTIRE AGREEMENT</h3>
                            <p className= "body-small body-spacing">This Agreement constitutes the entire understanding between the Parties with respect to the Course. This Agreement supersedes and replaces all prior or contemporaneous agreements or understandings, written or oral.</p>
                        </li>
                        <li>
                            <h3 className="h3-heading">SERVICE INTERRUPTIONS</h3>
                            <p className="body-small body-spacing">We may need to interrupt your access to the Course to perform maintenance or emergency services on a scheduled or unscheduled basis. You agree that your access to the Course and/or Website may be affected by unanticipated or unscheduled downtime, for any reason, but that we shall have no liability for any damage or loss caused as a result of such downtime.</p>
                        </li>
                        <li>
                            <h3 className="h3-heading">TERM, TERMINATION & SUSPENSION</h3>
                            <p className= "body-small body-spacing">We may terminate this Agreement with you at any time for any reason, with or without cause. We specifically reserve the right to terminate this Agreement if you violate any of the terms outlined herein, including, but not limited to, violating the intellectual property rights of us or a third party, failing to comply with applicable laws or other legal obligations, and/or publishing or distributing illegal material. You may also terminate this Agreement at any time by contacting us and requesting termination. At the termination of this Agreement, any provisions that would be expected to survive termination by their nature shall remain in full force and effect.</p>
                            <p className= "body-small body-spacing">Please be advised that terminating this Agreement does not entitle you to a refund on any monies spent with us.</p>
                        </li>
                        <li>
                            <h3 className="h3-heading">DISPUTE RESOLUTION</h3>
                            <p className= "body-small body-spacing">All disputes arising out of or in connection with this Agreement shall be attempted to be settled through negotiation between us and you. If any Dispute arising between the parties is not amicably settled within a reasonable period of one month of commencement of attempt to settle the same, the Disputes shall be referred to arbitration under the provisions of the Indian Arbitration and Conciliation Act 1996 as amended from time to time. The parties agree (i) that the Arbitration proceedings will be conducted in Coimbatore and (ii) the panel of arbitration shall consist of three (3) members, one each appointed by the parties and the third appointed by the nominee arbitrators by consensus. In the case of failure to resolve any disputes through arbitration, legal proceedings shall be initiated only in the courts of Coimbatore.</p>
                        </li>
                    </ol>
                </div>
            }
            </>
            <style jsx>{`
                .bootcamp-agreement-container {
                    padding-top: 2rem;
                    padding-bottom: 4rem;
                }

                .body-spacing {
                    margin-bottom: 1rem !important;
                    text-align: justify;
                }
            `}</style>
        </Layout>
    )
} 

export default Agreement;
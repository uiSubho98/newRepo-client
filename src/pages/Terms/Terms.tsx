import React from "react";
// @ts-ignore
import { Helmet } from 'react-helmet';
import TermsData from './Terms.json';
import Layout from "../../components/Layout";

interface ITerms {
    "heading": string;
    "Effetive From": string;
    "Applicable Law 1": string;
    "Applicable Law 2": string;
    "Definitions": Array<{
        "title": string;
        "list": Array<string>;
    }>;
    "Course Details": Array<string>;
    "ASSENT & ACCEPTANCE": string;
    "AGE RESTRICTION": string;
    "LICENSE": string;
    "COURSE TERMS": Array<string>;
    "COURSE PAUSE OPTION": {
        "description": "string";
        "title": "string";
        "list": Array<string>;
    }
    "INTELLECTUAL PROPERTY": string;
    "FAIR USAGE": Array<string>;
    "YOUR OBLIGATIONS": Array<string>;
    "OBLIGATIONS": Array<{
        "title": string;
        "list": Array<string>;
    }>;
    "FEES & REFUNDS": Array<{
        "title": string;
        "list": Array<string>;
    }>;
}

const Terms = () => {

    const state = {terms:TermsData};

    return (
        <>
            <Layout>
                <Helmet>
                    <title>ProGrad | Terms and Conditions</title>
                </Helmet>
                <div className="term-container lr-pad-d lr-pad-m ">
                    <h3 className="text-xl font-heading">{state.terms.heading}</h3>
                    <p className="text-regular text-faded">{state.terms["Effetive From"]}</p>
                    <h5 className="text-big font-heading">Applicable Law</h5>
                    <p className= "text-regular body-spacing" >{state.terms[`Applicable Law 1`]}</p>
                    <p className= "text-regular body-spacing" >{state.terms[`Applicable Law 2`]}</p>
                    <ol>
                        <li>
                            <h5 className="text-big font-heading">DEFINITIONS</h5>
                            <ol type="a" style={{marginLeft:32}}>
                                {state.terms["Definitions"].map((def:{"title": string;"list": Array<string>}) => {
                                        return (
                                            <li>
                                                <p className= "text-regular body-spacing">{def.title}</p>
                                                <ol type="i" style={{marginLeft:32}}>
                                                    {def["list"].map((l:string) => {
                                                        return (
                                                            <li>
                                                                <p className= "text-regular body-spacing">{l}</p>
                                                            </li>
                                                        )
                                                    })}
                                                </ol>
                                            </li>
                                        )
                                    })
                                }
                            </ol>
                        </li>
                        <li>
                            <h5 className="text-big font-heading">COURSE DETAILS</h5>
                            <ol type="a" style={{marginLeft:32}}>
                                {state.terms["Course Details"].map((cd: string) => {
                                    return (
                                        <li>
                                            <p className= "text-regular body-spacing">{cd}</p>
                                        </li>
                                    )
                                })}
                            </ol>
                        </li>
                        <li>
                            <h5 className="text-big font-heading">ASSENT & ACCEPTANCE</h5>
                            <p className= "text-regular body-spacing">{state.terms[`ASSENT & ACCEPTANCE`]}</p>
                        </li>
                        <li>
                            <h5 className="text-big font-heading">AGE RESTRICTION</h5>
                            <p className= "text-regular body-spacing" >{state.terms[`AGE RESTRICTION`]}</p>
                        </li>
                        <li>
                            <h5 className="text-big font-heading">LICENSE TO USE WEBSITE & ACCESS COURSE MATERIALS</h5>
                            <p className= "text-regular body-spacing" >{state.terms[`LICENSE`]}</p>
                        </li>
                        <li>
                            <h5 className="text-big font-heading">COURSE TERMS</h5>
                            {state.terms[`COURSE TERMS`].map((ct: string) => {
                                return (
                                    <p className= "text-regular body-spacing" >{ct}</p>
                                )
                            })}
                        </li>
                        <li>
                            <h5 className="text-big font-heading">COURSE PAUSE OPTION</h5>
                            <p className= "text-regular body-spacing" >{state.terms[`COURSE PAUSE OPTION`]['description']}</p>
                            <h5 className="text-medium font-heading">{state.terms['COURSE PAUSE OPTION']['title']}</h5>
                            <ol type="a" style={{marginLeft:32}}>
                                {state.terms['COURSE PAUSE OPTION']['list'].map((cd: string) => {
                                    return (
                                        <li>
                                            <p className= "text-regular body-spacing">{cd}</p>
                                        </li>
                                    )
                                })}
                            </ol>
                        </li>
                        <li>
                            <h5 className="text-big font-heading">INTELLECTUAL PROPERTY</h5>
                            <p className= "text-regular body-spacing" >{state.terms[`INTELLECTUAL PROPERTY`]}</p>
                        </li>
                        <li>
                            <h5 className="text-big font-heading">FAIR USAGE OF STUDENT DATA</h5>
                            <p className= "text-regular body-spacing" >{state.terms[`FAIR USAGE`][0]}</p>
                            <p className= "text-regular body-spacing" >{state.terms[`FAIR USAGE`][1]}</p>
                        </li>
                        <li>
                            <h5 className="text-big font-heading">YOUR OBLIGATIONS</h5>
                            <p className= "text-regular body-spacing" >{state.terms[`YOUR OBLIGATIONS`][0]}</p>
                            <p className= "text-regular body-spacing" >{state.terms[`YOUR OBLIGATIONS`][1]}</p>
                            <h5 className="text-medium font-heading">OBLIGATIONS: </h5>
                            <p className= "text-regular body-spacing" >As a participant in the Course, you will be asked to undertake and complete the following obligations:</p>
                            <ol type="a" style={{marginLeft:32}}>
                                {state.terms["OBLIGATIONS"].map((def:{"title": string;"list"?: Array<string>}) => {
                                        return (
                                            <li>
                                                <p className= "text-regular body-spacing">{def.title}</p>
                                                {
                                                def.list !== undefined && def.list.length>0 &&
                                                <ol type="i" style={{marginLeft:32}}>
                                                    {def["list"].map((l:string) => {
                                                        return (
                                                            <li>
                                                                <p className= "text-regular body-spacing">{l}</p>
                                                            </li>
                                                        )
                                                    })}
                                                </ol>
                                                }
                                            </li>
                                        )
                                    })
                                }
                            </ol>
                        </li>
                        <li>
                            <h5 className="text-big font-heading">FEES & REFUNDS</h5>
                            <ol type="a" style={{marginLeft:32}}>
                                {state.terms[`PAYMENT & FEES`].map((def:any) => {
                                        return (
                                            <li>
                                                <p className= "text-regular body-spacing">{def.title}</p>
                                                {
                                                def.list !== undefined && def.list.length>0 &&
                                                <ol type="i" style={{marginLeft:32}}>
                                                    {def["list"].map((l:string) => {
                                                        return (
                                                            <li>
                                                                <p className= "text-regular body-spacing">{l}</p>
                                                            </li>
                                                        )
                                                    })}
                                                </ol>
                                                }
                                            </li>
                                        )
                                    })
                                }
                            </ol>
                        </li>
                        <li>
                            <h5 className="text-big font-heading">ACCEPTABLE USE</h5>
                            <p>You agree not to use the Course, the Website, or any Team Communication channel made available for the Course for any unlawful purpose or any purpose prohibited under this clause. You agree not to use the Course, the Website, or any Team Communication channel made available for the Course in any way that could damage the Course, Website, Services, or general business of the Course Provider.</p>
                            <ol type="a" style={{marginLeft:32}}>
                                <li>
                                    <p className= "text-regular body-spacing">You further agree not to use the Course, Website or Team Communication channel:</p>
                                    <ol type="i" style={{marginLeft:32}}>
                                        <li>
                                            <p className= "text-regular body-spacing">To harass, abuse, or threaten others or otherwise violate any person's legal rights;</p>
                                        </li>
                                        <li>
                                            <p className= "text-regular body-spacing">To upload or otherwise disseminate any computer viruses or other software that may damage the property of another;</p>
                                        </li>
                                        <li>
                                            <p className= "text-regular body-spacing">  To perpetrate any fraud;</p>
                                        </li>
                                        <li>
                                            <p className= "text-regular body-spacing">To engage in or create any unlawful gambling, sweepstakes, or pyramid scheme;</p>
                                        </li>
                                        <li>
                                            <p className= "text-regular body-spacing">To publish or distribute any obscene or defamatory material;</p>
                                        </li>
                                        <li>
                                            <p className= "text-regular body-spacing">To publish or distribute any material that incites violence, hate, or discrimination towards any group;</p>
                                        </li>
                                        <li>
                                            <p className= "text-regular body-spacing">To unlawfully gather information about others.</p>
                                        </li>
                                    </ol>
                                </li>
                            </ol>
                        </li>
                        <li>
                            <h5 className="text-big font-heading">NO LIABILITY</h5>
                            <p>The Course and Website are provided for informational purposes only. You acknowledge and agree that any information posted in the Course, in the Materials, or on the Website is not intended to be legal advice or financial advice. You further agree that your participation in the Course is at your own risk. We do not assume responsibility or liability for any advice or other information given in the Course, in the Materials, or on the Website.</p>
                        </li>
                        <li>
                            <h5 className="text-big font-heading">REVERSE ENGINEERING & SECURITY</h5>
                            <p>You agree not to undertake any of the following actions:</p>
                            <ol type="a" style={{marginLeft:32}}>
                                <li>
                                    <p className= "text-regular body-spacing">Reverse engineer, or attempt to reverse engineer or disassemble any code or software from or on the Course or Website;</p>
                                </li>
                                <li>
                                    <p className= "text-regular body-spacing">Violate the security of the Course or Website through any unauthorized access, circumvention of encryption or other security tools, data mining or interference to any host, user or network.</p>
                                </li>
                            </ol>
                        </li>
                        <li>
                            <h5 className="text-big font-heading">DATA LOSS</h5>
                            <p>We do not assume or accept responsibility for the security of your account or content. You agree that your participation in the Course or use of the Website is at your own risk.</p>
                        </li>
                        <li>
                            <h5 className="text-big font-heading">INDEMNIFICATION</h5>
                            <p>You agree to defend and indemnify the Course Provider and any of our affiliates (if applicable) and hold us harmless against any and all legal claims and demands, including reasonable lawyer’s fees, which may arise from or relate to your participation in the Course, your use or misuse of the Website, your breach of this Agreement, or your conduct or actions. You agree that we shall be able to select our own legal counsel and may participate in our own defense, if we wish.</p>
                        </li>
                        <li>
                            <h5 className="text-big font-heading">SPAM POLICY</h5>
                            <p>You are strictly prohibited from using Course for illegal spam activities, including gathering email addresses and personal information from others or sending any mass commercial emails.</p>
                        </li>
                        <li>
                            <h5 className="text-big font-heading">MODIFICATION & VARIATION</h5>
                            <p>We may, from time to time and at any time without notice to you, modify this Agreement. You agree that we have the right to modify this Agreement or revise anything contained herein. You further agree that all modifications to this Agreement are in full force and effect immediately upon posting on the Website and that modifications or variations will replace any prior version of this Agreement, unless prior versions are specifically referred to or incorporated into the latest modification or variation of this Agreement.
To the extent any part or sub-part of this Agreement is held ineffective or invalid by any court of law, you agree that the prior, effective version of this Agreement shall be considered enforceable and valid to the fullest extent.</p>
                        </li>
                        <li>
                            <h5 className="text-big font-heading">ENTIRE AGREEMENT</h5>
                            <p>This Agreement constitutes the entire understanding between the Parties with respect to the Course. This Agreement supersedes and replaces all prior or contemporaneous agreements or understandings, written or oral.</p>
                        </li>
                        <li>
                            <h5 className="text-big font-heading">SERVICE INTERRUPTIONS</h5>
                            <p>We may need to interrupt your access to the Course to perform maintenance or emergency services on a scheduled or unscheduled basis. You agree that your access to the Course and/or Website may be affected by unanticipated or unscheduled downtime, for any reason, but that we shall have no liability for any damage or loss caused as a result of such downtime.</p>
                        </li>
                        <li>
                            <h5 className="text-big font-heading">TERM, TERMINATION & SUSPENSION</h5>
                            <p>We may terminate this Agreement with you at any time for any reason, with or without cause. We specifically reserve the right to terminate this Agreement if you violate any of the terms outlined herein, including, but not limited to, violating the intellectual property rights of us or a third party, failing to comply with applicable laws or other legal obligations, and/or publishing or distributing illegal material. You may also terminate this Agreement at any time by contacting us and requesting termination. At the termination of this Agreement, any provisions that would be expected to survive termination by their nature shall remain in full force and effect.
Please be advised that terminating this Agreement does not entitle you to a refund on any monies spent with us.</p>
                        </li>
                        <li>
                            <h5 className="text-big font-heading">DISPUTE RESOLUTION</h5>
                            <p>All disputes arising out of or in connection with this Agreement shall be attempted to be settled through negotiation between us and you. If any dispute arising between the parties is not amicably settled within a reasonable period of one month of commencement of attempt to settle the same, the disputes shall be referred to arbitration under the provisions of the Indian Arbitration and Conciliation Act 1996 as amended from time to time. The parties agree (i) that the Arbitration proceedings will be conducted in Coimbatore and (ii) the panel of arbitration shall consist of three (3) members, one each appointed by the parties and the third appointed by the nominee arbitrators by consensus. In the case of failure to resolve any disputes through arbitration, legal proceedings shall be initiated only in the courts of Coimbatore.</p>
                        </li>
                        <li>
                            <h5 className="text-big font-heading">CAREER SERVICES</h5>
                            <p>On successful completion of the Course on the basis of prescribed completion criteria, you will be eligible to opt in for Career Services. If you opt-in, you will have to sign a separate Career Services agreement. Through our Career Services, we will provide you placement readiness training and facilitate interview opportunities for developer roles with recruiting partner firms and will charge a fee for the same on enrolment and on successful placement.</p>
                        </li>
                    </ol>
                </div>
            </Layout>

            <style jsx>
            {`
                .term-container {
                    padding-top: 2rem;
                    padding-bottom: 4rem;
                }

                .body-spacing {
                    margin-bottom: 1rem !important;
                    text-align: justify;
                }
                
            `}
            </style>
        </>
    );
}

export default Terms;
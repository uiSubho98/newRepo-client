import React, { useEffect, useState,useRef } from "react";
import keys from "../../config/keys";
import {__getToken} from "../../utils/user-details.util";
import { __getCookie } from "../../utils/cookie.util";
import { Button, Divider, Empty, Progress, Input,Radio} from "antd";
import CompanyCard from "./CompanyCard";
import ProjectCard from "./ProjectCard";
import { ReactComponent as GraduationIcon } from "../../assets/icons/svg-icons-v2/graduation-hat.svg";
import axios from "axios";
import { G_PR_URL } from "../../constants/constants";




// @ts-ignore
import jwtDecode from "jwt-decode";




interface IProps {
    profile: any;
    setMode: Function;
}

type Companyspq = {
    o_id: string;
    options: string[];
    questionId: string;
    questionText: string;
    questionType: string;
    role_id: string;
}[];

const decodeToken = () => {
    if (__getCookie(keys.cookiePrefix + "ut").cookieExists === false) return undefined;
    return jwtDecode(__getCookie(keys.cookiePrefix + "ut").cookieValue);
};

const __getUID = () => {
    var decodedToken = decodeToken();
    return decodedToken !== undefined ?(decodedToken.uid) : "";
};




const { TextArea } = Input;

const ProfileInfo = (props: IProps) => {
   
    const [multiple,setMultiple]= useState({});
    const [subjective,setSubjective]= useState({});
    const [csq,setCsq]=useState<Companyspq>([]);

    
    
    const { profile, setMode } = props;

    const org_id = localStorage.getItem('test');
    const role_id = localStorage.getItem('role_id');

    console.log(__getToken())
    useEffect(()=>{
        // fetch('test.json')
        // .then(res=>res.json())
        // .then(data=>setCsq(data.response))
    
        axios
      .get("https://dev.hire.prograd.org/api/roles/get/companyspq",{
        params: {
          o_id: org_id,
          role_id:role_id,
        },
        headers: {
          Authorization: __getToken(),
        },
      })
      .then((response) => {
       if(response.data.status === 1){
        console.log(response)
        setCsq(response.data.response);
       }
        
      });
    },[])  




    //Send data to backend

 

    const renderCompanies = () => {
        return profile.companies.map((company:any) => 
            <CompanyCard { ...company } />
        )
    }

    const renderProjects = () => {
        return profile.projects.map((project:any) => 
            <ProjectCard { ...project } />
        )
    }

    const renderGraduationInfo = (type = "ug") => {
        return (
            <div className="block mt-32">
                <h3 className="font-heading text-big subtitle">
                    { 
                        type === "ug" ? (profile.degree.includes("M") ?
                         "UG Details" : "Graduation Details") :
                        "PG Details" 
                    }
                </h3>
                <div className="g-d g-col-1 info">
                    <p className="f-d f-v-c">
                        <GraduationIcon />
                        <span className="ml-8 text-small">
                            { profile[type === "pg" ? "pgCollege" : "college"] }
                        </span>
                    </p>
                    <div className="g-d g-gap-16 g-col-3 g-col-1-m">
                        <p className="f-d f-v-c">
                            <i className="icon icon-file-text icon-big" />
                            <span className="ml-8 text-small">
                                { profile.degree }
                            </span>
                        </p>
                        <p className="f-d f-v-c">
                            <i className="icon icon-file icon-big" />
                            <span className="ml-8 text-small">
                                { profile[type === "pg" ? "pgStream" : "stream"] }
                            </span>
                        </p>
                        <p className="f-d v-center">
                            <i className="icon icon-map-pin icon-big" />
                            <span className="ml-8 text-small">
                                { profile[type === "pg" ? "pgClgState" : "clgState"] }
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    const renderInterpersonalSkills = () => {
        return profile.interpersonalSkills.map((skill: any) => 
            <div className="skill">{ skill }</div>
        )
    }

    const renderTechnologiesKnown = () => {
        return profile.technologiesKnown.map((skill: any) => 
            <div className="skill">{ skill }</div>
        )
    }

 

  const handleSubmit = ()=>{


   const uid =  {Std_id:__getUID()}

// console.log(uid)
// console.log(subjective)
// console.log(multiple)


const finalResponse = {
    uid,multiple,subjective,org_id:org_id,role_id:role_id
}

axios.post('/user', {finalResponse})
.then(function (response) {
  console.log(response);
})
.catch(function (error) {
  console.log(error);
});


console.log(finalResponse)
  }

    return (
        <>
            <div className="g-d g-h-e profile-info-wrapper">
                <div className="w-90">
                    {
                        // Personal Information
                        <section id="personal-information">
                            <h3 className="font-heading text-big">
                                Personal Information
                            </h3>
                            <div className="block mt-16">
                                <h3 className="font-heading text-big subtitle">
                                    About
                                </h3>
                                <p className="text-small text-grey info">
                                    { profile.about ? profile.about : "-" }
                                </p>
                            </div>
                            <div className="block mt-32">
                                <h3 className="font-heading text-big subtitle">
                                    Address / Contact Details 
                                </h3>
                                <div className="text-small info">
                                    <p className="f-d v-center">
                                        <i className="icon icon-map-pin icon-big" />
                                        <span className="text-grey ml-8">
                                            { profile.address }
                                        </span>
                                    </p>
                                    <div className="g-d g-gap-16 g-col-3 g-col-1-m">
                                        <p className="f-d v-center">
                                            <i className="icon icon-mail icon-big" />
                                            <span className="text-grey ml-8">
                                                { profile.email }
                                            </span>
                                        </p>
                                        <p className="f-d v-center">
                                            <i className="icon icon-mail icon-big" />
                                            <span className="text-grey ml-8">
                                                { profile.clgEmail }
                                            </span>
                                        </p>
                                        <p className="f-d v-center">
                                            <i className="icon icon-phone icon-big" />
                                            <span className="text-grey ml-8">
                                                { profile.mobileNumber }
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    }
                    <Divider />
                    {
                        // Educational Information
                        <section id="educational-information">
                            <h3 className="font-heading text-big">
                                Educational Information
                            </h3>
                            <div className="block mt-16">
                                <h3 className="font-heading text-big subtitle">
                                    Academic Score
                                </h3>
                                <div className="g-d g-col-2 g-col-1-m">
                                    <div className="text-small info w-70">
                                        <span>10th Percentage</span>
                                        <Progress percent={profile.sslcPercentage} size="small" />
                                    </div>
                                    <div className="text-small info w-70">
                                        <span>12th Percentage</span>
                                        <Progress percent={profile.hscPercentage} size="small" />
                                    </div>
                                    <div className="text-small info w-70">
                                        <span>
                                            { profile.degree.includes("M") ? "UG Percentage" : "Graduation Percentage" }
                                        </span>
                                        <Progress percent={profile.percentage} size="small" />
                                    </div>
                                    {
                                        profile.degree.includes("M") &&
                                        <div className="text-small info w-70">
                                            <span>PG Percentage</span>
                                            <Progress percent={profile.pgPercentage} size="small" />
                                        </div>
                                    }
                                </div>
                            </div>
                            { 
                                profile.degree.includes("M") ?
                                renderGraduationInfo("pg") : renderGraduationInfo("ug") 
                            }
                        </section>
                    }
                    <Divider />
                    {
                        // Professional Information
                        <section id="professional-information">
                            <h3 className="font-heading text-big">
                                Professional Information
                            </h3>
                            <div className="mt-16">
                                {
                                    profile.companies.length ?
                                    renderCompanies() :
                                    <Empty
                                        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                        imageStyle={{
                                        height: 120,
                                        }}
                                        description={"No Data"}
                                    />
                                }
                            </div>
                        </section>
                    }
                    <Divider />
                    {
                        // Skills
                        <section id="skills-section" className="w-90">
                            <h3 className="font-heading text-big">
                                Skills
                            </h3>
                            <div className="mt-16">
                                <h3 className="font-heading text-medium subtitle">
                                    Interpersonal Skills
                                </h3>
                                {
                                    profile.interpersonalSkills &&
                                    <div className="f-d skills">
                                        { 
                                            profile.interpersonalSkills.length ?
                                            renderInterpersonalSkills() :
                                            <Empty
                                                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                                imageStyle={{
                                                height: 120,
                                                }}
                                                description={"No Data"}
                                            />
                                        }
                                    </div>
                                }
                                <div className="mt-32">
                                    <h3 className="font-heading text-medium subtitle">
                                        Tools & Technologies / Coding languages
                                    </h3>
                                    {
                                        profile.technologiesKnown &&
                                        <div className="f-d skills">
                                            {
                                                profile.technologiesKnown.length ?
                                                renderTechnologiesKnown() :
                                                <Empty
                                                    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                                    imageStyle={{
                                                    height: 120,
                                                    }}
                                                    description={"No Data"}
                                                />
                                            }
                                        </div>
                                    }
                                </div>
                            </div>
                        </section>
                    }
                    <Divider />
                    {
                        // Project Experience
                        <section id="project-experience">
                            <h3 className="font-heading text-big">
                                Project Experiences
                            </h3>
                            <div className="mt-16">
                                {
                                    profile.projects.length ?
                                    renderProjects() :
                                    <Empty
                                        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                        imageStyle={{
                                        height: 120,
                                        }}
                                        description={"No Data"}
                                    />
                                }
                            </div>
                        </section>
                    }  
                      <Divider />

{
    localStorage.getItem('test')?<section id="project-experienceabc">
    <div className="mt-16">
       <form>

       
        {
         csq.map((question,index)=>(

            <>
                <h3 className="font-heading text-big question">{question['questionText']}</h3>
               
               {
                  question['questionType']==='MULTIPLE'? 
                  question["options"].map((option, index1) => (
                    <div className='me-3 options'>
   <input  type="radio" name={"optionID"+index} value={option} id={"optionID"+index} onChange={()=>
setMultiple((multiple)=>({
    ...multiple,[question['questionText']]:option
}))} />
       <label className='label_option' htmlFor={option}>{option}</label>
                    </div>
                ))
                  : 
                 <div className='project'>
       <Input  className="input-text" placeholder="John" onBlur={(e)=>
setSubjective((subjective)=>({
    ...subjective,[question['questionText']]:e.target.value

}))} />
       </div>
               }
            </>
         ))
        }
       <div className='sub-div'>
       <button type="button" onClick={()=>{handleSubmit()}}  className='sub-btn'>Submit</button>
       </div>
       </form>
   </div>
</section> :""                 
                    }  
                </div>
            </div>
           {localStorage.getItem('test')?  "": <Button className="f-d f-h-c f-v-c edit-btn"
            onClick={() => setMode(0)}>
                <i className="icon icon-edit-2" />
            </Button>}
            <style jsx>{`
                .profile-info-wrapper {
                    margin: var(--peaky-gap-128) 0 0;
                }

                .profile-info-wrapper .mt-16 {
                    margin-top: var(--peaky-gap-16);
                }

                .profile-info-wrapper .mt-32 {
                    margin-top: var(--peaky-gap-32);
                }

                .profile-info-wrapper .mb-24 {
                    margin-bottom: var(--peaky-gap-24);
                }

                .profile-info-wrapper .ml-8 {
                    margin-left: var(--peaky-gap-8);
                }

                .profile-info-wrapper .icon-big {
                    font-size: 20px;
                }

                .profile-info-wrapper .v-center {
                    vertical-align: middle;
                    word-break: break-all;
                }

                .profile-info-wrapper .subtitle {
                    color: var(--primary);
                }

                .profile-info-wrapper .block {
                    background-color: #383838;
                    border-radius: 8px;
                    padding: var(--peaky-pad-24) var(--peaky-pad-32);
                }

                .profile-info-wrapper .block .info {
                    margin: var(--peaky-gap-16) 0 0;
                }

                .profile-info-wrapper .block .text-grey,
                .ant-progress-text {
                    color: #999999;
                }

                .profile-info-wrapper .skills {
                    flex-wrap: wrap;
                    margin-top: var(--peaky-gap-16);
                }

                .profile-info-wrapper .skills .skill {
                    background-color: #383838;
                    border-radius: var(--peaky-br-full);
                    padding: 8px 32px;
                    margin: 0 var(--peaky-gap-16) var(--peaky-gap-16) 0;
                }

                .profile-info-wrapper .ant-divider-horizontal {
                    margin: 40px 0;
                }

                .profile-info-wrapper .ant-empty {
                    width: max-content;
                }

                .question{
                    margin-top:25px;
                    margin-bottom:15px;
                }

                .working{
                    width:25%;!important;
                    display: flex;
                    justify-content: space-between;
                    align-items:center;
                }
                input[type="radio"]{
                    margin-right:10px;
                    -ms-transform: scale(1.5); /* IE 9 */
                    -webkit-transform: scale(1.5); /* Chrome, Safari, Opera */
                    transform: scale(1.5);
                    width: 16px;
                    height: 16px;
                    cursor:pointer;
                }
                input[type='radio']:after {
                    width: 15px;
                    height: 15px;
                    border-radius: 15px;
                    top: -2px;
                    left: -1px;
                    position: relative;
                    background-color: #121212;
                    content: '';
                    display: inline-block;
                    visibility: visible;
                    border: 2px solid #125de9 ;
                }
            
                input[type='radio']:checked:after {
                    width: 15px;
                    height: 15px;
                    border-radius: 15px;
                    top: -2px;
                    left: -1px;
                    position: relative;
                    background-color: #125de9;
                    content: '';
                    display: inline-block;
                    visibility: visible;
                    border: 2px solid #125de9;
                }
                .project{
                    width:100%;
                    height:55px;
                }
                .input-text{
                    border:none;
                    outline:none;
                    width:100%;
                    height:100%;
                    background-color:#383838;
                    color:#FFFFFF;
                    font-size:20px;
                }

                .options{
                    display:inline-block;
                    margin-right: 55px!important;
                }

                .question-2{
                    width:100%;
                    height:135px;
                    margin-top:25px;
                    margin-bottom:15px;
                }

                .label_option{
                    font-size:20px;
                }

                

                
                
                .ant-calendar-picker-input.ant-input {
                    border-radius: 0px;
                    height: 53px;
                    width:350px;
                    background-color:#383838;
                    color:white;
                    border:none;
                    outline:none;
                  }

                  .sub-div{
                    width:100%;
                    height:55px;
                    margin-top:45px;
                    display: flex;
                    align-items: right;
                    justify-content: right;
                  }
                  .sub-btn{
                    cursor:pointer;
                    border:none;
                    outline:none;
                    width:120px;
                    color:white;
                    background: linear-gradient(var(--primary), var(--primary-grad)) !important;
                    border-radius: 2px;
                    font-weight: 700;
                  }
                
                @media only screen and (max-device-width: 760px) {
                    .profile-info-wrapper .w-90 {
                       width: 100%;
                    }

                    .profile-wrapper .edit-btn {
                        right: 16px !important;
                    }
                }
            `}</style>
        </>
    )
}

export default ProfileInfo;
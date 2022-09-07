import React, {Component} from "react";
import {__getCookie} from "../../utils/cookie.util";
import keys from "../../config/keys";
import axios from "axios";
import {G_API_URL} from "../../constants/constants";
import ProjectEngagementSection from "../../components/Vision/ProjectEngagementSection";
import { isMobile } from "react-device-detect";
import {message} from "antd";
import StickyBar from "../../components/Vision/StickyBarProject";


class ProjectGreetn extends Component {
    state = {
        data: [],
        activeBG: 1,
        greeting:'',
        displayText:''
    };

     printGreetn=()=>
    {
        message.success("Your download will begin shortly!");
        const {activeBG,displayText,data} = this.state;
        const config = {
            responseType: 'arraybuffer',
            headers: {
                'Accept': 'application/pdf'
            },
            params: {
                text: displayText,
                img:activeBG
            }
        };
        axios.get(G_API_URL + `vision/pdf/print/`, config)
            .then(response => {
                const blob = new Blob([response.data], {type: 'application/pdf'})
                const link = document.createElement('a')
                link.href = window.URL.createObjectURL(blob)
                link.download = `${data.student_name}'s-greetn.png`
                link.click()
            });
    }

    componentDidMount() {
        const config = {
            headers: {
                "Authorization": __getCookie(keys.cookiePrefix + "ut").cookieValue
            },
            params: {
                slug: window.location.pathname.split('vision/project/greetn/')[1].split("/")[0],
            }
        };
        axios.get(G_API_URL + `vision/data/`, config)
            .then(response => {
                response = response.data;
                this.setState({
                    data: response.data
                });
            });
    }

    onBGSelect = (e) => {
        this.setState({activeBG: Object.entries(e.target)[1][1].bg})
    }

    onChange = (e) => {
        this.setState({greeting:e.target.value})
    }

    render() {
        let bgs = [];
        const {data,activeBG,displayText} = this.state;

        for (let i = 1; i < 9; i++) {
            bgs.push(<div className={`${i === activeBG ? 'active' : ''} bg-item bg-image-full c-pointer`} bg={i}
                          style={{backgroundImage: 'url(https://cdn.progradjunior.org/greetn/b' + i + '.png)'}}
                          onClick={this.onBGSelect}/>);
        }
        return (
            <>
                <div className='main-div'>
                    <div className=' bg-image header'
                         style={{backgroundImage: 'url(https://cdn.progradjunior.org/greetn/greetnlogo.svg)'}}/>
                    <div className={`bg-holder ${isMobile?'':'f-d'}`}>
                        {bgs}
                    </div>
                    <div className="project-container f-d f-vt-m">
                        <div className="left-container">
                            <div className={`greeting-canvas ${isMobile && displayText.length>0?'':'extra-pad'} bg-image-full h2-heading f-d f-h-c`}
                                 style={{backgroundImage: `url(https://cdn.progradjunior.org/greetn/b${activeBG}.png)`}}>
                                {displayText}
                            </div>
                        </div>
                        <div className="right-container">
                            <div className='body-large title'>Add a message to personalise your card</div>
                            <textarea className='text-area' maxLength='60' placeholder='Type your message …'
                            onChange={this.onChange}
                            />
                            <div className={`btn-container ${isMobile?'':'f-d f-v-c'}`}>
                                <div
                                    onClick={() => { this.setState({displayText:this.state.greeting})}}
                                    className="generate-card-btn default-pink-btn filled-pink">
                                    Generate Card
                                </div>
                                <div
                                    onClick={this.printGreetn}
                                    className="download-card-btn default-pink-btn outline-pink">
                                    Download Card
                                </div>
                            </div>
                            <ProjectEngagementSection student_name={data.student_name} project='greetn'/>
                        </div>
                    </div>
                </div>
                {isMobile && <StickyBar/>}

                <style jsx={"true"}>
                    {`
                    .main-div{
                      padding-right: 4rem;
                      padding-left: 4rem;
                      margin-bottom: 2rem;
                    
                    }
                    body{
                      background-color: #f0f0f0;
                    }
                    .main-div .header{
                       width: 175px;
                       height: 50px;
                       margin: auto;
                       margin-top: -2rem;
                       margin-bottom: 2rem;
                    }
                    .main-div .bg-holder .bg-item{
                       width: 160px;
                       height: 90px;
                       margin-left: 0.5rem;
                       margin-right: 0.5rem;
                    }
                    .main-div .bg-holder .bg-item.active{
                      border: 2px solid var(--pink);
                    }
                    .main-div .project-container .left-container{
                        width: 60%;                   
                    }
                     .main-div .project-container .right-container{
                        width: 40%;              
                        margin-left: 2rem;               
                    }
                    .main-div .project-container .left-container .greeting-canvas{               
                        width: 100%;
                       height: 100%;
                       color: white;
                       padding: 25vh;
                       text-align: center;
                       background-position: unset;
                    }
                    .main-div .project-container{
                        margin-top: 4rem;
                     
                    }
                    .main-div .project-container .right-container .title{
                      font-weight: bold;
                      margin-bottom: 2rem;
                    }
                    .main-div .project-container .right-container .text-area{
                        padding: 1rem;
                        border-radius: 4px;
                        width: 100%;
                        height: 112px;
                        border: none;
                         resize: none;
                    }
                    .main-div .project-container .right-container .btn-container{
                      margin-top: 1rem;
                      margin-bottom: 2rem;
                    }
                      .main-div .project-container .right-container .btn-container .generate-card-btn{
                         margin-right: 1rem;
                      }
                      .main-div .project-container .right-container .line{
                         border: solid 1px var(--snowfall);
                      }
                       .main-div .project-container .right-container .logo-text{
                          color: var(--granite);
                        }
                      .main-div .project-container .right-container #made-with-love,.right-container #CTA {
                          color: var(--carbon);
                       }
                       
                       .main-div .project-container .right-container .logo-text,.right-container #made-with-love{
                           text-align: left;
                           margin-top: 2rem;
                       }
                       .main-div .project-container .right-container #CTA{
                           margin-top: 1rem;
                           margin-bottom: 1rem;
                           text-align: left;
                       }            
                       @media only screen and (max-device-width: 320px){
                              .main-div .project-container .left-container .greeting-canvas{         
                                 padding:3rem 1rem!important;
                              }
                              .main-div .project-container .right-container .title{
                                    margin-top: -1rem!important;
                                }
                           }
                       }     
                         @media only screen and (min-device-width: 330px) and (max-device-width: 360px) {
                           .main-div .project-container .left-container .greeting-canvas{         
                              padding:4rem 1rem!important;
                           }
                             .main-div .project-container .right-container .title{
                                    margin-top: -1rem !important;
                                }
                         }
                      @media only screen and (max-device-width: 768px) {
                         .main-div{
                            padding-right: 1rem;
                            padding-left: 1rem;
                         }
                         .main-div .bg-holder{
                            display: -webkit-box;
                            overflow-y: scroll;
                         }
                         .main-div .project-container .right-container,.main-div .project-container .left-container{
                             margin-left:unset;             
                             width: unset;            
                         }
                         .main-div .project-container .right-container .title{
                           margin-top: 1rem;
                         }
                          .main-div .project-container .left-container .greeting-canvas{  
                              padding: 5rem 1rem;
                         }        
                            .main-div .project-container .left-container .greeting-canvas.extra-pad{
                              padding: 8rem 1rem !important;
                         }
                           .main-div .project-container .right-container .btn-container .generate-card-btn{
                               width: 100%;
                               margin-bottom: 1rem;
                           }
                           .main-div .project-container .right-container .btn-container .download-card-btn{
                                width: 100%;
                           }
                          .main-div .project-container .right-container .logo-text,.main-div .project-container .right-container #made-with-love,.main-div .project-container .right-container #CTA,.main-div .project-container .right-container .title{
                              text-align: center;
                           }
                           .main-div .project-container .right-container .book-seat-btn{
                              margin: auto;
                           }                        
                         
                      }

                       
                    `}
                </style>
            </>
        )
    }
}

export default ProjectGreetn;

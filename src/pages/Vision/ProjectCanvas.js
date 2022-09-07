import React, {Component} from "react";
import {__getCookie} from "../../utils/cookie.util";
import keys from "../../config/keys";
import axios from "axios";
import {G_API_URL} from "../../constants/constants";
import Sticky from 'react-stickynode';
import Ironman from "../../components/Vision/Project SVG/Ironman";
import Pikachu from "../../components/Vision/Project SVG/Pikachu";
import Ronaldo from "../../components/Vision/Project SVG/Ronaldo";
import Superman from "../../components/Vision/Project SVG/Superman";
import Messi from "../../components/Vision/Project SVG/Messi";
import Harry from "../../components/Vision/Project SVG/Harry";
import MJ from "../../components/Vision/Project SVG/MJ";
import Elsa from "../../components/Vision/Project SVG/Elsa";
import Minion from "../../components/Vision/Project SVG/Minion";
import WonderWoman from "../../components/Vision/Project SVG/WonderWoman";
import ProjectEngagementSection from "../../components/Vision/ProjectEngagementSection";
import {isMobile} from "react-device-detect";
import StickyBar from "../../components/Vision/StickyBarProject";


class ProjectCanvas extends Component {
    state = {
        data: [],
        svg_1:'#ffffff',
        svg_2:'#ffffff',
        svg_3:'#ffffff',
        svg_4:'#ffffff',
        svg_5:'#ffffff',
        svg_6:'#ffffff',
        svg_7:'#ffffff',
        svg_8:'#ffffff',
        svg_9:'#ffffff',
        svg_10:'#ffffff',
    };

    componentDidMount() {
        const config = {
            headers: {
                "Authorization": __getCookie(keys.cookiePrefix + "ut").cookieValue
            },
            params: {
                slug: window.location.pathname.split('vision/project/')[1].split("/")[0],
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
    handleChange=event=>{
        console.log(event.target.value);
        console.log(`svg_${event.target.id}`);
        this.setState({[`svg_${event.target.id}`]: event.target.value})
    }

    renderSVG=()=>{
        const {data,svg_1,svg_2,svg_3,svg_4,svg_5,svg_6, svg_7, svg_8, svg_9,svg_10} = this.state;
        let svgElement;
        switch (parseInt(data.project)){
            case 1:
                svgElement = <Ironman svg_e1={svg_1}svg_e2={svg_2}svg_e3={svg_3}svg_e4={svg_4}svg_e5={svg_5}/>
                break;
            case 2:
                svgElement = <Pikachu svg_e1={svg_1}svg_e2={svg_2}svg_e3={svg_3}svg_e4={svg_4}svg_e5={svg_5}/>
                break;
            case 3:
                svgElement = <Ronaldo svg_e1={svg_1}svg_e2={svg_2}svg_e3={svg_3}svg_e4={svg_4}svg_e5={svg_5}svg_e6={svg_6}/>
                break;
            case 4:
                svgElement = <Superman svg_e1={svg_1}svg_e2={svg_2}svg_e3={svg_3}svg_e4={svg_4}svg_e5={svg_5}svg_e6={svg_6}svg_e7={svg_7}svg_e8={svg_8}svg_e9={svg_9}/>
                break;
            case 5:
                svgElement = <Messi svg_e1={svg_1}svg_e2={svg_2}svg_e3={svg_3}svg_e4={svg_4}svg_e5={svg_5}svg_e6={svg_6}svg_e7={svg_7}/>
                break;
            case 6:
                svgElement = <Harry svg_e1={svg_1}svg_e2={svg_2}svg_e3={svg_3}svg_e4={svg_4}svg_e5={svg_5}svg_e6={svg_6}/>
                break;
            case 7:
                svgElement = <MJ svg_e1={svg_1}svg_e2={svg_2}svg_e3={svg_3}svg_e4={svg_4}svg_e5={svg_5}svg_e6={svg_6}svg_e7={svg_7}svg_e8={svg_8}svg_e9={svg_9}svg_e10={svg_10}/>
                break;
            case 8:
                svgElement = <Elsa svg_e1={svg_1}svg_e2={svg_2}svg_e3={svg_3}svg_e4={svg_4}svg_e5={svg_5}/>
                break;
            case 9:
                svgElement = <Minion svg_e1={svg_1}svg_e2={svg_2}svg_e3={svg_3}svg_e4={svg_4}svg_e5={svg_5}/>
                break;
            case 10:
                svgElement = <WonderWoman svg_e1={svg_1}svg_e2={svg_2}svg_e3={svg_3}svg_e4={svg_4}svg_e5={svg_5}svg_e6={svg_6}svg_e7={svg_7}/>
                break;
            default:
                svgElement = <Ironman svg_e1={svg_1}svg_e2={svg_2}svg_e3={svg_3}svg_e4={svg_4}svg_e5={svg_5}/>
                break;
        }

        return svgElement;
    }

    render() {
        const {data} = this.state;
        const values =
            [
                // 1: Iron Man
                {
                    "svg_1": "Face Plate",
                    "svg_2": "Face Helmet",
                    "svg_3": "Eyes",
                    "svg_4": "Background"
                },
                // 2: Pikachu
                {
                    "svg_1": "Sky",
                    "svg_2": "Ground",
                    "svg_3": "Body",
                    "svg_4": "Ears",
                    "svg_5": "Cheeks"
                },
                // 3: Ronaldo
                {
                    "svg_1": "Background",
                    "svg_2": "Face",
                    "svg_3": "Hair",
                    "svg_4": "CR",
                    "svg_5": "7",
                    "svg_6": "Jersey"
                },
                // 4: Superman
                {
                    "svg_1": "Background",
                    "svg_2": "Face",
                    "svg_3": "Costume",
                    "svg_4": "Eyes",
                    "svg_5": "Symbol Background",
                    "svg_6": "Symbol",
                    "svg_7": "Hair",
                    "svg_8": "Costume",
                    "svg_9": "Cape",
                },
                // 5: Messi
                {
                    "svg_1": "Background",
                    "svg_2": "Hair",
                    "svg_3": "Face",
                    "svg_4": "Jersey",
                    "svg_5": "Stripes",
                    "svg_6": "Beard",
                    "svg_7": "Text",
                },
                // 6: Harry
                {
                    "svg_1": "Background",
                    "svg_2": "Face",
                    "svg_3": "Scarf 1",
                    "svg_4": "Scarf 2",
                    "svg_5": "Hair",
                    "svg_6": "Text",
                },
                // 7: MJ
                {
                    "svg_1": "Background",
                    "svg_2": "Socks",
                    "svg_3": "Shirt",
                    "svg_4": "Pant",
                    "svg_5": "Shoes",
                    "svg_6": "Gloves",
                    "svg_7": "Jacket",
                    "svg_8": "Hair",
                    "svg_9": "Hat",
                    "svg_10": "Face",
                },
                // 8: Elsa
                {
                    "svg_1": "Background",
                    "svg_2": "Body",
                    "svg_3": "Dress",
                    "svg_4": "Face",
                    "svg_5": "Hair",
                },
                // 9: Minion
                {
                    "svg_1": "Background",
                    "svg_2": "Body",
                    "svg_3": "Jeans",
                    "svg_4": "Gloves",
                    "svg_5": "Shoes",
                },
                // 10: Wonder Woman
                {
                    "svg_1": "Background",
                    "svg_2": "Hair",
                    "svg_3": "Body",
                    "svg_4": "Armour",
                    "svg_5": "Costume",
                    "svg_6": "Eyes",
                    "svg_7": "Star",
                },

            ];

        var progressBars;
        if(data!==undefined && data.project!==undefined) {
                progressBars = Object.entries(values[data.project - 1]).map((item,i) => (
                    <div className="color-selector">
                        <input type="color" id={i+1} className="color-box" onChange={this.handleChange}
                               value={this.state[item[0]]}/>
                        <div className='body-caption'>{item[1]}</div>
                    </div>

                ));
        }


        return (
            <>
                <div className="body-container f-d ">
                    <section id="canvas-container">
                        <div id="canvas-instructions">
                            <img src="https://i1.faceprep.in/prograd-junior/canvas.svg" alt="logo"/>
                            <p body-caption>Complete this art using the color palette</p>
                        </div>
                        <div id="canvas">
                            <Sticky enabled={true} top={-20} bottomBoundary={12000}>
                                {this.renderSVG()}
                            </Sticky>
                        </div>
                    </section>
                    <section id="colors">
                        <div id="heading">
                            <h2 className='body-large'>Colour Palette</h2>
                            <div id="reset" className='body-small' onClick={()=>{this.setState({
                                svg_1:'#ffffff',
                                svg_2:'#ffffff',
                                svg_3:'#ffffff',
                                svg_4:'#ffffff',
                                svg_5:'#ffffff',
                                svg_6:'#ffffff',
                                svg_7:'#ffffff',
                                svg_8:'#ffffff',
                                svg_9:'#ffffff',
                                svg_10:'#ffffff'
                            })}}>{isMobile?'Reset':'Reset Colours'}</div>
                        </div>
                        <div id="color-container">

                            {progressBars}
                        </div>
                        <ProjectEngagementSection student_name={data.student_name}/>
                    </section>
                    {isMobile && <StickyBar/>}
                </div>
                <style jsx={"true"}>
                    {`
    
            #canvas-container {
                background-color: #f0f0f0;
                flex: 3;
                /* padding: 20px 0; */
            }
            
            #canvas-instructions {
                width: 80%;
                margin: 30px auto;
                padding: 20px 0 0;
            }
            
            #canvas-instructions p {
                margin-top: 50px;
                font-weight: 500;
                color: var(--carbon);
            }
            
            #canvas {
                width: 80%;
                min-width: 300px;
                margin: 0 auto;
            
            }
            
            #canvas svg {
                width: 100%;
                height:100%;
            }
            
            #colors {
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                align-items: center;
                flex: 2;
                min-width: 300px;
                background-color: #212121;
                color: white;
                padding: 30px 40px;
            }
            
            #colors>* {
                margin: 10px 0;
            }
            
            #heading {
                display: flex;
                width: 100%;
                justify-content: space-between;
                align-items: center;
            }
            #heading h2{
              color: var(--dove)!important;
              font-weight: 500;
            }
            
            #reset {
                border-radius: 4px;
                background-color: #f00f0f;
                padding: 1rem;
                font-weight: 600;
                cursor: pointer;
                color: var(--dove);
            }
            
            #color-container {
                display: flex;
                flex-wrap: wrap;
                justify-content: flex-start;
                align-items: center;
                width: 100%;
            }
            
            .color-selector {
                display: flex;
                flex-direction: column;
                align-items: center;
                margin: 10px;
            
            }
            
             .color-selector div{
               color: var(--dove); 
             }
            
            .color-box {
                width: 100px;
                height: 100px;
                border-radius: 4px;
                border: solid 1px rgba(228, 228, 228, 0.3);
                margin-bottom: 4px;
            }
            
          
            input[type="color"] {
                -webkit-appearance: none;
                border: none;
                background-color: #ffffff;
            }
            
            input[type="color"]::-webkit-color-swatch-wrapper {
                padding: 0;
            }
            
            input[type="color"]::-webkit-color-swatch {
                border-radius: 4px;
                border: solid 1px rgba(228, 228, 228, 0.3);
            }
            
            
            @media only screen and (max-width: 600px) {
                body {
                    overflow-x: hidden;
                }
                
                  .body-container {
                    flex-wrap: wrap;
                    }
            
                #canvas-instructions {
                    text-align: center;
                    width: 100%;
                    margin: auto;
                }
            
                #canvas {
                    width: 100%;
                }
            
                #canvas svg {
                    box-shadow: none;
                    border: none;
                }
            
                #color-container {
                    justify-content: space-evenly;
                }
                #reset{
                  padding: 10px 1rem;
                }
            }

          

                    .body-container {
                   
                    margin-top: -64px;
                }

                    .body-container .lr-pad-d {
                    padding-right: 4rem;
                    padding-left: 4rem;
                }

                    .body-container .tb-pad-d {
                    padding-top: 1rem;
                    padding-bottom: 1rem;
                }                                                                                            
                `}
                </style>
            </>
        )
    }
}

export default ProjectCanvas;

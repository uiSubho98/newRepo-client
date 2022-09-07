import React from "react";
import styled from "styled-components";

const HeroDescContainer = styled.div`
    font-family: "OpenSans", sans-serif !important;

    .desc {
        white-space: pre-line;
        font-size: 18px;
        line-height: 25px;

        b {
            font-weight: 500;
        }
    }

    .role-container {
        background: linear-gradient(90deg, #0e7ded 2.26%, #1739e6 98.89%);
        padding: 32px;
        margin-top: 64px;
        border-radius: 2px;
    }

    .role-container .desc {
        color: var(--dove) !important;
    }

    @media only screen and (max-device-width: 760px) {
        .role-container {
            margin-top: 32px;
        }
    }
`;

interface IHeroDescProps {
    name: string;
    profile_type: string;
}

const HeroDesc = (props: IHeroDescProps) => {
    const { profile_type } = props;
    let text = "";
    let text_desc = "";
    if (profile_type !== undefined) {
        switch (parseInt(profile_type)) {
            case 1:
                text = "Data Scientist, Solution Architect";
                text_desc = `Architects are deep thinkers who apply both creativity and rationality to everything they do. This comes from their sheer love to positively influence and change the world around them.

                Architects enjoy being in their own intellectual world of thoughts and curiousness. Their inner world is a private, complex one and others find it difficult to keep up with them.
                
                However, they never cease to amaze people with their ability to decode things. Being the Jack-of-all-trades, they know how to hack anything life throws their way.`;
                break;
            case 2:
                text = "Product Manager, Business Lead";
                text_desc = `Commanders are natural leaders. They have the ability to lead and will be able to strike a balance between being innovative and being practical. 

                    Giving up on things is never an option for them because they love challenging each obstacle in their run to the finish line. No wonder, most leaders of the world are commanders. 
                    
                    Loved for their bold and imaginative nature, commanders are born with the ability to inspire the crowd. You will always see them finding a way or making one.
                `;
                break;
            case 3:
                text = "Tech Consultant, Entrepreneur";
                text_desc = `Explorers are dreamers and are super innovative in solving problems. They typically start with a vision and leave no stones unturned to achieve their dreams. 

                    They are also bold and practical experimenters and are thereby the masters of all tools. Their constant craving for experimenting and discovering new things in life goes unsaid.
                    
                    Energetic, and enthusiast in nature, explorers make life around them very interesting. Most visionaries who transformed the world with their ideas are explorers. So, you should be super proud that your kid is an explorer.`;
                break;
            default:
                break;
        }
    }

    return (
        <HeroDescContainer className="desc-container">
            <div className="desc body-big">{text_desc}</div>
            <div className="role-container">
                <div className="desc body-big">
                    <b>Potential Role-Match in Tech Space</b>
                    <br />
                    {text}
                </div>
            </div>
        </HeroDescContainer>
    );
};

export default HeroDesc;

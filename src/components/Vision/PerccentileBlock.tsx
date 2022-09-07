import React from "react";
import styled from "styled-components";

const PercentileBlockContainer = styled.div`
    padding: 128px 0px;

    .title {
        font-family: "Inconsolata", sans-serif !important;
        color: var(--dove);
        width: 50%;
        text-align: center;
        margin: 0 auto;
        font-weight: 900;
        line-height: 40px;
    }

    .ptile-block {
        background: #1e1e1e;
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
        border-radius: 4px;
        padding: 4rem 2rem;
        width: 80%;
        margin: 0 auto;
        margin-top: 64px;
    }

    .ptile-block .left-container .ptile {
        color: var(--primary);
        font-size: 72px;
        font-weight: 600;
        font-family: "Poppins", sans-serif;
    }

    .ptile-block .left-container .ptile-text,
    .ptile-block .right-container .desc {
        font-weight: 300;
    }

    .ptile-block .right-container .desc {
        line-height: 25px;
    }

    @media only screen and (max-device-width: 760px) {
        padding: var(--peaky-gap-48) 0px;

        .title {
            text-align: left;
            width: 100%;
        }

        .ptile-block {
            padding: 16px 0px;
            flex-direction: column;
            margin-top: 32px;
            width: 100%;
        }

        .ptile-block .left-container .ptile {
            font-size: 56px;
        }

        .ptile-block .left-container {
            text-align: left;
            width: 100%;
        }
    }
`;

const PercentileBlock = (props: any) => {
    const { name, ptile } = props;

    return (
        <PercentileBlockContainer className="lr-pad-d lr-pad-m ">
            <div className="title h1-heading">What the Vision Skills Index says about {name}</div>

            <div className="ptile-block f-d f-vt-m f-v-c f-h-sa">
                <div className="left-container lr-pad-m text-c-d">
                    <div className="ptile-text text-big">{name} belongs to the top</div>
                    <div className="ptile">{ptile}%ile</div>
                </div>
                <div className="right-container lr-pad-m">
                    <div className="desc text-medium">
                        Vision Skills Index gives insights about your ability to acquire current-era
                        skills. The index and breakdown of the three indicators, that determines
                        your score, has been evolved and benchmarked based on the analytics from
                        various demographics of learners across the globe.
                    </div>
                </div>
            </div>
        </PercentileBlockContainer>
    );
};

export default PercentileBlock;

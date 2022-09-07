import React from "react";
import { Progress } from "antd";
import { isMobile } from "react-device-detect";
import styled from "styled-components";

let values = [
    {
        percent: null,
        color: "#2c7de6",
        name: "Computer Proficiency",
    },
    {
        percent: null,
        color: "#7fcb22",
        name: "Comprehension",
    },
    {
        percent: null,
        color: "#f1c40f",
        name: "Design Thinking",
    },
];

const ProgressContainer = styled.div`
    .ant-progress-circle-trail {
        stroke: ${(props) => props.color} !important;
        opacity: 0.45;
    }
`;

const ProgressBlock = (props: any) => {
    let { cp_score, c_score, dt_score } = props;
    values[0]["percent"] = cp_score;
    values[1]["percent"] = c_score;
    values[2]["percent"] = dt_score;

    const progressBars = values.map((item: any, idx) => (
        <ProgressContainer
            className="progress-container"
            key={`PROGRESS-BAR-${idx}`}
            color={item.color}
        >
            <Progress
                type="circle"
                percent={item.percent}
                strokeColor={item.color}
                strokeWidth={6}
                width={isMobile ? 150 : 300}
            />
            <div className="progress-text body-big">{item.name}</div>
        </ProgressContainer>
    ));

    return (
        <>
            <div className="progress-block lr-pad-d tb-pad-d lr-pad-m f-d f-vt-m f-v-c f-h-sa">
                {progressBars}
            </div>
            <style jsx>
                {`
                    .body-container .progress-block .ant-progress-text {
                        font-size: 36px;
                        font-family: Poppins;
                        font-weight: 500;
                        color: var(--dove);
                    }

                    .body-container .progress-block .progress-text {
                        text-align: center;
                        margin-top: 2rem;
                    }
                    @media only screen and (max-device-width: 760px) {
                        .body-container .progress-block .progress-container {
                            padding: 2rem;
                            display: contents;
                        }
                        .body-container .progress-block .progress-text {
                            margin-bottom: 2.5rem;
                            margin-top: 1rem;
                        }
                        .body-container .progress-block {
                            margin-top: 0;
                        }
                    }
                `}
            </style>
        </>
    );
};

export default ProgressBlock;

import React from "react";
import { ILearnings } from "../workshops";
interface ILearningsProps {
    learnings: ILearnings
}
const LearningsV2 = (props: ILearningsProps) => {
    const { learnings } = props;
    return (
        <>
            <div className="learnings-wrapper lr-pad-d lr-pad-m tb-pad-d tb-pad-m">
                <h3 className="text-xl font-heading text-c-m">{learnings.title}</h3>
                <div className="desc">
                    {learnings.desc}
                </div>
                <div className="strong-text">{learnings.topicsHeading}</div>
                <ul className="points-wrapper">
                    {
                        learnings.topics.map((l: string, i: number) => {
                            return (
                                <li key={i}>{l}</li>
                            )
                        })
                    }
                </ul>
            </div>
            <style jsx>
                {`
                    .learnings-wrapper {
                        width: 100%;
                    }
                    .learnings-wrapper .desc {
                        margin: var(--peaky-gap-32) 0;
                    }
                    .learnings-wrapper .points-wrapper {
                        margin-top: var(--peaky-gap-16);
                        margin-left: var(--peaky-gap-32);
                    }
                    @media only screen and (max-device-width: 760px) {
                    }
            `}
            </style>
        </>
    )
}
export default LearningsV2;
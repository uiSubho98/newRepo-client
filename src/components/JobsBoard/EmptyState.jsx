import React from "react";
import { useHistory } from "react-router-dom";
import EmptyStateImage from "../../assets/imgs/jobsboard/empty-state.svg";

const EmptyState = () => {

    const history = useHistory();

    const apply = () => {
        history.push("/programs");
    }

    return (
        <>
            <div className="f-d f-h-c f-v-c f-vt empty-state-wrapper">
                <div className="bg-image-full empty-state-image" style = {{
                    backgroundImage: 'url(' + EmptyStateImage + ')'
                }} />
                <p className="info strong-text">
                    You don't have any active programs <span 
                    className="c-pointer register-btn" onClick={() => apply()}>
                        Apply Now
                    </span>
                </p>
            </div>
            <style jsx>{`
                .empty-state-wrapper {
                    margin: var(--peaky-gap-64) 0;
                }

                .empty-state-wrapper .empty-state-image {
                    height: 400px;
                    width: 100%;
                }

                .empty-state-wrapper .info {
                    margin: var(--peaky-gap-48) 0 0;
                }

                .empty-state-wrapper .register-btn {
                    color: var(--primary);
                }

                @media only screen and (max-device-width: 760px) {
                    .empty-state-wrapper .empty-state-image {
                        height: 350px;
                    }

                    .empty-state-wrapper .info {
                        margin: var(--peaky-gap-24) 0 0;
                    }
                }
            `}</style>
        </>
    )
}

export default EmptyState;
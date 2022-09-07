import React from "react";

const ProcessSkeleton = () => {
    return (
        <>
            <div className="process-skeleton-card skeleton-card">
            </div>
            <style jsx>{`
                .process-skeleton-card {
                    height: 396px;
                    width: 100%;
                }

                @media only screen and (max-device-width: 760px) {
                    .process-skeleton-card {
                        height: 200px;
                        margin: var(--peaky-gap-32) 0 0;
                    }
                }
            `}</style>
        </>
    )
}

export default ProcessSkeleton;
import React from "react";

const FeaturesSkeleton = () => {
    return (
        <>
            <div className="features-skeleton-card skeleton-card">
            </div>
            <style jsx>{`
                .features-skeleton-card {
                    height: 346px;
                    width: 100%;
                }

                @media only screen and (max-device-width: 760px) {
                    .features-skeleton-card {
                        height: 180px;
                        margin: var(--peaky-gap-32) 0 0;
                    }
                }
            `}</style>
        </>
    )
}

export default FeaturesSkeleton;
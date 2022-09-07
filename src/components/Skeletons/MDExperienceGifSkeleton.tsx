import React from 'react';

const MDExperienceGifSkeleton = () => {
    return (
        <>
            <div className="pj-features-gif-skeleton f-d f-v-c f-h-c
            skeleton-video w-100">
                <div className="skeleton-circle"></div>
            </div>
            <style jsx>{`
                .pj-features-gif-skeleton {
                    height:400px;
                }
            `}</style>
        </>
    )
}

export default MDExperienceGifSkeleton;
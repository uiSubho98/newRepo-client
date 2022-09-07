import React from "react";
// @ts-ignore
import { Link } from "react-router-dom";

const BookingBlock = (props: any) => {
    // const { program } = props;
    return (
        <>
            <div className="book-a-seat-block lr-pad-m">
                <div className="title h1-heading">
                    Get your Vision Skills report. Sign up for a free experience of ProGrad
                    Microdegree in programming
                </div>
                <div className="share-btn-container f-d f-vt-m f-v-c f-h-c ">
                    <div className="book-seat-btn default-blue-btn">
                        <Link to={`${process.env.PUBLIC_URL}/microdegree`}>Learn more</Link>
                    </div>
                </div>
            </div>
            <style jsx>
                {`
                    .body-container .book-a-seat-block .title {
                        padding: 0 10rem;
                        margin-bottom: 2rem;
                    }
                    .body-container .book-a-seat-block .book-seat-btn {
                        padding: 20px 32px;
                        margin: 0 0 var(--peaky-gap-32);
                    }
                    .body-container .book-a-seat-block .book-seat-btn a {
                        color: white !important;
                    }
                    @media only screen and (max-device-width: 760px) {
                        .body-container .book-a-seat-block .title {
                            padding: unset;
                            margin-bottom: 2rem;
                        }
                        .body-container .book-a-seat-block {
                            margin-top: unset !important;
                        }
                    }
                `}
            </style>
        </>
    );
};

export default BookingBlock;

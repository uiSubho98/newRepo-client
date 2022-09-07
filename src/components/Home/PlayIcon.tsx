import React from "react";

interface IProps {
    info: string;
    onPlay: Function;
}

const PlayIcon = (props: IProps) => {
    const { info, onPlay } = props;
    return (
        <>
            <div
            className="intro-video-con f-d f-v-c c-pointer"
            onClick={()=> onPlay()}
            >
            <div className="play-icon-con">
                <div className="play-icon-l-1">
                    <div className="play-icon-l-2">
                        <div className="play-icon-l-3">
                            <div className="play-icon-triangle">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="9"
                                    height="10"
                                    viewBox="0 0 9 10"
                                >
                                    <path
                                        id="Polygon_1"
                                        data-name="Polygon 1"
                                        d="M4,0,8,7H0Z"
                                        transform="translate(7) rotate(90)"
                                        fill="#fff"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="watch-msg">
                <div className="body-caption">Watch</div>
                    <div className="hear-from h4-heading
                    ">
                        {info}
                    </div>
            </div>
        </div>
        <style jsx>{`
            .intro-video-con {
                margin: 0 0 0 var(--peaky-gap-32);
            }

            .play-icon-con {
                margin-right: 1rem;
            }

            .play-icon-con:hover .play-icon-l-1 {
                background-color: rgba(95, 39, 205, 0.1);
            }

            .play-icon-con:hover .play-icon-l-2 {
                background-color: rgba(95, 39, 205, 0.2);
            }

            .play-icon-con:hover .play-icon-l-3 {
                background-color: rgba(95, 39, 205, 1);
            }

            .play-icon-l-1 {
                width: 56px;
                height: 56px;
                background-color: rgba(0, 0, 0, 0.1);
            }

            .play-icon-l-2 {
                width: 42px;
                height: 42px;
                background-color: rgba(0, 0, 0, 0.2);
            }

            .play-icon-l-1,
            .play-icon-l-2 {
                border-radius: 50%;
                display: flex;
                -webkit-box-pack: center;
                -ms-flex-pack: center;
                justify-content: center;
                -webkit-box-align: center;
                -ms-flex-align: center;
                align-items: center;
                transition: all 0.4s;
                -webkit-animation: breathe 2s infinite;
                animation: breathe 2s infinite;
                -webkit-animation-timing-function: ease-out;
                animation-timing-function: ease-out;
            }

            .play-icon-l-3 {
                width: 28px;
                height: 28px;
                border-radius: 50%;
                background-color: rgba(0, 0, 0, 1);
                display: flex;
                justify-content: center;
                align-items: center;
                transition: all 0.4s;
                -webkit-animation: breathe 1s infinite;
                animation: breathe 1s infinite;
                -webkit-animation-timing-function: ease-out;
                animation-timing-function: ease-out;
            }

            .play-icon-triangle {
                width: 16px;
                height: 16px;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .play-icon-triangle svg {
                margin-top: 2px;
                margin-left: 4px;
            }

            .intro-video-con .watch-msg
            .hear-from {
                color: var(--carbon);
            }

            .intro-video-con .watch-msg
            .body-caption {
                color: var(--carbon);
            }

            @-webkit-keyframes breathe {
                from {
                    -webkit-transform: scale(0.9);
                    transform: scale(0.9);
                }

                50% {
                    -webkit-transform: scale(1);
                    transform: scale(1);
                }

                to {
                    -webkit-transform: scale(0.9);
                    transform: scale(0.9);
                }
            }

            @keyframes breathe {
                from {
                    -webkit-transform: scale(0.9);
                    transform: scale(0.9);
                }

                50% {
                    -webkit-transform: scale(1);
                    transform: scale(1);
                }

                to {
                    -webkit-transform: scale(0.9);
                    transform: scale(0.9);
                }
            }

            @media only screen and (max-device-width: 760px) {

                .intro-video-con {
                    margin: var(--peaky-gap-32) 0;
                }

                .play-icon-con .play-icon-l-1 {
                    background-color: rgba(95, 39, 205, 0.1);
                }
    
                .play-icon-con .play-icon-l-2 {
                    background-color: rgba(95, 39, 205, 0.2);
                }
    
                .play-icon-con .play-icon-l-3 {
                    background-color: rgba(95, 39, 205, 1);
                }

            }
        `}</style>
    </>
    )
}

export default PlayIcon;
import { CalendarOutlined, ClockCircleOutlined, DownOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import moment from "moment";
import { Moment } from "moment-timezone";
import React from "react";
import PlayButton from "../../../assets/imgs/home/play-button-v2.svg";
import { G_URL } from "../../../constants/constants";
import { IHeroContent, IWorkshopTime } from "../workshops";

interface IHeroProps {
    ended: boolean;
    heroContent: IHeroContent;
    startTime: Moment;
    workshopTimes: Array<IWorkshopTime>
    slug: string;
    showReplay: () => void;
}

const HeroV2 = (props: IHeroProps) => {
    const { ended, heroContent, startTime, workshopTimes, slug, showReplay } = props;

    const renderPlayButton = () => {
        return (
            <div className="f-d f-vt f-v-c">
                <div className="play-icon bg-image c-pointer" style={{ 
                    backgroundImage: `url(${PlayButton})` }} onClick={() => showReplay()}>
                </div>
                <div className="font-heading text-medium">Watch Replay</div>
            </div>
        )
    }

    const wTimes = workshopTimes.map((wt: IWorkshopTime, idx: number) => {
        return (
            <div key={idx}>{moment(wt.startTime * 1000).utcOffset("+05:30").format('DD MMMM Y[,] h:mm A')} to {moment(wt.endTime * 1000).utcOffset("+05:30").format('h:mm A [IST]')}</div>
        )
    });
    
    const stTime = workshopTimes.length > 1 ? moment(workshopTimes[0].startTime * 1000) : startTime;
    const stTimeFormated = stTime.utcOffset("+05:30").format('DD/MM/YY hh:mm A [IST]');

    return (
        <>
            <div className="hero-wrapper lr-pad-d tb-pad-d f-d f-h-sb f-v-c f-vt-m bg-image-full">
                <div className="hero-img-wrapper w-100 hide-d">
                    <img src={heroContent.bgImage} className="hero-img hide-d f-m w-100" alt="" />
                </div>
                <div className="left-pane lr-pad-m">
                    <div className="breadcrumb text-faded-2 c-pointer text-c-m" onClick={()=>{window.location.href=G_URL+'workshops/'}}>{heroContent.breadcrumb}</div>
                    <h2 className="font-heading text-xxl text-c-m title">{heroContent.title}</h2>
                    <div className="share-block f-d f-v-c f-h-c-m">
                        <div className="text-faded-2">SHARE</div>
                        <div className="c-pointer share-ico-wrapper f-d f-h-c f-v-c" onClick={() => { window.open('https://api.whatsapp.com/send?phone=&text=' + encodeURIComponent(`Hi! ProGrad's exclusive workshop ${heroContent.title} is happening on ${stTimeFormated}. Get access to this workshop by registering here - ${G_URL + 'workshops/' + slug}`)) }}>
                            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.7731 22.8372L14.9868 22.964C15.8843 23.4972 16.9134 23.7793 17.9628 23.7798H17.9651C21.1879 23.7798 23.8108 21.1546 23.8121 17.928C23.8127 16.3644 23.2051 14.8941 22.1011 13.7881C20.9971 12.6821 19.5292 12.0727 17.9673 12.0721C14.742 12.0721 12.1191 14.6969 12.1179 17.9233C12.1174 19.0289 12.4265 20.1057 13.0118 21.0375L13.1509 21.2588L12.5601 23.4181L14.7731 22.8372ZM10.8711 25.0908L11.8692 21.4426C11.2536 20.375 10.9297 19.1637 10.9301 17.9229C10.9317 14.041 14.0873 10.8828 17.9651 10.8828C19.8468 10.8837 21.6131 11.6169 22.9414 12.9476C24.2694 14.2784 25.0007 16.0472 25 17.9286C24.9983 21.8102 21.8422 24.9689 17.9651 24.9689C17.9648 24.9689 17.9653 24.9689 17.9651 24.9689H17.962C16.7848 24.9684 15.628 24.6728 14.6004 24.1118L10.8711 25.0908Z" fill="white" fillOpacity="0.87" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M16.2412 14.9976C16.1095 14.7046 15.9709 14.6987 15.8457 14.6935C15.7432 14.6892 15.6259 14.6895 15.5088 14.6895C15.3915 14.6895 15.2011 14.7335 15.0401 14.9096C14.879 15.0857 14.4248 15.5113 14.4248 16.3772C14.4248 17.243 15.0547 18.0795 15.1425 18.197C15.2304 18.3144 16.3585 20.1479 18.1453 20.8532C19.63 21.4393 19.9322 21.3227 20.2546 21.2935C20.5768 21.2642 21.2945 20.8678 21.4409 20.4569C21.5874 20.046 21.5874 19.694 21.5436 19.6204C21.4995 19.5469 21.3824 19.503 21.2065 19.415C21.0308 19.327 20.1666 18.9013 20.0054 18.8426C19.8443 18.7839 19.7271 18.7546 19.6099 18.9307C19.4927 19.1068 19.1561 19.503 19.0535 19.6204C18.951 19.7379 18.8484 19.7526 18.6725 19.6646C18.4968 19.5763 17.9306 19.3907 17.259 18.7912C16.7365 18.3248 16.3838 17.7488 16.2811 17.5727C16.1786 17.3966 16.2702 17.3014 16.3584 17.2137C16.4373 17.1348 16.5341 17.0082 16.6221 16.9054C16.7098 16.8027 16.7391 16.7293 16.7976 16.6121C16.8563 16.4946 16.827 16.3918 16.783 16.3038C16.7391 16.2158 16.3975 15.3455 16.2412 14.9976Z" fill="white" fillOpacity="0.87" />
                                <circle cx="18" cy="18" r="17.4" stroke="white" strokeOpacity="0.87" strokeWidth="1.2" />
                            </svg>
                        </div>
                        <div className="c-pointer share-ico-wrapper f-d f-h-c f-v-c" onClick={() => { window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(G_URL + 'workshops/' + slug) + '&quote=' + encodeURIComponent(`Hi! ProGrad's exclusive workshop ${heroContent.title} is happening on ${stTimeFormated}. Get access to this workshop by registering here - ${G_URL + 'workshops/' + slug}`)) }}>
                            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.5525 12.656H22V10.112C21.2991 10.0363 20.5949 9.99892 19.8903 10C17.796 10 16.3638 11.328 16.3638 13.76V15.856H14V18.704H16.3638V26H19.1973V18.704H21.5534L21.9076 15.856H19.1973V14.04C19.1973 13.2 19.4129 12.656 20.5525 12.656Z" fill="white" fillOpacity="0.87" />
                                <circle cx="18" cy="18" r="17.4" stroke="white" strokeOpacity="0.87" strokeWidth="1.2" />
                            </svg>
                        </div>
                        <div className="c-pointer share-ico-wrapper f-d f-h-c f-v-c" onClick={() => { window.open('https://twitter.com/share?url='+encodeURI(G_URL + 'workshops/' + slug)+'&text=' + encodeURIComponent(`Hi! ProGrad's exclusive workshop ${heroContent.title} is happening on ${stTimeFormated}. Get access to this workshop by registering here -`)) }}>
                            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M25 14.4377C24.4738 14.678 23.9174 14.8369 23.348 14.9094C23.9487 14.5315 24.3989 13.9371 24.615 13.2363C24.0505 13.5901 23.4325 13.8394 22.788 13.9733C22.3572 13.4814 21.7835 13.154 21.1569 13.0423C20.5303 12.9307 19.8862 13.0412 19.3257 13.3566C18.7651 13.6719 18.3199 14.1742 18.0597 14.7847C17.7995 15.3952 17.7391 16.0794 17.888 16.7299C16.7466 16.6691 15.6301 16.3562 14.6111 15.8114C13.592 15.2667 12.6932 14.5023 11.973 13.568C11.7204 14.0324 11.5877 14.5584 11.588 15.0937C11.5871 15.5907 11.703 16.0803 11.9252 16.5188C12.1475 16.9573 12.4693 17.3311 12.862 17.607C12.4056 17.5939 11.9589 17.4649 11.56 17.2311V17.2679C11.5634 17.9644 11.7952 18.6382 12.2161 19.1754C12.637 19.7126 13.2213 20.0802 13.87 20.2161C13.6203 20.2961 13.361 20.3383 13.1 20.3414C12.9193 20.3392 12.7391 20.3219 12.561 20.2898C12.7457 20.8889 13.1032 21.4124 13.5838 21.7876C14.0643 22.1628 14.6439 22.3709 15.242 22.383C14.232 23.2198 12.9851 23.6764 11.7 23.6802C11.466 23.681 11.2322 23.6663 11 23.636C12.3121 24.528 13.8412 25.0015 15.403 24.9995C16.4808 25.0113 17.55 24.7969 18.5482 24.3687C19.5464 23.9405 20.4535 23.3072 21.2166 22.5057C21.9798 21.7043 22.5836 20.7508 22.9928 19.7009C23.402 18.6509 23.6084 17.5257 23.6 16.3909C23.6 16.2656 23.6 16.1329 23.6 16.0002C24.1493 15.5689 24.623 15.0402 25 14.4377Z" fill="white" />
                                <circle cx="18" cy="18" r="17.4" stroke="white" strokeOpacity="0.87" strokeWidth="1.2" />
                            </svg>
                        </div>
                        <div className="c-pointer share-ico-wrapper f-d f-h-c f-v-c" onClick={() => { window.open('https://www.linkedin.com/cws/share?url=' + encodeURIComponent(G_URL + 'workshops/' + slug)) }}>
                            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.7778 25H15.6667V15.6667H18.7778V17.2222C19.4409 16.3785 20.4466 15.8756 21.5194 15.851C23.4488 15.8617 25.0056 17.4317 25 19.3611V25H21.8889V19.75C21.7644 18.8809 21.0191 18.2361 20.1412 18.238C19.7572 18.2501 19.3947 18.4183 19.1374 18.7036C18.8801 18.9889 18.7503 19.3668 18.7778 19.75V25ZM14.1111 25H11V15.6667H14.1111V25ZM12.5556 14.1111C11.6964 14.1111 11 13.4147 11 12.5556C11 11.6964 11.6964 11 12.5556 11C13.4147 11 14.1111 11.6964 14.1111 12.5556C14.1111 12.9681 13.9472 13.3638 13.6555 13.6555C13.3638 13.9472 12.9681 14.1111 12.5556 14.1111Z" fill="white" fillOpacity="0.87" />
                                <circle cx="18" cy="18" r="17.4" stroke="white" strokeOpacity="0.87" strokeWidth="1.2" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="right-pane f-d f-h-e lr-pad-m">
                    {
                        !ended || !heroContent.replayUrl ?
                            <div className="details-wrapper">
                                {
                                    // Handle single session workshop times
                                    workshopTimes.length === 1 &&
                                    <>
                                        <div className="detail f-d">
                                            <div className="icon-wrapper f-d f-v-c f-h-c">
                                                <CalendarOutlined className="detail-icon" />
                                            </div>
                                            <div>
                                                <div className="font-heading text-medium">{startTime.format('DD MMMM YYYY')}</div>
                                                <div className="text-small text-faded">DATE</div>
                                            </div>
                                        </div>
                                        <div className="detail f-d">
                                            <div className="icon-wrapper f-d f-v-c f-h-c">
                                                <ClockCircleOutlined className="detail-icon" />
                                            </div>
                                            <div>
                                                <div className="font-heading text-medium">{startTime.format('hh:mm A [IST]')}</div>
                                                <div className="text-small text-faded">TIME</div>
                                            </div>
                                        </div>
                                    </>
                                }
                                {
                                    // Handle multi session workshop times
                                    workshopTimes.length > 1 &&
                                    <div className="detail f-d">
                                        <div className="icon-wrapper f-d f-v-c f-h-c">
                                            <CalendarOutlined className="detail-icon" />
                                        </div>
                                        <div>
                                            <div className="font-heading text-medium">{workshopTimes.length} sessions 
                                            <Popover placement="bottomRight" content={wTimes} trigger="click" className="caret-down text-small">
                                                <DownOutlined />
                                            </Popover></div>
                                            <div className="text-small text-faded">DATE & TIME</div>
                                        </div>
                                    </div>
                                }
                                <div className="detail f-d">
                                    <div className="icon-wrapper f-d f-v-c f-h-c">
                                        <PlayCircleOutlined className="detail-icon" />
                                    </div>
                                    <div>
                                        <div className="font-heading text-medium">{heroContent.deliveryType}</div>
                                        <div className="text-small text-faded">DELIVERY</div>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="replay-wrapper">
                                {
                                    heroContent.replayUrl &&
                                    <div className="f-d f-h-c f-v-c bg-image replay-thumbnail"
                                    style={{ backgroundImage: "url(" + heroContent.replayThumb + ")" }}>
                                        { renderPlayButton() }
                                    </div>
                                }
                            </div>
                    }
                </div>
            </div>
            <style jsx>
                {`
                    .hero-wrapper {
                        width: 100%;
                        background-image: linear-gradient(to left, rgba(0, 0, 0, 0) 20%, #000000 80%), url(${heroContent.bgImage});
                        background-position: right;
                    }

                    .hero-wrapper .left-pane {
                        flex: 1;
                    }

                    .hero-wrapper .left-pane .breadcrumb {
                        margin-bottom: var(--peaky-gap-16);
                    }

                    .hero-wrapper .left-pane .title {
                        line-height: 3.67125rem;
                    }

                    .hero-wrapper .left-pane .share-block {
                        margin-top: var(--peaky-gap-32);
                    }
                    
                    .hero-wrapper .left-pane .share-ico-wrapper {
                        margin-left: var(--peaky-gap-16);
                    }
                    
                    .hero-wrapper .left-pane .share-ico-wrapper:hover svg > path {
                        fill: #1DA1F2;
                    }
                    
                    .hero-wrapper .left-pane .share-ico-wrapper:hover svg > circle {
                        stroke: #1DA1F2;
                    }
                    
                    .hero-wrapper .right-pane {
                        flex: 1;
                    }

                    .hero-wrapper .right-pane .details-wrapper {
                        padding: var(--peaky-pad-32);
                        background-color: var(--primary-bg);
                        border-radius: var(--peaky-br-4);
                    }
                    
                    .hero-wrapper .right-pane .details-wrapper .detail:not(:last-child) {
                        margin-bottom: var(--peaky-gap-32);
                    }

                    
                    .hero-wrapper .right-pane .details-wrapper .icon-wrapper {
                        height: 36px;
                        width: 36px;
                        border-radius: var(--peaky-br-4);
                        background-color: var(--secondary-bg);
                        margin-right: var(--peaky-gap-32);
                    }
                    
                    .hero-wrapper .right-pane .replay-wrapper {
                        border-radius: var(--peaky-br-4);
                    }

                    .hero-wrapper .right-pane .replay-wrapper .replay-thumbnail {
                        height: 300px;
                        width: 500px;
                    }

                    .hero-wrapper .right-pane .replay-wrapper .play-icon {
                        width: 48px;
                        height: 48px;
                        margin-bottom: var(--peaky-gap-8);
                    }

                    .hero-wrapper .right-pane .detail .caret-down {
                        margin-left: var(--peaky-gap-8);
                    }
                    
                    .ant-popover-arrow {
                        display: none;
                    }
                    .ant-popover-inner {
                        border-radius: 0;
                    }
                    .ant-popover-inner-content {
                        background-color: var(--spider);
                        color: var(--dove);
                    }
                    .ant-popover-inner-content > div:not(:last-child) {
                        margin-bottom: var(--peaky-gap-8);
                    }

                    .replay-modal .ant-modal-body {
                        padding:0;
                    }
    
                    .replay-modal .ant-modal-close {
                        z-index:2;
                        font-size:24px;
                    }
    
                    .replay-modal .ant-modal-close-x {
                        position: absolute;
                        width: 32px;
                        height: 32px;
                        color: var(--dove);
                        font-size: 18px;
                        font-weight: 600;
                        line-height: 24px;
                    }

                    @media only screen and (max-device-width: 760px) {
                        .hero-wrapper {
                            padding-left: 0;
                            padding-right: 0;
                            padding-top: 0;
                            background: none;
                        }

                        .hero-wrapper .hero-img-wrapper {
                            display: inline-block;
                            background: -moz-linear-gradient(to bottom, rgba(0, 0, 0, 0), #121212); /* FF3.6+ */
                            background: -webkit-gradient(linear, left bottom, right bottom, color-stop(0%, rgba(0, 0, 0)), color-stop(100%, #121212)); /* Chrome,Safari4+ */
                            background: -webkit-linear-gradient(top, rgba(0,0,0,0) 0%, #121212 100%); /* Chrome10+,Safari5.1+ */
                            background: -o-linear-gradient(top, rgba(0, 0, 0, 0) 0%, #121212 100%); /* Opera 11.10+ */
                            background: -ms-linear-gradient(top, rgba(0, 0, 0, 0) 0%, #121212 100%); /* IE10+ */
                            background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, #121212 100%); /* W3C */
                            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#a6000000', endColorstr='#00000000',GradientType=0 ); /* IE6-9 */
                        }

                        .hero-wrapper .hero-img {
                            position: relative;
                            width: 100%;
                            height: auto;
                            z-index:-1;
                            display:block;
                        }

                        .hero-wrapper .left-pane {
                            padding-top: 1rem;
                            padding-bottom: 1rem;
                        }

                        .hero-wrapper .left-pane .breadcrumb {
                            margin-bottom: var(--peaky-gap-8);
                        }

                        .hero-wrapper .left-pane .title {
                            line-height: 3.15rem;
                        }

                        .hero-wrapper .left-pane .share-block {
                            margin-bottom: var(--peaky-gap-16);
                        }

                        .hero-wrapper .right-pane .replay-wrapper .replay-thumbnail {
                            height: 51vw;
                            width: 90vw;
                        }
                    }
            `}
            </style>
        </>
    )
}

export default HeroV2;
import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import SlackIcon from '../../assets/icons/svg-icons-v2/slack.svg'
import axios from 'axios';
import { G_API_URL } from '../../constants/constants';
import { __getToken } from '../../utils/user-details.util';
import { openNotification } from '../../utils/common.util';

interface IProps {
    isInviteUsed: number;
    updateStep: Function;
}

const Community = (props: IProps) => {

    const { isInviteUsed, updateStep } = props;

    const [ isLoading, setLoading ] = useState<boolean>(false);

    useEffect(() => {
        if (isInviteUsed) {
            updateStep();
        }
    }, [isInviteUsed, updateStep]);

    const grabInvite = () => {
        setLoading(true);
        axios.post(G_API_URL + "/tracker/grab/invite/",{program: 1}, {
            headers: {
                Authorization: __getToken()
            }
        }).then((response: any) => {
            response = response.data;
            if(response.status === 1) {
                setTimeout(() => {
                    setLoading(false);
                    updateStep();
                    setTimeout(() => {
                        window.open("https://join.slack.com/t/prograd/shared_invite/zt-mrdtho2r-z8RzU~As7DrTLaxK7SBv4g", "_blank");
                    }, 300)
                }, 1500)
            } else {
                openNotification('fail', 'Something went wrong!');
                setLoading(false);
            }
        })
    }

    return (
        <>
            <div className="community-wrapper w-80">
                <span className="text-regular description">
                    Join the ProGrad community on Slack. This is where you can meet your 
                    fellow students and our mentors. There are many useful channels. For starters, 
                    check <span className="strong-text">#code-help</span>
                </span>
                <div className="f-d f-h-s f-v-c action-elements-wrapper">
                    <Button
                        className="grab-btn default-blue-btn btn-small"
                        onClick={() => grabInvite()}
                        loading = {isLoading}
                    >
                        <div className="bg-image slack-icon"
                            style={{ backgroundImage: "url(" + SlackIcon +")"
                        }}>
                        </div>
                        Grab the invite
                    </Button>
                    <span className="skip-btn text-regular c-pointer"
                    onClick={() => updateStep()}>
                        I’ll do this later
                    </span>
                </div>
            </div>
            <style jsx>{`
                .community-wrapper {
                    background-color: var(--primary-bg);
                    padding: var(--peaky-pad-32);
                }

                .community-wrapper .action-elements-wrapper {
                    margin: var(--peaky-gap-48) 0 0;
                }

                .community-wrapper .action-elements-wrapper 
                .skip-btn {
                    text-decoration: underline;
                    margin: 0 0 0 var(--peaky-gap-24);
                }

                .community-wrapper .action-elements-wrapper 
                .grab-btn {
                    background: var(--dove) !important;
                    color: var(--carbon);
                }

                .community-wrapper .action-elements-wrapper 
                .grab-btn .slack-icon {
                    height: 20px;
                    margin: 0 var(--peaky-gap-16) 0 0;
                    width: 20px;
                }

                @media only screen and (max-device-width: 760px) {
                    .community-wrapper {
                        width: 100%;
                        padding: var(--peaky-gap-16);
                    }

                    .community-wrapper .action-elements-wrapper {
                        flex-direction: column;
                    }

                    .community-wrapper .action-elements-wrapper .skip-btn {
                        margin: var(--peaky-gap-24) 0 0;
                    }
                }

            `}</style>
        </>
    )
}

export default Community;
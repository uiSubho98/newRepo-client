import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import Layout from "../../components/Layout";
import Programs from "../../components/JobsBoard/Programs";
import EmptyState from "../../components/JobsBoard/EmptyState";
import Spinner from "../../components/Spinner/spinner";
import { __getToken } from "../../utils/user-details.util";
import { G_PR_URL, G_TEST_DOMAIN, ENTITY_ID, G_HOME_URL } from "../../constants/constants";

const JobsBoard = () => {

    const defaultState = {
        isLoading: false,
        programs: []
    }

    const [state, setState] = useState(defaultState);

    const { isLoading, programs } = state;

    useEffect(() => {
        setState(prev => ({
            ...prev,
            isLoading: true
        }));
        axios.get(G_PR_URL + "programs/", {
            headers: {
                Authorization: __getToken()
            }
        }).then((response) => {
            response = response.data;
            if(response.status === 1) {
                setState(prev => ({
                    ...prev,
                    isLoading: false,
                    programs: response.programs
                }));
            } else {
                setState(prev => ({
                    ...prev,
                    isLoading: false
                }));
            }
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    const redirectToTest = (payload, authToken) => {
        document.getElementById('payload').value = payload;
        document.getElementById('auth_token').value = authToken;
        document.getElementById('test_redirect').submit();
    }

    return (
        <Layout>
            <Helmet>
                <title>ProGrad | Jobs Board</title>
            </Helmet>
            {
                !isLoading ?
                <div className="lr-pad-d lr-pad-m jobs-board-wrapper">
                    {
                        programs.length ?
                        <Programs
                            programs={programs}
                            redirectToTest={redirectToTest}
                        /> :
                        <EmptyState />
                    }
                </div> :
                <Spinner />
            }

            <form
                key={'redirect'}
                method="POST"
                action={G_TEST_DOMAIN + 'auth/'}
                name="test_redirect"
                id="test_redirect"
            >
                <input
                    className="hidden"
                    type="hidden"
                    name="entity_id"
                    placeholder="entity_id"
                    value={ENTITY_ID}
                    id="entity_id"
                />
                <input
                    className="hidden"
                    type="hidden"
                    name="fallback_url"
                    placeholder="fallback_url"
                    value={G_HOME_URL + 'jobsboard'}
                    id="fallback_url"
                />
                <input
                    className="hidden"
                    type="hidden"
                    name="payload"
                    placeholder="payload"
                    value=""
                    id="payload"
                />
                <input
                    className="hidden"
                    type="hidden"
                    name="auth_token"
                    placeholder="auth_token"
                    value=""
                    id="auth_token"
                />
            </form>

            <style jsx>{`
                .ant-tabs, .ant-tabs .ant-tabs-tab:hover, 
                .ant-tabs-nav .ant-tabs-tab-active {
                    color: var(--dove);
                }

                .jobs-board-wrapper {
                    padding-top: var(--peaky-pad-32);
                    padding-bottom: var(--peaky-pad-32);
                }

                .jobs-board-wrapper .program-cards-wrapper {
                    margin: var(--peaky-gap-24) 0 0;
                }

                .jobs-board-wrapper .program-card {
                    background-color: var(--spider);
                    border-radius: var(--peaky-br-4);
                }

                .jobs-board-wrapper .program-card .program-card-details {
                    padding: var(--peaky-pad-32);
                    width: 94%;
                }

                .jobs-board-wrapper .program-card .action-btn {
                    align-items: center;
                    color: var(--dove);
                    cursor: default;
                    display: flex;
                    font-size: 20px;
                    height: 100% !important;
                    justify-content: center;
                    width: 6%;
                    border: none;
                    border-top-left-radius: 0;
                    border-bottom-left-radius: 0;
                    background: linear-gradient(180deg, #0E7DED 1.47%, #1739E6 101.42%);
                    cursor: pointer;
                }

                .jobs-board-wrapper .program-card .action-btn.inactive {
                    background: #444444;
                    cursor: default;
                }

                .jobs-board-wrapper .program-card .title {
                    color: var(--dove);
                    font-size: 24px;
                }

                .jobs-board-wrapper .program-card .info {
                    margin: var(--peaky-gap-16) 0 0;
                }

                .jobs-board-wrapper .program-card .info .icon {
                    font-size: 18px;
                    margin: 2px var(--peaky-gap-8) 0 0;
                }

                .ant-divider {
                    background: var(--davy-grey);
                }

                .ant-divider-horizontal {
                    margin: 40px 0;
                }

                .ant-tabs-bar {
                    border-bottom: 1px solid var(--davy-grey);
                }

                .ant-tabs-ink-bar {
                    height: 4px;
                    background-color: var(--primary);
                }

                .steps {
                    margin: var(--peaky-gap-32) 0 0;
                }

                .steps .icon-wrapper {
                    background-color: var(--charcoal);
                    border-radius: var(--peaky-br-full);
                    color: var(--dove);
                    padding: var(--peaky-pad-16);
                }

                // .ant-steps-label-vertical .ant-steps-item-tail {
                //     margin-left: 70px;
                // }

                .ant-steps-item-process .icon-wrapper {
                    border: 2px solid #51CB5E; 
                    color: #51CB5E;
                }

                .ant-steps-item-error .icon-wrapper {
                    background-color: #FF6666;
                    color: var(--charcoal);
                }

                .ant-steps-item-finish .icon-wrapper {
                    background-color: #51CB5E;
                    color: var(--charcoal);
                }

                .ant-steps-item-process .icon-wrapper.scheduled {
                    border-color: #E6BE2E;
                    color: #E6BE2E;
                }

                .steps.rejected .ant-steps-item-wait .icon-wrapper {
                    color: #5F5F5F;
                }

                .ant-steps-item-finish > .ant-steps-item-container > 
                .ant-steps-item-tail::after {
                    background-color: #51CB5E;
                }

                .ant-steps-item-tail {
                    top: 25px;
                }

                .ant-steps-item-tail::after {
                    height: 2px;
                }

                .ant-steps-item-process > .ant-steps-item-container > 
                .ant-steps-item-tail::after,
                .ant-steps-item-wait > .ant-steps-item-container > 
                .ant-steps-item-tail::after,
                .ant-steps-item-error > .ant-steps-item-container > 
                .ant-steps-item-tail::after {
                    background-color: #666666;
                }

                .ant-steps-label-vertical .ant-steps-item-icon {
                    margin-left: 32px;
                }

                .ant-steps-item-title {
                    color: var(--dove) !important;
                }

                .ant-steps-item-title {
                    line-height: 21px;
                    font-weight: 400 !important;
                }

                .ant-steps-item-error .ant-steps-item-title {
                    color: #FF6666 !important;
                }

                .steps.rejected .ant-steps-item-wait .ant-steps-item-title {
                    color: #5F5F5F !important;
                }

                .ant-steps-item-description {
                    color: var(--dove) !important;
                    font-size: 12px;
                    font-weight: 300;
                }

                @media only screen and (max-device-width: 1024px) {
                    .jobs-board-wrapper .program-card {
                        flex-direction: column;
                    }

                    .jobs-board-wrapper .program-card .program-card-details {
                        padding: var(--peaky-pad-16);
                        width: 100%;
                    }

                    .jobs-board-wrapper .program-card .action-btn {
                        height: 50px !important;
                        width: 100%;
                    }

                    .steps .icon-wrapper {
                        font-size: 16px;
                        padding: 10px 18px;
                    }

                    .ant-steps-item-title {
                        font-size: 14px;
                        font-weight: 600 !important;
                    }

                    .ant-steps-vertical .ant-steps-item-content {
                        min-height: 60px;
                    }

                    .ant-steps-vertical .ant-steps-item-icon {
                        margin-right: 21px;
                    }

                    .ant-steps-vertical > .ant-steps-item > 
                    .ant-steps-item-container > .ant-steps-item-tail {
                        top: 6px;
                        left: 18px;
                        padding-top: 12px;
                    }

                    .ant-steps-vertical > .ant-steps-item > 
                    .ant-steps-item-container > .ant-steps-item-tail::after {
                        width: 2px;
                    }
                }
            `}</style>
        </Layout>
    )
}

export default JobsBoard;
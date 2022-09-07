import { Tabs } from 'antd';
import React from 'react';

interface IProps {
    switchTab: Function;
}

const Navigator = (props: IProps) => {

    const { switchTab } = props;

    const { TabPane } = Tabs;

    return (
        <>
            <Tabs className="navigator" defaultActiveKey="1" onChange={(e) => switchTab(e)}>
                <TabPane tab="Your Progress" key="1">
                </TabPane>
                <TabPane tab="Curriculum" key="2">
                </TabPane>
            </Tabs>
            <style jsx>{`

                .navigator {
                    display: none;
                    margin: var(--peaky-gap-16) 0;
                }

                .navigator .ant-tabs-nav {
                    width: 100%;
                }

                .navigator .ant-tabs-nav .ant-tabs-tab {
                    color: var(--dove);
                    font-family: "OpenSans", sans-serif;
                    margin: 0;
                    text-align: center;
                    opacity: 0.87;
                    width: 50%;
                }

                .navigator .ant-tabs-nav .ant-tabs-tab-active {
                    opacity: unset;
                    font-weight: 600;
                }

                .navigator .ant-tabs-nav .ant-tabs-tab:active,
                .navigator .ant-tabs-nav .ant-tabs-tab:hover {
                    color: var(--dove);
                }

                .navigator .ant-tabs-nav .ant-tabs-tab {
                    text-transform: uppercase;
                }

                .navigator .ant-tabs-bar {
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                }

                .navigator .ant-tabs-ink-bar {
                    height: 4px;
                    background: linear-gradient(90deg, #0E7DED 2.28%, #1739E6 99.51%);
                }

                @media only screen and (max-device-width: 760px) {
                    .navigator {
                        display: block;
                    }
                }
            `}</style>
        </>
    )
}

export default Navigator;
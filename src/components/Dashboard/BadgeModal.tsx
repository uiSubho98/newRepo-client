import { Button, Modal } from "antd";
import React from "react";
import { IBadge } from "../../interfaces/dashboard";

interface IProps {
    isModalVisible: boolean;
    badge?: IBadge;
    handleClick: Function;
}

const BadgeModal = (props: IProps) => {
    const { isModalVisible, badge, handleClick } = props;

    return (
        <>
            <Modal
                className="badge-info-modal"
                centered
                destroyOnClose={true}
                footer={null}
                visible={isModalVisible}
                onCancel={() => handleClick()}
            >
                <div className="content-wrapper">
                    <div className="g-d g-h-c header">
                        <div className="bg-image-full badge" style={{
                            backgroundImage: "url(" + badge?.image + ")"
                        }}>
                        </div>
                    </div>

                    <div className="g-d g-h-c body">
                        <h2 className="font-heading text-large 
                        name">
                            { badge?.name }
                        </h2>
                        <span className="text-regular text-c-d 
                        description">
                            { badge?.description }
                        </span>
                        <Button className="default-blue-btn btn-small
                        action-btn" onClick={ () => handleClick() }>
                            { badge?.action }
                        </Button>
                    </div>
                </div>
            </Modal>
            <style jsx>{`
                .badge-info-modal .ant-modal-content {
                    width: 464px;
                    border-radius: var(--peaky-br-4);
                    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
                    background: linear-gradient(180deg, #2E2E2E 0%, #1E1E1E 100%);
                }

                .badge-info-modal .content-wrapper .header {
                    position: relative;
                    margin: 0 0 var(--peaky-gap-48);
                }

                .badge-info-modal .content-wrapper .body {
                    margin: 86px 0 0;
                }

                .badge-info-modal .content-wrapper 
                .body .name {
                    margin: 0 0 12px;
                }

                .badge-info-modal .content-wrapper 
                .body .description {
                    font-weight: 300;
                    opacity: 0.87;
                }

                .badge-info-modal .content-wrapper 
                .body .action-btn {
                    margin: var(--peaky-gap-48) 0 0;
                }

                .badge-info-modal .ant-modal-close-x {
                    display: none;
                }

                .badge-info-modal .badge {
                    bottom: -55px;
                    height: 144px;
                    position: absolute;
                    width: 144px;
                }

                @media only screen and (max-device-width: 760px) {

                    .badge-info-modal .ant-modal-content {
                        width: 95%;
                        margin: 0 auto;
                    }

                    .badge-info-modal .ant-modal-content
                    .ant-modal-body {
                        padding: var(--peaky-gap-16);
                    }

                    .badge-info-modal .badge {
                        height: 100px;
                        bottom: -35px;
                    }

                    .badge-info-modal .content-wrapper .body {
                        margin-top: var(--peaky-gap-64);
                    }

                    .badge-info-modal .content-wrapper .body .action-btn {
                        margin-top: var(--peaky-gap-32);
                    }
                }
            `}</style>
        </>
    )
}

export default BadgeModal;
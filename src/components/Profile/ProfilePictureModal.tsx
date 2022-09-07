import React from "react";
import { Modal, Upload } from "antd";
import { RcCustomRequestOptions } from "antd/lib/upload/interface";
import ImgCrop from "antd-img-crop";

interface IProps {
    profilePicture: string;
    isModalVisible: boolean;
    updateProfilePicture: Function;
    setProfilePicModalStatus: Function;
    getBase64: Function;
}

const ProfilePictureModal = (props: IProps) => {

    const { 
        profilePicture, 
        isModalVisible, 
        updateProfilePicture, 
        setProfilePicModalStatus,
        getBase64
    } = props;

    const handleUpload = (req: RcCustomRequestOptions) => {
        // Get Base64 to preview Thumbnail
        getBase64(req.file, (imageUrl: any) => {
            updateProfilePicture(imageUrl, req.file);
        });
    }

    return (
        <>
            <Modal 
                className="profile-picture-modal"
                title="Profile Picture"
                visible={isModalVisible}
                footer={false}
                onCancel={() => setProfilePicModalStatus()}
            >
                <div className="g-d g-h-c">
                    <img src={profilePicture} alt="profile-pic" 
                    className="display-picture" />
                </div>
                <div className="f-d f-h-c action-block">
                    <ImgCrop>
                        <Upload
                            name="file"
                            className="avatar-uploader"
                            showUploadList={false}
                            customRequest={handleUpload}
                        >
                            <button className="default-blue-btn btn-small
                            update-btn">
                                Update
                            </button>
                        </Upload>
                    </ImgCrop>
                    <button className="default-blue-btn btn-small
                    remove-btn" onClick={ () => updateProfilePicture()}>
                        Remove
                    </button>
                </div>
            </Modal>
            <style jsx>{`
                .profile-picture-modal .ant-modal-content,
                .profile-picture-modal .ant-modal-header {
                    background-color: var(--batman);
                }

                .ant-modal-close-x {
                    line-height: 42px;
                }

                .ant-modal-close-x .anticon {
                    vertical-align: middle;
                }

                .ant-modal-close {
                    color: var(--dove) !important;
                }

                .ant-modal-title {
                    line-height: 0;
                    color: var(--dove);
                    font-size: 16px !important;
                }

                .display-picture {
                    height: 250px;
                    width: 250px;
                    border-radius: 50%;
                }         

                .action-block {
                    margin: var(--peaky-gap-32) 0 0;
                }

                .action-block .remove-btn {
                    margin: 0 0 0 var(--peaky-gap-32);
                }
            `}</style>
        </>
    )
}

export default ProfilePictureModal;
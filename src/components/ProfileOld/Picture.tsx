import React from "react";
import ImgCrop from 'antd-img-crop';
import { Upload } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { UploadChangeParam } from "antd/lib/upload/interface";

function getBase64(img: Blob|undefined, callback: { (imageUrl: any): any; (arg0: string | ArrayBuffer | null): any; }) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    img && reader.readAsDataURL(img);
}

interface PictureProps {
    allowEditing: Boolean
    src: string
    tempProfileThumb?: string
    updateTempProfileThumb: (data: string) => void
    updateProfileImg: (f: any)=> void
}

const PictureForm = (props: PictureProps) => {
    const {tempProfileThumb, allowEditing, src, updateTempProfileThumb, updateProfileImg} = props;

    const handleChange = (info: UploadChangeParam) => {
        // Get Base64 to preview Thumbnail
        getBase64(info.file.originFileObj, (imageUrl: any) =>{
            updateTempProfileThumb(imageUrl)
            updateProfileImg(info.file)
        });
    };

    const beforeUpload = (file: { type: string; size: number; }) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            console.log('wrong format');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            console.log('wrong size');
        }
        return isJpgOrPng && isLt2M;
    }

    return (
        <>
            <div className="profile-img-container">
                <img src={tempProfileThumb !== undefined ? tempProfileThumb : src} alt="Profile" className="profile-img" />
                {allowEditing && 
                    <ImgCrop>
                        <Upload
                            name="profilePic"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            customRequest={()=>{}}
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                        >
                            <EditOutlined />
                        </Upload>
                    </ImgCrop>
                }
            </div>
            <style>
            {`   
                .profile-img-container {
                    width: fit-content;
                    position: relative;
                }

                .profile-img-container .profile-img {
                    height: 180px;
                    width: 180px;
                }

                .avatar-uploader {
                    position: absolute;
                    width: 20px;
                    bottom: 1px;
                    right: 1px;
                }

                .avatar-uploader .ant-upload.ant-upload-select-picture-card {
                    margin: 0;
                    width: 20px;
                    height: 20px;
                    border: none;
                }

                .ant-upload.ant-upload-select-picture-card > .ant-upload {
                    padding: 0;
                }

                @media only screen and (max-device-width: 760px) {
                    .profile-img-container .profile-img {
                        height: 250px;
                        width: 250px;
                    }
                }
            `}
            </style>
        </>
    );
}

export default PictureForm;
import React from "react";
import { __getFirstName, __getProfilePicture } from "../../utils/user-details.util";

interface IProps {
    isDefaultProfilePic: boolean;
}

const ProfilePic = (props: IProps) => {
    const { isDefaultProfilePic } = props;
    return (
        <>
            {
                !isDefaultProfilePic ?
                <div 
                    {...props}
                    className="bg-image profile-image" 
                    style={{ 
                        backgroundImage: "url(" + __getProfilePicture() + ")" 
                }}>
                </div> :
                <div {...props} className="g-d g-v-c g-h-c profile-image default">
                    { __getFirstName().charAt(0).toUpperCase() }
                </div>
            }
        </>
    )
}

export default ProfilePic;
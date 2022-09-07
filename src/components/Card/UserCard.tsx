import React from 'react';

interface ITeamCard {
    userImg: string
    name: string
    title: string
}

const TeamCard = (props: ITeamCard) => {
    const {userImg, name, title} = props
    return (
        <div className="user-card-container">
            <img src={userImg} alt={name+"-image"} className="user-image"/>
            <div className="card-description">
                <div className="user-name text-c-d text-big">
                    {name}
                </div>
                <div className="user-title text-c-d text-regular">{title}</div>
            </div>
        </div>
    );
}

export default TeamCard;

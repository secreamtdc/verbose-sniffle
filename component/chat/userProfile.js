import React from "react";

export default props => {
    const { profile } = props;
    if(profile.first_name == undefined){
        profile.first_name = '';
    }
    if(profile.last_name == undefined){
        profile.last_name = '';
    }
    return (
        <div>
            <div className="avatar">
                <div className="avatar-image">
                    <div className="" /><img src={profile.profile_pic} /></div>
                <h3>{profile.first_name + " " + profile.last_name}</h3>
            </div>
        </div>
    );
};

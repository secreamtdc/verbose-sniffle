import React from "react";
import {
  Button,
  ListGroup,

} from "react-bootstrap";

export default props => {
  const { users, chatdata,userProfile } = props;

  return (
    <div>
      <style jsx>{`
        .userImgProfile{
          width: 50px;
          border-radius: 100px;
          margin-right: 6px;
      }
      a{
          color: #365899;
          cursor: pointer;
          text-decoration: none;

          padding-left:12px
      }
      `}</style>
      <ListGroup as="ul">
        {users.map(person =>
          <a onClick={() => {chatdata(person.roomid, person.id);userProfile(person)}}>

            <li>
              <div className="avatar">
                <div className="avatar-image">
                  <div className="status online" /><img src={person.profile_pic} /></div>
              </div>
              <h3>{person.first_name + " " + person.last_name}</h3>
              <p>{person.lastmsg}</p>
            </li>
          </a>
        )}
      </ListGroup>
    </div>
  );
};

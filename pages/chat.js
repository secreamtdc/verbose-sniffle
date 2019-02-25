
import React from 'react'

import axios from "axios";
import socketIOClient from 'socket.io-client';

import NavbarMenu from "../component/navbar";
import Userlist from "../component/chat/user";
import UserProfile from "../component/chat/userProfile";


const io = socketIOClient('http://localhost:4000')

class ChatPage extends React.Component {
  static getInitialProps({ query }) {
    return { query };
  }
  constructor(props) {
    super(props);

    this.state = {
      start: 0,
      pageid: 1228734873945897,
      friendid: "",
      roomid: "",
      users: [],
      persons: [],
      input: '',
      messages: [],
      profile :{first_name:"",last_name:""}
    };
    this.chatdata = this.chatdata.bind(this)
  }
  componentDidMount() {
    // this.response()
    console.log("componentDidMount");
    this.scrollToBottom();
  }
  componentDidUpdate() {
    this.scrollToBottom();
  }
  // เมื่อมีการส่งข้อมูลไปยัง server
  send = () => {
    const { input } = this.state
    let data = { friendid: this.state.friendid, msg: input }
    io.emit('sent-message', data)
    this.setState({ input: '' })
  }
  chatdata(roomid, friendid) {

    //โหลดห้องแชท และข้อมูลผู้แชท
    axios.get("api/chatdata/" + roomid).then(res => {
      console.log(res.data);
      
      this.setState({ messages: res.data, 'friendid': friendid, 'roomid': roomid })

      var temp; //temp messages
      io.on(this.state.roomid, (messageNew) => {
        temp = this.state.messages;
        temp.push(messageNew);
        this.setState({ messages: temp })
      })
    });

  }
  userProfile = (person) => {
    this.setState({ profile: person })
  }
  // รอรับข้อมูลเมื่อ server มีการ update
  response = () => {

    //โหลดห้องแชท และข้อมูลผู้แชท คนแรกให้มาแสดง
    axios.get("api/userchat/" + this.state.pageid).then(res => {
      let start
      const users = res.data;

      if (this.state.start == 0) {
        this.chatdata(users[0].roomid, users[0].id);
        this.userProfile(users[0]);
        start = 1;
      }
      this.setState({ users, start });
    });

  }

  changeInput = (e) => {
    this.setState({ input: e.target.value })
  }
  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.send();
    }
  }
  scrollToBottom = () => {
    this.refs.conversation.scrollTop = this.refs.conversation.scrollHeight;    
  }

  render() {
    const { input, messages } = this.state
    let tempClass = "";
    let Class = "";
    let temp = []
    let renderElement = [];

    
    messages.forEach((element,key) => {

      if(element.sender_psid == this.state.pageid){ //ถ้า True แสดงว่าเป็น sent
        Class = 'sent'
      }else{
        Class =  'received'
      }

      if(Class == tempClass || tempClass == ''){ //ถ้าเป็นกลุ่มของข้อความผู้ส่งเดิม
        tempClass = Class;
        temp.push(element);
      }else if((Class != tempClass || tempClass != '')){ //ถ้าเป็นข้อความที่อีกคนตอบ จะนำไปจัดกลุ่มแล้วเพิ่ม class
        let child = []
        temp.forEach(chatElement => {
          child.push(<div className="message_chat">{chatElement.msg}</div>)
        });
        let sendClass = "messages_chat messages_chat--"+tempClass; 
        let div = <div className={sendClass}>{child}</div>
        renderElement.push(div); //เพิ่ม DOM
        tempClass = Class;
        temp = [element];   //เคลีย temp ให้เหลือแค่ข้อความล่าสุดที่ยังไม่ได้เพิ่ม
      }

      // ข้อความสุดท้าย 
      if(key==messages.length-1){
        let child = []
        temp.forEach(chatElement => {
          child.push(<div className="message_chat">{chatElement.msg}</div>)
        });
        let sendClass = "messages_chat messages_chat--"+tempClass; 
        let div = <div className={sendClass}>{child}</div>
        renderElement.push(div); //เพิ่ม DOM
        tempClass = Class;
        temp = [element];   //เคลีย temp ให้เหลือแค่ข้อความล่าสุดที่ยังไม่ได้เพิ่ม
      }
      
    });

    return (
      <div>
 
        <NavbarMenu />
        <header className="header_chat">
          <div style={{paddingLeft:'85px',paddingRight:'85px'}}>
            <div className="left"><img src="static/img/logo.svg" /></div>
            <div className="middle">
              <h3>{this.state.profile.first_name + " " + this.state.profile.last_name}</h3>
              <p>Messenger</p>
            </div>
            <div className="right">
              <div className="username">My-First-Zin</div>
              <div className="avatar"><img src="https://scontent.fbkk2-7.fna.fbcdn.net/v/t1.0-9/51509284_1228735350612516_8226477833594077184_n.png?_nc_cat=106&_nc_ht=scontent.fbkk2-7.fna&oh=e59023b296719daa7510eacbdacd93d7&oe=5CF0D1E4" /></div>
            </div>
          </div>
        </header>
        <main>
          <div className="col_chat-left">
            <div className="col_chat-content">
              <div className="messages">
              <Userlist users={this.state.users} chatdata={this.chatdata} userProfile ={this.userProfile}/>
              </div>
            </div>
          </div>
          <div className="col_chat">
            <div className="col_chat-content">
              <div className="conversation" ref="conversation">
                {renderElement}
              </div>
              <div>
              <input type="text" placeholder="Type your Messages..." id="input" value={input} onChange={this.changeInput} onKeyPress={this._handleKeyPress} />
              </div>
            </div>
          </div>
          <div className="col_chat-right">
            <div className="col_chat-content">
              <div className="user-panel">
              <UserProfile profile = {this.state.profile}/>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default ChatPage;

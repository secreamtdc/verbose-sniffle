import Link from 'next/link' 
import { Nav,Navbar } from 'react-bootstrap';

const NavbarMenu = () =>(
    <div>
      <style jsx>{`
a {
color:white;
margin-right:15px;
}`} 

</style>
<Navbar style={{backgroundColor:'#3b5998',paddingLeft:'85px'}}>

<Navbar.Brand href="#home">
      <img
        src="/static/logo.png"
        width="30"
        height="30"
        className="d-inline-block align-top"
        alt="React Bootstrap logo"
      />
    </Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Link className="navA" href="/"><a>Home</a></Link> 
      <Link className="navA" href="/chat"><a>Chat</a></Link> 
      <Link className="navA" href="/admin"><a>Admin</a></Link> 
    </Nav>
  </Navbar.Collapse>
</Navbar>
    </div>
)

export default NavbarMenu
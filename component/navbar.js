import Link from 'next/link'
import { Nav, Navbar } from 'react-bootstrap';

const NavbarMenu = () => (
  <div>
    <style jsx>{`
a {
color:white;
margin-right:15px;
}`}

    </style>
    <Navbar style={{ backgroundColor: '#0E5383', paddingLeft: '85px' }}>

      <Navbar.Brand href="#home">
        <img
          src="/static/zanroo-logo.png"
          height="25px"
          className="d-inline-block align-top"
          alt="React Bootstrap logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link href="/">
            <a className="navA">Home</a>
          </Link>
          <Link href="/chat">
            <a className="navA">Chat</a>
          </Link>
          <Link href="/admin">
            <a className="navA">Admin</a>
          </Link>
          <Link href="/hook">
            <a className="navA">Hook</a>
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>

  </div>
)

export default NavbarMenu
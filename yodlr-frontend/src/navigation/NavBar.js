import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const NavBar = (props) => {
    const { location } = props;
    return (
        <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand href="/">
                    <img
                        alt=""
                        src="./logo.svg"
                        // width="30"
                        height="60"
                        className="d-inline-block align-top"
                    />
                </Navbar.Brand>
                <Nav className="me-auto" activeKey={location.pathname}>
                    <Nav.Link href="/admin">Admin</Nav.Link>
                    <Nav.Link href="/signup">Signup</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default NavBar;
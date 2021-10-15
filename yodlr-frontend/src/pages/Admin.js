import { useContext } from 'react';
import UsersContext from '../context/UsersContext';
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const Admin = () => {
    const { users, handleUpdateUser, handleDeleteUser } = useContext(UsersContext);
    const hasUsers = users.length ? true : false;

    const handleActivate = (id) => {
        const user = users.filter((user) => user.id === id);
        handleUpdateUser(user[0]);
    }

    const handleDelete = (id) => {
        const user = users.filter((user) => user.id === id);
        handleDeleteUser(user[0]);
    }

    if (hasUsers) {
        return (
            <Container className="m-lg-5">
            <h1>Users</h1>
            <Row>
            { users.map((user) =>
                <Col key={user.id} md={4}>
                    <Card className="mb-4" style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>{user.firstName} {user.lastName}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">state: {user.state}</Card.Subtitle>
                            <Card.Text>
                                {user.email}
                            </Card.Text>
                            <Button 
                                className="mx-1" 
                                variant="success" 
                                size="sm" 
                                hidden={user.state === "active"} 
                                onClick={() => handleActivate(user.id)}>
                                Activate
                            </Button>
                            <Button 
                                variant="danger" 
                                size="sm" 
                                onClick={() => handleDelete(user.id)}>
                                Delete
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            ) }
            </Row>
        </Container>
        );
    } else {
        return (
            <Container className="m-lg-5">
                <h1>Users</h1>
                <Row>
                    <Col>
                        There are no users in the system.
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Admin;
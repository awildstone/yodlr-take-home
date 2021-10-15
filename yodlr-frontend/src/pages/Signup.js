import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useContext } from 'react';
import UsersContext from '../context/UsersContext';
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Signup = () => {
    const { handleAddUser } = useContext(UsersContext);
    const history = useHistory();
   
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: ""
    });

    const [touched, setTouched] = useState({
        firstName: false,
        lastName: false,
        email: false
    });

    const [errors, setErrors] = useState({
        firstName: formData.firstName.length < 2,
        lastName: formData.lastName.length < 2,
        email: formData.email.length < 7,
    });

    let isDisabled = Object.values(errors).some((err) => err === true);

    //check fields/update errors any time formdata is updated
    useEffect(() => {
        setErrors({
            firstName: touched.firstName && formData.firstName.length < 2,
            lastName: touched.lastName && formData.lastName.length < 2,
            email: touched.email && formData.email.length < 7,
        });
    },[touched, formData]);

    const handleBlur = (field) => {
        setTouched(data => ({...data, [field]: true}));
    }

    const handleChange = (evt) => {
        setFormData(data => ({...data, [evt.target.name]: evt.target.value}));
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        handleAddUser(formData);
        history.push("/");
    };

    return (
        <Container className="m-lg-5">
            <Row>
                <Col>
                    <h1>Signup</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="firstName">First name </Form.Label>
                            <Form.Control
                                className={errors.firstName && touched.firstName ? "field-error" : ""} 
                                type="firstName" 
                                name="firstName"
                                placeholder="First name" 
                                value={formData.firstName}
                                onBlur={() => handleBlur("firstName")} 
                                onChange={handleChange}
                                required 
                            />
                            <Form.Text className="text-danger">
                                {errors.firstName && touched.firstName ? "First name must be 2 characters or longer." : ""}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="lastName">Last name </Form.Label>
                            <Form.Control
                                className={errors.lastName && touched.lastName ? "field-error" : ""} 
                                type="lastName" 
                                name="lastName" 
                                placeholder="Last name" 
                                value={formData.lastName}
                                onBlur={() => handleBlur("lastName")} 
                                onChange={handleChange}
                                required 
                            />
                            <Form.Text className="text-danger">
                                {errors.lastName && touched.lastName ? "Last name must be 2 characters or longer." : ""}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="email">Email address </Form.Label>
                            <Form.Control 
                                className={errors.email && touched.email ? "field-error" : ""}
                                type="email" 
                                placeholder="name@example.com"
                                name="email" 
                                value={formData.email}
                                onBlur={() => handleBlur("email")} 
                                onChange={handleChange}
                                required 
                            />
                            <Form.Text className="text-danger">
                                {errors.email && touched.email ? "Email must be 7 characters or longer." : ""}
                            </Form.Text>
                        </Form.Group>
                        <Button type="submit" variant="success" disabled={isDisabled}>Submit</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Signup;
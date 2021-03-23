import React, { useCallback } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { RegistrationFormData } from "../../Utils/Interfaces";
import AuthService from "../../services/auth.service";

export const Signin: React.FC = (props: any) => {
  const authService = new AuthService();
  const { register, handleSubmit } = useForm<RegistrationFormData>();
  const onSubmit = useCallback(async (formValues: RegistrationFormData) => {
    const res = await authService.signin(formValues.email, formValues.password);
    if (res === 201) {
      props.history.push("/map");
    }
  }, []);
  return (
    <Container className="sign text-white">
      <div>Signin page</div>
      <br />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="Enter email"
            ref={register}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
            ref={register}
          />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export const Signup: React.FC = () => {
  const authService = new AuthService();
  const { register, handleSubmit } = useForm<RegistrationFormData>();
  const onSubmit = useCallback(async (formValues: RegistrationFormData) => {
    const res = await authService.signup(formValues);
    if (res === 201) {
      // this.props.history.push("/tasks");
    }
  }, []);

  return (
    <Container className="sign text-white">
      <div>Signup page</div>
      <br />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="formBasicFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            name="firstName"
            type="text"
            placeholder="Enter your First Name"
            ref={register}
          />
        </Form.Group>
        <Form.Group controlId="formBasicLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            name="lastName"
            type="text"
            placeholder="Enter your Last Name"
            ref={register}
          />
        </Form.Group>
        <Form.Group controlId="formBasicUserType">
          <Form.Label>User Type</Form.Label>
          <Form.Control
            name="userType"
            type="text"
            placeholder="Enter your User Type"
            ref={register}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="Enter email"
            ref={register}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
            ref={register}
          />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

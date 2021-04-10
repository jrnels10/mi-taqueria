import React, { useCallback, useContext } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { RegistrationUserData } from "../../Utils/Interfaces";
import AuthService from "../../services/auth.service";
import { Context } from "../../Utils/Context";
import { Link } from "react-router-dom";

export const Signin: React.FC = (props: any) => {
  const { authService, user } = useContext(Context);
  const { register, handleSubmit } = useForm<RegistrationUserData>();
  const onSubmit = useCallback(async (formValues: RegistrationUserData) => {
    const res = await authService.signin(formValues.email, formValues.password);
    if (res.status === 201) {
      user.dispatch({ type: "SET_USER", payload: { user: res.data.user } });
      props.history.push("/map");
    }
  }, []);
  return (
    <Container className="sign text-white">
      <div className="sign_message">
        Lets sign in and find your favorite tquerias!
      </div>
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
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
            ref={register}
          />
          <Form.Text className="text-muted">
            Don't have an account? Sign up <Link to="signup">here</Link>.
          </Form.Text>
        </Form.Group>
        <Button variant="light" type="submit" className="mt-4 w-100">
          Sign in!
        </Button>
      </Form>
    </Container>
  );
};

export const Signup: React.FC = (props: any) => {
  const { authService } = useContext(Context);
  const { register, handleSubmit } = useForm<RegistrationUserData>();
  const onSubmit = useCallback(async (formValues: RegistrationUserData) => {
    const res = await authService.signup(formValues);
    if (res === 201) {
      props.history.push("/map");
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
        <Button variant="light" type="submit" className="mt-4 w-100">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

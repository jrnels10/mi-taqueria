import React, { Component } from "react";
import { Button, Jumbotron, ButtonGroup, Container } from "react-bootstrap";
import { Link } from 'react-router-dom';
import './Home.scss';
export const Home = () => {
  return <Container className="page_container ">
    <div className='homePage_intro'>
      <h4>Welcome to Mi Taqueria!</h4>
      <p>A place to find that authentic street tacos.</p>
    </div>

    <ButtonGroup aria-label="Basic example" className='signup_buttons'>
      <Link to="/signup">
        <Button variant="light" id='register'> Register</Button>
      </Link>
      <Link to="/signin">
        <Button variant="outline-light" id='signin'>
          Sign In</Button>
      </Link>
    </ButtonGroup>
  </Container>;
};

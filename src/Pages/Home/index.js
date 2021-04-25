import React, { Component } from "react";
import { Button, Jumbotron, ButtonGroup, Container } from "react-bootstrap";
import { Link } from 'react-router-dom';
import tacoImg from './../../Style/Images/taco.png'

import './Home.scss';
export const Home = () => {
  return <Container className="page_container ">
    <div className='homePage_intro'>
      <label className='main_title pacifico'>Mi Taqueria!</label>
      <p className='quickSand'>Lets go eat some tacos!</p>
    </div>

    <ButtonGroup aria-label="Basic example" className='signup_buttons'>
      <Link to="/signup">
        <Button variant="light" id='register'> Register</Button>
      </Link>
      <Link to="/signin">
        <Button id='signin'>
          Sign In</Button>
      </Link>
    </ButtonGroup>
  </Container>;
};

import React, { Component } from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from 'react-router-dom';

export const Home = () => {
  return <Container className="page_container">
    test
    <Button><Link to="/signup">
      Sign Up
    </Link></Button>
  </Container>;
};

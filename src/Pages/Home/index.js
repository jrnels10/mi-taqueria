import React, { useState } from "react";
import { Button, Jumbotron, ButtonGroup, Container, Modal } from "react-bootstrap";
import { InfoCircleFill } from "react-bootstrap-icons";
import { Link } from 'react-router-dom';
import { generateQR } from "../../Utils/tools";
import tacoImg from './../../Style/Images/taco.png'

import './Home.scss';
export const Home = () => {
  const [openModal, setopenModal] = useState(false);
  const [qrUrlCode, setQrUrlCode] = useState();

  const shareModal = async () => {
    setopenModal(!openModal)
    const qrUrl = await generateQR(window.location.pathname)
    setQrUrlCode(qrUrl)
  }
  return <Container className="page_container ">
    <div className='pt-2'>
      <InfoCircleFill size={25} onClick={shareModal} />
    </div>
    <div className='homePage_intro'>
      <label className='main_title pacifico'>Mi Taqueria!</label>
      <p className='quickSand'>Lets go eat some tacos!</p>
    </div>
    {openModal ? <Modal.Dialog className='info_modal'>
      {/* <Modal.Header>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header> */}

      <Modal.Body>
        <img className='w-100' src={qrUrlCode} />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => setopenModal(false)}>Close</Button>
      </Modal.Footer>
    </Modal.Dialog> : null}
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

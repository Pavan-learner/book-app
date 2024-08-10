import { Button, Form, Modal } from 'react-bootstrap';
import React, { useState } from 'react'




const PopUp = ({ show, handleClose   }) => {

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
  
    const handleSubmit = () => {
      // Here you can handle form submission, e.g., send data to an API or log it
      console.log('Name:', name);
      console.log('Phone:', phone);
      handleClose();
    };

  return (
    <>
<Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>User Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  )
}

export default PopUp
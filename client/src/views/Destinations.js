import {React, useState} from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Modal,
  Form
} from "react-bootstrap";

function Destinations() {
  const [modalShow, setModalShow] = useState(false);
  const handleSave = () => {
    
    setModalShow(false);
  }

  return (
    <>
      <Container fluid>
      <ModalForm
        show={modalShow}
        onHide={() => setModalShow(false)}
        onSave={handleSave}
      />
        <Row>
          <Col md="12">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h4">Destinations</Card.Title>
                <p className="card-category">
                </p>
                <Button variant="primary" className="float-right" onClick={() => setModalShow(true)}>New</Button>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th className="border-0">Name</th>
                      <th className="border-0">Created On</th>
                      <th className="border-0">Status</th>
                      <th className="border-0">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border-0">Mongo</td>
                      <td className="border-0">1st Jan 2011</td>
                      <td className="border-0">On</td>
                      <td className="border-0">...</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}


function ModalForm(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Configure MongoDB Connection
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <MyForm />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>Close</Button>
        <Button variant="primary" onClick={props.onSabve}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
}

function MyForm(props) {
  return (
    <Form>
      <Form.Group as={Row} controlId="formHorizontalType">
        <Form.Label column sm={3}>
          Type
        </Form.Label>
        <Col sm={9}>
          <Form.Control as="select" custom>
            <option>MongoDB</option>
            <option>PostgreSQL</option>
          </Form.Control>
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formHorizontalName">
        <Form.Label column sm={3}>
          Name
        </Form.Label>
        <Col sm={9}>
          <Form.Control type="name" placeholder="Name" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formHorizontalHost">
        <Form.Label column sm={3}>
          Host
        </Form.Label>
        <Col sm={9}>
          <Form.Control type="host" placeholder="Host" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formHorizontalUser">
        <Form.Label column sm={3}>
          Username
        </Form.Label>
        <Col sm={9}>
          <Form.Control type="user" placeholder="User" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formHorizontalPassword">
        <Form.Label column sm={3}>
          Password
        </Form.Label>
        <Col sm={9}>
          <Form.Control type="password" placeholder="Password" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formHorizontalDatabase">
        <Form.Label column sm={3}>
          Database
        </Form.Label>
        <Col sm={9}>
          <Form.Control type="database" placeholder="Database" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formHorizontalTable">
        <Form.Label column sm={3}>
        Table
        </Form.Label>
        <Col sm={9}>
          <Form.Control type="table" placeholder="Table" />
        </Col>
      </Form.Group>
      
    </Form>
  );
}




export default Destinations;

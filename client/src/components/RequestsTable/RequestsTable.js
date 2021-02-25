import {React, useState, useEffect } from "react";
import { BackendContext } from "_services/backend.service.js";

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
  Form,
  OverlayTrigger,
  Tooltip
} from "react-bootstrap";

function RequestsTable(props) {
  
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h4">Requests List</Card.Title>
                <p className="card-category"></p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
              <BackendContext.Consumer>
                {backendService => (
                  <TableContents backendService={backendService}/>
                )}
              </BackendContext.Consumer>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}


function TableContents(props) {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    props.backendService.getRequestsList()
    .then(json => setData(json.data))
    .catch((error) => {
      console.error('Error:', error);
    });
  }, []);

  return (     
    <Table className="table-hover">
      <thead>
        <tr>
          <th className="border-0">#</th>
          <th className="border-0">Endpoint</th>
          <th className="border-0">Received On</th>
          <th className="border-0">Body</th>
        </tr>
      </thead>
      <tbody>
        <RenderRows data={data} />
      </tbody>
    </Table>             
  );
}

function RenderRows({data}) {
  if(!data || data.length === 0)
    return <></>;
  
  const Rows = data.map((requestInfo, index) => 
    <tr key={index}>
      <td className="border-0">{index}</td>
      <td className="border-0">{requestInfo.endpoint}</td>
      <td className="border-0">{requestInfo.received}</td>
      <td className="border-0"><BodyWithOverlay body={requestInfo.body} /></td>
    </tr>
   );
  return (
    <>
      {Rows}
    </>
  );
}

function BodyWithOverlay({body}) {
  
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <div><pre>{JSON.stringify(JSON.parse(props.body), null, 2)}</pre></div>
    </Tooltip>
  );

  return (
    <OverlayTrigger
      placement="left"
      delay={{ show: 250, hide: 400 }}
      overlay={(props) => {props.body = body; return renderTooltip(props)}}
    >
      <span>{'{...}'}</span>
    </OverlayTrigger>
  );
}


export default RequestsTable;

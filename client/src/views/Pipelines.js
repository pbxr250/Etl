import {React, useState, useEffect} from "react";
import RequestsTable from "../components/RequestsTable/RequestsTable";
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
  Form
} from "react-bootstrap";
import { Route, Link, useRouteMatch } from "react-router-dom";

import { split as SplitEditor } from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";


function withBackend(WrappedComponent) {
  return function (...props) {
    return  (
      <BackendContext.Consumer>
        {backendService => (
          <WrappedComponent backendService={backendService} {...props}/>
        )}
      </BackendContext.Consumer>
    );
  }
}


function Pipelines(props) {
  const [data, setData] = useState([]);

  let { path, url } = useRouteMatch();
  
  useEffect(() => {
    props.backendService.getPipelines()
    .then(json => setData(json.data))
    .catch((error) => {
      console.error('Error:', error);
    });
  }, []);

  let ends = '';
  if(data && data.length > 0)
    ends = data[0].endpoints.toString();

  const handleAceChange = (newValue) => {

  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h4">Pipelines</Card.Title>
                <p className="card-category">{'Endpoints: ' + ends}</p>
                <Button variant="primary" className="float-right">New</Button>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <TableContents data={data}/>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Route path={`${path}/:pipeName`}>
              <RequestsTable/>
              <SplitEditor
                mode="javascript"
                theme="github"
                splits={2}
                orientation="beside"
                value={["python code", "parsed data"]}
                name="UNIQUE_ID_OF_DIV"
                editorProps={{ $blockScrolling: true }}
              />,
            </Route>
          </Col>
        </Row>
      </Container>
    </>
  );
}


function TableContents(props) {
  

  return (     
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
        <RenderRows data={props.data} />
      </tbody>
    </Table>             
  );
}

function RenderRows({data}) {
  if(!data || data.length === 0)
    return <></>;
  
  let { path, url } = useRouteMatch();

  const Rows = data.map((pipeline, index) => 
    <tr key={index}>
      <td className="border-0">{pipeline.name}</td>
      <td className="border-0">{pipeline.created}</td>
      <td className="border-0">{pipeline.active ? 'On' : 'Off'}</td>
      <td className="border-0"><Link to={`${url}/${pipeline.name}`}>View</Link></td>
    </tr>
   );
  return (
    <>
      {Rows}
    </>
  );
}



export default withBackend(Pipelines);

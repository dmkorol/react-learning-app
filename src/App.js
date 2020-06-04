import React from 'react';
import './App.css';
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import Layout from "./pages/Layout";

function App() {
  return (
      // <Container className="p-3">
      //   <Jumbotron>
      //     <h1 className="header">Welcome To React-Bootstrap1</h1>
      //       <Button>Add</Button>
      //   </Jumbotron>
      // </Container>
      <Layout />
  );
}

export default App;

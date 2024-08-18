import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Messages = ({text,send,sender}) => {
  
  const isSender = send === sender;
  return (
    <Container className="mb-2 ">
<Row className={`mb-2 ${isSender ? 'justify-content-end ml-10' : 'mr-10 justify-content-start'}`}>
  <Col
    xs={10}
    md={7}
    className={`p-3 rounded-pill shadow-sm ${isSender ? 'bg-slate-100' : 'bg-slate-300 text-black'} font-weight-bold`}
    style={{ borderRadius: '25px',  }}
  >
    {text}
  </Col>
</Row>

    </Container>
  )
}

export default Messages
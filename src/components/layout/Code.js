import React, { useState } from 'react'
import { Card, Container } from 'react-bootstrap'
import { FaCheck, FaCopy } from 'react-icons/fa';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { zTouch } from 'react-syntax-highlighter/dist/cjs/styles/prism';


const Code = ({ code }) => {
  const [copy, setCopy] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopy(true);
    setTimeout(() => { setCopy(false) }, 3000);
  }
  return (
    <Container fluid>
      <Card>
        <Card.Header style={{ backgroundColor: "rgba(52,53,65,1)" }}>
          <Card.Title style={{ color: "#fefefe" }}>javascript</Card.Title>
          <div className="card-tools">
            {copy
              ? <button><FaCheck />Copied!</button>
              : <button onClick={handleCopy}><FaCopy /> Copy</button>
            }
          </div>
        </Card.Header>
        <Card.Body className='p-0'>
          <SyntaxHighlighter language='javascript' style={zTouch} showLineNumbers lineProps={{style: {wordBreak: 'break-all', whiteSpace: 'pre-wrap'}}} wrapLines={true}>
            {code}
          </SyntaxHighlighter>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Code
import React from 'react';
import Alert from "react-bootstrap/Alert"

export default function MessageBox(props) {
  return (
    <div id="msg-container">
      <Alert variant={props.variant || 'info'}>{props.children }</Alert>
      </div>
  )
}

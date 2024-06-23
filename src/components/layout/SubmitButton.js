import React from 'react'
import { Button, Spinner } from 'react-bootstrap'

const SubmitButton = (props) => {
  const { loading } = props;
  return (
    <Button type="submit" {...props}>
      {loading
        ? <Spinner animation="border" size="sm" />
        : props.children
      }
    </Button>
  );
}

export default SubmitButton
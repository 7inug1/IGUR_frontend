import styled from 'styled-components';
import { useState } from "react";

const Form = styled.form``;

const Label = styled.label``;

const Input = styled.input`
  font-size: 12px;
`;

const Button = styled.button``;

function InstagramUserInput() {
  const [username, setUsername] = useState();
  const onInputChange = (e) => {
    setUsername(e.target.value);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    console.log(username);
  };

  return (
    <Form onSubmit={onFormSubmit}>
      <Label>
        Instagram Id
        <Input type="input" onChange={onInputChange} />
      </Label>
      <Button type="submit">Search user</Button>
    </Form>
  );
}

export default InstagramUserInput;

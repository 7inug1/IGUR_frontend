import styled from 'styled-components';
import { useState } from "react";
import axios from "axios";

const Form = styled.form``;
const Label = styled.label``;
const Input = styled.input`
  font-size: 12px;
`;
const Button = styled.button``;

function InstagramUserInput({ setInstagramUser }) {
  const [username, setUsername] = useState();
  const onInputChange = (e) => {
    setUsername(e.target.value);
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const instagramUser = await axios.get(`http://localhost:8000/users/${username}`);
      
      setInstagramUser(instagramUser);
    } catch (err) {
      console.error("err: ", err);
    }
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

import styled from 'styled-components';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Form = styled.form`
  padding: 16px 30px;
  border: 1px solid #dbdbdb;
  border-radius: 3px;
  background: #fff;
`;
const Settings = styled.ul``;
const List = styled.li``;
const Slider = styled.input``;
const InputContainer = styled.div``;
const Input = styled.input`
  font-size: 12px;
`;
const Button = styled.button``;

function InstagramUserInput({ setResponse, setIsLoading, numberOfCrawls, setNumberOfCrawls, username, setUsername, setIsPrivateAccount }) {
  const navigate = useNavigate();
  const onInputChange = (e) => {
    e.target.id === "username" && setUsername(e.target.value);
    e.target.id === "slider" && setNumberOfCrawls(Number(e.target.value));
  };

  const onFormSubmit = async (e) => {
    const reportId = Date.now().toString();

    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios({
        headers: {
          'Content-Type': 'application/json'
        },
        method: "post",
        // url: `http://localhost:8000/users/${username}`,
        // url: `https://IGUR-backend-dev.ap-northeast-2.elasticbeanstalk.com/users/${username}`,
        url: `https://igur.link/users/${username}`,
        data: { numberOfCrawls, reportId },
      });

      if (response.status === 204) {
        setIsLoading(false);
        navigate(`/users/${username}/reports/${reportId}`);
      }

      if (response.status === 200) {
        setIsLoading(false);
        navigate(`/users/${username}/reports`);
      }

      if (response.status === 214) {
        setIsLoading(false);
        console.log("Private account");
        setIsPrivateAccount(true);
      }
    } catch (err) {
      console.error("err: ", err);
    }
  };

  return (
    <Form onSubmit={onFormSubmit}>
      <InputContainer className="input01">
        <Input type="text" placeholder='instagram username' id="username" onChange={onInputChange} required />
      </InputContainer>
      <Settings>
        <List>
          <Slider type="range" step="10" min="0" max="50" defaultValue={numberOfCrawls} id="slider" onChange={onInputChange} />
        </List>
      </Settings>
      <Button type="submit" className="button01">Search</Button>
    </Form>
  );
}

export default InstagramUserInput;

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
const List = styled.li`
  position: relative;
`;
const Slider = styled.input``;
const InputContainer = styled.div``;
const Input = styled.input`
  font-size: 12px;
`;
const Button = styled.button``;

function InstagramUserInput({ setResponse, setIsLoading, numberOfCrawls, setNumberOfCrawls, username, setUsername, setIsPrivateAccount, setNotificationCode }) {
  const navigate = useNavigate();
  const onInputChange = (e) => {
    e.target.id === "username" && setUsername(e.target.value);
    e.target.id === "slider" && setNumberOfCrawls(Number(e.target.value));
  };

  const onFormSubmit = async (e) => {
    const reportId = Date.now().toString();

    e.preventDefault();
    setIsLoading(true);

    const url = process.env.REACT_APP_MODE === "development" ? `http://localhost:8080/users/${username}` : `https://igur.link/users/${username}`;
    
    try {
      const response = await axios({
        method: "post",
        url,
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

      if (response.data.notificationCode) {
        setIsLoading(false);
        setNotificationCode(response.data.notificationCode);
      }

      if (response.data.notificationCode) {
        setIsLoading(false);
        setNotificationCode(response.data.notificationCode);
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
        <List className="slider-container">
          <Slider type="range" step="1" min="10" max="20" defaultValue={numberOfCrawls} id="slider" onChange={onInputChange} required />
        </List>
      </Settings>
      <Button type="submit" className="button01">Search</Button>
    </Form>
  );
}

export default InstagramUserInput;

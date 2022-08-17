import styled from 'styled-components';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState, useMemo } from 'react';

const Form = styled.form`
  background: #fff;
  min-width: 125px;
  width: 100%;
  box-sizing: border-box;
  display: inline-block;
`;
const Paragraph = styled.div`
  text-align: center;
  display: inline-block;
  font-size: 30px;
  width: 100%;
  word-wrap: break-word;
  background: #f4f8ff;;
  padding: 30px;
  box-sizing: border-box;
`;
const FirstLine = styled.span`
  display: inline-block;
  margin-bottom: 10px;
`;
const Container = styled.div`
  position: relative;
`;
const EndingText01 = styled.span`
  position: absolute;
  bottom: 0;
  right: 0;
`;
const EndingText02 = styled.span`
  position: absolute;
  bottom: 10px;
  right: 0;
`;
const Settings = styled.div`
  position: relative;
`;
const SliderContainer = styled.div`
  padding-right: 85px;
`;
const Slider = styled.input``;
const InputContainer01 = styled.div`
  padding: 3px 25px 0px 16px;
`;
const InputContainer02 = styled.div`
  position: relative;
  top: 14px;
`;
const Label = styled.label``;
const Input = styled.input`
  border-bottom: 1px solid black !important;
  text-align: center;
  font-size: 30px;
  color: black;
`;
const Button = styled.button`margin-top: 15px`;

function InstagramUserInput({ setNumberOfCrawls, numberOfCrawls, setIsLoading, setNotificationCode }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const onInputChange = (e) => {
    e.target.id === "username" && setUsername(e.target.value);
    e.target.id === "slider" && setNumberOfCrawls(Number(e.target.value));
  }
  const onFormSubmit = async (e) => {
    const reportId = Date.now().toString();
    const url = process.env.REACT_APP_MODE === "development" ? `http://localhost:8080/users/${username}` : `https://igur.link/users/${username}`;
    
    e.preventDefault();
    setIsLoading(true);

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
      <Paragraph>
        <FirstLine>Create an Instagram report with ...</FirstLine>
        <Container>
          <InputContainer01 className="input01">
            <Input type="text" placeholder='username' id="username" onChange={onInputChange} required />
          </InputContainer01>
          <EndingText01>'s</EndingText01>
        </Container>
        <Settings>
          <SliderContainer>
          <InputContainer02 className="input01">
            <Input type="text" value={numberOfCrawls} id="number-of-posts" onChange={onInputChange} required disabled />
          </InputContainer02>
            <Slider type="range" step="1" min="10" max="20" defaultValue={numberOfCrawls} id="slider" onChange={onInputChange} required />
          </SliderContainer>
          <EndingText02>Posts.</EndingText02>
        </Settings>
      </Paragraph>
      <Button type="submit" className="button01" disabled>Make Report! (Thanks for the support during the Stand-Up presentation (July 23, 2022). We're now closing the searching functionality)</Button>
    </Form>
  );
}

export default InstagramUserInput;

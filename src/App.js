import './App.css';
import { useEffect, useState } from "react";
import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import Reports from './components/Reports';
import Report from './components/Report';
import NotificationPage from './components/NotificationPage';
import Home from './components/Home';

const Wrapper = styled.div``;
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 20px;
  height: 100px;
  text-align: center;
`;
const Logo = styled.h1``;
const Footer = styled.div`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: end;
`;

function App() {
  const navigate = useNavigate();
  const [response, setResponse] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [numberOfCrawls, setNumberOfCrawls] = useState(10);
  const [notificationCode, setNotificationCode] = useState(null);
  const onButtonClick = () => {
    if (notificationCode) setNotificationCode(false);
  }
  useEffect(() => {
    if (notificationCode) {
      navigate("/errors");
    }
  }, [navigate, notificationCode]);

  return (
    <>
      <Header>
        <Link to={"/"} onClick={onButtonClick}>
          <Logo className='logo'>
            IGUR
          </Logo>
        </Link>
      </Header>
      { !isLoading &&
        <Wrapper className='main-wrapper'>
          <Routes>
            <Route path="/" element={<Home setNumberOfCrawls={setNumberOfCrawls} numberOfCrawls={numberOfCrawls} setIsLoading={setIsLoading} setNotificationCode={setNotificationCode} />} />
            <Route path="/users/:username/reports/:reportId" element={<Report response={response} setIsLoading={setIsLoading} isLoading={isLoading} />}></Route>
            <Route path="/users/:username/reports" element={<Reports numberOfCrawls={numberOfCrawls} setIsLoading={setIsLoading} />}></Route>
            <Route path="/errors" element={<NotificationPage notificationCode={notificationCode} setNotificationCode={setNotificationCode} />}></Route>
            <Route path="/*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer>
            <ul>
              <li>
                © 2022 IGUR
              </li>
            </ul>
          </Footer>
        </Wrapper>
      }
      {
        isLoading &&
        <NotificationPage notificationCode={"isLoading"} setNotificationCode={setNotificationCode} />
      }
      <div id="modal-portal"></div>
    </>
  );
}

export default App;

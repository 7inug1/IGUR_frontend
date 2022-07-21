import './App.css';
import { useEffect, useState } from "react";
import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import Reports from './components/Reports';
import Report from './components/Report';
import NotificationPage from './components/NotificationPage';
import Leaderboard from './components/Leaderboard';

const Wrapper = styled.div`
  padding: 50px;
  text-align: center;
  min-height: calc(100vh - 200px);
  box-sizing: border-box;
`;
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
  const [username, setUsername] = useState();
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
        <Wrapper>
          <Routes>
            <Route path="/" element={<Leaderboard setNumberOfCrawls={setNumberOfCrawls} numberOfCrawls={numberOfCrawls} setIsLoading={setIsLoading} username={username} setUsername={setUsername} setNotificationCode={setNotificationCode} />} />
            <Route path="/users/:username/reports/:reportId" element={<Report response={response} setIsLoading={setIsLoading} isLoading={isLoading} />}></Route>
            <Route path="/users/:username/reports" element={<Reports response={response} setResponse={setResponse} numberOfCrawls={numberOfCrawls} username={username} setIsLoading={setIsLoading} />}></Route>
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

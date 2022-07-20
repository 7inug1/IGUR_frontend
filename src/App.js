import './App.css';
import { useEffect, useState } from "react";
import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import Reports from './components/Reports';
import Report from './components/Report';
import NotificationPage from './components/NotificationPage';
import InstagramUserInput from './components/InstagramUserInput';
import Leaderboard from './components/Leaderboard';

const Wrapper = styled.div`
  padding: 40px;
  text-align: center;
  min-height: calc(100vh - 62px);
  box-sizing: border-box;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  justify-content:
  padding: 0px 20px;
  height: 60px;
  text-align: center;
`;
const Logo = styled.h1`
  font-size: 45px;
  font-weight: lighter;
`;
const Footer = styled.div``;

function App() {
  const navigate = useNavigate();
  const [response, setResponse] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState();
  const [numberOfCrawls, setNumberOfCrawls] = useState(10);
  const [isPrivateAccount, setIsPrivateAccount] = useState(false);
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
      { (!isLoading && !isPrivateAccount) &&
        <Wrapper>
          <InstagramUserInput setNumberOfCrawls={setNumberOfCrawls} numberOfCrawls={numberOfCrawls} setResponse={setResponse} setIsLoading={setIsLoading} username={username} setUsername={setUsername} setNotificationCode={setNotificationCode} />
          <Routes>
            <Route path="/" element={<Leaderboard />} />
            <Route path="/users/:username/reports/:reportId" element={<Report response={response} setIsLoading={setIsLoading} isLoading={isLoading} />}></Route>
            <Route path="/users/:username/reports" element={<Reports response={response} setResponse={setResponse} numberOfCrawls={numberOfCrawls} username={username} />}></Route>
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
      {/* {(typeof notificationCode === "string") && <NotificationPage notificationMessage={notificationCode} />} */}
    </>
  );
}

export default App;

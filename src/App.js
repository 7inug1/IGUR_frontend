import './App.css';
import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import styled from 'styled-components';
import Home from './components/Home';
import Reports from './components/Reports';
import Report from './components/Report';
import NotificationPage from './components/NotificationPage';

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
  const [response, setResponse] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState();
  const [numberOfCrawls, setNumberOfCrawls] = useState(0);
  const [isPrivateAccount, setIsPrivateAccount] = useState(false);

  return (
    <>
      <Header>
        <Link to={"/"}>
          <Logo className='logo'>
            IGUR
          </Logo>
        </Link>
      </Header>
      { (!isLoading && !isPrivateAccount) &&
        <Wrapper>
          <Routes>
            <Route path="/" element={<Home setIsLoading={setIsLoading} setResponse={setResponse} numberOfCrawls={numberOfCrawls} setNumberOfCrawls={setNumberOfCrawls} username={username} setUsername={setUsername} setIsPrivateAccount={setIsPrivateAccount} />} />
            <Route path="/users/:username/reports/:reportId" element={<Report response={response} setIsLoading={setIsLoading} isLoading={isLoading} />}></Route>
            <Route path="/users/:username/reports" element={<Reports response={response} setResponse={setResponse} numberOfCrawls={numberOfCrawls} username={username} />}></Route>
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
        isPrivateAccount &&
        <Wrapper>
          <NotificationPage notification={"It's a private Account."}  isPrivateAccount={isPrivateAccount} setIsPrivateAccount={setIsPrivateAccount} />
        </Wrapper>
      }
      {
        isLoading &&
        <Wrapper>
          <NotificationPage notification={"Loading"} />
        </Wrapper>
      }
    </>
  );
}

export default App;

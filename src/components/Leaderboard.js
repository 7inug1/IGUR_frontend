import styled from 'styled-components';
import axios from "axios";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import InstagramUserInput from './InstagramUserInput';

const Container = styled.div`
  margin-top: 50px;
  border-radius: 3px;
  background: #fff;
`;
const H2 = styled.h2``;
const LeaderboardLists = styled.ul``;
const ListItem = styled.li`
  background: #fff;
  ${'' /* border: 1px solid rgb(219, 219, 219); */}
  ${'' /* border-radius: 8px; */}
  margin-top: 16px;
  ${'' /* background: #f4f8ff; */}
  border-bottom: 1px solid black;
`;
const ListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 25px;
`;
const Username = styled.h2``;
const Name = styled.h2``;
const Img = styled.img``;
const NumberOfFollowers = styled.div`display: inline-block`;
const NumberOfFollowings = styled.div`display: inline-block`;
const Reports = styled.div`display: inline-block`;
const Notification = styled.p``;
const ImageContainer = styled.div`
  display: inline-block;
`;
const InfoContainer = styled.div`
  display: inline-block;
`;
const ReportContainer = styled.div``;
const url = process.env.REACT_APP_MODE === "development" ? `http://localhost:8080/users` : `https://igur.link/users`;

function Leaderboard({ setNumberOfCrawls, numberOfCrawls, setIsLoading, username, setUsername, setNotificationCode }) {
  const [dbUsers, setDBuser] = useState(null);

  useEffect(() => {
    async function fetchAllUsers() {
      try {
        const response = await axios({
          method: "get",
          url,
        });

        if (response.status === 200) {
          setDBuser(response.data.dbUsers);
        }
      } catch (err) {
        console.log("axios err: ", err);
      }
    }

    fetchAllUsers();
  }, []);

  return (
    <>
      <InstagramUserInput setNumberOfCrawls={setNumberOfCrawls} numberOfCrawls={numberOfCrawls} setIsLoading={setIsLoading} username={username} setUsername={setUsername} setNotificationCode={setNotificationCode} />
      <Container>
        <H2 className='reports-header'>Reports</H2>
        <LeaderboardLists>
          {dbUsers && (dbUsers.length ? dbUsers.map((user, index) => {
            return [
              <ListItem key={index}>
                <Link to={`users/${user.username}/reports`} className="link">
                  <ListContainer>
                    <ImageContainer className='image-container'>
                      <Img src={user.reports[0].profile.profileImgSrc} />
                    </ImageContainer>
                    <InfoContainer>
                      <Username>@{user.username}</Username>
                      <Name>{user.reports[0].profile.name}</Name>
                      <NumberOfFollowers>followers: {user.reports[0].profile.numberOfFollowers}</NumberOfFollowers>
                      <NumberOfFollowings>followings: {user.reports[0].profile.numberOfFollowings}</NumberOfFollowings>
                    </InfoContainer>
                    <ReportContainer>
                      <Reports>{"📊".repeat(user.reports.length)}</Reports>
                    </ReportContainer>
                  </ListContainer>
                </Link>
              </ListItem>
            ]
          }) : <Notification className='notification'>No instagram reports yet 😭</Notification>)}
        </LeaderboardLists>
      </Container>
    </>
  )
}

export default Leaderboard;

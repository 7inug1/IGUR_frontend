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
const LeaderboardLists = styled.ul`
  margin-top: 20px;
`;
const ListItem = styled.li`
  &:first-child {
    border-top: 1px solid black;
  }
  background: #fff;
  border-bottom: 1px solid black;
  padding: 25px;
`;
const ListContainer = styled.div``;
const Username = styled.h2`
`;
const Name = styled.h2`
  margin-top: 20px;
`;
const Img = styled.img``;
const FollowContainer = styled.div``;
const NumberOfFollowers = styled.div`
  margin-top: 20px;
`;
const NumberOfFollowings = styled.div``;
const Label = styled.span`
  margin-right: 10px;
`;
const Value = styled.span`
  font-weight: bolder;
`;
const NumberOfReports = styled.div`
  font-weight: bolder;
`;
const Notification = styled.p``;
const ImageContainer = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
`;
const InfoContainer = styled.div``;
const Wrapper = styled.div``;
const ReportContainer = styled.div`
`;
// FIXME: This line is used in local environment.
// const url = process.env.REACT_APP_MODE === "development" ? `http://localhost:8080/users` : `https://igur.link/users`;
const url = `http://localhost:8080/users`;

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
        <H2 className='report-header'>Reports</H2>
        <LeaderboardLists>
          {dbUsers && (dbUsers.length ? dbUsers.map((user, index) => {
            return [
              <ListItem key={index}>
                <Link to={`users/${user.username}/reports`} className="link">
                  <ListContainer className='list-container'>
                    <ImageContainer className='image-container'>
                      <Img src={user.reports[0].profile.profileImgSrc} />
                    </ImageContainer>
                    <InfoContainer className='info-container'>
                      <Wrapper className='wrapper'>
                        <Username className='username'>@{user.username}</Username>
                        <Name className='name'>{user.reports[0].profile.name}</Name>
                        <FollowContainer className='follow-container'>
                          <NumberOfFollowers>
                          <Label>Followers</Label> 
                          <Value>{user.reports[0].profile.numberOfFollowers}</Value>
                          </NumberOfFollowers>
                          <NumberOfFollowings>
                            <Label>Followings</Label> 
                            <Value>{user.reports[0].profile.numberOfFollowings}</Value>
                          </NumberOfFollowings>
                          </FollowContainer>
                      </Wrapper>
                    </InfoContainer>
                    <ReportContainer className='report-container'>
                      <Wrapper>
                        <NumberOfReports>{user.reports.length < 2 ? `${user.reports.length} report` : `${user.reports.length} reports`}</NumberOfReports>
                      </Wrapper>
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

import styled from 'styled-components';
import axios from "axios";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Container = styled.div`
  margin-top: 40px;
  padding: 16px 30px;
  border-radius: 3px;
  background: #fff;
`;
const H2 = styled.h2`
  font-size: 30px;
`;
const LeaderboardLists = styled.ul``;
const ListItem = styled.li`
  background: #fff;
  border: 1px solid rgb(219, 219, 219);
  border-radius: 8px;
  margin-top: 16px;
`;
const Username = styled.h2``;
const Name = styled.h2``;
const Img = styled.img``;
const NumberOfFollowers = styled.div`display: inline-block`;
const NumberOfFollowings = styled.div`display: inline-block`;
const Reports = styled.div`display: inline-block`;

function Leaderboard({ setIsLoading }) {
  const [response, setResponse] = useState([]);

  useEffect(() => {
    async function fetchAllUsers() {
      try {
          const response = await axios({
          headers: {
            'Content-Type': 'application/json'
          },
          method: "get",
          // url: `http://localhost:8000/users`,
          url: `https://IGUR-backend-dev.ap-northeast-2.elasticbeanstalk.com/users`,
        });

        setResponse(response);
      } catch (err) {
        console.log("err", err);
      }
    }

    fetchAllUsers();
  }, [setIsLoading]);

  return (
    <>
      <Container>
        <H2>Leaderboard</H2>
        <LeaderboardLists>
          {Object.keys(response).length ? response.data.dbUsers.map((user, index) => {
            return [
              <ListItem key={index}>
                <Link to={`users/${user.username}/reports`} className="link">
                  <Username>@{user.username}</Username>
                  <Name>{user.reports[0].profile.name}</Name>
                  <Img src={user.reports[0].profile.profileImgSrc} />
                  <NumberOfFollowers>followers: {user.reports[0].profile.numberOfFollowers}</NumberOfFollowers>
                  <NumberOfFollowings>followings: {user.reports[0].profile.numberOfFollowings}</NumberOfFollowings>
                  <Reports>reports: {user.reports.length}</Reports>
                </Link>
              </ListItem>
            ]
          }) : ""}
        </LeaderboardLists>
      </Container>
    </>
  )
}

export default Leaderboard;

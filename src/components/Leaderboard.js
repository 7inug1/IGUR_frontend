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
const Notification = styled.p``;
const url = process.env.REACT_APP_MODE === "development" ? `http://localhost:8080/users` : `https://igur.link/users`;

function Leaderboard() {
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
      <Container>
        <H2>Leaderboard</H2>
        <LeaderboardLists>
          {dbUsers && (dbUsers.length ? dbUsers.map((user, index) => {
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
          }) : <Notification className='notification'>No instagram reports yet 😭</Notification>)}
        </LeaderboardLists>
      </Container>
    </>
  )
}

export default Leaderboard;

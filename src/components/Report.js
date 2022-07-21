import styled from 'styled-components';
// import Post from "./Post";
// import LocationsGraph from "./LocationsGraph";
import MostLikedPosts from './MostLikedPosts';
import MostCommentedPosts from './MostCommentedPosts';
import CategoriesGraph from "./CategoriesGraph";
import SentimentsGraph from "./SentimentsGraph";
import EntitiesGraph from "./EntitiesGraph";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ReportContainer = styled.div`
  border: 2px solid black;
  padding: 30px 5px;
`;
const ImageContainer = styled.div`text-align: center`;
const Image = styled.img``;
const Profile = styled.div`
  text-align: center;
`;
const Contents = styled.div``;
const Name = styled.h2`
  margin-top: 5px;
`;
const Username = styled.h2`margin-top: 20px`;
const Introduction = styled.p`
  margin-top: 40px;
  ${'' /* text-align: left; */}
`;
const NumericsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  ${'' /* grid-template-columns: repeat(3, 1fr); */}
  margin-top: 40px;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  padding: 20px 0;
`;
const NumberOfPosts = styled.div``;
const NumberOfFollowers = styled.div``;
const NumberOfFollowings = styled.div``;
const Notification = styled.p``;
const Bold = styled.b``;

function Report({ setIsLoading, isLoading, response }) {
  let { username, reportId } = useParams();
  const [dbUser, setDBuser] = useState(null); 

  useEffect(() => {
    async function fetchUser() {
      const url = process.env.REACT_APP_MODE === "development" ? `http://localhost:8080/users/${username}/reports/${reportId}` : `https://igur.link/users/${username}/reports/${reportId}`;

      try {
        const response = await axios({
          method: "get",
          url,
        });

        if (response.status === 200) setDBuser(response.data);
      } catch (err) {
        console.log("err in report: ", err);
      }
    }

    if (!dbUser) fetchUser();
  }, [dbUser, reportId, username]);

  return (
    <ReportContainer>
      <h2 className='report-header report-title'>Report</h2>
      { dbUser ?
        <div>
          <Profile>
            <ImageContainer className='image-container'>
              <Image src={dbUser?.reports[0].profile.profileImgSrc} alt={`${dbUser?.reports[0].profile.profileImgAlt} thumbnail`} />
            </ImageContainer>
            <Username className='username'>@{dbUser?.reports[0].profile.username}</Username>
            <Name className='name'>{dbUser?.reports[0].profile.name}</Name>
            <Introduction>{dbUser?.reports[0].profile.introduction}</Introduction>
            <NumericsContainer>
              <NumberOfPosts><Bold>{dbUser?.reports[0].profile.numberOfPosts}</Bold><span> posts</span></NumberOfPosts>
              <NumberOfFollowers><Bold>{dbUser?.reports[0].profile.numberOfFollowers}</Bold><span> followers</span></NumberOfFollowers>
              <NumberOfFollowings><Bold>{dbUser?.reports[0].profile.numberOfFollowings}</Bold><span> followings</span></NumberOfFollowings>
            </NumericsContainer>
          </Profile>
          <Contents>
            <MostLikedPosts posts={dbUser?.reports[0].contents.posts} />
            <MostCommentedPosts posts={dbUser?.reports[0].contents.posts} />
            <CategoriesGraph posts={dbUser?.reports[0].contents.posts} />
            <EntitiesGraph posts={dbUser?.reports[0].contents.posts} />
            {/* <SentimentsGraph posts={dbUser?.reports[0].contents.posts} /> */}
            {/* <LocationsGraph posts={dbUser?.reports[0].contents}/> */}
          </Contents>
        </div>
        : <Notification className='notification'>Report doesn't exist</Notification>
      }
    </ReportContainer>
  );
}

export default Report;

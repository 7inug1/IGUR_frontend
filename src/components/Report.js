import styled from 'styled-components';
import Post from "./Post";
import LocationsGraph from "./LocationsGraph";
import MostLikedPosts from './MostLikedPosts';
import MostCommentedPosts from './MostCommentedPosts';
import CategoriesGraph from "./CategoriesGraph";
import SentimentsGraph from "./SentimentsGraph";
import EntitiesGraph from "./EntitiesGraph";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Image = styled.img``;
const Profile = styled.div``;
const Contents = styled.div``;
const Name = styled.h2``;
const Username = styled.h2``;
const Introduction = styled.p``;
const NumberOfPosts = styled.div``;
const NumberOfFollowers = styled.div``;
const NumberOfFollowings = styled.div``;

function Report({ setIsLoading, isLoading, response }) {
  let { username, reportId } = useParams();
  const [dbUser, setDBuser] = useState(null); 

  useEffect(() => {
    async function fetchReport() {
      try {
        const response = await axios({
          method: "get",
          url: `https://IGUR-backend-dev.ap-northeast-2.elasticbeanstalk.com/users/${username}/reports/${reportId}`,
        });

        setDBuser(response.data);
      } catch (err) {
        console.log("err in report: ", err);
      }
    }
    if (!dbUser) {
      fetchReport();
    }
  }, [dbUser, reportId, username]);

  return (
    <>
      <h1>Report</h1>
      { dbUser ?
        <div>
          <Profile>
            <Name>{dbUser?.reports[0].profile.name}</Name>
            <Username>{dbUser?.reports[0].profile.username}</Username>
            <Image src={dbUser?.reports[0].profile.profileImgSrc} alt={`${dbUser?.reports[0].profile.profileImgAlt} thumbnail`} />
            <Introduction>{dbUser?.reports[0].profile.introduction}</Introduction>
            <NumberOfPosts><span>numberOfPosts</span>{dbUser?.reports[0].profile.numberOfPosts}</NumberOfPosts>
            <NumberOfFollowers><span>numberOfFollowers</span>{dbUser?.reports[0].profile.numberOfFollowers}</NumberOfFollowers>
            <NumberOfFollowings><span>numberOfFollowings</span>{dbUser?.reports[0].profile.numberOfFollowings}</NumberOfFollowings>
          </Profile>
          <hr></hr>
          <Contents>
            <MostLikedPosts posts={dbUser?.reports[0].contents.posts} />
            <MostCommentedPosts posts={dbUser?.reports[0].contents.posts} />
            <CategoriesGraph posts={dbUser?.reports[0].contents.posts} />
            <EntitiesGraph posts={dbUser?.reports[0].contents.posts} />
            {/* <SentimentsGraph posts={dbUser?.reports[0].contents.posts} /> */}
            {/* <LocationsGraph posts={dbUser?.reports[0].contents}/> */}
          </Contents>
        </div>
        : "report doesn't exist"
      }
    </>
  );
}

export default Report;

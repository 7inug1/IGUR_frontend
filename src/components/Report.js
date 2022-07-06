import styled from 'styled-components';

const Image = styled.img``;
const Profile = styled.div``;
const Contents = styled.div``;

function Report({ instagramUser }) {
  const profile = instagramUser.data.profile;
  const contents = instagramUser.data.contents;

  return (
    <>
      <Profile>
        <h2>{profile.name}</h2>
        <h2>{profile.username}</h2>
        <Image src={profile.profileImgSrc} alt={`${profile.profileImgAlt} thumbnail`} />
        <p>{profile.introduction}</p>
        <div><span>numberOfPosts</span>{profile.numberOfPosts}</div>
        <div><span>numberOfFollowers</span>{profile.numberOfFollowers}</div>
        <div><span>numberOfFollowings</span>{profile.numberOfFollowings}</div>
      </Profile>
      <Contents>
        <ul>
          {contents.posts.map((post, index) => {
            return <li key={index}>
              <div>{post.location}</div>
              <img src={post.imgSrc} alt={post.description} />
              <div>{post.numberOfLikes}</div>
              <div>{post.numberOfReplies}</div>
              <p>{post.description}</p>
              <div>{post.datePosted}</div>
            </li>
          })}
        </ul>
      </Contents>
    </>
  );
}

export default Report;

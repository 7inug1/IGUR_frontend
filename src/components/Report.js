import styled from 'styled-components';

const Image = styled.image``;

function Report({instagramUser}) {
  return (
    <>
      <h2>{instagramUser.data.profile.name}</h2>
      <h2>{instagramUser.data.profile.username}</h2>
      <Image src={instagramUser.data.profile.profileImgSrc} alt={`${instagramUser.data.profile.profileImgAlt} thumbnail`} />
    </>
  );
}

export default Report;

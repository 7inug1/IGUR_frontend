import { useState } from 'react';
import styled from 'styled-components';
import Canvas from './Canvas';

const List = styled.li``;
const Location = styled.div``;
const Image = styled.img`
  width: 100%;
  object-fit: contain;
`;
const NumberOfLikes = styled.div``;
const NumberOfReplies = styled.div``;
const Description = styled.p``;
const DatePosted = styled.div``;

function Post({ location, imgSrc, description, numberOfLikes, numberOfReplies, datePosted, prediction }) {
  const [isClicked, setIsClicked] = useState(false);
  const onImageClick = () => {
    isClicked ? setIsClicked(false) : setIsClicked(true);
  }
  
  return (
    <List>
      <Location>{location}</Location>
      { !isClicked && <Image src={imgSrc} alt={description} onClick={onImageClick} /> }
      { isClicked && <Canvas src={imgSrc} prediction={prediction} setIsClicked={setIsClicked} /> }
      <NumberOfLikes>num of likes {numberOfLikes}</NumberOfLikes>
      <NumberOfReplies>num of replies{numberOfReplies}</NumberOfReplies>
      <Description>{description}</Description>
      <DatePosted>{datePosted}</DatePosted>
    </List>
  );
}

export default Post;

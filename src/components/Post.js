import styled from 'styled-components';

const List = styled.li``;
const Location = styled.div``;
const Image = styled.img``;
const NumberOfLikes = styled.div``;
const NumberOfReplies = styled.div``;
const Description = styled.p``;
const DatePosted = styled.div``;

function Post({ location, imgSrc, description, numberOfLikes, numberOfReplies, datePosted }) {
  return (
    <List>
      <Location>{location}</Location>
      <Image src={imgSrc} alt={description} />
      <NumberOfLikes>{numberOfLikes}</NumberOfLikes>
      <NumberOfReplies>{numberOfReplies}</NumberOfReplies>
      <Description>{description}</Description>
      <DatePosted>{datePosted}</DatePosted>
    </List>
  );
}

export default Post;

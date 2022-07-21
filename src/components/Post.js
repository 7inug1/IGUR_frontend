import { useState } from 'react';
import styled from 'styled-components';
import Canvas from './Canvas';
import Portal from "./Portal";
import Modal from "./Modal";

const List = styled.li``;
const Image = styled.img`
  width: 100%;
  object-fit: contain;
`;
const ImageContainer = styled.div``;

function Post({ location, imgSrc, description, numberOfLikes, numberOfReplies, datePosted, prediction }) {
  const [isClicked, setIsClicked] = useState(false);
  const [onModal, setOnModal] = useState(false);
  const onImageClick = () => {
    isClicked ? setIsClicked(false) : setIsClicked(true);
  }
  const onPostClick = () => {
    document.body.style.overflow = "hidden";
    setOnModal(true);
  }
  return (
    <List>
      <ImageContainer>
        <Image src={imgSrc} alt={description} onClick={onPostClick} />
      </ImageContainer>
      {/* { isClicked && <Canvas src={imgSrc} prediction={prediction} setIsClicked={setIsClicked} /> } */}
      {/* <Location>{location}</Location> */}
      {/* <NumberOfLikes>num of likes {numberOfLikes}</NumberOfLikes> */}
      {/* <NumberOfReplies>num of replies{numberOfReplies}</NumberOfReplies> */}
      {/* <Description>{description}</Description> */}
      {/* <DatePosted>{datePosted}</DatePosted> */}
      { onModal &&
        <Portal>
          <Modal className="modal" setOnModal={setOnModal} location={location} imgSrc={imgSrc} description={description} numberOfLikes={numberOfLikes} numberOfReplies={numberOfReplies} datePosted={datePosted} prediction={prediction} />
        </Portal>
      }
    </List>
  );
}

export default Post;

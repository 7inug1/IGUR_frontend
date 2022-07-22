import { useState } from 'react';
import Portal from "./Portal";
import Canvas from './Canvas';
import styled from "styled-components";

const Location = styled.div`
  color: gray;
  font-size: 14px;
  margin-bottom: 20px;
`;
const Image = styled.img`
  display: block;
  max-width: 100%;
  height: auto;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  margin: 0 auto;
`;
const ImageContainer = styled.div`
  ${'' /* display: block; */}
  max-width: 100%;
  height: auto;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  ${'' /* margin: 0 auto; */}
`;
const NumberOfLikes = styled.div`
  margin-top: 20px;
  font-size: 16px;
`;
const NumberOfReplies = styled.div`
  font-size: 16px;
`;
const DescriptionContainer = styled.div`
  padding: 20px;
  background: #fff;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  font-size: 18px;
  max-height: 300px;
`;
const Description = styled.p`
  overflow-y: scroll;
  max-height: calc(300px - 100px);
  margin-top: 8px;
`;
const DatePosted = styled.div`
  margin-top: 20px;
  color: gray;
  font-size: 14px;
`;
const Dim = styled.div`
`;
const ModalContainer = styled.div``;
const ModalComponent = styled.div``;
const Wrapper = styled.div`
`;
const Bold = styled.b``;

const Modal = ({ setOnModal, location, imgSrc, description, numberOfLikes, numberOfReplies, datePosted, prediction }) => {
  const [isClicked, setIsClicked] = useState(false);
  const onModalClick = (e) => {
    document.body.style.overflow = "visible";
    setOnModal(false);
  }
  const onImageClick = () => {
    isClicked ? setIsClicked(false) : setIsClicked(true);
  }
  return (
    <Portal>
      <ModalContainer className="modal-container">
        <ModalComponent className="modal">
          <Wrapper className="modal-wrapper">
            <ImageContainer>
              {isClicked && <Canvas src={imgSrc} prediction={prediction} setIsClicked={setIsClicked} />}
              {!isClicked && <Image src={imgSrc} alt={description} onClick={onImageClick} />}
            </ImageContainer>
            <DescriptionContainer>
              {location && <Location>{location}</Location>}
              <Description>{description}</Description>
              <NumberOfLikes><Bold>{numberOfLikes}</Bold> likes</NumberOfLikes>
              <NumberOfReplies><Bold>{numberOfReplies}</Bold> replies</NumberOfReplies>
              <DatePosted>{datePosted}</DatePosted>
            </DescriptionContainer>
          </Wrapper>
        </ModalComponent>
        <Dim className="dim" onClick={onModalClick}>
        </Dim>
      </ModalContainer>
    </Portal>
  );
};

export default Modal;

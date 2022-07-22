import { useState } from 'react';
import Portal from "./Portal";
import Canvas from './Canvas';
import styled from "styled-components";
import { addThousandsSeparator } from "../util/util";

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
  margin: 0 auto;
  position: relative;
  background: #000;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
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
const IconContainer = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: red;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #0f121c;
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
            {
              !prediction.length &&
                <ImageContainer>
                  <Image src={imgSrc} alt={description} />
                </ImageContainer>
              }
              {
                prediction.length ? (
                  <ImageContainer className='clickable-image-container'>
                    <IconContainer>
                      <svg aria-label="태그" color="#ffffff" fill="#ffffff" height="12" role="img" viewBox="0 0 24 24" width="12"><path d="M21.334 23H2.666a1 1 0 01-1-1v-1.354a6.279 6.279 0 016.272-6.272h8.124a6.279 6.279 0 016.271 6.271V22a1 1 0 01-1 1zM12 13.269a6 6 0 116-6 6.007 6.007 0 01-6 6z"></path><path d="M21.334 23H2.666a1 1 0 01-1-1v-1.354a6.279 6.279 0 016.272-6.272h8.124a6.279 6.279 0 016.271 6.271V22a1 1 0 01-1 1zM12 13.269a6 6 0 116-6 6.007 6.007 0 01-6 6z"></path></svg>
                    </IconContainer>
                    {isClicked && <Canvas src={imgSrc} prediction={prediction} setIsClicked={setIsClicked} />}
                    {!isClicked && <Image src={imgSrc} alt={description} onClick={onImageClick} />}
                  </ImageContainer>
                ) : ""
              }
            <DescriptionContainer>
              {location && <Location>{location}</Location>}
              <Description>{description}</Description>
              <NumberOfLikes><Bold>{numberOfLikes}</Bold> likes</NumberOfLikes>
              <NumberOfReplies><Bold>{addThousandsSeparator(numberOfReplies)}</Bold> replies</NumberOfReplies>
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

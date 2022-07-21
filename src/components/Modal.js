import Portal from "./Portal";
import styled from "styled-components";

const Location = styled.div`
  color: gray;
`;
const Image = styled.img`
  max-width: 100%;
  height: auto;
`;
const ImageContainer = styled.div`
  width: 100%;
  text-align: center;
  background: #000;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;
const NumberOfLikes = styled.div`
  margin-top: 20px;
`;
const NumberOfReplies = styled.div``;
const DescriptionContainer = styled.div`
  padding: 20px;
  background: #fff;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  font-size: 18px;
`;
const Description = styled.p`
  margin-top: 8px;
`;
const DatePosted = styled.div`
  margin-top: 20px;
  color: gray;
`;
const Dim = styled.div`
`;
const ModalContainer = styled.div``;
const ModalComponent = styled.div``;
const Wrapper = styled.div`
`;
const Bold = styled.b``;

const Modal = ({ setOnModal, location, imgSrc, description, numberOfLikes, numberOfReplies, datePosted, prediction }) => {
  const onModalClick = (e) => {
    e.preventDefault();
    document.body.style.overflow = "visible";
    setOnModal(false);
  }
  return (
    <Portal>
      <ModalContainer className="modal-container">
        <ModalComponent className="modal">
          <Wrapper className="modal-wrapper">
            <ImageContainer>
              <Image src={imgSrc} alt={description} />
            </ImageContainer>
            <DescriptionContainer>
              <Location>{location ? `@${location}` : ""}</Location>
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

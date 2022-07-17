import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 142px);
`;
const Wrapper = styled.div``;
const Message = styled.p``;
const Button = styled.button`
  margin-top: 25px;
`;

function NotificationPage({ notification, isPrivateAccount, setIsPrivateAccount }) {
  const onButtonClick = () => {
    setIsPrivateAccount(false);
  }
  
  return (
    <Container>
      <Wrapper>
        <Message>{notification}</Message>
        { isPrivateAccount && <Button onClick={onButtonClick} className="button01">Back to Home</Button> }
      </Wrapper>
    </Container>
  )
}

export default NotificationPage;

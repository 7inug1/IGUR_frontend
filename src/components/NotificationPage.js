import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 142px);
`;
const Wrapper = styled.div``;
const Message = styled.p`
  margin-bottom: 50px;
  text-align: center;
  font-weight: bolder;
  font-size: 25px;
`;

function NotificationPage({ notificationCode, setNotificationCode }) {
  const onButtonClick = () => {
    setNotificationCode(false);
  }
  const [notificationMessage, setNotificationMessage] = useState(null);
  useEffect(() => {
    if (notificationCode === "privateAccount") {
      setNotificationMessage("It's a private account.");
    }
    if (notificationCode === "noAccount") {
      setNotificationMessage("There's no such account.");
    }
    if (notificationCode === "isLoading") {
      setNotificationMessage("Loading...");
    }
    setNotificationCode(null);
  }, [notificationCode, setNotificationCode]);

  return (
    <Container>
      <Wrapper>
        {((typeof notificationMessage === "string") && notificationMessage !== "Loading...") && <Message>{notificationMessage}</Message>}
        {(notificationMessage === "Loading...")
          &&
          <>
          <Message>loading ...</Message>
          <TailSpin
            color="#000"
            height={100}
            width={100} 
          />
          </>}
        { (notificationCode !== "isLoading") && <Link to={"/"} className="button01" onClick={onButtonClick}>Back to Home</Link> }
      </Wrapper>
    </Container>
  )
}

export default NotificationPage;

import styled from 'styled-components';
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const ReportsContainer = styled.div``;
const Title = styled.h2`
`;
const Username = styled.h2`
  margin-top: 15px;
`;
const ImageContainer = styled.div`
`;
const Image = styled.img``;
const Report = styled.li`
  background: #fff;
  border-bottom: 1px solid black;
  margin-top: 16px;
`;
const DateCreated = styled.div``;
const NumberOfCrawls = styled.div``;
const ProceedButton = styled.button``;
const Notification = styled.p``;

function Reports({ numberOfCrawls, username, setResponse }) {
  const navigate = useNavigate();
  const [dbUser, setDBuser] = useState(null);
  const params = useParams();

  useEffect(() => {
    async function fetchReports() {
      const username = params.username;
      const url = process.env.REACT_APP_MODE === "development" ? `http://localhost:8080/users/${username}/reports` : `https://igur.link/users/${username}/reports`;

      try {
        const response = await axios({
          method: "get",
          url,
        });

        if(response.status === 200) setDBuser(response.data);
      } catch (err) {
        console.log("err in report: ", err);
      }
    }

    fetchReports();
  }, [params.username]);

  const onButtonClick = async () => {
    const reportId = Date.now().toString();
    const url = process.env.REACT_APP_MODE === "development" ? `http://localhost:8080/users/${username}/reports/${reportId}` : `https://igur.link/users/${username}/reports/${reportId}`;

    try {
      const response = await axios({
        method: "post",
        url,
        data: { numberOfCrawls },
      });
      console.log("responseee", response);
      
      if (response.status === 201) {
        navigate(`/users/${username}/reports/${reportId}`);
      }
    } catch (err) {
      console.error("err: ", err);
    }
  }

  return (
    <>
      {dbUser ?
        <ReportsContainer>
          <Title className='report-header report-title'>Reports</Title>
          <ImageContainer className='image-container'>
            <Image src={dbUser.reports[dbUser.reports.length - 1].profile.profileImgSrc} alt={dbUser?.reports[dbUser.reports.length - 1].profile.profileImgAlt} />
          </ImageContainer>
          <Username className='username'>@{dbUser.username}</Username>
          <ul>
            {dbUser.reports.length ? dbUser.reports.map((report, index) => {
              return [
                <Report key={index}>
                  <Link to={`${report.id}`} className="link">
                    <DateCreated>{(new Date(Number(report.id))).toLocaleString()}</DateCreated>
                    <NumberOfCrawls>{report.contents?.posts.length}</NumberOfCrawls>
                  </Link>
                </Report>
              ]
            }) : <Notification className="notification">No reports yet</Notification>}
          </ul>
          {numberOfCrawls
            ?
            <>
              {numberOfCrawls}
              <ProceedButton onClick={onButtonClick}>
                Proceed
              </ProceedButton>
            </>
            :
          ""}
      </ReportsContainer> : <div>User doesn't exist</div>}
    </>
  )
}

export default Reports;

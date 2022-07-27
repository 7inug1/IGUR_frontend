import styled from 'styled-components';
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { addThousandsSeparator } from "../util/util";

const ReportsContainer = styled.div``;
const Title = styled.h2`
`;
const Username = styled.h2`
  margin-top: 15px;
`;
const ListHeader = styled.div`
  margin-top: 40px;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  font-weight: bolder;
  font-size: 25px;
`;
const ImageContainer = styled.div`
`;
const Image = styled.img``;
const ReportsUL = styled.ul``;
const Report = styled.li`
  background: #fff;
  border-bottom: 1px solid black;
  font-size: 20px;
`;
const DateCreated = styled.div``;
const PostIndex = styled.div``;
const NumberOfCrawls = styled.div``;
const ProceedButton = styled.button`
  margin-top: 50px;
`;
const Notification = styled.p``;
function Reports({ numberOfCrawls, username, setResponse, setIsLoading }) {
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

    setIsLoading(true);

    try {
      const response = await axios({
        method: "post",
        url,
        data: { numberOfCrawls },
      });

      if (response.status === 201) {
        setIsLoading(false);
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
          <ListHeader className='reports-list-container list-header'>
            <PostIndex>Report ID</PostIndex>
            <NumberOfCrawls>Number of Posts</NumberOfCrawls>
            <DateCreated>Date Created</DateCreated>
          </ListHeader>
          {dbUser.reports.length ?
            <ReportsUL>
              {dbUser.reports.map((report, index) => {
                return [
                  <Report key={index}>
                    <Link to={`${report.id}`} className="link reports-list-container">
                      <PostIndex>{index + 1}</PostIndex>
                      <NumberOfCrawls>{addThousandsSeparator(report.contents?.posts.length)}</NumberOfCrawls>
                      <DateCreated>{(new Date(Number(report.id))).toLocaleString("en-us", { dateStyle: "short", timeStyle: "short" })}</DateCreated>
                    </Link>
                  </Report>
                ]
              })}
            </ReportsUL> : <Notification className="notification">No reports yet</Notification>}
          {(numberOfCrawls && username)
            ?
            <>
              <ProceedButton className='button01' onClick={onButtonClick}>
                Make me a new report!
              </ProceedButton>
            </>
            :
          ""}
      </ReportsContainer> : <div>User doesn't exist</div>}
    </>
  )
}

export default Reports;

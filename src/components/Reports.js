import styled from 'styled-components';
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const Username = styled.h2``;
const Image = styled.img``;
const Report = styled.li`
  background: #fff;
  border: 1px solid rgb(219, 219, 219);
  border-radius: 8px;
  margin-top: 16px;
`;
const DateCreated = styled.div``;
const NumberOfCrawls = styled.div``;
const ProceedButton = styled.button``;

function Reports({ numberOfCrawls, username, setResponse }) {
  const navigate = useNavigate();
  const [dbUser, setDBuser] = useState(null);
  const params = useParams();

  useEffect(() => {
    async function fetchReports() {
      const username = params.username;

      try {
        const response = await axios({
          method: "get",
          // url: `http://localhost:8000/users/${username}/reports`,
          // url: `https://IGUR-backend-dev.ap-northeast-2.elasticbeanstalk.com/users/${username}/reports`,
          url: `https://igur.link/users/${username}/reports`,
        });

        setDBuser(response.data);
      } catch (err) {
        console.log("err in report: ", err);
      }
    }

    fetchReports();
  }, [params.username]);

  const onButtonClick = async () => {
    const reportId = Date.now().toString();
    try {
      const response = await axios({
        method: "post",
        // url: `http://localhost:8000/users/${username}/reports/${reportId}`,
        // url: `https://IGUR-backend-dev.ap-northeast-2.elasticbeanstalk.com/users/${username}/reports/${reportId}`,
        url: `https://igur.link/users/${username}/reports/${reportId}`,
        data: { numberOfCrawls },
        withCredentials: true,
      });
      console.log("responseee", response);
      
      if (response.status === 206) {
        navigate(`/users/${username}/reports/${reportId}`);
      }
    } catch (err) {
      console.error("err: ", err);
    }
  }

  return (
    <>
      {dbUser ? <>
        <h2>Reports exist</h2>
        <Username>{dbUser.username}</Username>
        <Image src={dbUser.reports[dbUser.reports.length - 1].profile.profileImgSrc} alt={dbUser?.reports[dbUser.reports.length - 1].profile.profileImgAlt} />
        <ul>
          {dbUser.reports.map((report, index) => {
            return [
              <Report key={index}>
                <Link to={`${report.id}`} className="link">
                  <DateCreated>{(new Date(Number(report.id))).toLocaleString()}</DateCreated>
                  <NumberOfCrawls>{report.contents.posts.length}</NumberOfCrawls>
                </Link>
              </Report>
            ]
          })}
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
      </> : <div>User doesn't exist</div>}
    </>
  )
}

export default Reports;

import InstagramUserInput from './InstagramUserInput';
import Leaderboard from './Leaderboard';

function Home({ setResponse, setLoading, numberOfCrawls, setNumberOfCrawls, username, setUsername }) {
  return (
    <>
      <InstagramUserInput setNumberOfCrawls={setNumberOfCrawls} numberOfCrawls={numberOfCrawls} setResponse={setResponse} setLoading={setLoading} username={username} setUsername={setUsername} />
      <Leaderboard />
    </>
  )
}

export default Home;

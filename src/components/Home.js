import InstagramUserInput from './InstagramUserInput';
import Leaderboard from './Leaderboard';

function Home({ setResponse, setIsLoading, numberOfCrawls, setNumberOfCrawls, username, setUsername, setIsPrivateAccount }) {
  return (
    <>
      <InstagramUserInput setNumberOfCrawls={setNumberOfCrawls} numberOfCrawls={numberOfCrawls} setResponse={setResponse} setIsLoading={setIsLoading} username={username} setUsername={setUsername} setIsPrivateAccount={setIsPrivateAccount} />
      <Leaderboard setIsLoading={setIsLoading} />
    </>
  )
}

export default Home;

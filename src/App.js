import './App.css';
import InstagramUserInput from './components/InstagramUserInput';
import Report from './components/Report';
import {
  Routes,
  Route,
  Link
} from "react-router-dom";
import { useState } from "react";

function App() {
  const [instagramUser, setInstagramUser] = useState({});

  return (
    <div className="App">
      <InstagramUserInput setInstagramUser={setInstagramUser} />
      <Link to="/report">보고서로</Link>
      <Routes>
        <Route path="/report" element={<Report instagramUser={instagramUser}></Report>}></Route>
      </Routes>
    </div>
  );

}

export default App;

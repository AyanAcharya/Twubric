import Header from './containers/Header'
import UserListing from './containers/userListing.jsx';
import "./App.css";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";

function App() {
  return (
    <div className='App'>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<UserListing />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

function NotFound() {
  return <div>404 Not Found!</div>;
}

export default App;

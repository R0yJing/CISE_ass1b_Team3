import React from "react";
import {
  Route,
  NavLink,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import Styles from "./components/tablestyle.js";
import Home from "./pages/Home";
import SEPractice from "./pages/SE-Practice";
import SubmitArticle from "./pages/Submit-Article";
import NotFoundPage from "./pages/404";
import AnalystPage from "./pages/AnalystPage";

const App = () => {
  
  return (
    <Router>
      <div>
        <h1>Software Engineering Practice Evidence Repository (SEPER)</h1>
        <ul className="header">
        
          <li>
            <NavLink exact to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/SEPractice">Select the Practice</NavLink>
          </li>
          <li>
            <NavLink to="/SubmitArticle">Submit an Article</NavLink>
          </li>
          <li>
            <NavLink to="/AnalystPage">Analyst Page</NavLink>
          </li>
        </ul>
        <div className="content">
          <Route exact path="/" component={Home} />
          <Route path="/SEPractice" component={SEPractice} />
          <Route path="/SubmitArticle" component={SubmitArticle} />
          <Route path="/AnalystPage" component={AnalystPage} />
        </div>
      </div>
    </Router>
  );
};

export default App;

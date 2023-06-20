import { Routes, Route, Link, Navigate } from "react-router-dom";
import "@fontsource/roboto/400.css"; //default
import "@fontsource/roboto/900.css"; //for top title
import Header from './components/header';
import AnalyticalBrief from './components/analyticalBrief';





export default function App() {

  // default monthrange end to last completed month in 2022


  const isTimeline = false;


  const containerClasses = isTimeline ? "px-6 mx-auto container" : ""

 return (
    <>
      <Header />

      <div className={containerClasses}>

        <Routes>
          <Route path="/">
            <Route index element={<Navigate to="/analytical-brief/tab1" replace />}
            />


            <Route path="/analytical-brief/:segment" element={<AnalyticalBrief />} />

            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>

      </div>
    </>
  );
}


function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
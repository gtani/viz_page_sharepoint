import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter } from "react-router-dom";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import "./i18n";
import { withTranslation } from "react-i18next";

const TranslatedApp = withTranslation()(props => <App />);

const Loading = () => {
  return <div className="h-full bg-red">

    <svg className="spinner" viewBox="0 0 50 50">
      <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
    </svg>

  </div>
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter basename={process.env.PUBLIC_URL}>
      <DndProvider backend={HTML5Backend}>
        <Suspense fallback={<Loading />}>
          <TranslatedApp />
        </Suspense>
      </DndProvider>
    </HashRouter>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

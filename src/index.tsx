import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { Anime, Navbar, Summary, Episodes, Characters, Reviews } from './components';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path = "/" element = { <App /> }></Route>
        <Route path="/animes/:id" element={<AnimeLayouts />}>
          <Route path="/animes/:id" element={<Summary />} />
          <Route path="/animes/:id/episodes" element={<Episodes />} />
          <Route path="/animes/:id/characters" element={<Characters />} />
          <Route path="/animes/:id/reactions" element={<Reviews />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);

function AnimeLayouts() {
  return (
    <>
      
      <Navbar />
      <Anime />
      <Outlet />     

    </>
  );
}

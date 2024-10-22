import React from "react";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import RQSuperHeroesPage from "./components/RQSuperHeroes.page";
import SuperHeroespage from "./components/Super.Heroes.page";
import Home from "./components/Home";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";

// Create a new QueryClient instance
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/super-heroes">Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-super-heroes">RQ Super Heroes</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/super-heroes" element={<SuperHeroespage />} />
            <Route path="/rq-super-heroes" element={<RQSuperHeroesPage />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;

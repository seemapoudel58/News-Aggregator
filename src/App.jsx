import "./App.css";
import NewsApp from "./Components/NewsApp";
import NewsDetail from "./Components/NewsDetail";
import { NewsTable } from "./Components/NewsTable";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="" element={<NewsApp />} />
        <Route path="/news" element={<NewsTable />} />
        <Route path="/news/:articleUrl" element={<NewsDetail />} />

      </Routes>
    </Router>
  );
}

export default App;

import "./css/index.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Footer from "./components/Footer";
import ProjectDetails from "./pages/ProjectDetail";
import Error404 from "./pages/Error404";
import ScrollToTop from "./components/ScrollToTop";
import ProjectsTable from "./components/ProjectsTable";
import AdminGuard from "./components/AdminGuard";
import Login from "./pages/Login";


function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/proyectos" element={<Projects />} />
          <Route path="/proyectos/:id" element={<ProjectDetails />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin/proyectos"
            element={
              <AdminGuard>
                <ProjectsTable />
              </AdminGuard>
            }
          />
          <Route path="*" element={<Error404 />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;

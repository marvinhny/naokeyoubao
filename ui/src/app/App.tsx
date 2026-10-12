import { BrowserRouter, Routes, Route } from "react-router";
import { Home } from "./pages/Home";
import { ProjectPage } from "./pages/ProjectPage";

function Footer() {
  return (
    <p className="mt-6 text-center text-[10px] text-white/80">
      naokeyoubao.com · By Marvin
    </p>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[var(--cookie-monster-blue)] sm:p-[24px]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:slug" element={<ProjectPage />} />
          <Route path="*" element={<ProjectPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

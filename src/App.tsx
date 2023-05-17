import { Button } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavLayout from "./layout/NavLayout";
import AuthPage from "./pages/AuthenticationPage";
import LoginCard from "./components/LoginInCard";
import SignUpCard from "./components/SignUpCard";
import MyProfilePage from "./pages/MyProfilePage";
import BlogPage from "./pages/BlogPage";

function App() {
  return (
    <Router>
      <NavLayout>
        <Routes>
          <Route path="/auth" element={<AuthPage />}>
            <Route path="login" element={<LoginCard />} />
            <Route path="signup" element={<SignUpCard />} />
          </Route>
          <Route path="/my-profile/" element={<MyProfilePage />} />
          <Route path="/blog/:blogId" element={<BlogPage />} />
        </Routes>
      </NavLayout>
    </Router>
  );
}

export default App;

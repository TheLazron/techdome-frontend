import { Button } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavLayout from "./layout/NavLayout";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/AuthenticationPage";
import AuthPage from "./pages/AuthenticationPage";
import LoginCard from "./components/LoginInCard";
import SignUpCard from "./components/SignUpCard";

function App() {
  return (
    <Router>
      <NavLayout>
        <Routes>
          <Route path="/auth" element={<AuthPage />}>
            <Route path="login" element={<LoginCard />} />
            <Route path="signup" element={<SignUpCard />} />
          </Route>
        </Routes>
      </NavLayout>
    </Router>
  );
}

export default App;

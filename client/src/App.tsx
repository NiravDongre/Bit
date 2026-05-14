import LandingPage from "./pages/LandingPage"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { SignUpPage } from "./pages/SignUpPage";
import  { SignInPage } from "./pages/SignInPage"

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route index element={<LandingPage />}/>
      <Route path="/auth/sign-up" element={<SignUpPage/>}/>
      <Route path="/auth/sign-in" element={<SignInPage/>}/>
    </Routes>
    </BrowserRouter>
)
}

export default App

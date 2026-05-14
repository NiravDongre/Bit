import LandingPage from "./pages/LandingPage"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { SingUpPage } from "./pages/SignUpPage"

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route index element={<LandingPage />}/>
      <Route path="/auth/sign-up" element={<SingUpPage/>}/>
    </Routes>
    </BrowserRouter>
)
}

export default App

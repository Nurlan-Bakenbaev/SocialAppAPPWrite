import { Routes, Route } from "react-router-dom";
import "./globals.css";
import SignInForm from "./_auth/forms/SignInForm";
import SignUpForm from "./_auth/forms/SignUpForm";
import { Home } from "./_root/pages";
import RootLayouts from "./_root/RootLayouts";
import AuthLayouts from "./_auth/AuthLayouts";

function App() {
  return (
    <>
      <main className="flex h-screen">
        <Routes>
          {/* public route */}
          <Route element={<AuthLayouts />}>
            <Route path={"/sign-in"} element={<SignInForm />} />
            <Route path={"/sign-up"} element={<SignUpForm />} />
          </Route>
          {/* private route */}
          <Route element={<RootLayouts />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </main>
    </>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import "./globals.css";
import SignInForm from "./_auth/forms/SignInForm";
import SignUpForm from "./_auth/forms/SignUpForm";
import Home from "./_root/pages/Home";
import RootLayouts from "./_root/RootLayouts";
import AuthLayouts from "./_auth/AuthLayouts";
import { Toaster } from "@/components/ui/toaster";
import Explore from "./_root/pages/Explore";
import AllUsers from "./_root/pages/AllUsers";
import CreatePost from "./_root/pages/CreatePost";
import EditPost from "./_root/pages/EditPost";
import PostDetails from "./_root/pages/PostDetails";
import Profile from "./_root/pages/Profile";
import UpdateProfile from "./_root/pages/UpdateProfile";
import MyPosts from "./_root/pages/MyPosts";
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
            <Route path="/explore" element={<Explore />} />
            <Route path="/my-posts" element={<MyPosts />} />
            <Route path="/all-users" element={<AllUsers />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/update-post/:id" element={<EditPost />} />
            <Route path="/posts/:id/*" element={<PostDetails />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/update-profile/:id" element={<UpdateProfile />} />
          </Route>
        </Routes>
        <Toaster />
      </main>
    </>
  );
}

export default App;

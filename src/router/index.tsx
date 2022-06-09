import Home from "pages/Home";
import NotFound from "pages/NotFound";
import User from "pages/User";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/users/:userId" element={<User />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default Router;

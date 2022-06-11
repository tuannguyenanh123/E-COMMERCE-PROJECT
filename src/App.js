import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import Content from "./UI/Layout/Content/Content";
import Footer from "./UI/Layout/Footer/Footer";
import Header from "./UI/Layout/Header/Header";
import NewsLetter from "./UI/Components/NewsLetter/NewsLetter";
import Login from "./UI/Components/Login/Login";
import Register from "./UI/Components/Register/Register";
import NoPage from "./UI/Components/NoPage/NoPage";
import Contact from "./UI/Components/Contact/Contact";
import ListAgency from "./UI/Components/ListAgency/ListAgency";
import SideBar from "./UI/Components/SideBar/SideBar";
import Product from "./UI/Components/Product/Product";
import DetailProduct from "./UI/Components/DetailProduct/DetailProduct";
import AuthPhone from "./UI/Components/AuthPhone/AuthPhone";
import WishList from "./UI/Components/WishList/WishList";
import Cart from "./UI/Components/Cart/Cart";
import Payment from "./UI/Components/Payment/Payment";
import DoneOrder from "./UI/Components/DoneOrder/DoneOrder";

function App() {
  const [position, setPosition] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const handleScroll = () => {
      let moving = window.pageYOffset;
      setVisible(position > moving);
      setPosition(moving);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
  const cls = visible ? "" : "hide";
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer
          style={{
            color: "gray",
          }}
        />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header cls={cls} user={user} />
                <Content />
                <NewsLetter />
                <Footer />
              </>
            }
          />
          <Route
            path="login"
            element={
              <>
                <Header cls={cls} />
                <Login setUser={setUser} />
                <NewsLetter />
                <Footer />
              </>
            }
          />
          <Route
            path="register"
            element={
              <>
                <Header cls={cls} user={user} />
                <Register />
                <NewsLetter />
                <Footer />
              </>
            }
          />
          <Route
            path="contact"
            element={
              <>
                <Header cls={cls} user={user} />
                <SideBar />
                <Contact />
                <NewsLetter />
                <Footer />
              </>
            }
          />
          <Route
            path="listAgency"
            element={
              <>
                <Header cls={cls} user={user} />
                <SideBar />
                <ListAgency />
                <NewsLetter />
                <Footer />
              </>
            }
          />
          <Route
            path="product"
            element={
              <>
                <Header cls={cls} user={user} />
                <SideBar />
                <Product />
                <NewsLetter />
                <Footer />
              </>
            }
          />
          <Route
            path="/product/:productTitle"
            element={
              <>
                <Header cls={cls} user={user} />
                <SideBar />
                <DetailProduct />
                <NewsLetter />
                <Footer />
              </>
            }
          />
          <Route
            path="auth"
            element={
              <>
                <Header cls={cls} user={user} />
                <AuthPhone />
                <Footer />
              </>
            }
          />
          <Route
            path="wishlist"
            element={
              <>
                <Header cls={cls} user={user} />
                <WishList />
                <NewsLetter />
                <Footer />
              </>
            }
          />
          <Route
            path="cart"
            element={
              <>
                <Header cls={cls} user={user} />
                <Cart />
                <NewsLetter />
                <Footer />
              </>
            }
          />
          <Route
            path="payment"
            element={
              <>
                <Header cls={cls} user={user} />
                <SideBar />
                <Payment />
                <NewsLetter />
                <Footer />
              </>
            }
          />
          <Route
            path="order-completed"
            element={
              <>
                <Header cls={cls} user={user} />
                <SideBar />
                <DoneOrder />
                <NewsLetter />
                <Footer />
              </>
            }
          />
          <Route path="*" element={<NoPage />} />
          {/* <Route index element={<Home />} />
          {/* <Login /> */}
          {/* <Register /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import "./App.scss";
import Content from "./UI/Layout/Content/Content";
import Footer from "./UI/Layout/Footer/Footer";
import Header from "./UI/Layout/Header/Header";
import "./UI/Layout/Header/Header";
import NewsLetter from "./UI/Components/NewsLetter/NewsLetter";
import { useEffect, useState } from "react";

function App() {
  const [position, setPosition] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const handleScroll = () => {
      let moving = window.pageYOffset;
      // console.log(moving);
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
      <Header cls={cls} />
      <Content />
      <NewsLetter />
      <Footer />
    </div>
  );
}

export default App;

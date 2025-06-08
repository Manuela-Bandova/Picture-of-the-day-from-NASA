import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import "./App.css";

function App() {
  return React.createElement( Router,null,
    React.createElement(  "nav", { className: "nav" },
      React.createElement(Link, { to: "/", className: "link" }, "Hem"),
      React.createElement(Link, { to: "/detail", className: "link" }, "Fler bilder")
    ),

    React.createElement(Routes, null,
      React.createElement(Route, { path: "/", element: React.createElement(Home) }),
      React.createElement(Route, { path: "/detail", element: React.createElement(Detail)}) )
  );
}

export default App;

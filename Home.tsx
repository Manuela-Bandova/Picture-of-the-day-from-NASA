import React, { useEffect, useState } from "react";
import type { ApodData } from "../types";
import "../App.css";

const APIKEY = "tJ0xZu25hXVm3e6adlbnsyydr6jGiv8AIzKsfsTh";

function Home() {
  const [data, setData] = useState<ApodData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://api.nasa.gov/planetary/apod?api_key=" + APIKEY)
      .then((res) => res.json())
      .then((json) => (json.error ? setError(json.error.message) : setData(json)))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return React.createElement("div",{ className: "container" },
    React.createElement("h1", { className: "title" }, "Dagens Bild"),
    React.createElement("p", { className: "paragraph" },
      'Här är Astronomy Picture of the Day från NASA, tryck på "fler bilder" om du vill se bilderna från den senaste månaden.'
    ),

    loading && React.createElement("p", { className: "message" }, "Laddar..."),
    error && React.createElement("p", { className: "message errorMessage" }, "Fel: " + error),

    data &&(data.media_type === "image" ? React.createElement(  "div",  { className: "content" },  React.createElement("h2", { className: "subTitle" }, data.title),
            React.createElement("div", { className: "imageContainer" },
              React.createElement("img", { src: data.url, alt: data.title, className: "image" })),
            React.createElement("p", { className: "explanation" }, data.explanation)
          ) : React.createElement(   "p",  { className: "message" }, "Innehållet är inte en bild: " + data.media_type ))
  );
}

export default Home;

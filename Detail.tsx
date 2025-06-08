import React, { useEffect, useState } from "react";
import type { ApodData } from "../types";
import "../App.css";

const APIKEY = "tJ0xZu25hXVm3e6adlbnsyydr6jGiv8AIzKsfsTh";

const getDateRange = () => {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - 29);
  const format = (d: Date) => d.toISOString().slice(0, 10);
  return { startDate: format(start), endDate: format(end) };
};

function Detail() {
  const [data, setData] = useState<ApodData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalContent, setModalContent] = useState<ApodData | null>(null);

  useEffect(() => {
    const { startDate, endDate } = getDateRange();
    fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${APIKEY}&start_date=${startDate}&end_date=${endDate}`
    )
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          setError(json.error.message);
        } else {
          setData(json.reverse());
        }
      })
      .catch((e: any) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return React.createElement("div", { className: "container" },

    React.createElement("h1", { className: "title" }, "Senaste 30 dagars bilder"),
    React.createElement("p", null, "Tryck på bilderna för att se mer"),

    loading && React.createElement("p", null, "Laddar bilder..."),
    error && React.createElement("p", { className: "error" }, "Fel: " + error),

    React.createElement( "div",  { className: "grid" },
      data
        .filter((item) => item.media_type === "image")
        .map((item) =>
          React.createElement( "div",
            { key: item.date,  className: "card",  onClick: () => setModalContent(item), title: "Läs mer"  },

            React.createElement("img", { src: item.url, alt: item.title, className: "image"}),
            React.createElement("p", { className: "titleText" }, item.title),

            React.createElement("p", { className: "dateText" }, item.date),

            React.createElement("p",  { className: "explanation" },
              item.explanation.length > 100? item.explanation.substring(0, 100) + "..." : item.explanation
            )
          )
        )
    ),

    React.createElement(Modal, {
      visible: modalContent !== null,
      content: modalContent,
      onClose: () => setModalContent(null)}) );
}

type ModalProps = { visible: boolean; onClose: () => void; content: ApodData | null;};

function Modal({ visible, onClose, content }: ModalProps) {
  if (!visible || !content) return null;

  return React.createElement("div", { className: "modal", onClick: onClose },
    React.createElement("div", { className: "modalContent",  onClick: (e: React.MouseEvent) => e.stopPropagation() },

      React.createElement("h2", null, content.title),

      React.createElement("img", { src: content.url, alt: content.title, className: "modalImage"}),
      React.createElement("p", null, content.date),

      React.createElement("p", null, content.explanation),

      React.createElement( "button", { onClick: onClose, className: "modalButton" },  "Stäng"
      )
    )
  );
}

export default Detail;

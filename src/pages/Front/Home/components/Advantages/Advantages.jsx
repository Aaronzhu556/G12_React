import React from "react";
import "./Advantage.css";

export default function Advantage(props) {
  return (
    <div className="our_advantages_content_text">
      <h4>{props.name}</h4>
      <p>{props.content} </p>
    </div>
  );
}

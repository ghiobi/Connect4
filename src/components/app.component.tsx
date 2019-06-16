import React from "react";
import { Connect4Component } from "./connect4.component";
import style from "../styling";

export const AppComponent = () => {
  return (
    <div className={style.app}>
      <Connect4Component style={{ margin: "auto" }} />
    </div>
  );
};

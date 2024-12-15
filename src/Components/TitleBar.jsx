import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { faMinus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { appWindow, PhysicalSize } from '@tauri-apps/api/window';


appWindow.setMinSize(new PhysicalSize(580, 700));
const TitleBar = () => {
  return (
    <div data-tauri-drag-region className="titlebar pl-3">
      <div className="flex items-center gap-2">
        <img src="/calculator.png" alt="calculator icon" className="w-8 h-8" />
        <h1 className="text-white">Calculator</h1>
      </div>
      <div className="titlebar-right">
        <div
          className="titlebar-button hover:bg-[#7F8080] px-3"
          onClick={() => appWindow.minimize()}
        >
          <FontAwesomeIcon icon={faMinus} className="text-white" />
        </div>
        <div
          className="titlebar-button hover:bg-[#7F8080] px-3"
          onClick={() => appWindow.toggleMaximize()}
        >
          <FontAwesomeIcon icon={faSquare} className="text-white" />
        </div>
        <div
          className="titlebar-button hover:bg-[#7F8080] px-4"
          onClick={() => appWindow.close()}
        >
          <FontAwesomeIcon icon={faXmark} className="text-white" />
        </div>
      </div>
    </div>
  );
};

export default TitleBar;

import React, { useState } from "react";
import TitleBar from "./Components/TitleBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faDeleteLeft,
} from "@fortawesome/free-solid-svg-icons";
import { appWindow } from "@tauri-apps/api/window";

const operations_printer = {
  "+": "+",
  "-": "-",
  "*": "X",
  "/": "\u00f7",
};

const App = () => {
  const [equation, setEquation] = useState("");
  const [currValue, setCurrValue] = useState("0");
  const [oldValue, setOldValue] = useState(null);
  const [currentOperation, setCurrentOperation] = useState(null);
  const [isEquals, setIsEquals] = useState(false);
  const [isOnTop, setIsOnTop] = useState(false);

  document.addEventListener("keydown", function (e) {
    console.log(e.key);
  });

  const handleAlwaysOnTop = () => {
    appWindow.setAlwaysOnTop(isOnTop);
    setIsOnTop(!isOnTop);
  };

  const updateCurrValue = (val) => {
    if (currValue === "0") {
      setCurrValue(val);
    } else if (isEquals === true) {
      setCurrValue(val);
    } else {
      if (currValue.length < 14) {
        const newVal = currValue + val;
        setCurrValue(newVal);
      }
    }
  };

  const handleBackSpace = () => {
    if (currValue.length === 1) {
      setCurrValue("0");
    } else if (currValue !== "0") {
      let newCurrValue = currValue.substring(0, currValue.length - 1);
      setCurrValue(newCurrValue);
    }
  };

  const handleSquare = () => {
    let newCurrValue = parseInt(currValue) * parseInt(currValue);
    console.log(newCurrValue);
    if (`${newCurrValue}`.length > 12) {
      newCurrValue = newCurrValue.toExponential(5);
    }
    setCurrValue(`${newCurrValue}`);
  };

  const handleInvese = () => {
    if (currValue !== "0") {
      let newCurrValue = 1 / parseInt(currValue);
      if (`${newCurrValue}`.length > 12) {
        newCurrValue = newCurrValue.toExponential(5);
      }
      setCurrValue(`${newCurrValue}`);
    }
  };

  const handleSquareRoot = () => {
    let newCurrValue = Math.sqrt(parseInt(currValue));
    if (`${newCurrValue}`.length > 12) {
      newCurrValue = newCurrValue.toExponential(5);
    }
    setCurrValue(`${newCurrValue}`);
  };

  const handlePlusMinus = () => {
    if (currValue !== "0") {
      let newCurrValue = parseFloat(currValue) * -1;
      if (`${newCurrValue}`.length > 12) {
        newCurrValue = newCurrValue.toExponential(5);
      }
      setCurrValue(`${newCurrValue}`);
    }
  };

  const handleOperation = (operation) => {
    let checkOperation;
    if (currentOperation === null) {
      checkOperation = operation;
    } else {
      checkOperation = currentOperation;
    }
    setCurrentOperation(operation);
    switch (checkOperation) {
      case "+":
        if (oldValue === null) {
          setOldValue(currValue);
          setCurrValue("0");
          setEquation(`${currValue} +`);
        } else {
          if (currValue !== "0") {
            const newValue = parseInt(oldValue) + parseInt(currValue);
            setOldValue(newValue);
            setCurrValue("0");
            setEquation(`${newValue} ${operations_printer[operation]}`);
          }
        }
        break;
      case "-":
        if (oldValue === null) {
          setOldValue(currValue);
          setCurrValue("0");
          setEquation(`${currValue} -`);
        } else {
          if (currValue !== "0") {
            const newValue = parseInt(oldValue) - parseInt(currValue);
            setOldValue(newValue);
            setCurrValue("0");
            setEquation(`${newValue} ${operations_printer[operation]}`);
          }
        }
        break;
      case "*":
        if (oldValue === null) {
          setOldValue(currValue);
          setCurrValue("0");
          setEquation(`${currValue} X`);
        } else {
          if (currValue !== "0") {
            const newValue = parseInt(oldValue) * parseInt(currValue);
            setOldValue(newValue);
            setCurrValue("0");
            setEquation(`${newValue} ${operations_printer[operation]}`);
          }
        }
        break;
      case "/":
        if (oldValue === null) {
          setOldValue(currValue);
          setCurrValue("0");
          setEquation(`${currValue} \u00f7`);
        } else {
          if (currValue !== "0") {
            const newValue = parseInt(oldValue) / parseInt(currValue);
            setOldValue(newValue);
            setCurrValue("0");
            setEquation(`${newValue} ${operations_printer[operation]}`);
          }
        }
        break;
      case "%":
        if (oldValue === null) {
          setOldValue(currValue);
          setCurrValue("0");
          setEquation(`${currValue} %`);
        } else {
          if (currValue !== "0") {
            const newValue = parseFloat(oldValue) % parseFloat(currValue);
            setOldValue(newValue);
            setCurrValue("0");
            setEquation(`${newValue} ${operations_printer[operation]}`);
          }
        }
        break;
      default:
        setCurrentOperation(null);
        break;
    }
  };

  const handleEquals = () => {
    if (oldValue === null) {
      setEquation(`${currValue} =`);
    } else {
      if (currValue === "0") {
        setEquation(`${oldValue} =`);
        setCurrValue(`${oldValue}`);
      } else {
        let newValue;
        if (currentOperation === "+") {
          newValue = parseInt(oldValue) + parseInt(currValue);
          setEquation(`${oldValue} + ${currValue} =`);
        } else if (currentOperation === "-") {
          newValue = parseInt(oldValue) - parseInt(currValue);
          setEquation(`${oldValue} - ${currValue} =`);
        } else if (currentOperation === "*") {
          newValue = parseInt(oldValue) * parseInt(currValue);
          setEquation(`${oldValue} x ${currValue} =`);
        } else if (currentOperation === "/") {
          newValue = parseInt(oldValue) / parseInt(currValue);
          setEquation(`${oldValue} \u00f7 ${currValue} =`);
        } else {
          console.log("waiting for new value");
        }
        if (`${newValue}`.length > 12) {
          newValue = newValue.toExponential(5);
        }
        setCurrValue(`${newValue}`);
      }
    }
    setIsEquals(true);
  };

  const clearScreen = () => {
    setEquation("");
    setCurrValue("0");
    setOldValue(null);
    setCurrentOperation(null);
  };

  const handleClick = (e) => {
    // const btn = e.target;
    // const circle = document.createElement("span");
    // const diameter = Math.max(btn.clientWidth, btn.clientHeight);
    // const radius = diameter / 2;

    // circle.style.width = circle.style.height = `${diameter}px`;
    // circle.style.left = `${e.clientX - radius}px`;
    // circle.style.top = `${e.clientY - radius}px`;
    // circle.classList.add("ripple");

    // const ripple = btn.getElementsByClassName("ripple")[0];

    // if (ripple) {
    //   ripple.remove();
    // }
    // btn.appendChild(circle);

    // Handle click functionality

    if (isEquals) {
      clearScreen();
      setIsEquals(false);
    }
    switch (e.target.value) {
      case "1":
        updateCurrValue("1");
        break;
      case "2":
        updateCurrValue("2");
        break;
      case "3":
        updateCurrValue("3");
        break;
      case "4":
        updateCurrValue("4");
        break;
      case "5":
        updateCurrValue("5");
        break;
      case "6":
        updateCurrValue("6");
        break;
      case "7":
        updateCurrValue("7");
        break;
      case "8":
        updateCurrValue("8");
        break;
      case "9":
        updateCurrValue("9");
        break;
      case "0":
        updateCurrValue("0");
        break;
      case "C":
        clearScreen();
        break;
      case "CE":
        setCurrValue("0");
        break;
      case "+":
        if (currValue !== "0") {
          handleOperation("+");
        }
        break;
      case "-":
        if (currValue !== "0") {
          handleOperation("-");
        }
        break;
      case "*":
        if (currValue !== "0") {
          handleOperation("*");
        }
        break;
      case "/":
        if (currValue !== "0") {
          handleOperation("/");
        }
        break;
      case "%":
        if (currValue !== "0") {
          handleOperation("%");
        }
        break;
      case "=":
        handleEquals();
        break;
      default:
        console.log("unvalid");
        break;
    }
  };

  return (
    <div className="">
      <TitleBar />

      <div className="mt-8 view-port bg-slate-900">
        <div className="text-white flex gap-4 p-4 items-center">
          <h4 className="font-semibold text-lg">Standard</h4>
          <FontAwesomeIcon
            icon={faArrowUpRightFromSquare}
            className={`${
              isOnTop ? "" : "bg-slate-700"
            } p-2 hover:bg-gray-700 rounded-lg cursor-pointer`}
            onClick={handleAlwaysOnTop}
          />
        </div>
        <div className="h-24 px-4 py-2">
          <p className="text-right text-gray-600">{equation}</p>
          <p className="text-right text-7xl text-white w-full">
            {currValue.substring(0, 14)}
          </p>
        </div>
        <div className="button-container">
          <button
            className="calc-button dark-button"
            value="%"
            onClick={handleClick}
          >
            %
          </button>
          <button
            className="calc-button dark-button"
            value="CE"
            onClick={handleClick}
          >
            CE
          </button>
          <button
            className="calc-button dark-button"
            value="C"
            onClick={handleClick}
          >
            C
          </button>
          <button className="calc-button dark-button" onClick={handleBackSpace}>
            <FontAwesomeIcon icon={faDeleteLeft} />
          </button>
          <button className="calc-button dark-button" onClick={handleInvese}>
            <sup>1</sup>/<sub>x</sub>
          </button>
          <button className="calc-button dark-button" onClick={handleSquare}>
            x<sup>2</sup>
          </button>
          <button
            className="calc-button dark-button"
            onClick={handleSquareRoot}
          >
            <sup>2</sup>
            <span>&#8730;</span>x
          </button>
          <button
            className="calc-button dark-button"
            onClick={handleClick}
            value="/"
          >
            <span>&#247;</span>
          </button>
          <button
            className="calc-button light-button"
            onClick={handleClick}
            value="7"
          >
            7
          </button>
          <button
            className="calc-button light-button"
            onClick={handleClick}
            value="8"
          >
            8
          </button>
          <button
            className="calc-button light-button"
            onClick={handleClick}
            value="9"
          >
            9
          </button>
          <button
            className="calc-button dark-button"
            onClick={handleClick}
            value="*"
          >
            X
          </button>
          <button
            className="calc-button light-button"
            onClick={handleClick}
            value="4"
          >
            4
          </button>
          <button
            className="calc-button light-button"
            onClick={handleClick}
            value="5"
          >
            5
          </button>
          <button
            className="calc-button light-button"
            onClick={handleClick}
            value="6"
          >
            6
          </button>
          <button
            className="calc-button dark-button"
            onClick={handleClick}
            value="-"
          >
            {" "}
            -
          </button>
          <button
            className="calc-button light-button"
            onClick={handleClick}
            value="1"
          >
            1
          </button>
          <button
            className="calc-button light-button"
            onClick={handleClick}
            value="2"
          >
            2
          </button>
          <button
            className="calc-button light-button"
            onClick={handleClick}
            value="3"
          >
            3
          </button>
          <button
            className="calc-button dark-button"
            value="+"
            onClick={handleClick}
          >
            +
          </button>
          <button
            className="calc-button light-button"
            onClick={handlePlusMinus}
          >
            <sup>+</sup>/<sub>-</sub>
          </button>
          <button
            className="calc-button light-button"
            onClick={handleClick}
            value="0"
          >
            0
          </button>
          <button
            className="calc-button light-button"
            onClick={handleClick}
            value="."
          >
            .
          </button>
          <button
            className="calc-button bg-blue-600 hover:bg-blue-700"
            onClick={handleClick}
            value="="
          >
            {" "}
            =
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;

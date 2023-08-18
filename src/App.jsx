/* eslint-disable no-case-declarations */
import { useReducer } from "react";
import "./App.css";
import { ACTIONS } from "./utils/ActionTypes";
import DigitButton from "./components/DigitButton";
import OperatorButton from "./components/OperatorButton";

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.ADD_OPERAND:
      if (state.currentOperand == "0" && payload == "0") {
        return state;
      }

      if (state?.currentOperand?.includes(".") && payload == ".") {
        return state;
      }

      if (state.overWrite) {
        return {
          ...state,
          currentOperand: payload,
          overWrite: false,
        };
      }

      return {
        ...state,
        currentOperand: (state.currentOperand || "") + payload,
      };

    case ACTIONS.ADD_OPERATOR:
      if (!state.currentOperand) {
        return state;
      }

      if (state.previousOperand) {
        const result = evaluate(
          state.previousOperand,
          state.currentOperand,
          state.operator
        );

        return {
          ...state,
          currentOperand: "0",
          overWrite: true,
          previousOperand: result,
          operator: payload,
        };
      }

      return {
        ...state,
        previousOperand: state.currentOperand,
        currentOperand: "0",
        operator: payload,
        overWrite: true,
      };

    case ACTIONS.EVALUATE:
      if (!state.currentOperand || !state.previousOperand || !state.operator) {
        return state;
      }

      const result = evaluate(
        state.previousOperand,
        state.currentOperand,
        state.operator
      );
      return {
        ...state,
        currentOperand: result.toString(),
        previousOperand: "",
        operator: "",
      };

    case ACTIONS.CLEAR:
      return {
        ...state,
        currentOperand: "0",
        previousOperand: "",
        operator: "",
        overWrite: true,
      };

    case ACTIONS.DELETE:
      if (state.currentOperand.length == 1) {
        return {
          ...state,
          currentOperand: "0",
          overWrite: true,
        };
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };

    default:
      return state;
  }
};

const evaluate = (previousOperand, currentOperand, operator) => {
  const firstNumber = parseFloat(previousOperand);
  const secondNumber = parseFloat(currentOperand);

  switch (operator) {
    case "+":
      return firstNumber + secondNumber;
    case "-":
      return firstNumber - secondNumber;
    case "*":
      return firstNumber * secondNumber;
    case "/":
      return firstNumber / secondNumber;
    default:
      return "";
  }
};

function App() {
  const [{ previousOperand, currentOperand, operator }, dispatch] = useReducer(
    reducer,
    {
      currentOperand: "0",
      overWrite: true,
    }
  );
  return (
    <>
      <h1>Calculator.</h1>
      <div className="calculator">
        <div className="output">
          <div className="previousOperand">
            {previousOperand}
            {operator}
          </div>
          <div className="currentOperand">{currentOperand}</div>
        </div>

        <button
          className="span-2"
          onClick={() => dispatch({ type: ACTIONS.CLEAR })}
        >
          AC
        </button>
        <button onClick={() => dispatch({ type: ACTIONS.DELETE })}>Del</button>
        <OperatorButton operator={"+"} dispatch={dispatch} />

        <DigitButton digit={"9"} dispatch={dispatch} />
        <DigitButton digit={"8"} dispatch={dispatch} />
        <DigitButton digit={"7"} dispatch={dispatch} />
        <OperatorButton operator={"-"} dispatch={dispatch} />

        <DigitButton digit={"6"} dispatch={dispatch} />
        <DigitButton digit={"5"} dispatch={dispatch} />
        <DigitButton digit={"4"} dispatch={dispatch} />
        <OperatorButton operator={"*"} dispatch={dispatch} />

        <DigitButton digit={"3"} dispatch={dispatch} />
        <DigitButton digit={"2"} dispatch={dispatch} />
        <DigitButton digit={"1"} dispatch={dispatch} />
        <OperatorButton operator={"/"} dispatch={dispatch} />

        <DigitButton digit={"0"} dispatch={dispatch} />
        <DigitButton digit={"."} dispatch={dispatch} />
        <button
          onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
          className="span-2"
        >
          =
        </button>
      </div>
    </>
  );
}

export default App;

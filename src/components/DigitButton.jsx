import { ACTIONS } from "../utils/ActionTypes";

/* eslint-disable react/prop-types */
function DigitButton({ digit, dispatch }) {
  return (
    <button
      onClick={() => dispatch({ type: ACTIONS.ADD_OPERAND, payload: digit })}
    >
      {digit}
    </button>
  );
}

export default DigitButton;

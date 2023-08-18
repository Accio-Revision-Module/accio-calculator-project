import { ACTIONS } from "../utils/ActionTypes";

/* eslint-disable react/prop-types */
function OperatorButton({ operator, dispatch }) {
  return (
    <button
      onClick={() =>
        dispatch({ type: ACTIONS.ADD_OPERATOR, payload: operator })
      }
    >
      {operator}
    </button>
  );
}

export default OperatorButton;

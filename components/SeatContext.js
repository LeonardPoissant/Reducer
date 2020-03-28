import React, { createContext, useReducer } from "react";

export const SeatContext = createContext();

const initialState = {
  hasLoaded: false,
  seats: null,
  numofRows: 0,
  seatsPerRow: 0,
  isSelected: null
};

function reducer(state, action) {
  switch (action.type) {
    case "receive-seat-info-from-server":
      return {
        ...state,
        hasLoaded: true,
        seats: action.seats,
        numOfRows: action.numOfRows,
        seatsPerRow: action.seatsPerRow
      };

    case "mark-seat-as-purchased":
      return {
        ...state,
        seats: {
          ...state.seats,
          [action.seatId]: {
            ...state.seats[action.seatId],
            isBooked: true,
            isPurchased: true
          }
        }
      };

    case "seat-selection":
      console.log("ACTION", state);
      return {
        ...state,
        seats: {
          ...state.seats,
          [action.seatId]: {
            ...state.seats[action.seatId],
            isSelected: true
          }
        }
      };
    case "unselect-seat":
      return {
        ...state,
        seats: {
          ...state.seats,
          [action.seatId]: {
            ...state.seats[action.seatId],
            isSelected: false
          }
        }
      };
    default:
      throw new Error(`unrecognized action : ${action.type}`);
  }
}

export const SeatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const receiveSeatInfoFromServer = data => {
    dispatch({
      ...data,
      type: "receive-seat-info-from-server"
    });
  };
  const markSeatAsPurchased = seatId => {
    dispatch({
      type: "mark-seat-as-purchased",
      seatId
    });
  };

  const seatSelection = seatId => {
    dispatch({
      seatId,
      type: "seat-selection"
    });
  };

  const unselectSeat = seatId => {
    console.log("UNSELECT", seatId);
    dispatch({
      seatId,
      type: "unselect-seat"
    });
  };

  return (
    <SeatContext.Provider
      value={{
        state,
        actions: {
          receiveSeatInfoFromServer,
          markSeatAsPurchased,
          seatSelection,
          unselectSeat
        }
      }}
    >
      {children}
    </SeatContext.Provider>
  );
};

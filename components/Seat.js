import React, { useContext } from "react";
import styled from "styled-components";

import Tippy from "@tippy.js/react";

import "tippy.js/dist/tippy.css";

import { BookingContext } from "./BookingContext";

import { SeatContext } from "./SeatContext";

import { getRowName, getSeatNum, encodeSeatId } from "../helpers";

import seatImageSrc from "../assets/seat-available.svg";

const Seat = ({ rowIndex, seatIndex, price, seat }) => {
  const {
    state: { isSelected },
    actions: { seatSelection, unselectSeat }
  } = useContext(SeatContext);

  const rowName = getRowName(rowIndex);
  const seatNum = getSeatNum(seatIndex);
  const seatId = encodeSeatId(rowIndex, seatIndex);

  const greySeat = () => {
    if (seat.isBooked) {
      return { filter: "grayscale(100%)" };
    } else if (seat.isSelected) {
      return { filter: "grayscale(50%)" };
    } else if (!seat.isSelected) {
      console.log("UNSELECT", seat.isSelected);
      return { filter: "none" };
    } else {
      return { filter: "none" };
    }
  };

  return (
    <Tippy content={`Row ${rowName}, Seat ${seatNum}, price ${price}`}>
      <button
        disabled={seat.isBooked}
        onClick={() => {
          seatSelection(seatId);
          if (seat.isSelected) {
            unselectSeat(seatId);
          }
        }}
      >
        <ImgWraper>
          <img src={seatImageSrc} style={greySeat()} position="relative"></img>
          <div
            position="absolute"
            style={
              seat.isPurchased ? { display: "inline" } : { display: "none" }
            }
          >
            XXXXXXXX
          </div>
        </ImgWraper>
      </button>
    </Tippy>
  );
};

const ImgWraper = styled.div`
  position: relative;
`;

export default Seat;

import React, { useContext } from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";

import { SeatContext } from "./SeatContext";
import { BookingContext } from "./BookingContext";

import { getRowName, getSeatNum, encodeSeatId } from "../helpers";
import { range } from "../utils";

import Seat from "./Seat";

const TicketWidget = () => {
  const {
    state: { hasLoaded, seats, seatsPerRow, numOfRows }
  } = useContext(SeatContext);

  if (!hasLoaded) {
    return <CircularProgress />;
  }

  return (
    <Wrapper>
      {range(numOfRows).map(rowIndex => {
        const rowName = getRowName(rowIndex);

        return (
          <Row key={rowIndex}>
            <RowLabel>Row {rowName}</RowLabel>
            {range(seatsPerRow).map(seatIndex => {
              const seatId = `${rowName}-${getSeatNum(seatIndex)}`;

              const seat = seats[seatId];

              return (
                <SeatWrapper key={seatId}>
                  <Seat
                    seat={seat}
                    seatId={seatId}
                    rowIndex={rowIndex}
                    seatIndex={seatIndex}
                    price={seat.price}
                  ></Seat>
                </SeatWrapper>
              );
            })}
          </Row>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: #eee;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 8px;
`;

const Row = styled.div`
  display: flex;
  position: relative;
  &:not(:last-of-type) {
    border-bottom: 1px solid #ddd;
  }
`;

const RowLabel = styled.div`
  font-weight: bold;
`;

const SeatWrapper = styled.div`
  padding: 5px;
`;

export default TicketWidget;

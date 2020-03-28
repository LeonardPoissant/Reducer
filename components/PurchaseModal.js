import React, { useContext, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TextField from "@material-ui/core/TextField";
import TableContainer from "@material-ui/core/TableContainer";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";

import { BookingContext } from "./BookingContext";
import { SeatContext } from "./SeatContext";

import { decodeSeatId } from "../helpers";

const PurchaseModal = () => {
  const {
    state: { price, selectedSeatId, status, error },
    actions: {
      cancelBookingProcess,
      purchaseTicketRequest,
      purchaseTicketFailure,
      purchaseTicketSuccess
    }
  } = useContext(BookingContext);

  const {
    actions: { markSeatAsPurchased }
  } = useContext(SeatContext);
  console.log("isBOOKED", selectedSeatId);

  const [creditCard, setCreditCard] = useState("");
  const [expiration, setExpiration] = useState("");

  const { rowName, seatNum } = decodeSeatId(selectedSeatId);

  return (
    <Dialog onClose={cancelBookingProcess}>
      <TableContainer component={Paper}>
        <form
          onSubmit={ev => {
            ev.preventDefault();
            purchaseTicketRequest();

            fetch("/api/book-seat", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                creditCard,
                expiration,
                seatId: selectedSeatId
              })
            })
              .then(res => res.json())
              .then(json => {
                if (json.success) {
                  purchaseTicketSuccess();
                  markSeatAsPurchased(selectedSeatId);
                } else {
                  purchaseTicketFailure(json.message);
                }
              });
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Row</TableCell>
                <TableCell>Seat</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>{rowName}</TableCell>
                <TableCell>{seatNum}</TableCell>
                <TableCell>${price}</TableCell>
              </TableRow>
            </TableHead>

            <h2>ENTER PAYMENT DETAILS</h2>
            <TableRow>
              <form></form>
              <TableCell>
                <TextField
                  label="Credit Card"
                  type="text"
                  value={creditCard}
                  onChange={ev => setCreditCard(ev.currentTarget.value)}
                ></TextField>
              </TableCell>
              <TableCell>
                <TextField
                  label="Expiration"
                  type="text"
                  value={expiration}
                  onChange={ev => setExpiration(ev.currentTarget.value)}
                ></TextField>
              </TableCell>
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                {...(status === "awaiting-response" ? (
                  <CircularProgress color="black" />
                ) : (
                  "Purchase"
                ))}
              >
                CONFIRM
              </Button>
            </TableRow>
            {error && <div>{error}</div>}
          </Table>
        </form>
      </TableContainer>
    </Dialog>
  );
};

export default PurchaseModal;

import React, { useContext, useEffect } from "react";

import GlobalStyles from "./GlobalStyles";
import TicketWidget from "./TicketWidget";
import { SeatContext } from "./SeatContext";
import { BookingContext } from "./BookingContext";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import PurchaseModal from "./PurchaseModal";

const App = () => {
  const {
    actions: { receiveSeatInfoFromServer }
  } = useContext(SeatContext);
  const {
    state: { status },
    actions: { clearSnackBar }
  } = useContext(BookingContext);

  let startBuying = false;

  useEffect(() => {
    fetch("api/seat-availability")
      .then(res => res.json())
      .then(data => receiveSeatInfoFromServer(data));
  }, []);
  return (
    <>
      <GlobalStyles />
      <TicketWidget />
      <PurchaseModal />

      <Snackbar
        open={status === "success"}
        autoHideDuration={6000}
        onClose={clearSnackBar}
      >
        <MuiAlert>Enjoy the Show!</MuiAlert>
      </Snackbar>

      <button></button>
    </>
  );
};

export default App;

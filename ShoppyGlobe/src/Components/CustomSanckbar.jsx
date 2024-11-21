import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useContext } from "react";
import { GlobalContext } from "../GlobalData";

const CustomSnackbar = () => {
  const { snackbarOpen, setSnackbarOpen, snackbarMessage, setSnackbarMessage } =
    useContext(GlobalContext);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleClose}>
      <MuiAlert
        onClose={handleClose}
        severity="success"
        sx={{ width: "100%" }}
        variant="standard"
        style={{
          border: "2px solid green",
        }}
      >
        {snackbarMessage}
      </MuiAlert>
    </Snackbar>
  );
};

export default CustomSnackbar;

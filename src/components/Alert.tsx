import React from "react";
import MuiAlert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { AlertModel } from "../model/AlertModel";

type Props = {
  alert: AlertModel;
};

export const Alert: React.FC<Props> = ({ alert }) => {
  return (
    <>
      {alert.isDisplay && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <MuiAlert severity={alert.type}>{alert.description}</MuiAlert>
        </Stack>
      )}
    </>
  );
};

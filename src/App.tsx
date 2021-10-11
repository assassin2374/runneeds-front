import React from "react";
import "./App.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const App: React.FC = () => {
  return (
    <>
      <h1>Runneeds</h1>
      <TextField
        label="Size"
        id="outlined-size-small"
        defaultValue="Small"
        variant="outlined"
        size="small"
      />
      <Button variant="contained" color="primary">
        Button
      </Button>
    </>
  );
};

export default App;

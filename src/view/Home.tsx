import * as React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import { Activity } from "../model/Activity";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
// @mui用
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";

const Home: React.FC = () => {
  const initActivitiesList: Activity[] = [];
  const [activitiesList, setActivitiesList] = useState(initActivitiesList);
  const [startTime, setStartTime] = useState<Date | null>(new Date());
  const [goalTime, setGoalTime] = useState<Date | null>(new Date());

  useEffect(() => {
    (async () => {
      const response = await Axios.get<Activity[]>("activity");
      setActivitiesList(response.data);
    })();
  }, [setActivitiesList]);

  return (
    <>
      <h1>Runneeds</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 100, maxWidth: 500 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">開始時刻</TableCell>
              <TableCell align="right">終了時刻</TableCell>
              <TableCell align="right">距離</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activitiesList.map((activity) => {
              return (
                <TableRow
                  key={activity.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">{activity.startTime}</TableCell>
                  <TableCell align="right">{activity.goalTime}</TableCell>
                  <TableCell align="right">{activity.distance}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          renderInput={(props) => {
            return <TextField {...props} />;
          }}
          label="開始時刻"
          value={startTime}
          onChange={(newValue) => {
            setStartTime(newValue);
          }}
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          renderInput={(props) => {
            return <TextField {...props} />;
          }}
          label="終了時刻"
          value={goalTime}
          onChange={(newValue) => {
            setGoalTime(newValue);
          }}
        />
      </LocalizationProvider>
      <TextField
        label="距離"
        id="outlined-size-small"
        defaultValue=""
        variant="outlined"
        size="small"
      />
      <Button variant="contained" color="primary">
        追加
      </Button>
    </>
  );
};

export default Home;

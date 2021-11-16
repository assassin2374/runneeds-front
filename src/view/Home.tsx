import * as React from "react";
import { useEffect, useState } from "react";
//import { useHistory } from "react-router-dom";
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
import { AlertModel, initAlertModel } from "../model/AlertModel";
import { Alert } from "../components/Alert";

import { convertJST, dateToString } from "../utils/Date";

const Home: React.FC = () => {
  const initActivitiesList: Activity[] = [];
  const [activitiesList, setActivitiesList] = useState(initActivitiesList);
  const [startTime, setStartTime] = useState<Date | null>(new Date());
  const [goalTime, setGoalTime] = useState<Date | null>(new Date());
  const [distance, setDistance] = useState<number>();
  const [alertModel, setAlertModel] = useState<AlertModel>(initAlertModel);

  useEffect(() => {
    (async () => {
      const response = await Axios.get<Activity[]>("activity");
      setActivitiesList(response.data);
    })();
  }, [setActivitiesList]);

  const changeDistance = (e: React.ChangeEvent<HTMLInputElement>) => {
    const distance = Number(e.target.value);
    setDistance(distance);
  };

  const getStringFromDate = (date: Date | null): string => {
    if (date == null) {
      return "";
    }
    const jstDate = convertJST(date);
    return dateToString(jstDate);
  };

  const addActivity = async () => {
    if (distance == null) {
      const alert: AlertModel = {
        isDisplay: true,
        type: "error",
        description: "未入力の項目が存在します。",
      };
      setAlertModel(alert);
      return;
    }
    const addActivity: Activity = {
      startTime: startTime,
      goalTime: goalTime,
      distance: distance,
      userId: 1,
    };
    //setActivity(addActivity);
    await Axios.post<Activity>("activity", addActivity);
    const response = await Axios.get<Activity[]>("activity");
    setActivitiesList(response.data);
  };

  const deleteActivity = (activity: Activity | null) => {
    console.warn(activity);
    return;
  };

  return (
    <>
      <h1>Runneeds</h1>
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
        type="number"
        value={distance}
        onChange={changeDistance}
      />
      <Button variant="contained" color="primary" onClick={addActivity}>
        追加
      </Button>
      <Alert alert={alertModel}></Alert>
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
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    cursor: "pointer",
                  }}
                  hover
                >
                  <TableCell align="right">
                    {getStringFromDate(activity.startTime)}
                  </TableCell>
                  <TableCell align="right">
                    {getStringFromDate(activity.goalTime)}
                  </TableCell>
                  <TableCell align="right">{activity.distance}</TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={deleteActivity(activity)}
                  >
                    削除
                  </Button>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Home;

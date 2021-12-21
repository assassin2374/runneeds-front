import * as React from "react";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
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

type ParamTypes = {
  id: string;
};

const Edit: React.FC = () => {
  const history = useHistory();
  const [activity, setActivity] = useState<Activity>();
  const id = parseInt(useParams<ParamTypes>().id);
  const [startTime, setStartTime] = useState<Date | null>(new Date());
  const [goalTime, setGoalTime] = useState<Date | null>(new Date());
  const [distance, setDistance] = useState<number>();
  const [alertModel, setAlertModel] = useState<AlertModel>(initAlertModel);

  useEffect(() => {
    (async () => {
      const response = await Axios.get<Activity>(`activity/${id}`);
      setActivity(response.data);
      if (response.data.startTime && response.data.goalTime) {
        setStartTime(convertJST(response.data.startTime));
        setGoalTime(convertJST(response.data.goalTime));
      }
      setDistance(response.data.distance);
    })();
  }, [id]);

  const changeDistance = (e: React.ChangeEvent<HTMLInputElement>) => {
    const distance = Number(e.target.value);
    setDistance(distance);
  };

  const getStringFromDate = (date: Date | null | undefined): string => {
    if (date == null) {
      return "";
    }
    const jstDate = convertJST(date);
    return dateToString(jstDate);
  };

  const editActivity = async () => {
    if (distance == null) {
      const alert: AlertModel = {
        isDisplay: true,
        type: "error",
        description: "未入力の項目が存在します。",
      };
      setAlertModel(alert);
      return;
    }
    const editActivity: Activity = {
      startTime: startTime,
      goalTime: goalTime,
      distance: distance,
      userId: 1,
    };
    await Axios.put<Activity>(`activity/${id}`, editActivity);
    const response = await Axios.get<Activity>(`activity/${id}`);
    setActivity(response.data);
  };

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
            <TableCell align="right">
              {getStringFromDate(activity?.startTime)}
            </TableCell>
            <TableCell align="right">
              {getStringFromDate(activity?.goalTime)}
            </TableCell>
            <TableCell align="right">{activity?.distance}</TableCell>
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
        type="number"
        value={distance}
        onChange={changeDistance}
      />
      <Button variant="contained" color="primary" onClick={editActivity}>
        編集
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          history.push("/");
        }}
      >
        Home
      </Button>
    </>
  );
};

export default Edit;

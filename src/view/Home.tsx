import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import { Activity, initActivity } from "../model/Activity";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
// @mui用
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const Home: React.FC = () => {
  const initActivitiesList: Activity[] = [];
  const [activitiesList, setActivitiesList] = useState(initActivitiesList);

  useEffect(() => {
    (async () => {
      const response = await Axios.get<Activity[]>("activity");
      console.warn(response.data);
      setActivitiesList(response.data);
    })();
  }, [setActivitiesList]);

  return (
    <>
      <h1>Runneeds</h1>
      <TableContainer component={Paper}>
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
              <TableRow key={activity.id}>
                <TableCell align="right">{activity.startTime}</TableCell>
                <TableCell align="right">{activity.goalTime}</TableCell>
                <TableCell align="right">{activity.distance}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </TableContainer>
      <TextField
        label="開始時刻"
        id="outlined-size-small"
        defaultValue=""
        variant="outlined"
        size="small"
      />
      <TextField
        label="終了時刻"
        id="outlined-size-small"
        defaultValue=""
        variant="outlined"
        size="small"
      />
      <TextField
        label="距離"
        id="outlined-size-small"
        defaultValue=""
        variant="outlined"
        size="small"
      />
      <Button variant="contained" color="primary">
        Button
      </Button>
    </>
  );
};

export default Home;

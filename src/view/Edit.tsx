import * as React from "react";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Axios from "axios";
import { Activity } from "../model/Activity";
import Button from "@mui/material/Button";

type ParamTypes = {
  id: string;
};

const Edit: React.FC = () => {
  const history = useHistory();
  const [activity, setActivitity] = useState<Activity>();
  const id = parseInt(useParams<ParamTypes>().id);

  useEffect(() => {
    (async () => {
      const response = await Axios.get<Activity>(`activity/${id}`);
      setActivitity(response.data);
    })();
  }, [id]);

  return (
    <>
      <p>{activity?.id}</p>
      <p>{activity?.startTime}</p>
      <p>{activity?.goalTime}</p>
      <p>{activity?.distance}</p>
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

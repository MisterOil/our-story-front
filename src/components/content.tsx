import React, { useEffect, useState } from "react";
import { fetchData } from "../services/apiServices";
import { Story } from "../type/type";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const Content: React.FC = () => {
  const [data, setData] = useState<Story[]>([]);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const result = await fetchData("storys");
        setData(result);
        console.log(result)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDataFromApi();
  }, []);

  return (
    <Grid container spacing={2}>
      {data?.map((story) => {
        return (
          <Grid item xs={6} key={story.id} textAlign={"center"} sx={{ mt: 4 }}>
            <h4>{story.title}</h4>
            <img src={story.image_data} alt={story.title} width={'25%'} />
            <p>{story.description}</p>
            <div>{story.update_date}</div>
            <div>{story.create_date}</div>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Content;

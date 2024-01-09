import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Story } from "../type/type";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

const Content: React.FC = () => {
  const { data, status } = useSelector((state: RootState) => state.stories);
  return (
    <>
      {status === "loading" && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh", 
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {status === "failed" && <div>Error fetching data</div>}
      {status === "succeeded" && (
        <Grid container spacing={2}>
          {data.map((story: Story) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={story.id}
              textAlign={"center"}
              sx={{ mt: 4 }}
            >
              <Typography variant="h6" gutterBottom>
                {story.title}
              </Typography>
              <img
                src={story.image_data}
                alt={story.title}
                width={"100%"}
                style={{ maxWidth: "100%" }}
              />
              <Typography variant="body1" paragraph>
                {story.description}
              </Typography>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default Content;

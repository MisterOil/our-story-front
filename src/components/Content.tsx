import {
  Card,
  Typography,
  Grid,
  CardContent,
  CardMedia,
  useMediaQuery,
} from "@mui/material";
import { Story } from "../type/type";
import React from "react";
import theme from "../theme/theme";

interface ContentProps {
  story: Story;
  onImageClick: (data: string) => void;
}
const Content: React.FC<ContentProps> = ({ story, onImageClick }) => {
  const isSmallScreen = useMediaQuery(theme.breakpoints.only("xs"));
  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      key={story.id}
      textAlign={"center"}
      sx={{ my: 4 }}
    >
      <Card
        elevation={8}
        sx={{ m: 4, height: "100%", maxHeight: "100%", overflow: "hidden" }}
      >
        <CardMedia
          sx={{
            maxHeight: !isSmallScreen ? "520px" : "100%",
            overflow: "hidden",
          }}
        >
          <img
            src={story.image_data}
            alt={story.title}
            onClick={() => onImageClick(story.image_data)}
            style={{ width: "100%", padding: "5%" }}
          />
        </CardMedia>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {story.title}
          </Typography>
          <Typography variant="body1" paragraph>
            {story.description}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Content;

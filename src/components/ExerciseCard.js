import React from "react";
import { Link } from "react-router-dom";
import { Button, Stack, Typography } from "@mui/material";

const ExerciseCard = ({ exercise }) => {
  const normalizeImageUrl = (image) => {
    if (image.startsWith("http")) {
      return image; // It's already a full URL
    }
    return `https://exercise.moviebuzz.com.ng${image}`; // Prepend base URL
  };

  console.log("excerises data", exercise);
  return (
    <Link className="exercise-card" to={`/exercise/${exercise.id}`}>
      <img
        src={normalizeImageUrl(exercise?.image)}
        alt={exercise?.name}
        loading="lazy"
      />
      <Stack direction="row">
        <Button
          sx={{
            ml: "21px",
            color: "#fff",
            background: "#ffa9a9",
            fontSize: "14px",
            borderRadius: "20px",
            textTransform: "capitalize",
          }}
        >
          {exercise.bodypart?.name}
        </Button>

        <Button
          sx={{
            ml: "21px",
            color: "#fff",
            background: "#fcc757",
            fontSize: "14px",
            borderRadius: "21px",
            textTransform: "capitalize",
          }}
        >
          {exercise.target?.name}
        </Button>
      </Stack>
      <Typography
        ml="21px"
        color="#808"
        fontWeight="bold"
        mt="11x"
        pb="10px"
        textTransform="capitalize"
        fontSize="22px"
      >
        {exercise.name}
      </Typography>
    </Link>
  );
};

export default ExerciseCard;

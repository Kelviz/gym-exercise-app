import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import { Box, Stack, Typography } from "@mui/material";

import { exerciseOptions, fetchData } from "../utils/fetchData";
import ExerciseCard from "./ExerciseCard";

const Exercises = ({
  exercises,
  setExercises,
  bodyPart,
  setCurrentPage,
  currentPage,
  setTotalPages,
  totalPages,
  search,
}) => {
  const exercisesPerPage = 9;

  useEffect(() => {
    const fetchExercisesData = async () => {
      let exercisesData = [];

      if (search) {
        exercisesData = await fetchData(
          `/exercises/search/?search=${search}&page=${currentPage}`,
          exerciseOptions
        );
      } else if (bodyPart === "all") {
        exercisesData = await fetchData(
          `/exercises/?page=${currentPage}`,
          exerciseOptions
        );
      } else {
        exercisesData = await fetchData(
          `/exercises/?bodyPart=${bodyPart}&page=${currentPage}`,
          exerciseOptions
        );
      }

      console.log("is there a count", exercisesData);

      setExercises(exercisesData.data);
      setTotalPages(exercisesData?.pagination?.total_pages);
    };

    fetchExercisesData();
  }, [bodyPart, currentPage]);

  const paginate = (e, value) => {
    setCurrentPage(value);

    window.scrollTo({ top: 1800, behavior: "smooth" });
  };

  return (
    <Box
      id="exercises"
      sx={{ mt: { lg: "110px" } }}
      mt="58px"
      p="20px"
      alignItems="center"
    >
      <Typography variant="h3" mb="47px" textAlign="center">
        showing Results
      </Typography>

      <Stack
        direction="row"
        sx={{ gap: { lg: "110px", xs: "50px" } }}
        flexWrap="wrap"
        justifyContent="center"
      >
        {exercises.map((exercise, index) => (
          <ExerciseCard key={index} exercise={exercise} />
        ))}
      </Stack>
      <Stack sx={{ mt: { lg: "114px", xs: "70px" } }} alignItems="center">
        {totalPages > 1 && (
          <Pagination
            color="standard"
            shape="rounded"
            defaultPage={1}
            count={totalPages}
            page={currentPage}
            onChange={paginate}
            size="large"
          />
        )}
      </Stack>
    </Box>
  );
};

export default Exercises;

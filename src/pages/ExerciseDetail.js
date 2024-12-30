import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

import {
  exerciseOptions,
  fetchData,
  youtubeOptions,
  fetchYt,
} from "../utils/fetchData";
import Detail from "../components/Detail";
import ExerciseVideos from "../components/ExerciseVideos";
import SimilarExercise from "../components/SimilarExercise";

const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState({});
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
  const [equipmentExercises, setEquipmentExercises] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const fetchExerciseData = async () => {
      const youtubeSearchUrl =
        "https://youtube-search-and-download.p.rapidapi.com";

      const exerciseDetailData = await fetchData(
        `/exercises/${id}/`,
        exerciseOptions
      );

      if (exerciseDetailData.status === "successful") {
        setExerciseDetail(exerciseDetailData.data);
      }

      const exerciseVideosData = await fetchYt(
        `${youtubeSearchUrl}/search?query=${exerciseDetailData?.data?.name} exercise`,
        youtubeOptions
      );

      setExerciseVideos(exerciseVideosData.contents);
      console.log(exerciseVideos);

      const targetMuscleExercisesData = await fetchData(
        `/exercises/?target=${exerciseDetailData?.data?.target?.name}`,
        exerciseOptions
      );

      setTargetMuscleExercises(targetMuscleExercisesData?.data);

      const equipmentExercisesData = await fetchData(
        `/exercises/?equipment=${exerciseDetailData?.data?.equipment?.name}`,
        exerciseOptions
      );

      setEquipmentExercises(equipmentExercisesData.data);
    };

    window.scrollTo({ top: 0, behavior: "smooth" });

    fetchExerciseData();
  }, [id]);

  return (
    <Box>
      <Detail exerciseDetail={exerciseDetail} />
      <ExerciseVideos
        exerciseVideos={exerciseVideos}
        name={exerciseDetail.name}
      />
      <SimilarExercise
        targetMuscleExercises={targetMuscleExercises}
        equipmentExercises={equipmentExercises}
      />
    </Box>
  );
};

export default ExerciseDetail;

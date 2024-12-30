import React, { useEffect, useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";

import { fetchData, exerciseOptions } from "../utils/fetchData";
import HorizontalScrollbar from "./HorizontalScrollbar";

const SearchExercises = ({
  setExercises,
  bodyPart,
  setBodyPart,
  setCurrentPage,
  currentPage,
  setTotalPages,
  setSearch,
  search,
}) => {
  const [bodyParts, setBodyParts] = useState([]);

  useEffect(() => {
    const fetchExercisesData = async () => {
      const bodyPartsData = await fetchData("/body-list/", exerciseOptions);

      setBodyParts([{ name: "all", id: "all" }, ...bodyPartsData.results]);
    };

    fetchExercisesData();
  }, []);

  const handleSearch = async () => {
    if (search) {
      try {
        const exercisesData = await fetchData(
          `/exercises/search/?search=${search}&page=${currentPage}`,
          exerciseOptions
        );
        console.log("searched exercise", exercisesData);

        setExercises(exercisesData.data);
        setTotalPages(exercisesData?.pagination?.total_pages);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    }
    setCurrentPage(1);
    window.scrollTo({ top: 1808, left: 100, behavior: "smooth" });
  };

  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
      <Typography
        fontWeight={700}
        sx={{
          fontSize: { lg: "44px", xs: "30px" },
        }}
        mb="50px"
        textAlign="center"
      >
        Awesome Exercise You <br /> Should Know
      </Typography>
      <Box position="relative" mb="72px">
        <TextField
          sx={{
            input: {
              fontWeight: "700",
              border: "none",
              borderRadius: "4px",
            },
            width: { lg: "800px", xs: "350px" },
            backgroundColor: "afff",
            borderRadius: "40px",
          }}
          height="76px"
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          type="text"
        />
        <Button
          className="search-btn"
          sx={{
            bgcolor: "#ff2625",
            color: "#fff",
            textTransform: "none",
            width: { lg: "175px", xs: "80px" },
            fontSize: { lg: "20px", xs: "14px" },
            height: "56px",
            position: "absolute",
            right: "0",
          }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>

      <Box sx={{ position: "relative", width: "100%", p: "20px" }}>
        <HorizontalScrollbar
          data={bodyParts}
          bodyPart={bodyPart}
          setBodyPart={setBodyPart}
          setSearch={setSearch}
          isBodyParts
          setCurrentPage={setCurrentPage}
        />
      </Box>
    </Stack>
  );
};

export default SearchExercises;

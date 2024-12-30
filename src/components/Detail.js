import React from "react";
import { Typography, Stack, Button } from "@mui/material";

import BodyPartImage from "../assets/icons/body-part.png";
import TargetImage from "../assets/icons/target.png";
import EquipmentImage from "../assets/icons/equipment.png";

const Detail = ({ exerciseDetail }) => {
  const {
    bodypart,
    image,
    name,
    target,
    equipment,
    instructions,
    secondary_muscles,
  } = exerciseDetail;

  const extraDetail = [
    {
      icon: BodyPartImage,
      name: bodypart?.name,
    },
    {
      icon: TargetImage,
      name: target?.name,
    },
    {
      icon: EquipmentImage,
      name: equipment?.name,
    },
  ];

  return (
    <Stack
      gap="60px"
      mt="4rem"
      sx={{ flexDirection: { lg: "row" }, p: "20px", alignItems: "start" }}
    >
      <img src={image} alt={name} loading="lazy" className="detail-image" />

      <Stack sx={{ gap: { lg: "35px", xs: "20px" } }}>
        <Typography variant="h3">{name}</Typography>
        <Typography variant="h4">Instructions</Typography>
        {instructions &&
          instructions.map((item) => (
            <Typography variant="h6">{item}</Typography>
          ))}

        <Typography variant="h6">
          Secondary muscles: [ {secondary_muscles}]
        </Typography>

        {extraDetail.map((item) => (
          <Stack key={item.name} direction="row" gap="24px" alignItems="center">
            <Button
              sx={{
                background: "#fff2db",
                borderRadius: "50%",
                width: "100px",
                height: "100px",
              }}
            >
              <img
                src={item.icon}
                alt={bodypart?.name}
                style={{ width: "50px", height: "50px" }}
              />
            </Button>
            <Typography textTransform="capitalize" variant="h5">
              {item.name}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default Detail;

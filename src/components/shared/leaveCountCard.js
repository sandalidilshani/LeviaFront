import {
  CardContent,
  Stack,
  Typography,
  Card,
  Avatar,
} from "@mui/material";
import React from "react";

export default function Cardhr({
  cardcolor,
  title,
  count,
  cardavatar,
  sx,
}) {
  const defaultStyles = {
    width: 300,
    height: 200,
  };

  return (
    <Card sx={{ ...defaultStyles, ...sx }}>
      <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Stack
          direction="row"
          sx={{ alignItems: "flex-start", justifyContent: "space-between" }}
        >
          <Stack spacing={1}>
            <Typography variant="overline" color="initial">
              {title}
            </Typography>
            <Typography variant="h4" color="initial">
              {count}
            </Typography>
          </Stack>
          <Avatar
            sx={{ backgroundColor: cardcolor, height: "56px", width: "56px" }}
          >
            {cardavatar}
          </Avatar>
        </Stack>
        
      </CardContent>
    </Card>
  );
}
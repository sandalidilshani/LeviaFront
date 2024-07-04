import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { InputBase, Paper, useMediaQuery } from "@mui/material";

const SearchBar = () => {
  const theme = useTheme(); // Define theme first
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    // Perform search logic here
  };

  return (
    <Paper
      elevation={3}
      style={{
        display: "flex",
        alignItems: "center",
        padding: "4px 8px",
        borderRadius: "15px",
        height: "50px",
        width: isSmallScreen ? "100%" : "720px",
      }}
    >
      <SearchIcon style={{ marginRight: "8px" }} />
      <InputBase
        placeholder="enter leave id"
        value={searchTerm}
        onChange={handleSearch}
        style={{ flex: 1 }}
      />
    </Paper>
  );
};

export default SearchBar;

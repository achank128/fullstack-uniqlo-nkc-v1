import React from "react";
import { Star, StarHalf } from "@mui/icons-material";

const RatingStar = ({ rating }) => {
  if (rating > 4.5) {
    return (
      <>
        <Star className="icon" />
        <Star className="icon" />
        <Star className="icon" />
        <Star className="icon" />
        <Star className="icon" />
      </>
    );
  } else {
    return (
      <>
        <Star className="icon" />
        <Star className="icon" />
        <Star className="icon" />
        <Star className="icon" />
        <StarHalf className="icon" />
      </>
    );
  }
};

export default RatingStar;

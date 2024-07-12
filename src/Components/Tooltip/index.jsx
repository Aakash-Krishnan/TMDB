/* eslint-disable react/prop-types */
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

export const ArrowToolTip = styled(({ className, ...props }) => (
  <Tooltip
    arrow
    {...props}
    componentsProps={{
      tooltip: {
        className: className,
        sx: {
          bgcolor: "#0d253f",
          "& .MuiTooltip-arrow": {
            color: "#0d253f",
          },
        },
      },
    }}
  />
))(`
      color: white;
      background-color: #0d253f;
      font-size: 1em;
  `);


export const CyanToolTip = styled(({ className, ...props }) => (
  <Tooltip
    arrow
    {...props}
    componentsProps={{
      tooltip: {
        className: className,
        sx: {
          bgcolor: "#2bbbd1",
          "& .MuiTooltip-arrow": {
            color: "#2bbbd1",
          },
        },
      },
    }}
  />
))(`
        color: white;
        background-color: #2bbbd1;
        font-size: 1em;
    `);

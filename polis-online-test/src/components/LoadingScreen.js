import React, { useEffect } from "react";
import NProgress from "nprogress";
import { Box, LinearProgress } from "@mui/material";
import { styled } from "@mui/system";

const Root = styled("div")(({ theme }) => ({
  alignItems: "center",
  backgroundColor: '#fff',
  display: "flex",
  flexDirection: "column",
  height: "100%",
  justifyContent: "center",
  minHeight: "100%",
  padding: theme.spacing(3),
}));

const LoadingScreen = () => {
  useEffect(() => {
    NProgress.start();

    return () => {
      NProgress.done();
    };
  }, []);

  return (
    <Root>
      <Box sx={{ width: 400 }}>
        <LinearProgress />
      </Box>
    </Root>
  );
};

export default LoadingScreen;
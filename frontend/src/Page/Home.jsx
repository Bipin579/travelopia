import React from "react";
import { Box } from "@chakra-ui/react";
import Submission from "../Components/Submission";
import Navbar from "../Components/Navbar";
const Home = () => {
  return (
    <Box
      direction="column"
      align="center"
      justify="center"
      height="100vh"
      bgImg="url(https://img.freepik.com/free-photo/happy-couple-tourist-hand-pointing-copy-space-with-baggage-going-travel-holidays_74952-2508.jpg?w=1380&t=st=1685170352~exp=1685170952~hmac=244b91cce926310f126258dc6f66eb06d93a61074cf208d14c7a77ee8ab59845)"
      bgPos="center"
      bgSize="cover"
      bgRepeat="no-repeat">
      <Navbar />
      <Box w={"50%"} display={"flex"} alignItems={"left"}>
        <Submission />
      </Box>

    </Box>
  );
};

export default Home;

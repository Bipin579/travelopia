import React from "react";
import { Link } from "react-router-dom";
import {
    Flex,
    Box,
    Spacer,
    Button,
    Image
} from "@chakra-ui/react";
import logo from "../utils/logo.png"
const Navbar = () => {
    return (
        <Flex

            p={1}
            align="center"
            boxShadow="rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"
            backdropFilter="blur(20px)"
            opacity={0.9}
            bg={"rgb(0,0,0,0)"}
        >

            <Box bg={"transparent"} pl={2}>
                <Link to="/">
                    <Image
                        src={logo}
                        h="40px"
                        rounded={"lg"}
                        my="10px"
                        bg={"whiteAlpha.600"}
                    />
                </Link>

            </Box>
            <Spacer />
            <Box>
                <Link to="/">
                    <Button bgGradient="linear(to-r, red.400,pink.400)"
                        id="home"
                        color="white"
                        _hover={{
                            bgGradient: "linear(to-r, red.400,pink.400)",
                            boxShadow: "xl",
                        }} variant={"outline"} fontSize={"lg"} mr={8}>Form</Button>
                </Link>
                <Link to="/dashboard">
                    <Button bgGradient="linear(to-r, red.400,pink.400)"
                        id="dashboard"
                        color="white"
                        _hover={{
                            bgGradient: "linear(to-r, red.400,pink.400)",
                            boxShadow: "xl",
                        }} variant={"outline"} fontSize={"lg"} mr={8}>Dashboard</Button>
                </Link>
            </Box>
        </Flex>
    );
};

export default Navbar;
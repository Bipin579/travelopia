import { Box } from '@chakra-ui/react'
import React from 'react'
import Users from '../Components/Users'
import Navbar from "../Components/Navbar";

const Dashboard = () => {
    return (
        <Box bgColor={"#847AB7"} minH={"100vh"}>
            <Navbar />
            <Users />
        </Box>
    )
}

export default Dashboard
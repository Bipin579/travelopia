import React, { useState } from "react";
import {
    Stack,
    Heading,
    Text,
    Input,
    Button,
    Flex,
    Select,
    useToast,
} from "@chakra-ui/react";
import axios from "axios";

export default function Submission() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [destination, setDestination] = useState("");
    const [travellerCount, setTravellerCount] = useState("");
    const [budgetPerPerson, setBudgetPerPerson] = useState("");
    const [loading, setLoading] = useState(false);
    const toast = useToast()

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission here, you can access the form values from the state variables
        const userData = {
            name: fullName,
            email,
            destination,
            travellerCount,
            budgetPerPerson,
        };
        console.log(userData);
        setLoading(true)
        try {
            let data = await axios.post(
                `${process.env.REACT_APP_API_URL}/submission/post-data`,
                userData
            );
            // console.log(data);
            setLoading(false)
            toast({
                title: 'Data Submitted.',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: "top"
            })
            setFullName("");
            setEmail("");
            setDestination("");
            setTravellerCount("");
            setBudgetPerPerson("");
        } catch (error) {
            console.log(error);
            toast({
                title: 'Something went wrong.',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: "top"
            });
            setLoading(false)
        }
    };
    return (
        <Flex justify="center" align="left" pt={6} left={0}>
            <Stack
                bg="gray.50"
                rounded="xl"
                p={{ base: 2, sm: 4, md: 6 }}
                spacing={{ base: 8 }}
                maxW={{ lg: "lg" }}
            >
                <Stack spacing={2}>
                    <Heading
                        color="gray.800"
                        lineHeight={1.1}
                        fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
                    >
                        Submission Form
                        <Text
                            as="span"
                            bgGradient="linear(to-r, red.400,pink.400)"
                            bgClip="text"
                        >
                            !
                        </Text>
                    </Heading>
                    <Text color="gray.500" fontSize={{ base: "sm", sm: "md" }}>
                        Contact us to plan your next journey!
                    </Text>
                </Stack>
                <form onSubmit={handleSubmit} mt={5} id="form">
                    <Stack spacing={4}>
                        <Input
                            id="name"
                            type="text"
                            isRequired
                            placeholder="Full Name"
                            bg="gray.100"
                            border={0}
                            color="gray.500"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            _placeholder={{
                                color: "gray.500",
                            }}
                        />
                        <Input
                            placeholder="email@gmail.com"
                            type="email"
                            id="email"
                            isRequired
                            bg="gray.100"
                            border={0}
                            color="gray.500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            _placeholder={{
                                color: "gray.500",
                            }}
                        />

                        <Select
                            placeholder="Select a destination"
                            id="destination"
                            required
                            bg="gray.100"
                            border={0}
                            color="gray.500"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                        >
                            <option value="India">India</option>
                            <option value="Africa">Africa</option>
                            <option value="Europe">Europe</option>
                        </Select>
                        <Input
                            placeholder="Number of travellers"
                            type="number"
                            isRequired
                            id="travellers"
                            bg="gray.100"
                            border={0}
                            color="gray.500"
                            value={travellerCount}
                            onChange={(e) => setTravellerCount(e.target.value)}
                            _placeholder={{
                                color: "gray.500",
                            }}
                        />
                        <Input
                            placeholder="Budget per person"
                            type="number"
                            isRequired
                            id="budget"
                            bg="gray.100"
                            border={0}
                            color="gray.500"
                            value={budgetPerPerson}
                            onChange={(e) => setBudgetPerPerson(e.target.value)}
                            _placeholder={{
                                color: "gray.500",
                            }}
                        />
                    </Stack>
                    <Button
                        id="submit"
                        type="submit"
                        fontFamily="heading"
                        mt={8}
                        w="full"
                        bgGradient="linear(to-r, red.400,pink.400)"
                        color="white"
                        _hover={{
                            bgGradient: "linear(to-r, red.400,pink.400)",
                            boxShadow: "xl",
                        }}
                    >
                        {loading ? "Submitting" : "Submit"}
                    </Button>
                </form>
            </Stack>
        </Flex>
    );
}

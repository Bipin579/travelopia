import {
  Box,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";

import axios from "axios";

import { AddIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";

const Users = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);
  const [singleUser, setSingleUser] = useState({});
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(1);

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const getAllUser = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/submission?page=${page}`)
      .then((res) => {
        console.log(res);
        setData(res.data.submissions);
        setTotalPage(res.data.totalPage);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllUser();
  }, [page]);

  const handleModal = (user) => {
    onOpen();
    setSingleUser(user);
  };

  const handleCSV = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/submission/download-csv`, {
        responseType: "blob", // Specify the response type as blob
      })
      .then((response) => {
        // Check if the response is successful
        if (response.status === 200) {
          // Trigger the file download
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const a = document.createElement("a");
          a.href = url;
          a.download = "user_master.csv";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        } else {
          console.error("Error exporting User Master data");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box>
      <Heading textAlign={"center"} color="white" pt={2}>
        All Users Data
      </Heading>
      <Box maxW={"max-content"} m="auto" display={"flex"} p={4} gap={1}>
        <Text color="white" fontSize={"xl"}>
          Click here to get all users csv file ?
        </Text>
        <Button onClick={handleCSV} variant={"link"} color="lightgreen">
          Download CSV
        </Button>
      </Box>
      <TableContainer maxW={"6xl"} margin={"auto"} pt={"6"}>
        <Table variant="striped" colorScheme="twitter" bg="white">
          <Thead
            bgGradient="linear(to-r, red.400,pink.400)"
            borderBottom={"3px solid grey"}
            _hover={{
              bgGradient: "linear(to-r, red.400,pink.400)",
              boxShadow: "xl",
            }}
          >
            <Tr>
              <Th color="white" textAlign={"center"}>
                Id
              </Th>
              <Th color="white" textAlign={"center"}>
                Name
              </Th>
              <Th color="white" textAlign={"center"}>
                Email
              </Th>
              <Th color="white" textAlign={"center"}>
                Destination
              </Th>
              <Th color="white" textAlign={"center"}>
                TravellerCount
              </Th>
              <Th color="white" textAlign={"center"}>
                BudgetPerPerson
              </Th>
              <Th color="white" textAlign={"center"}>
                UserDetail
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.length > 0 &&
              data.map((el, i) => {
                return (
                  <Tr key={i}>
                    <Td textAlign={"center"}>{el._id.slice(-5) + "..."}</Td>
                    <Td textAlign={"center"}>{el.name}</Td>
                    <Td textAlign={"center"}>{el.email}</Td>
                    <Td textAlign={"center"}>{el.destination}</Td>
                    <Td textAlign={"center"}>{el.travellerCount}</Td>
                    <Td textAlign={"center"}>{"$ " + el.budgetPerPerson}</Td>
                    <Td
                      textAlign={"center"}
                      cursor="pointer"
                      onClick={() => handleModal(el)}
                    >
                      {" "}
                      <AddIcon />
                    </Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
        <Box display={"flex"} gap={"2"} w="max-content" m={"auto"} p="2">
          <Button
            isDisabled={page === 0}
            onClick={() => setPage((prev) => prev - 1)}
            bgGradient="linear(to-r, red.400,pink.400)"
            color="white"
            _hover={{
              bgGradient: "linear(to-r, red.400,pink.400)",
              boxShadow: "xl",
            }}
            variant={"outline"}
            fontSize={"lg"}
          >
            Prev
          </Button>
          <Button
            isDisabled={page === +totalPage - 1}
            onClick={() => setPage((prev) => prev + 1)}
            bgGradient="linear(to-r, red.400,pink.400)"
            color="white"
            _hover={{
              bgGradient: "linear(to-r, red.400,pink.400)",
              boxShadow: "xl",
            }}
            variant={"outline"}
            fontSize={"lg"}
            p="2"
          >
            Next
          </Button>
        </Box>
      </TableContainer>
      <Modal
        size={"xs"}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            bgGradient="linear(to-r, red.400,pink.400)"
            color="white"
          >
            User Detail
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} bgColor={"twitter.50"}>
            <Stack spacing={4}>
              <Text fontWeight="bold">
                Name: <Text as="span">{singleUser.name}</Text>
              </Text>
              <Text fontWeight="bold">
                Email: <Text as="span">{singleUser.email}</Text>
              </Text>
              <Text fontWeight="bold">
                Destination: <Text as="span">{singleUser.destination}</Text>
              </Text>
              <Text fontWeight="bold">
                Traveler Count:{" "}
                <Text as="span">{singleUser.travellerCount}</Text>
              </Text>
              <Text fontWeight="bold">
                Budget Per Person:{" "}
                <Text as="span">{"$ " + singleUser.budgetPerPerson}</Text>
              </Text>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Users;

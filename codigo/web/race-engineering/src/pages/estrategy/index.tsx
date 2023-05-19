// import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// Here we have used react-icons package for the icons
import { GoChevronRight } from "react-icons/go";
import { MdOutlineContentCopy } from "react-icons/md";

import { AuthProvider } from "@/context/AuthContext";
import Signup from "@/pages/form";
// import "@/styles/header.css";
import Timer from "@/pages/timer";
import api from "@/services/api";
import { dataToSelectOptions } from "@/shared/utils/dataToSelectOptions";
import { CheckCircleIcon } from "@chakra-ui/icons";
// import { format } from "date-fns"; // importe a função format
import {
  Box,
  Button,
  Center,
  chakra,
  ChakraProvider,
  Container,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Icon,
  Input,
  Link,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Square,
  Stack,
  Tab,
  Table,
  TableCaption,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";

import type { AppProps } from "next/app";
type Race = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  totalLaps: number;
};

export default function App({ Component, pageProps }: AppProps) {
  const [races, setRaces] = useState([]);
  const [laps, setLaps] = useState([]);
  const [selectedRace, setSelectedRace] = useState({});
  const [selectedIdRace, setSelectedIdRace] = useState("");
  const [maxLap, setMaxLap] = useState(0);
  const { register, handleSubmit } = useForm<FormData>(); //nem vai precisar eu acho

  useEffect(() => {
    (async () => {
      const { data } = await api.get("/races");
      console.log(data);
      setRaces(data);
    })();

    return () => {};
  }, []);

  const handleMaxLap = (event: any) => {
    setMaxLap(event.target.value);
  };

  const onSelectedRace = (id: any) => {
    const currentRace = races.filter((race) => race.id == id)[0];
    console.log(currentRace, id);
    setSelectedRace(currentRace);
  };

  const fetchLaps = (raceId: number) => {
    const fetchData = async () => {
      const { data } = await api.get(`/laps/race/${raceId}`);
      console.log(data);
      setLaps(data);
    };

    fetchData();
  };

  return (
    <Box
      height="100vh"
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box w="2vw" className="sidebar-container">
        <Sidebar />
      </Box>

      <ChakraProvider>
        <Container maxW="6xl" px={{ base: 6, md: 3 }} py={14}>
          <Stack
            direction={{ base: "column", md: "row" }}
            spacing={2}
            justifyContent="center"
          >
            <Stack
              direction="column"
              spacing={6}
              justifyContent="center"
              mb={{ base: 3, md: 0 }}
            >
              <Box>
                <chakra.h1
                  fontSize="5xl"
                  lineHeight={1}
                  fontWeight="bold"
                  textAlign="left"
                >
                  Defina a Estratégida <br />
                  <chakra.span color="teal"> da Corrida</chakra.span>
                </chakra.h1>
              </Box>

              <HStack spacing={{ base: 0, sm: 2 }} flexWrap="wrap">
                <FormControl variant="floating" id="first-name">
                  <FormLabel>Número de voltas máxima</FormLabel>
                  <Input
                    onChange={handleMaxLap}
                    value={maxLap}
                    placeholder="Digite o número de voltas máxima"
                  />
                </FormControl>
              </HStack>

              <Box w="100%" marginY="4">
                <FormControl variant="floating" id="first-name">
                  <FormLabel>Corrida para a estratégia</FormLabel>
                  <Select
                    placeholder="Selecione a corrida"
                    onChange={(value) => {
                      console.log(value.target.value);
                      onSelectedRace(value.target.value);
                    }}
                    value={selectedIdRace}
                  >
                    {races.map((race) => (
                      <option key={race.id} value={race.id}>
                        {/* {race.name} - {race.circuit}  N CONSIGO COLOCAR NA LINHA DE CIMA O ID e name na debaixo*/}
                        {race.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                {selectedRace ? (
                  <Box bg="gray.200" p="4" mt="24px" rounded="lg">
                    <br />
                    <p>Corrida selecionada: {selectedRace.name}</p>
                    <p>Data do Inicio da Corrida: {selectedRace.startDate} </p>
                    <p>Data do Fim da Corrida: {selectedRace.endDate} </p>
                    <p>Total de Voltas: {selectedRace.totalLaps} </p>
                  </Box>
                ) : null}
              </Box>

              <Stack
                spacing={{ base: 5, sm: 2 }}
                direction={{ base: "column", sm: "row" }}
                alignItems="center"
              >
                <Card heading="Número de Voltas" detail="" label="" />
                <Card
                  heading="Número de Voltas Máximas"
                  detail=""
                  label={maxLap}
                />
                <Card heading="Contador Geral de Voltas" detail="" label="" />
                <Card heading="Voltas Restantes" detail="" label="" />
              </Stack>
            </Stack>
          </Stack>

          <Box display="flex" flexDirection="row" alignItems="center">
            <Box flex="1" textAlign="center">
              <Heading as="h2" size="xl" mt={6} mb={2}>
                Lap Annotation
              </Heading>
              <Box>
                <Text fontSize="md" fontWeight="semibold">
                  Tempo para término da corrida
                </Text>
                <Timer></Timer>
              </Box>
            </Box>
          </Box>

          {/* FORMULARIO */}
          <Box display="flex" flexDirection="row" justifyContent="center">
            <Signup
              raceId={selectedRace.id}
              onAfterSubmit={async () =>
                await fetchLaps(Number(selectedRace.id))
              }
            />
            <Stack
              spacing={{ base: 5, sm: 2 }}
              direction={{ base: "column", sm: "row" }}
              alignItems="center"
            >
              <Stack
                spacing={{ base: 5, sm: 2 }}
                direction={{ base: "column", sm: "row" }}
                alignItems="center"
              ></Stack>
            </Stack>
          </Box>
          <Box>
            <TableContainer>
              <Table variant="striped" colorScheme="teal">
                <Thead>
                  <Tr>
                    <Th>Tipo Pneu</Th>
                    <Th>Piloto</Th>
                    <Th>Número de voltas</Th>
                    <Th>Qunatidade de gasolina no tanque</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {laps.map((lap) => {
                    return (
                      <Tr key={lap.id}>
                        <Td>Dry</Td>
                        {/* <Td>Rubens</Td> */}
                        <Td>{lap.driverId}</Td>
                        {/* <Td isNull> */}
                        <Td>{lap.lapNumber}</Td>
                        {/* <Td>70l</Td> */}
                        <Td>70</Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
          <Button
            padding="20px"
            margin="15px"
            rightIcon={<GoChevronRight />}
            colorScheme="blue"
            variant="solid"
            size="lg"
            rounded="md"
            mb={{ base: 2, sm: 0 }}
          >
            Confirmar Estratégia
          </Button>
        </Container>
      </ChakraProvider>
    </Box>
  );
}

const Card = ({
  heading,
  detail,
  label,
}: {
  heading: string;
  detail: string;
  label: string;
}) => {
  return (
    <Stack
      direction="column"
      bg={useColorModeValue("gray.200", "gray.700")}
      p={3}
      rounded="lg"
      spacing={1}
      maxW="450px"
      h="max-content"
    >
      <Text
        margin="10px"
        padding="10px"
        fontSize="12px"
        textAlign="center"
        fontWeight="semibold"
        ml={2}
        textTransform="uppercase"
        color="black.100"
      >
        {heading}
      </Text>
      <Text fontSize="sm" color="gray.500" lineHeight={1.3} noOfLines={2}>
        {detail}
      </Text>
      <Text fontSize="30" textAlign="center" color="black">
        {label || 0}
      </Text>
    </Stack>
  );
};

// import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// Here we have used react-icons package for the icons
import { GoChevronRight } from "react-icons/go";
import { RiInformationFill } from "react-icons/ri";

import Sidebar from "@/components/sidebar/Sidebar";
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
  const [maxLap, setMaxLap] = useState("");
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
        <Box w="98vw" justifyContent="center" alignItems="center" padding="4%">
          <Box display="flex" flexDir="row" bg="white" p={3} rounded="lg">
            <FormControl mr="2" id="first-name" width="50%">
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
                    {race.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl ml="2" variant="floating" id="first-name" width="50%">
              <FormLabel>Número de voltas máxima</FormLabel>
              <Input
                onChange={handleMaxLap}
                value={maxLap}
                placeholder="Digite o número de voltas máxima"
              />
            </FormControl>
          </Box>

          <Box w="100%" my="24px">
            <Box bg="white" p="4" rounded="lg">
              <Text fontWeight="semibold" color="black.300" fontSize="24px">
                Informações da corrida
              </Text>
              <br />
              <Stack direction="row">
                <Box display="flex" flexDirection="row">
                  <Box direction="row">
                    <Text
                      fontWeight="semibold"
                      color="#060f1a"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      Corrida selecionada
                      <Icon
                        as={RiInformationFill}
                        ml={1}
                        width="1.3em"
                        height="1.3em"
                      />
                    </Text>
                    <Text>{selectedRace.name ? selectedRace.name : "-"}</Text>
                  </Box>
                  <Divider mx="16px" my="0" orientation="vertical" />
                </Box>

                <Box display="flex" flexDirection="row">
                  <Box>
                    <Text
                      fontWeight="semibold"
                      color="#060f1a"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      Inicio da Corrida
                      <Icon
                        as={RiInformationFill}
                        ml={1}
                        width="1.3em"
                        height="1.3em"
                      />
                    </Text>
                    <Text>
                      {selectedRace.startDate
                        ? new Date(selectedRace.startDate).toLocaleString(
                            "pt-BR"
                          )
                        : "-"}
                    </Text>
                  </Box>
                  <Divider mx="16px" my="0" orientation="vertical" />
                </Box>

                <Box display="flex" flexDirection="row">
                  <Box>
                    <Text
                      fontWeight="semibold"
                      color="#060f1a"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      Fim da corrida
                      <Icon
                        as={RiInformationFill}
                        ml={1}
                        width="1.3em"
                        height="1.3em"
                      />
                    </Text>
                    <Text>
                      {selectedRace.endDate
                        ? new Date(selectedRace.endDate).toLocaleString("pt-BR")
                        : "-"}
                    </Text>
                  </Box>
                  <Divider mx="16px" my="0" orientation="vertical" />
                </Box>

                <Box display="flex" flexDirection="row">
                  <Box>
                    <Text
                      fontWeight="semibold"
                      color="#060f1a"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      Total de voltas
                      <Icon
                        as={RiInformationFill}
                        ml={1}
                        width="1.3em"
                        height="1.3em"
                      />
                    </Text>
                    <Text>
                      {selectedRace.totalLaps ? selectedRace.totalLaps : "-"}
                    </Text>
                  </Box>
                </Box>
              </Stack>
            </Box>
          </Box>

          <Stack
            spacing={{ base: 5, sm: 2 }}
            direction={{ base: "column", sm: "row" }}
            alignItems="center"
          >
            <Card heading="Número de Voltas" detail="" label="" />
            <Card heading="Número de Voltas Máximas" detail="" label={maxLap} />
            <Card heading="Contador Geral de Voltas" detail="" label="" />
            <Card heading="Voltas Restantes" detail="" label="" />
          </Stack>

          {/* <Box display="flex" flexDirection="row" alignItems="center">
            <Box>
              <Text fontSize="md" fontWeight="semibold">
                Tempo para término da corrida
              </Text>
              <Timer></Timer>
            </Box>
          </Box> */}

          {/* FORMULARIO */}
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
            mt="24px"
          >
            <Box w="30%">
              <Signup
                raceId={selectedRace.id}
                races={races}
                onAfterSubmit={async () =>
                  await fetchLaps(Number(selectedRace.id))
                }
              />
            </Box>
            <Box w="70%" ml="24px" bg="white" rounded="lg">
              <TableContainer>
                <Table variant="striped" colorScheme="messenger">
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
          </Box>
          {/* <Button
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
          </Button> */}
        </Box>
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
      bg="white"
      p={3}
      rounded="lg"
      spacing={1}
      width="100%"
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

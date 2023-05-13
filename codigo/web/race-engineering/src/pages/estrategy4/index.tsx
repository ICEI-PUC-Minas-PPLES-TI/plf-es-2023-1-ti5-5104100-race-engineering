// import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import "@/styles/header.css";
import { AuthProvider } from "@/context/AuthContext";
import {
  ChakraProvider,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import type { AppProps } from "next/app";
import * as React from "react";
import {
  chakra,
  Container,
  Stack,
  HStack,
  Text,
  useColorModeValue,
  Button,
  Box,
  Link,
  Icon,
  Select,
} from "@chakra-ui/react";
// Here we have used react-icons package for the icons
import { GoChevronRight } from "react-icons/go";
import { MdOutlineContentCopy } from "react-icons/md";
import { useState, useEffect } from "react";

import api from "@/services/api";
import { dataToSelectOptions } from "@/shared/utils/dataToSelectOptions";
type FormData = {
  raceId: string;
  laps: number;
  startTime: string;
  finishTime: string;
};

type Race = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  totalLaps: number;
  isMain: boolean;
};

export default function App({ Component, pageProps }: AppProps) {
  const [races, setRaces] = useState([]);
  const [selectedRace, setSelectedRace] = useState({});
  const [selectedIdRace, setSelectedIdRace] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { register, handleSubmit } = useForm<FormData>(); //nem vai precisar eu acho

  //   O useEffect do estrategya ta diferente talvez isso nao importe
  useEffect(() => {
    (async () => {
      const { data } = await api.get("/races");
      console.log(data);
      setRaces(data);
    })();

    return () => {};
  }, []);

  const onSelectedRace = (id: any) => {
    const currentRace = races.filter((race) => race.id == id)[0];
    console.log(currentRace, id);
    setSelectedRace(currentRace);
  };
  return (
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
            maxW="500px"
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
              <Text fontSize="md" fontWeight="semibold">
                Defina o número de voltas máximas estabelecido pela organização
              </Text>
              <NumberInput defaultValue={0} min={0} max={20}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </HStack>

            {/* Minha Ideia Inicial so colocar um box tipo do meu estrategy orignial */}
            <Box w="100%" marginY="4">
              <Select
                placeholder="Selecione a corrida"
                onChange={(value) => {
                  console.log(value.target.value);
                  onSelectedRace(value.target.value);
                }}
                value={selectedIdRace}

                // {...register("raceId", { required: true })} N sei se precisa
              >
                {races.map((race) => (
                  <option key={race.id} value={race.id}>
                    {/* {race.name} - {race.circuit}  N CONSIGO COLOCAR NA LINHA DE CIMA O ID e name na debaixo*/}
                    {race.name}
                  </option>
                ))}
              </Select>
              <br />
              <p>Data do Inicio da Corrida: {selectedRace.startDate} </p>
              <p>Data do Fim da Corrida: {selectedRace.endDate} </p>
            </Box>
          </Stack>

          {/* Esse stack debaixo é so para os card */}
          <Stack
            spacing={{ base: 5, sm: 2 }}
            direction={{ base: "column", sm: "row" }}
            alignItems="center"
          >
            <Card heading="Número de Voltas" detail="" />

            <Card heading="Número de Voltas Máximas" detail="" />
            <Card heading="Contador Geral de Voltas" detail="" />
            <Card heading="Voltas Restantes" detail="" />
          </Stack>
        </Stack>
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
  );
}

const Card = ({ heading, detail }: { heading: string; detail: string }) => {
  return (
    <Stack
      as={Link}
      href="#"
      direction="column"
      _hover={{
        boxShadow: useColorModeValue(
          "0 4px 6px rgba(160, 174, 192, 0.6)",
          "0 4px 6px rgba(9, 17, 28, 0.9)"
        ),
      }}
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
        9
      </Text>
    </Stack>
  );
};
/* eslint-disable react/no-children-prop */
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
// import { format } from "date-fns";
// import { differenceInSeconds } from "date-fns";

import Sidebar from "@/components/sidebar/Sidebar";
import api from "@/services/api";
// import { Race } from "@/shared/interfaces/race";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  FormControl,
  FormLabel,
  Heading,
  Highlight,
  Input,
  InputGroup,
  Select,
  useToast,
} from "@chakra-ui/react";
import { format } from "path";

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

const CircuitPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<FormData>();
  const toast = useToast();

  const [races, setRaces] = useState<Race[]>([]);
  const [timeDiff, setTimeDiff] = useState<string>();

  useEffect(() => {
    api
      .get("/races")
      .then((response) => {
        setRaces(response.data);
      })
      .catch(() => {
        toast({
          title: "Erro ao buscar corridas, tente novamente",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      });
  }, [toast]);

  const onSubmit = handleSubmit((data, event) => {
    const startDateTime = new Date(data.startTime);
    const finishDateTime = new Date(data.finishTime);
    const timeDifference = finishDateTime.getTime() - startDateTime.getTime();

    // setTimeDiff(format(timeDifference, "HH:mm:ss"));

    const formData = {
      ...data,
      startTime: startDateTime,
      finishTime: finishDateTime,
    };

    api
      .post("/race-strategies", formData)
      .then(() => {
        event?.target?.reset();
        toast({
          title: "Estratégia cadastrada com sucesso",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      })
      .catch(() => {
        toast({
          title: "Erro ao cadastrar estratégia, tente novamente",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      });
  });

  return (
    <Box
      height="100vh"
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        w="2vw"
        className="sidebar-container"
        style={{ position: "fixed", top: 0, left: 0, bottom: 0 }}
      >
        <Sidebar />
      </Box>

      <Box w="98vw" justifyContent="center" alignItems="center">
        <FormControl width={480} as="form" onSubmit={onSubmit} margin="auto">
          <Card>
            <CardHeader>
              <Heading as="h2" size="md">
                <Highlight
                  query="Estratégia"
                  styles={{ px: "1", py: "1", bg: "gray.100" }}
                >
                  Estratégia de Corrida
                </Highlight>
              </Heading>
            </CardHeader>
            <CardBody>
              <Box w="100%" marginY="4">
                <FormLabel>Corrida</FormLabel>
                <Select
                  placeholder="Selecione a corrida"
                  {...register("raceId", { required: true })}
                >
                  {races.map((race) => (
                    <option key={race.id} value={race.id}>
                      {/* {race.name} - {race.circuit} */}
                      {race.name}
                    </option>
                  ))}
                </Select>
              </Box>

              <Box w="100%" marginY="4">
                <FormLabel>Número de voltas</FormLabel>
                <InputGroup>
                  <Input
                    type="number"
                    min="1"
                    placeholder="Digite o número de voltas"
                    {...register("laps", { required: true })}
                  />
                </InputGroup>
              </Box>

              <Box w="100%" marginY="4">
                <FormLabel>Hora de início</FormLabel>
                <InputGroup>
                  <Input
                    type="datetime-local"
                    {...register("startTime", { required: true })}
                  />
                </InputGroup>
              </Box>

              <Box w="100%" marginY="4">
                <FormLabel>Hora de término</FormLabel>
                <InputGroup>
                  <Input
                    type="datetime-local"
                    {...register("finishTime", { required: true })}
                  />
                </InputGroup>
              </Box>

              <Box w="100%" marginY="4">
                <FormLabel>Duração</FormLabel>
                <InputGroup>
                  <Input type="text" value={timeDiff} isReadOnly />
                </InputGroup>
              </Box>
            </CardBody>
            <CardFooter>
              <Button colorScheme="messenger" width="100%" type="submit" mt="8">
                Criar estratégia de corrida
              </Button>
            </CardFooter>
          </Card>
        </FormControl>
      </Box>
    </Box>
  );
};

export default CircuitPage;

/* eslint-disable react/no-children-prop */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import api from "@/services/api";
import { dataToSelectOptions } from "@/shared/utils/dataToSelectOptions";
import { getIdList } from "@/shared/utils/getIdList";
import { AtSignIcon, EmailIcon, LockIcon } from "@chakra-ui/icons";
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
  InputLeftElement,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";

import { options } from "./option-mock";

type Register = {
  startDate: string;
  endDate: string;
  totalLaps: number;
  name: string;
  analystId: number;
  circuitId: number;
  mechanics: Array<any>;
  drivers: Array<any>;
  teams: Array<any>;
};

const RegisterPage = () => {
  const animatedComponents = makeAnimated();

  const router = useRouter();
  const { register, handleSubmit } = useForm<Register>();
  const toast = useToast();

  const [show, setShow] = useState(false);
  const [selectedDrivers, setSelectedDrivers] = useState([]);
  const [selectedMechanics, setSelectedMechanics] = useState([]);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [selectedAnalyst, setSelectedAnalyst] = useState(0);
  const [selectedCircuit, setSelectedCircuit] = useState(0);

  const handleClick = () => setShow(!show);

  // BACKEND
  const [drivers, setDrivers] = useState([]);
  const [mechanics, setMechanics] = useState([]);
  const [teams, setTeams] = useState([]);
  const [analysts, setAnalysts] = useState([]);
  const [circuits, setCircuits] = useState([]);

  useEffect(() => {
    (async () => {
      const { data: driversResponse } = await api.get("/users/drivers");

      const { data: mechanicsResponse } = await api.get("/users/mechanics");
      const { data: teamsResponse } = await api.get("/teams");
      const { data: analystsResponse } = await api.get("/users/analysts");
      const { data: circuitsResponse } = await api.get("/circuits");

      setAnalysts(analystsResponse);
      setDrivers(driversResponse);
      setMechanics(mechanicsResponse);
      setTeams(teamsResponse);
      setCircuits(circuitsResponse);
    })();

    return () => {};
  }, []);

  const onSubmit = handleSubmit((data, event) => {
    data.mechanics = getIdList({
      list: mechanics,
    });

    data.teams = getIdList({
      list: teams,
    });

    data.analystId = getIdList({
      list: analysts,
    })[0].id;

    data.drivers = getIdList({
      list: drivers,
    }).slice(0, 1);

    data.totalLaps = Number(data.totalLaps);

    data.circuitId = getIdList({
      list: circuits,
    })[0].id;

    api
      .post("/races", data)
      .then(() => {
        event?.target?.reset();
        toast({
          title: "Cadastro realizado com sucesso",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        router.push("/");
      })
      .catch((err) => {
        toast({
          title: "Erro ao fazer cadastro, tente novamente",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      });
  });

  const handleSelectChange = (selectedOption: any, callback: any) => {
    if (selectedOption && selectedOption.length > 2) {
      selectedOption = selectedOption.slice(0, 2);
    }

    callback();
  };

  return (
    <Box
      height="100vh"
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <FormControl width={480} as="form" onSubmit={onSubmit} isRequired>
        <Card>
          <CardHeader>
            <Heading as="h2" size="md">
              <Highlight
                query="Criar"
                styles={{ px: "1", py: "1", bg: "gray.100" }}
              >
                Criar nova Corrida
              </Highlight>
            </Heading>
          </CardHeader>

          <CardBody>
            <Box w="100%" marginY="4">
              <FormLabel>Nome da corrida</FormLabel>
              <InputGroup>
                <Input type="text" {...register("name", { required: true })} />
              </InputGroup>
            </Box>
            <Box w="100%" marginTop="4">
              <FormLabel>Selecione o circuito</FormLabel>
              <Select
                closeMenuOnSelect={true}
                components={animatedComponents}
                options={dataToSelectOptions({
                  list: circuits,
                  params: { label: "name", value: "id" },
                })}
                onChange={(option: any) => {
                  handleSelectChange(option, () => {
                    setSelectedCircuit(option);
                  });
                }}
                value={selectedCircuit}
                placeholder="Selecione o circuito"
              />
            </Box>

            <Box w="100%" marginTop="4">
              <FormLabel>Selecione o analista</FormLabel>
              <Select
                closeMenuOnSelect={true}
                components={animatedComponents}
                options={dataToSelectOptions({
                  list: analysts,
                  params: { label: "name", value: "id" },
                })}
                onChange={(option: any) => {
                  handleSelectChange(option, () => {
                    setSelectedAnalyst(option);
                  });
                }}
                value={selectedAnalyst}
                placeholder="Selecione o analista"
              />
            </Box>

            <Box w="100%" marginTop="4">
              <FormLabel>Selecione o(s) Corredores</FormLabel>
              <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={dataToSelectOptions({
                  list: drivers,
                  params: { label: "name", value: "id" },
                })}
                onChange={(option: any) => {
                  handleSelectChange(option, () => {
                    setSelectedDrivers(option);
                  });
                }}
                value={selectedDrivers}
                placeholder="Selecione os corredores"
              />
            </Box>

            <Box w="100%" marginTop="4">
              <FormLabel>Selecione o(s) Mecanicos</FormLabel>
              <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={dataToSelectOptions({
                  list: mechanics,
                  params: { label: "name", value: "id" },
                })}
                onChange={(option: any) => {
                  handleSelectChange(option, () => {
                    setSelectedMechanics(option);
                  });
                }}
                value={selectedMechanics}
                placeholder="Selecione os mecanicos"
              />
            </Box>

            <Box w="100%" marginTop="4">
              <FormLabel>Selecione o(s) Times</FormLabel>
              <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={dataToSelectOptions({
                  list: teams,
                  params: { label: "name", value: "id" },
                })}
                onChange={(option: any) => {
                  handleSelectChange(option, () => {
                    setSelectedTimes(option);
                  });
                }}
                value={selectedTimes}
                placeholder="Selecione os Times"
              />
            </Box>

            <Box w="100%" marginY="4">
              <FormLabel>Inicio da Corrida</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<EmailIcon color="gray.300" />}
                />
                <Input
                  type="datetime-local"
                  {...register("startDate", { required: true })}
                />
              </InputGroup>
            </Box>

            <Box w="100%" marginY="4">
              <FormLabel>Fim da Corrida</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<EmailIcon color="gray.300" />}
                />
                <Input
                  type="datetime-local"
                  {...register("endDate", { required: true })}
                />
              </InputGroup>
            </Box>
            <Box w="100%" marginY="4">
              <FormLabel>Total de voltas</FormLabel>
              <InputGroup>
                <Input
                  type="number"
                  {...register("totalLaps", { required: true })}
                />
              </InputGroup>
            </Box>
          </CardBody>

          <CardFooter display="flex" width="100%">
            <Button
              colorScheme="messenger"
              variant="ghost"
              onClick={() => {
                router.push("/");
              }}
              width="50%"
              mr="3"
            >
              Voltar
            </Button>
            <Button colorScheme="messenger" width="50%" ml="3" type="submit">
              Cadastrar
            </Button>
          </CardFooter>
        </Card>
      </FormControl>
    </Box>
  );
};

export default RegisterPage;

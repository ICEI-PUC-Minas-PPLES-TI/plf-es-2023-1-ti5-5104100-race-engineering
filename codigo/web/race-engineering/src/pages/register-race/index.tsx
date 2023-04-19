/* eslint-disable react/no-children-prop */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import UserForm from "@/components/user-fields/user-fields";
import api from "@/services/api";
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
  name: string;
  email: string;
  password: string;
  type: string;

  startDate: string;
  endDate: string;
  totalLaps: number;
  analystId: number;
  circuitId: number;
  // mechanicId: string;
  mechanics: Array<string>;
  drivers: Array<string>; //Verificar  OK
};

const RegisterPage = () => {
  const animatedComponents = makeAnimated();

  const router = useRouter();
  const { register, handleSubmit } = useForm<Register>();
  const toast = useToast();

  const [show, setShow] = useState(false);
  const [selectedDrivers, setSelectedDrivers] = useState([]);
  const [selectedMechanics, setSelectedMechanics] = useState([]); //CRIEI ESSA
  const [selectedTimes, setSelectedTimes] = useState([]); //CRIEI ESSA

  const handleClick = () => setShow(!show);

  // BACKEND
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    (async () => {
      const { data: drivers } = await api.get("/users/drivers");
      // const response = JSON.parse(drivers.list);
      const { data: mechanics } = await api.get("/users/mechanics");
      // const { data: analistas } = await api.get("/users/analysts");
      const { data: circuitos } = await api.get("/circuits");

      setDrivers(drivers); //N PRECISAVA  DO LIST
      // setDrivers(mechanics); //CRIEI ESSA  ################
      console.log(drivers); //TA OK
      console.log(mechanics); //TESTAR
    })();

    return () => {
      // Função de limpeza do efeito (opcional)
    };
  }, []);

  const onSubmit = handleSubmit((data, event) => {
    api
      // .post("/register", data)
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

  const handleSelectChange = (selectedOption: any) => {
    if (selectedOption && selectedOption.length > 2) {
      // Se mais de 2 opções forem selecionadas, mantenha apenas as 2 primeiras
      selectedOption = selectedOption.slice(0, 2);
    }
    setSelectedDrivers(selectedOption);
  };

  //##########CRIEI EESSE METODO
  const handleSelectChangeMechanics = (selectedOption: any) => {
    if (selectedOption && selectedOption.length > 2) {
      // Se mais de 2 opções forem selecionadas, mantenha apenas as 2 primeiras
      selectedOption = selectedOption.slice(0, 2);
    }
    setSelectedMechanics(selectedOption);
  };

  //##########CRIEI EESSE METODO
  const handleSelectChangeTimes = (selectedOption: any) => {
    if (selectedOption && selectedOption.length > 2) {
      // Se mais de 2 opções forem selecionadas, mantenha apenas as 2 primeiras
      selectedOption = selectedOption.slice(0, 2);
    }
    setSelectedTimes(selectedOption);
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
            <Box w="100%" marginTop="4">
              <FormLabel>Selecione o(s) Corredores</FormLabel>
              <InputGroup id="drivers" w="100%">
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  options={drivers}
                  onChange={handleSelectChange}
                  value={selectedDrivers}
                  placeholder="Selecione os corredores"
                />
              </InputGroup>
            </Box>

            <Box w="100%" marginTop="4">
              <FormLabel>Selecione o(s) Mecanicos</FormLabel>
              {/* Pode Manter o id(pq n tem nada haver com o back)  Mas acho q tem q trocar  #############*/}
              <InputGroup id="mechanics" w="100%">
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  options={options}
                  // onChange={handleSelectChange}
                  onChange={handleSelectChangeMechanics}
                  // value={selectedDrivers}
                  value={selectedMechanics}
                  placeholder="Selecione os mecanicos"
                />
              </InputGroup>
            </Box>

            {/* COLOCAR MAIS UM BOX PARA TIMES(FALTA TA NO BACKEND ANTES) */}
            <Box w="100%" marginTop="4">
              <FormLabel>Selecione o(s) Times</FormLabel>
              <InputGroup id="times" w="100%">
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  options={options}
                  // onChange={handleSelectChange}
                  onChange={handleSelectChangeTimes}
                  // value={selectedDrivers}
                  value={selectedTimes}
                  placeholder="Selecione os Times"
                />
              </InputGroup>
            </Box>

            <Box w="100%" marginY="4">
              <FormLabel>Inicio da Corrida</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<EmailIcon color="gray.300" />}
                />
                <Input
                  type="date"
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
                  type="date"
                  {...register("endDate", { required: true })}
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

/* eslint-disable react/no-children-prop */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import UserForm from "@/components/user-fields/user-fields";
import api from "@/services/api";
import { AtSignIcon, EmailIcon, LockIcon } from "@chakra-ui/icons";
// import Select from 'react-select'; //######PRO MULTIPLIE SELECT
// import AsyncSelect from 'react-select/async';//######PRO MULTIPLIE SELECT
//Dai no lugar de usar Select usa AsyncSelect

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
  Select,
  useToast,
} from "@chakra-ui/react";

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
  mechanicId: string; //Dps Faz igual ao drivers
  drivers: Array<string>; //Verificar  OK
};

const RegisterPage = () => {
  //Esse const options é pro select
  //Vai mudar algo pq vai vir do BD dos corredores e mecanicos ja cadastradros
  const options = [
    {
      label: "Analista",
      id: "ANALYST",
    },
    {
      label: "Piloto",
      id: "DRIVER",
    },
    {
      label: "Mecânico",
      id: "MECHANIC",
    },
  ];
  const router = useRouter();
  const { register, handleSubmit } = useForm<Register>();
  const toast = useToast();

  const [selected, setSelected] = useState("");
  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  const handleChange = (event: any) => {
    setSelected(event.target.value);
  };

  // BACKEND
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    (async () => {
      const { data: drivers } = await api.get("/drivers");
      // const response = JSON.parse(drivers.list);
      // const { data: mecanicos } = await api.get('/users/mechanics');
      // const { data: analistas } =await api.get('/users/analysts');
      // const { data: circuitos } = await api.get('/circuits');
      setDrivers(drivers.list);
      console.log(drivers);
    })();

    return () => {
      // Função de limpeza do efeito (opcional)
    };
  }, []);

  //Esse const onSubmit Pode Deixar (Talvez so mudar o caminho do post OU talvez nem precise)
  const onSubmit = handleSubmit((data, event) => {
    api
      .post("/register", data)
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
              <InputGroup id="racerType">
                {/* const MyComponent = () => ( */}
                {/* <Select options={options} /> */}
                {/* ) */}
                {/* ###############Multiplies Select */}
                <Select
                  value={selected}
                  {...register("drivers")} //tava type Acho q troquei certo
                  onChange={handleChange}
                >
                  <option hidden>Selecione o(s) Corredores</option>
                  {/* No lugar de options vai ser Drivers 
                    E no lugar de label vai ser NOme MAS 
                      FALTA O OTAVIO COLOCAR ISSO NO BANCO DE DADOS
                       O JOEY FALOU Q VAI FAZER ESSE SELECT*/}
                  {options.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </InputGroup>
            </Box>

            <Box w="100%" marginTop="4">
              <FormLabel>Selecione o(s) Mecanicos</FormLabel>
              {/* Pode Manter o id  Mas acho q tem q trocar  #############*/}
              <InputGroup id="mechanicType">
                <Select
                  value={selected}
                  {...register("mechanicId")} //fica de olho se o otavio trocar
                  onChange={handleChange}
                >
                  <option hidden>Selecione o(s) Mecanicos</option>
                  {/*O mesmo q falei no select de cima */}
                  {options.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </InputGroup>
            </Box>

            {/* COLOCAR MAIS UM BOX PARA TIMES(FALTA TA NO BACKEND ANTES) */}
            <Box w="100%" marginTop="4">
              <FormLabel>Selecione o(s) Times</FormLabel>
              {/* Pode Manter o id  Mas acho q tem q trocar  #############*/}
              <InputGroup id="mechanicType">
                <Select
                  value={selected}
                  {...register("mechanicId")} //AINDA N TEM(falta o otavio colocar)
                  onChange={handleChange}
                >
                  <option hidden>Selecione o(s) Times</option>
                  {/*O mesmo q falei no select de cima */}
                  {options.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </Select>
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
                  //   placeholder="Digite seu email"
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
              //   indo pra pagina home Apos passar pela PagiNA "cadastro com sucesso por 3s"
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
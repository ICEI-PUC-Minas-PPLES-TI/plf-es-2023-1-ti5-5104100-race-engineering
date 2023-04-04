/* eslint-disable react/no-children-prop */
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

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
  Select,
  useToast,
} from "@chakra-ui/react";

type Register = {
  name: string;
  email: string;
  password: string;
  type: string;
};

const RegisterPage = () => {
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
                Criar nova conta
              </Highlight>
            </Heading>
          </CardHeader>

          <CardBody>
            <Box w="100%" marginBottom="3">
              <FormLabel>Nome completo</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<AtSignIcon color="gray.300" />}
                />
                <Input
                  type="text"
                  placeholder="Digite seu nome completo"
                  {...register("name", { required: true })}
                />
              </InputGroup>
            </Box>
            <Box w="100%" marginY="4">
              <FormLabel>Email</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<EmailIcon color="gray.300" />}
                />
                <Input
                  type="email"
                  placeholder="Digite seu email"
                  {...register("email", { required: true })}
                />
              </InputGroup>
            </Box>

            <Box w="100%" marginY="4">
              <FormLabel>Senha</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  fontSize="1.2em"
                  children={<LockIcon color="gray.300" />}
                />
                <Input
                  type={show ? "text" : "password"}
                  placeholder="Digite sua senha"
                  {...register("password", { required: true, minLength: 8 })}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Box>
            <Box w="100%" marginTop="4">
              <FormLabel>Tipo de usuário</FormLabel>
              <InputGroup id="userType">
                <Select
                  value={selected}
                  {...register("type")}
                  onChange={handleChange}
                >
                  <option hidden>Tipo de usuário</option>
                  {options.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </Select>
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

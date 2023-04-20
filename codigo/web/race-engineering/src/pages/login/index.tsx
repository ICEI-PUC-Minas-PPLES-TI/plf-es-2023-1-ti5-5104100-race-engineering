/* eslint-disable react/no-children-prop */
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { useAuth } from "@/context/AuthContext";
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

type Login = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();
  const { authenticate } = useAuth();

  const { register, handleSubmit } = useForm<Login>();
  const toast = useToast();

  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  const onSubmit = handleSubmit((data, event) => {
    api
      .post("/auth/login", data)
      .then((response) => {
        const { data } = response;

        authenticate(data);

        router.push("/");
      })
      .catch((err) => {
        toast({
          title: "Erro ao fazer login, tente novamente",
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
                query="Login"
                styles={{ px: "1", py: "1", bg: "gray.100" }}
              >
                Login
              </Highlight>
            </Heading>
          </CardHeader>

          <CardBody>
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
          </CardBody>

          <CardFooter display="flex" width="100%">
            <Button
              colorScheme="messenger"
              variant="ghost"
              onClick={() => {
                router.push("/register-user");
              }}
              width="50%"
              mr="3"
            >
              Cadastro
            </Button>
            <Button colorScheme="messenger" width="50%" ml="3" type="submit">
              Fazer login
            </Button>
          </CardFooter>
        </Card>
      </FormControl>
    </Box>
  );
};

export default LoginPage;

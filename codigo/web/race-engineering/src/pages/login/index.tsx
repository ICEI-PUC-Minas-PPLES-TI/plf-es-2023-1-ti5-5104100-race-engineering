/* eslint-disable react/no-children-prop */
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RiMailLine } from "react-icons/ri";

import { PasswordInput } from "@/components/PasswordInput/PasswordInput";
import { useAuth } from "@/context/AuthContext";
import api from "@/services/api";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";
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
  const { authenticate, logout } = useAuth();

  const { register, handleSubmit } = useForm<Login>();
  const toast = useToast();

  const onSubmit = handleSubmit((data, event) => {
    api
      .post("/auth/login", data)
      .then(async (response) => {
        const { data } = response;
        const ROLES_AUTHORIZED = ["ADMIN", "ANALYST"];

        authenticate(data);
        const { data: profile } = await api.get("/users/me");

        if (typeof window !== "undefined") {
          localStorage.setItem("profile", JSON.stringify(profile));
        }

        if (ROLES_AUTHORIZED.includes(profile.role)) {
          router.push("/");
        } else {
          toast({
            title: "Acesso não autorizado, contate o administrador do sistema.",
            status: "warning",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
          logout();
        }
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
                  color="gray.300"
                  children={<RiMailLine fontSize="20px" />}
                />
                <Input
                  type="email"
                  placeholder="Digite seu email"
                  {...register("email", { required: true })}
                />
              </InputGroup>
            </Box>

            <PasswordInput register={register} />
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

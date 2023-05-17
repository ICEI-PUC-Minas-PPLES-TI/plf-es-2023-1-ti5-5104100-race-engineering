/* eslint-disable react/no-children-prop */
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RiMailLine } from "react-icons/ri";

import { PasswordInput } from "@/components/PasswordInput/PasswordInput";
import { useAuth } from "@/context/AuthContext";
import api from "@/services/api";
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
  Image,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";

type Login = {
  email: string;
  password: string;
};

const AboutPage = () => {
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
      <Box
        width="50%"
        height="100%"
        backgroundImage="https://images.unsplash.com/photo-1539057307452-65f8bc136475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        className="about-image"
      >
        {/* <Image
          src="https://images.unsplash.com/photo-1539057307452-65f8bc136475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
          alt="Porsche Car by Porschefectionist on Unsplash"
        /> */}
      </Box>
      <Stack
        direction="column"
        justifyContent="center"
        align="center"
        width="50%"
      >
        <Stack
          direction="column"
          justifyContent="center"
          align="center"
          p="64px"
        >
          <Heading>Race Engineering</Heading>
          <Text fontSize="xl" textAlign="center">
            Explore a gestão de dados em tempo real e aprimorar a comunicação
            com sua equipe durante a corrida.
          </Text>
        </Stack>
        <Stack direction="column" spacing={4} align="center">
          <Button
            bg="#000000"
            variant="solid"
            color="white"
            w="320px"
            h="40px"
            onClick={() => {
              router.push("/login");
            }}
          >
            Login
          </Button>
          <Button
            bg="#ffffff"
            variant="ghost"
            w="320px"
            onClick={() => {
              router.push("/register-user");
            }}
          >
            Criar conta
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default AboutPage;

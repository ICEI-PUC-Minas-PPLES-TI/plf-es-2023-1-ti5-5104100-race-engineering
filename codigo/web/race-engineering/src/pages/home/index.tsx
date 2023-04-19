import { Inter } from "next/font/google";
import Head from "next/head";
//import Image from 'next/image';
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

import api from "@/services/api";
//import Layout  from '@/components/Layout';
//import Hero from '@/components/Hero';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Heading,
  HStack,
  Image,
  Link,
  SimpleGrid,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";

import CaptionCarosel from "./carousel";

export default function Home() {
  const router = useRouter();

  // useEffect(() => {
  //   api.get("/users/drivers").then((r) => {
  //     console.log(r);
  //   });
  // });

  return (
    <Box>
      {/* <CaptionCarosel /> */}
      <SimpleGrid
        spacing={10}
        templateColumns="repeat(auto-fill, minmax(350px, 1fr))"
        margin="-15"
        padding="-15"
        marginLeft="10"
        marginRight="10"
        marginTop="10"
        marginBottom="10"
      >
        <Card
          align="center"
          backgroundImage="./images/gradient-black.png"
          maxHeight="250px"
        >
          <CardHeader>
            <Heading color="#ffffff" size="md">
              Corridas
            </Heading>
          </CardHeader>
          <CardBody>
            <Text color="#ffffff" align="center">
              Gerencie suas corridas com facilidade: liste, crie, edite ou
              remova corridas conforme necessário.
            </Text>
          </CardBody>
          <CardFooter w="100%">
            <Button
              variant="solid"
              onClick={() => {
                // router.push("/register-user");
                router.push("/register-race");
              }}
              colorScheme="whiteAlpha"
              w="50%"
              mr="2"
            >
              Listar
            </Button>
            <Button
              variant="solid"
              onClick={() => {
                // router.push("/register-user");
                router.push("/register-race");
              }}
              colorScheme="whiteAlpha"
              w="50%"
              ml="2"
            >
              Cadastrar
            </Button>
          </CardFooter>
        </Card>
        <Card
          align="center"
          backgroundImage="./images/gradient-red.png"
          maxHeight="250px"
        >
          <CardHeader>
            <Heading color="#ffffff" size="md">
              Circuitos
            </Heading>
          </CardHeader>
          <CardBody>
            <Text color="#ffffff" align="center">
              Gerencie os circuitos com facilidade: liste, crie, edite ou remova
              corridas conforme necessário.
            </Text>
          </CardBody>
          <CardFooter w="100%">
            <Button
              variant="solid"
              onClick={() => {
                // router.push("/register-user");
                router.push("/register-race");
              }}
              colorScheme="whiteAlpha"
              w="50%"
              mr="2"
            >
              Listar
            </Button>
            <Button
              variant="solid"
              onClick={() => {
                // router.push("/register-user");
                router.push("/register-race");
              }}
              colorScheme="whiteAlpha"
              w="50%"
              ml="2"
            >
              Cadastrar
            </Button>
          </CardFooter>
        </Card>
        <Card
          align="center"
          backgroundImage="./images/gradient-green.png"
          maxHeight="250px"
        >
          <CardHeader>
            <Heading color="#ffffff" size="md">
              Pilotos
            </Heading>
          </CardHeader>
          <CardBody>
            <Text color="#ffffff" align="center">
              Gerencie os pilotos com facilidade: liste, crie, edite ou remova
              corridas conforme necessário.
            </Text>
          </CardBody>
          <CardFooter w="100%">
            <Button
              variant="solid"
              onClick={() => {
                // router.push("/register-user");
                router.push("/register-race");
              }}
              colorScheme="whiteAlpha"
              w="50%"
              mr="2"
            >
              Listar
            </Button>
            <Button
              variant="solid"
              onClick={() => {
                // router.push("/register-user");
                router.push("/register-race");
              }}
              colorScheme="whiteAlpha"
              w="50%"
              ml="2"
            >
              Cadastrar
            </Button>
          </CardFooter>
        </Card>
        <Card
          align="center"
          backgroundImage="./images/gradient-purple.png"
          maxHeight="250px"
        >
          <CardHeader>
            <Heading color="#ffffff" size="md">
              Mecânicos
            </Heading>
          </CardHeader>
          <CardBody>
            <Text color="#ffffff" align="center">
              Gerencie os mecânicos com facilidade: liste, crie, edite ou remova
              corridas conforme necessário.
            </Text>
          </CardBody>
          <CardFooter w="100%">
            <Button
              variant="solid"
              onClick={() => {
                // router.push("/register-user");
                router.push("/register-race");
              }}
              colorScheme="whiteAlpha"
              w="50%"
              mr="2"
            >
              Listar
            </Button>
            <Button
              variant="solid"
              onClick={() => {
                // router.push("/register-user");
                router.push("/register-race");
              }}
              colorScheme="whiteAlpha"
              w="50%"
              ml="2"
            >
              Cadastrar
            </Button>
          </CardFooter>
        </Card>
      </SimpleGrid>
    </Box>
  );
}

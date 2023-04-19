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

  useEffect(() => {
    api.get("/users/drivers").then((r) => {
      console.log(r);
    });
  });

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
        <Card align="center">
          <CardHeader>
            <Heading size="md"> Corridas</Heading>
          </CardHeader>
          <CardBody>
            <Image
              objectFit="cover"
              maxW={{ base: "100%", sm: "200px" }}
              src="https://www.porschegt3cup.com.br/wp-content/uploads/2020/07/Porsche-Mobil1-Supercup-abre-na-%C3%81ustria-a-temporada-mais-compacta-de-sua-hist%C3%B3ria.jpg"
              alt="Racing"
            />
          </CardBody>
          <CardFooter>
            <Button
              variant="solid"
              onClick={() => {
                // router.push("/register-user");
                router.push("/register-race");
              }}
              colorScheme="blue"
            >
              Cadastrar Corrida
            </Button>
          </CardFooter>
        </Card>
        <Card align="center">
          <CardHeader>
            <Heading size="md">Circuito</Heading>
          </CardHeader>
          <CardBody>
            <Image
              objectFit="cover"
              maxW={{ base: "100%", sm: "200px" }}
              src="http://www.goinfra.go.gov.br/arquivos/Aut%C3%B3dromo_de_Goi%C3%A2nia_Foto_Marin.jpg"
              alt="Racing"
            />
          </CardBody>
          <CardFooter>
            <Button
              variant="solid"
              onClick={() => {
                router.push("/register-user");
              }}
              colorScheme="blue"
            >
              Cadastrar Circuito
            </Button>
          </CardFooter>
        </Card>
        <Card align="center">
          <CardHeader>
            <Heading size="md">Pilotos</Heading>
          </CardHeader>
          <CardBody>
            <Image
              objectFit="cover"
              maxW={{ base: "100%", sm: "200px" }}
              src="https://www.porschegt3cup.com.br/wp-content/uploads/2020/05/20180609_victoreleuterio_0237-300x200.jpg"
              alt="Racing"
            />
          </CardBody>
          <CardFooter>
            <Button
              variant="solid"
              onClick={() => {
                router.push("/register-user");
              }}
              colorScheme="blue"
            >
              Vizualizar pilotos
            </Button>
          </CardFooter>
        </Card>
        <Card align="center">
          <CardHeader>
            <Heading size="md">Mecânicos</Heading>
          </CardHeader>
          <CardBody>
            <Image
              objectFit="cover"
              maxW={{ base: "100%", sm: "200px" }}
              src="https://cdn-6.motorsport.com/images/amp/6D1Lgp40/s1000/dener-pires-em-interlagos-1.jpg"
              alt="Racing"
            />
          </CardBody>
          <CardFooter>
            <Button
              variant="solid"
              onClick={() => {
                router.push("/register-user");
              }}
              colorScheme="blue"
            >
              Vizualizar mecânicos
            </Button>
          </CardFooter>
        </Card>
      </SimpleGrid>
    </Box>
  );
}

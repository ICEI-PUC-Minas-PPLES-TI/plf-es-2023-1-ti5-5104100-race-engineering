import { Inter } from "next/font/google";
import Head from "next/head";
//import Image from 'next/image';
import NextLink from "next/link";

//import Layout  from '@/components/Layout';
//import Hero from '@/components/Hero';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Center,
  Heading,
  HStack,
  Image,
  Link,
  Stack,
  Tag,
} from "@chakra-ui/react";

import Logo from "./home/footer";
import Header from "./home/Header";
import Home from "./home/index";
import LoginPage from "./login";

export default function Index() {
  return (
    <>
      {/* <Logo /> */}

      {/* <Hero /> */}

      <Box height="100vh" width="100%">
        <Box
          height="100%"
          width="100%"
          display="flex"
          justifyContent="center"
          flex-flexDirection="column"
          alignItems="center"
        >
          <Box w="10vw">
            <Header />
          </Box>

          <Box w="90vw">
            <Home />
          </Box>
        </Box>
      </Box>
    </>
  );
}

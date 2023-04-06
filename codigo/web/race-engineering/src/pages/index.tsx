import { Inter } from 'next/font/google';
import Head from 'next/head';
//import Image from 'next/image';
import NextLink from 'next/link';

import Header from "./home/Header";
import Home from "./home/index"
import Logo from "./home/footer";


//import Layout  from '@/components/Layout';

//import Hero from '@/components/Hero';

import { Box, Link ,Image, HStack, Heading, Button, Center, Tag, Stack, CardBody, CardFooter, Card} from '@chakra-ui/react';

import LoginPage from './login';

export default function Index() {
  return (

    <>
    
      <Header />
   
      <Home/>

      <Logo/>
              

      {/* <Hero /> */}
    
      {/* <Box height="100vh" width="100%">
        <Box
          height="100%"
          width="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <LoginPage />
        </Box>
      </Box> */}

      
    </>
  );
}
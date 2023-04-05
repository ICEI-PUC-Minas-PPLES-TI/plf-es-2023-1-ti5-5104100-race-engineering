import { Inter } from 'next/font/google';
import Head from 'next/head';
import Image from 'next/image';
import NextLink from 'next/link';

import Header from "../components/Header";

import Layout  from '@/components/Layout';

import Hero from '@/components/Hero';

import { Box, Link } from '@chakra-ui/react';

import LoginPage from './login';

export default function Home() {
  return (

    <>
    
      
      <Layout pageTitle="Landing Page Nextjs">
      <Header />
      <Hero />
    </Layout>
      <Box height="100vh" width="100%">
        <Box
          height="100%"
          width="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <LoginPage />
        </Box>
      </Box>

      
    </>
  );
}
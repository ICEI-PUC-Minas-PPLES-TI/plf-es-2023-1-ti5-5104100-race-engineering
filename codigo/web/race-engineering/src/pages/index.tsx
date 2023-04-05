import { Inter } from 'next/font/google';
import Head from 'next/head';
//import Image from 'next/image';
import NextLink from 'next/link';

import Header from "./Homepage/Header";


//import Layout  from '@/components/Layout';

//import Hero from '@/components/Hero';

import { Box, Link ,Image, HStack, Heading, Button, Center, Tag, Stack, CardBody, CardFooter, Card} from '@chakra-ui/react';

import LoginPage from './login';

export default function Home() {
  return (

    <>
    
      <Header />
    <Center bg='gray.100' h='50vh'> 
      <Box>
        <Box maxW="420x" bg="white" p="5" w='120vh'>
 
           <Card
  direction={{ base: 'column', sm: 'row' }}
  overflow='hidden'
  variant='outline'
>
  <Image
    objectFit='cover'
    maxW={{ base: '100%', sm: '200px' }}
    src='https://www.porschegt3cup.com.br/wp-content/uploads/2020/07/Porsche-Mobil1-Supercup-abre-na-%C3%81ustria-a-temporada-mais-compacta-de-sua-hist%C3%B3ria.jpg'
    alt='Racing'
  />
  <Stack>
    <CardBody>
      <Heading size='md'>Corridas</Heading>

    </CardBody>

    <CardFooter>
      <Button variant='solid' colorScheme='blue'>
        Cadastrar Corrida
      </Button>
    </CardFooter>
  </Stack>
</Card>


<Card
  direction={{ base: 'column', sm: 'row' }}
  overflow='hidden'
  variant='outline'
>
  <Image
    objectFit='cover'
    maxW={{ base: '100%', sm: '200px' }}
    src='http://www.goinfra.go.gov.br/arquivos/Aut%C3%B3dromo_de_Goi%C3%A2nia_Foto_Marin.jpg'
    alt='Racing'
  />
  <Stack>
    <CardBody>
      <Heading size='md'>Circuito</Heading>

    </CardBody>

    <CardFooter>
      <Button variant='solid' colorScheme='blue'>
        Cadastrar Circuito
      </Button>
    </CardFooter>
  </Stack>
</Card>

          


       
       
       
       
        </Box>

      </Box>

      

      </Center>

              

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
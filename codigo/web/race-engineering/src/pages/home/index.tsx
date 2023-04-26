import { useRouter } from "next/router";

import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Highlight,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";

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
            <Text
              color="#ffffff"
              align="center"
              lineHeight="normal"
              fontSize={15}
            >
              Gerencie corridas com facilidade: liste, crie, edite ou remova
              corridas conforme necessário.
            </Text>
          </CardBody>
          <CardFooter w="100%">
            <Button
              variant="solid"
              onClick={() => {
                router.push("/list-race");
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
            <Text
              color="#ffffff"
              align="center"
              lineHeight="normal"
              fontSize={15}
            >
              Gerencie os circuitos com facilidade: liste, crie, edite ou remova
              corridas conforme necessário.
            </Text>
          </CardBody>
          <CardFooter w="100%">
            <Button
              variant="solid"
              onClick={() => {
                router.push("/list-circuit");
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
                router.push("/create-circuit");
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
              Times
            </Heading>
          </CardHeader>
          <CardBody>
            <Text
              color="#ffffff"
              align="center"
              lineHeight="normal"
              fontSize={15}
            >
              Gerencie os times com facilidade: liste, crie, edite ou remova
              times conforme necessário.
            </Text>
          </CardBody>
          <CardFooter w="100%">
            <Button
              variant="solid"
              onClick={() => {
                router.push("/list-team");
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
                router.push("/create-team");
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

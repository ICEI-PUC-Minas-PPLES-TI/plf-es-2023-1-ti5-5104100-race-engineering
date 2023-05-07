import Head from "next/head";
import { useEffect, useState } from "react";

import Sidebar from "@/components/sidebar/Sidebar";
import api from "@/services/api";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, Heading } from "@chakra-ui/react";
import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Button,
  useToast,
} from "@chakra-ui/react";

export default function Index() {
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [races, setRaces] = useState([]);
  const [selectedRaceId, setSelectedRaceId] = useState<number | null>(null);

  const toast = useToast()

  useEffect(() => {
    (async () => {
      const { data } = await api.get("/races");
      console.log(data);
      setRaces(data);
    })();

    return () => { };
  }, []);

  const handleDeleteRace = (id: number) => {
    api
      .delete(`/circuits/${id}`)
      .then(() => {
        setRaces((prevRaces) => prevRaces.filter((circuit: any) => circuit.id !== id));
        toast({
          title: "Circuito excluído com sucesso",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      })
      .catch((err) => {
        toast({
          title: "Erro ao excluir circuito, tente novamente",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      });
  };

  return (
    
      <Box height="100vh" width="100%" padding="4 100px">
        <Heading as="h1" size="2xl" textAlign="center" marginTop="2%" >
          Lista de Corridas
        </Heading>

        <Modal key="confirmation-modal" isOpen={isConfirmationModalOpen} onClose={() => setIsConfirmationModalOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Confirmação</ModalHeader>
            <ModalBody>
              Tem certeza de que deseja excluir esta Corrida?
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={() => {
                setIsConfirmationModalOpen(false);
                handleDeleteRace(selectedRaceId!);
              }}>
                Deletar
              </Button>
              <Button variant="ghost" onClick={() => setIsConfirmationModalOpen(false)}>Cancelar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Box height="100vh" width="100%">
          <Box
            height="100%"
            width="100%"
            display="flex"
            justifyContent="center"
            flex-flexDirection="column"
            alignItems="center"
          >
            <Box w="2vw" className="sidebar-container" style={{ position: "fixed", top: 0, left: 0, bottom: 0 }}>
              <Sidebar />
            </Box>

            <Box height="100vh" width="100%" padding="6%" >
              <TableContainer maxW="70%" margin="auto">
                <Table size="sm" variant="striped" colorScheme="messenger">
                  <Thead>
                    <Tr>
                      <Th>ID</Th>
                      <Th>Name</Th>
                      <Th>Start Date</Th>
                      <Th>End Date</Th>
                      <Th>Total Laps</Th>
                      <Th>Delete</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {races.map((race: any) => (
                      <Tr key={race.id}>
                        <Td>{race.id}</Td>
                        <Td>{race.name ?? "-"}</Td>
                        <Td>{new Date(race.startDate).toLocaleString()}</Td>
                        <Td>{new Date(race.endDate).toLocaleString()}</Td>
                        <Td>{race.totalLaps}</Td>
                        <Button
                          colorScheme="red"
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setSelectedRaceId(race.id);
                            setIsConfirmationModalOpen(true);
                          }}
                        >
                          Deletar
                        </Button>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
              {/* <Card maxW="md">
              <CardHeader>
                <Flex spacing="4">
                  <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                    <Avatar
                      name="Segun Adebayo"
                      src="https://bit.ly/sage-adebayo"
                    />

                    <Box>
                      <Heading size="sm">Segun Adebayo</Heading>
                      <Text>Creator, Chakra UI</Text>
                    </Box>
                  </Flex>
                  <IconButton
                    variant="ghost"
                    colorScheme="gray"
                    aria-label="See menu"
                    icon={<RiMore2Line />}
                  />
                </Flex>
              </CardHeader>
              <CardBody>
                <Text>
                  With Chakra UI, I wanted to sync the speed of development with
                  the speed of design. I wanted the developer to be just as
                  excited as the designer to create a screen.
                </Text>
              </CardBody>
              <Image
                objectFit="cover"
                src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                alt="Chakra UI"
              />

              <CardFooter
                justify="space-between"
                flexWrap="wrap"
                sx={{
                  "& > button": {
                    minW: "136px",
                  },
                }}
              >
                <Button flex="1" variant="ghost" leftIcon={<BiLike />}>
                  Like
                </Button>
                <Button flex="1" variant="ghost" leftIcon={<BiChat />}>
                  Comment
                </Button>
                <Button flex="1" variant="ghost" leftIcon={<BiShare />}>
                  Share
                </Button>
              </CardFooter>
            </Card> */}
            </Box>
          </Box>
        </Box>
        </Box >
  
    
  );
}

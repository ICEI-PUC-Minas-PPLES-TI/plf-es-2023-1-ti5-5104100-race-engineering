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
      .delete(`/races/${id}`)
      .then(() => {
        setRaces((prevRaces) => prevRaces.filter((race: any) => race.id !== id));
        toast({
          title: "Corrida excluído com sucesso",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      })
      .catch((err) => {
        toast({
          title: "Erro ao excluir a corrida, tente novamente",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      });
  };

  return (
    <Box width="100%" padding="4 100px">
      <Heading as="h1" size="2xl" textAlign="center" marginTop="2%">
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
  
      <Box width="100%">
        <Box
          width="100%"
          display="flex"
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
        >
          <Box w="2vw" className="sidebar-container" style={{ position: "fixed", top: 0, left: 0, bottom: 0 }}>
            <Sidebar />
          </Box>
  
          <Box width="100%" padding="4%">
            <TableContainer maxW="70%" margin="auto">
              <Table size="sm" variant="striped" colorScheme="messenger">
                <Thead>
                  <Tr>
                    <Th width="10%" textAlign="center">ID</Th>
                    <Th width="20%" textAlign="center">Name</Th>
                    <Th width="20%" textAlign="center">Start Date</Th>
                    <Th width="20%" textAlign="center">End Date</Th>
                    <Th width="15%" textAlign="center">Total Laps</Th>
                    <Th width="15%" textAlign="center">Delete</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {races.map((race: any) => (
                    <Tr key={race.id}>
                      <Td textAlign="center">{race.id}</Td>
                      <Td textAlign="center">{race.name ?? "-"}</Td>
                      <Td textAlign="center">{new Date(race.startDate).toLocaleString()}</Td>
                      <Td textAlign="center">{new Date(race.endDate).toLocaleString()}</Td>
                      <Td textAlign="center">{race.totalLaps}</Td>
                      <Td textAlign="center">
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
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>

    </Box >


  );
}

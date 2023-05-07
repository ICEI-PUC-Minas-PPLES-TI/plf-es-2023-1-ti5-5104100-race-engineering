import Head from "next/head";
import { useEffect, useState } from "react";

import Sidebar from "@/components/sidebar/Sidebar";
import api from "@/services/api";
import useApi from "@/shared/hooks/useApi";
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
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);
  const [teams, setTeams] = useState([]);

  const { data } = useApi<any>(() => api.get("/teams"));

  useEffect(() => {
    if (data !== null) {
      setTeams(data);
    }
  }, [data]);

  const toast = useToast();

  const handleDeleteTeam = (id: number) => {
    api
      .delete(`/teams/${id}`)
      .then(() => {
        setTeams((prevTeams) => prevTeams.filter((team: any) => team.id !== id));
        toast({
          title: "Time excluído com sucesso",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      })
      .catch((err) => {
        toast({
          title: "Erro ao excluir time, tente novamente",
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
        Lista de Times
      </Heading>

      <Modal key="confirmation-modal" isOpen={isConfirmationModalOpen} onClose={() => setIsConfirmationModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmação</ModalHeader>
          <ModalBody>
            Tem certeza de que deseja excluir este time?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={() => {
              setIsConfirmationModalOpen(false);
              handleDeleteTeam(selectedTeamId!);
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
          <Box
            w="2vw"
            className="sidebar-container"
            style={{ position: "fixed", top: 0, left: 0, bottom: 0 }}
          >
            <Sidebar />
          </Box>
          <Box height="100vh" width="100%" padding="6%">
            <TableContainer maxW="70%" margin="auto">
              <Table size="sm" variant="striped" colorScheme="messenger">
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>Name</Th>
                    <Th>Category</Th>
                    <Th>Delete</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {teams.map((team: any) => (
                    <Tr key={team.id}>
                      <Td>{team.id}</Td>
                      <Td>{team.name ?? "-"}</Td>
                      <Td>{team.category ?? "-"}</Td>
                      <Td>
                        <Button
                          colorScheme="red"
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setSelectedTeamId(team.id);
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
    </Box>
  );

}

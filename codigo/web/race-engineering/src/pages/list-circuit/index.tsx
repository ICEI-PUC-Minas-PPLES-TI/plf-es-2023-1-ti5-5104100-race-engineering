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
  const [circuits, setCircuits] = useState([]);
  const [selectedCircuitId, setSelectedCircuitId] = useState<number | null>(null);

  const toast = useToast();

  useEffect(() => {
    (async () => {
      const { data } = await api.get("/circuits");
      console.log(data);
      setCircuits(data);
    })();

    return () => { };
  }, []);

  const handleDeleteCircuit = (id: number) => {
    api
      .delete(`/circuits/${id}`)
      .then(() => {
        setCircuits((prevCircuits) => prevCircuits.filter((circuit: any) => circuit.id !== id));
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
    <Box width="100%" padding="4 100px">
      <Heading as="h1" size="2xl" textAlign="center" marginTop="2%">
        Lista de Circuitos
      </Heading>
  
      <Modal key="confirmation-modal" isOpen={isConfirmationModalOpen} onClose={() => setIsConfirmationModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmação</ModalHeader>
          <ModalBody>
            Tem certeza de que deseja excluir este Circuito?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={() => {
              setIsConfirmationModalOpen(false);
              handleDeleteCircuit(selectedCircuitId!);
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
                    <Th width="15%" textAlign="center">ID</Th>
                    <Th width="35%" textAlign="center">Name</Th>
                    <Th width="25%" textAlign="center">Local</Th>
                    <Th width="40%" textAlign="center">Delete</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {circuits.map((circuit: any) => (
                    <Tr key={circuit.id}>
                      <Td textAlign="center">{circuit.id}</Td>
                      <Td textAlign="center">{circuit.name ?? "-"}</Td>
                      <Td textAlign="center">{circuit.local ?? "-"}</Td>
                      <Td textAlign="center">
                        <Button
                          colorScheme="red"
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setSelectedCircuitId(circuit.id);
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

import Head from "next/head";
import { useEffect, useState } from "react";

import Sidebar from "@/components/sidebar/Sidebar";
import api from "@/services/api";
import {
  Box,
  Button,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

export default function Index() {
  const [races, setRaces] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await api.get("/circuits");
      console.log(data);
      setRaces(data);
    })();

    return () => { };
  }, []);

  return (

    <Box height="100vh" width="100%" padding="4 100px">
      <Heading as="h1" size="2xl" textAlign="center" marginTop="2%" >
        Lista de Circuitos
      </Heading>

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

          <Box height="100vh" width="100%" padding="4%" >
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
                  {races.map((race: any) => (
                    <Tr key={race.id}>
                      <Td textAlign="center">{race.id}</Td>
                      <Td textAlign="center">{race.name ?? "-"}</Td>
                      <Td textAlign="center">{race.local ?? "-"}</Td>
                      <Td textAlign="center">
                        <Button
                          colorScheme="red"
                          size="sm"
                          variant="ghost"
                          onClick={() => {
      
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

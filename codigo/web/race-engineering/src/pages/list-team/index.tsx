import Head from "next/head";
import { useEffect, useState } from "react";

import Sidebar from "@/components/sidebar/Sidebar";
import api from "@/services/api";
import {
  Box,
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
      const { data } = await api.get("/teams");
      console.log(data);
      setRaces(data);
    })();

    return () => {};
  }, []);

  return (
    <>
      <Head>
        <title>Lista de Times</title>
      </Head>

      <Box height="100vh" width="100%">
        <Box
          height="100%"
          width="100%"
          display="flex"
          justifyContent="center"
          flex-flexDirection="column"
          alignItems="center"
        >
          <Box w="2vw" className="sidebar-container">
            <Sidebar />
          </Box>
          <Box w="98vw">
            <TableContainer maxW="800px" margin="auto">
              <Table size="sm" variant="striped" colorScheme="messenger">
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>Name</Th>
                    <Th>Category</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {races.map((race: any) => (
                    <Tr key={race.id}>
                      <Td>{race.id}</Td>
                      <Td>{race.name ?? "-"}</Td>
                      <Td>{race.category ?? "-"}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    </>
  );
}

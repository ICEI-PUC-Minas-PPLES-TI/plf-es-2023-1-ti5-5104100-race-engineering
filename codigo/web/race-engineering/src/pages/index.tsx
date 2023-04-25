import Sidebar from "@/components/sidebar/Sidebar";
import { useAuth } from "@/context/AuthContext";
import { Box } from "@chakra-ui/react";

import Home from "./home/index";
import LoginPage from "./login";

export default function Index() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {!isAuthenticated ? (
        <LoginPage />
      ) : (
        <Box height="100vh" width="100%">
          <Box
            height="100%"
            width="100%"
            display="flex"
            justifyContent="center"
            flex-flexDirection="column"
            alignItems="center"
          >
            <Box w="5vw" className="sidebar-container">
              <Sidebar />
            </Box>

            <Box w="95vw">
              <Home />
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}

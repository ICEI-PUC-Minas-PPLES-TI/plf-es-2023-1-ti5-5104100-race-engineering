import { useEffect, useState } from "react";

import Sidebar from "@/components/sidebar/Sidebar";
import { useAuth } from "@/context/AuthContext";
import { Box } from "@chakra-ui/react";

import Home from "./home/index";
import LoginPage from "./login";

export default function Index() {
  const { isAuthenticated } = useAuth();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return null;
  }

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
            <Box w="2vw" className="sidebar-container" style={{ position: "fixed", top: 0, left: 0, bottom: 0 }}>
              <Sidebar />
            </Box>

            <Box w="98vw">
              <Home />
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}

import Link from "next/link";
import { useRouter } from "next/router";
import { RiChat4Fill, RiSunFill } from "react-icons/ri";

import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";

const Sidebar = () => {
  const router = useRouter();
  const { isOpen, onToggle } = useDisclosure();

  const MenuToggle = ({ toggle }: any) => {
    return (
      <Box display={{ base: "block", md: "none" }} onClick={toggle}>
        {isOpen ? <CloseIcon /> : <HamburgerIcon />}
      </Box>
    );
  };

  return (
    <Box bg="white" px={8} height="100vh" className="sidebar">
      <Flex
        h={16}
        alignItems="center"
        direction="column"
        justifyContent="space-between"
        height="100vh"
        padding="32px 0"
      >
        <Stack direction="column" spacing={4}>
          <Stack direction="column" alignItems="center" spacing={2}>
            <RiSunFill />

            <Box fontWeight="bold" fontSize="70%">
              Clima{" "}
            </Box>
          </Stack>

          <Stack direction="column" alignItems="center" spacing={2}>
            <RiChat4Fill />

            <Box fontWeight="bold" fontSize="70%">
              Chat
            </Box>
          </Stack>
        </Stack>
        <Box display={{ base: "none", md: "flex" }} alignItems="center">
          <Stack direction="column" spacing={6}>
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<HamburgerIcon />}
                variant="outline"
              />
              <MenuList>
                <MenuGroup title="Perfil">
                  <MenuItem>Meu dados</MenuItem>
                  <MenuItem>Histórico</MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuGroup title="Configurações">
                  <MenuItem>Logout</MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
};

export default Sidebar;

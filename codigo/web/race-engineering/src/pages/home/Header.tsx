import Link from "next/link";
import { useRouter } from "next/router";

import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Collapse,
  Flex,
  Icon,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Spacer,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";

const Header = () => {
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
    <Box bg="white" px={8} height="100vh">
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
            <Image
              borderRadius={0}
              boxSize="40px"
              src="./images/cadastro-corrida.png"
              alt="Logo"
              onClick={() => router.push("/register-race")}
              cursor="pointer"
            />
            <Box fontWeight="bold" fontSize="70%">
              Cadastrar corridas
            </Box>
          </Stack>

          <Stack direction="column" alignItems="center" spacing={2}>
            <Image
              borderRadius={0}
              boxSize="40px"
              src="./images/lista-corridas.png"
              alt="Logo"
              onClick={() => router.push("/corridasCadastradas")}
              cursor="pointer"
            />
            <Box fontWeight="bold" fontSize="70%">
              Lista de Corridas
            </Box>
          </Stack>

          <Stack direction="column" alignItems="center" spacing={2}>
            <Image
              borderRadius={0}
              boxSize="40px"
              src="./images/clima.png"
              alt="Logo"
              onClick={() => router.push("/weather3")}
              cursor="pointer"
            />
            <Box fontWeight="bold" fontSize="70%">
              Clima
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

export default Header;

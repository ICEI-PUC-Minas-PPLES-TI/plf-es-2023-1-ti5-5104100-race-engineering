import Link from "next/link";
import {
  Box,
  Flex,
  Spacer,
  Button,
  IconButton,
  Menu,
  useDisclosure,
  Image,
  Stack,
  Collapse,
  Icon,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuDivider,
  MenuList,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

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
    <Box bg="white" px={8}>
      <Flex h={16} alignItems="center" justifyContent="space-between">

        <Stack direction="row" spacing={4}>
          <Stack direction="column" alignItems="center" spacing={2}>
            <Image
              borderRadius={0}
              boxSize="40px"
              src="./images/cadastro-corrida.png"
              alt="Logo"
              onClick={() => router.push("/register-race")}
              cursor="pointer"
            />
            <Box fontWeight="bold" fontSize="70%">Cadastrar corridas</Box>
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
            <Box fontWeight="bold" fontSize="70%">Lista de Corridas</Box>
          </Stack>

          <Stack direction="column" alignItems="center" spacing={2}>
            <Image
              borderRadius={0}
              boxSize="40px"
              src="./images/clima.png"
              alt="Logo"
              onClick={() => router.push("/register-race")}
              cursor="pointer"
            />
            <Box fontWeight="bold" fontSize="70%">Clima</Box>
          </Stack>

        </Stack>
        

        <Box>
          <Link href="/"></Link>
        </Box>
        <Spacer />
        <Box display={{ base: "none", md: "flex" }} alignItems="center">
          <Stack direction="row" spacing={6}>
            <Button
              variant="ghost"
              onClick={() => {
                router.push("/register-user");
              }}
              colorScheme="blue"
            >
              Home
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                router.push("/register-user");
              }}
              colorScheme="blue"
            >
              Corridas
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                router.push("/register-user");
              }}
              colorScheme="blue"
            >
              Chat
            </Button>

            <Menu>
              <MenuButton as={Button} colorScheme="messenger">
                Profile
              </MenuButton>
              <MenuList>
                <MenuGroup title="Profile">
                  <MenuItem>My Account</MenuItem>
                  <MenuItem>History </MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuGroup title="Settings">
                  <MenuItem></MenuItem>
                  <MenuItem>Logout</MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          </Stack>
        </Box>
        <MenuToggle toggle={onToggle} />
      </Flex>
      {" "}
      <Collapse in={isOpen} animateOpacity>
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={Box} mt={4} spacing={4} direction="column" align="none">
            <Link href="/">Home</Link>
            <Link href="/about">Races</Link>
            <Link href="/services">Climate</Link>
          </Stack>
        </Box>
      </Collapse>
    </Box>
  );
};

export default Header;

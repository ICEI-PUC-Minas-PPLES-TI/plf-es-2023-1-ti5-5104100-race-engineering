import Link from 'next/link'
import { Box, Flex, Spacer, Button, IconButton, useDisclosure,Stack, Collapse, Icon } from "@chakra-ui/react"
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'



    const Header = () => {
          const { isOpen, onToggle } = useDisclosure()
        
         const MenuToggle = ({ toggle }:any) => {
              return (
            <Box display={{ base: "block", md: "none" }} onClick={toggle}>
                  {isOpen ? <CloseIcon /> : <HamburgerIcon />}
            </Box>
              )
            }
        
          return (
        <Box bg="white" px={4}>
        <Flex h={16} alignItems="center" justifyContent="space-between">
        <IconButton
                  size="md"
                  
                  aria-label="Open menu"
                  display={{ md: "none" }}
                  onClick={onToggle}
                />
        <Box>
        <Link href="/">
        <Icon  boxSize={10} />
        </Link>
        </Box>
        <Spacer />
        <Box display={{ base: "none", md: "flex" }} alignItems="center">
        <Stack direction="row" spacing={6}>
        <Link href="/">Home</Link>
        <Link href="/about">Corridas</Link>
        <Link href="/services">Tempo</Link>
        <Link href="/contact">Pilotos</Link>
        <Link href="/contact">Mecânicos</Link>
        <Link href="/contact">Chat</Link>
        <Link href="/contact">Logout</Link>

        </Stack>
        </Box>
        <MenuToggle toggle={onToggle} />
        </Flex>
        
         
        
              <Collapse in={isOpen} animateOpacity>
        <Box pb={4} display={{ md: "none" }}>
        <Stack as={Box} mt={4} spacing={4} direction="column" align="center">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/services">Services</Link>
        <Link href="/contact">Contact</Link>
        </Stack>
        </Box>
        </Collapse>
        </Box>
          )
        };

export default Header;

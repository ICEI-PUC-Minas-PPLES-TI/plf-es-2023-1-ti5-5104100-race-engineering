import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Timer from "@/pages/timer";

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Flex
      padding="10px"
      margin="20px"
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={2}
        >
          <Stack spacing={3}>
            <HStack>
              <Box>
                <FormControl id="lap">
                  <FormLabel>Tipo Pneu</FormLabel>
                  <Input type="text" />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="piloto">
                  <FormLabel>Piloto</FormLabel>
                  <Input type="text" />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="voltas">
                  <FormLabel>Número de voltas</FormLabel>
                  <Input type="text" />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="voltas">
                  <FormLabel>Quantidade gasolina no tanque</FormLabel>
                  <Input type="text" />
                </FormControl>
              </Box>
              <Box>
                <Stack spacing={2} pt={1}>
                  <Button
                    loadingText="Submitting"
                    size="lg"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    Salvar Lap
                  </Button>
                </Stack>
              </Box>
            </HStack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

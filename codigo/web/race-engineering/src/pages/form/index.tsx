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
  Select,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Timer from "@/pages/timer";
import { dataToSelectOptions } from "@/shared/utils/dataToSelectOptions";

type Estrategy = {
  tire: string; //pneu verificar no backend
  gas: number; // qtd de gasolina verificar tbm
};

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedTire, setSelectedTire] = useState("");
  const { register, handleSubmit } = useForm<FormData>();
  const handleChange = (event: any) => {
    setSelectedTire(event.target.value);
  };
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
                  <FormLabel>Selecionar o Pneu</FormLabel>
                  <InputGroup id="tire">
                    <Select
                      value={selectedTire}
                      {...register("tire")}
                      onChange={handleChange}
                    >
                      {/* //deve ser dry e wet  OBS ELE NAO VEM DO BACKEND*/}
                      <option hidden>Tipo de Pneu</option>
                      <option label="seco" id="seco">
                        Seco
                      </option>
                      <option label="molhado" id="molhado">
                        Molhado
                      </option>
                    </Select>
                  </InputGroup>
                  {/* <FormLabel>Tipo Pneu</FormLabel>
                  <Input type="text" /> */}
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

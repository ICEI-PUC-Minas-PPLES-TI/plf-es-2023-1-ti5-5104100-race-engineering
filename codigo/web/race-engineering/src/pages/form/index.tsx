import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import Timer from '@/pages/timer';
import api from '@/services/api';
import { dataToSelectOptions } from '@/shared/utils/dataToSelectOptions';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
    Box, Button, Flex, FormControl, FormLabel, Heading, HStack, Input, InputGroup,
    InputRightElement, Link, Select, Stack, Text, useColorModeValue, useToast
} from '@chakra-ui/react';

type Estrategy = {
  tire: string; //pneu verificar no backend
  gas: number; // qtd de gasolina verificar tbm
  laps: number; //nao é o totallaps mas sim o laps atual
  // drivers: Array<any>; //sao os cadastradas NA CORRIDA e n todos4
  drivers: string; //Piloto 1 ou 2 É mais facil(e n puxa do back)
};

export default function SignupCard({
  raceId,
  onAfterSubmit,
}: {
  raceId: String;
  onAfterSubmit: () => {};
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedTire, setSelectedTire] = useState("");
  const { register, handleSubmit } = useForm<FormData>();
  const handleChange = (event: any) => {
    setSelectedTire(event.target.value);
  };

  const toast = useToast();
  const router = useRouter();

  const onSubmit = handleSubmit((data, event) => {
    api
      .post(`/races/laps/${Number(15)}`, {
        lapNumber: 1,
        driverId: 18,
        lapTime: "00:01:20.345",
      }) //verificar se é essa rota
      .then(() => {
        event?.target?.reset();
        onAfterSubmit();
      })
      .catch((err) => {
        toast({
          title: "Erro ao cadastrar volta, tente novamente",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      });
  });

  return (
    <Flex
      padding="10px"
      margin="20px"
      bg={useColorModeValue("gray.50", "gray.800")}
      flexDirection="row"
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
              <FormControl as="form" onSubmit={onSubmit}>
                <Box>
                  {/* <FormControl id="tire"> */}
                  <FormLabel>Selecionar o Pneu</FormLabel>
                  <InputGroup id="tire">
                    <Select
                      value={selectedTire}
                      {...register("tire")} //n é erro
                      onChange={handleChange}
                    >
                      {/* //deve ser dry e wet  OBS ELE NAO VEM DO BACKEND*/}
                      <option hidden>Tipo de Pneu</option>
                      <option label="dry" id="dry">
                        Dry
                      </option>
                      <option label="wet" id="wet">
                        Wet
                      </option>
                    </Select>
                  </InputGroup>
                  {/* <FormLabel>Tipo Pneu</FormLabel>
                  <Input type="text" /> */}
                  {/* </FormControl> */}
                </Box>

                <Box>
                  {/* <FormControl id="tire"> */}
                  <FormLabel>Selecionar o Pneu</FormLabel>
                  <InputGroup id="drivers">
                    <Select
                      value={selectedTire}
                      {...register("drivers")} //n é erro
                      onChange={handleChange}
                    >
                      {/*Tem que ver no back mas é temporario*/}
                      <option hidden>Selecione o Piloto</option>
                      <option label="piloto1" id="piloto1">
                        piloto1
                      </option>
                      <option label="piloto2" id="piloto2">
                        piloto2
                      </option>
                    </Select>
                  </InputGroup>
                  {/* </FormControl> */}
                  {/* <FormControl id="piloto">
                  <FormLabel>Piloto</FormLabel>
                  <Input type="text" />
                </FormControl> */}
                </Box>

                {/* <Box w="100%" marginY="4"> */}

                <Box>
                  <FormLabel>Total de voltas</FormLabel>
                  <InputGroup>
                    <Input
                      type="number"
                      {...register("laps", { required: true })}
                    />
                  </InputGroup>
                </Box>
                {/* <Box>
                <FormControl id="voltas">
                  <FormLabel>Número de voltas</FormLabel>
                  <Input type="text" />
                </FormControl>
              </Box> */}

                <Box>
                  <FormLabel>Quantidade de Gasolina</FormLabel>
                  <InputGroup>
                    <Input
                      type="number"
                      {...register("gas", { required: true })}
                    />
                  </InputGroup>
                </Box>
                {/* <Box>
                <FormControl id="voltas">
                  <FormLabel>Quantidade gasolina no tanque</FormLabel>
                  <Input type="text" />
                </FormControl>
              </Box> */}

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
                      type="submit" //tava faltando o type submit
                    >
                      Salvar Lap
                    </Button>
                  </Stack>
                </Box>
              </FormControl>
            </HStack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

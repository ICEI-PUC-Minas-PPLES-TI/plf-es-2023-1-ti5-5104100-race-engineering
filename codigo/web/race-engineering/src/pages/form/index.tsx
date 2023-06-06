import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import Timer from "@/pages/timer";
import api from "@/services/api";
import { dataToSelectOptions } from "@/shared/utils/dataToSelectOptions";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";

type Estrategy = {
  tire: string; //pneu verificar no backend
  gas: number; // qtd de gasolina verificar tbm
  laps: number; //nao é o totallaps mas sim o laps atual
  // drivers: Array<any>; //sao os cadastradas NA CORRIDA e n todos4
  drivers: string; //Piloto 1 ou 2 É mais facil(e n puxa do back)
};
type Race = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  totalLaps: number;
};
export default function SignupCard({
  raceId,
  onAfterSubmit,
  races,
}: {
  raceId: String;
  onAfterSubmit: () => {};
  races: Race[];
}) {
  const [selectedTire, setSelectedTire] = useState("");
  const [drivers, setDrivers] = useState([]);
  const { register, handleSubmit } = useForm<FormData>();
  const handleChange = (event: any) => {
    setSelectedTire(event.target.value);
  };
  const animatedComponents = makeAnimated();
  const [selectedDrivers, setSelectedDrivers] = useState([]);

  const toast = useToast();

  const fetchDrivers = async () => {
    const { data } = await api.get("/drivers");
    setDrivers(data);
  };

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

  useEffect(() => {
    fetchDrivers();
  }, [raceId]);

  return (
    <Box
      rounded={"lg"}
      bg={useColorModeValue("white", "gray.700")}
      p={2}
      width="100%"
    >
      <Stack spacing={3}>
        <HStack>
          <FormControl as="form" onSubmit={onSubmit}>
            <Box mt="16px">
              <FormLabel>Selecionar o Pneu</FormLabel>
              <InputGroup id="tire">
                {/* <Box w="100%">
                  <Select
                    value={selectedTire}
                    {...register("tire")}
                    onChange={handleChange}
                    placeholder="Selecione o tipo de pneu"
                  >
                    <option hidden>Tipo de Pneu</option>
                    <option label="dry" id="dry">
                      Dry
                    </option>
                    <option label="wet" id="wet">
                      Wet
                    </option>
                  </Select>
                </Box> */}
              </InputGroup>
            </Box>

            <Box mt="16px">
              <FormLabel>Selecionar o Pneu</FormLabel>
              <InputGroup id="drivers">
                <Box w="100%">
                  <Select
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    options={dataToSelectOptions({
                      list: drivers,
                      params: { label: "name", value: "id" },
                    })}
                    onChange={(option: any) => {
                      setSelectedDrivers(option);
                    }}
                    value={selectedDrivers}
                    placeholder="Selecione os corredores"
                  />
                </Box>
              </InputGroup>
            </Box>

            {/* <Box mt="16px">
              <FormLabel>Total de voltas</FormLabel>
              <InputGroup>
                <Input
                  type="number"
                  {...register("laps", { required: true })}
                />
              </InputGroup>
            </Box>

            <Box mt="16px">
              <FormLabel>Quantidade de Gasolina</FormLabel>
              <InputGroup>
                <Input type="number" {...register("gas", { required: true })} />
              </InputGroup>
            </Box> */}

            <Box mt="16px">
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                type="submit"
              >
                Salvar Lap
              </Button>
            </Box>
          </FormControl>
        </HStack>
      </Stack>
    </Box>
  );
}

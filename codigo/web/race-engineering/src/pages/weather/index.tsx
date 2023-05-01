// import Image from "next/image";
import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BsSearch } from "react-icons/bs";

import Sidebar from "@/components/sidebar/Sidebar";
import Weather from "@/components/Weather/Weather";
import {
  Box,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
} from "@chakra-ui/react";

type Params = {
  city: string;
};

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});
  const { register, handleSubmit } = useForm<Params>();

  const onSubmit = handleSubmit((data, event) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${data.city}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;
    setCity(data.city);
    axios
      .get(url)
      .then((response) => {
        const { data } = response;
        event?.target?.reset();
        setWeather(data);
      })
      .catch((err) => {
        toast({
          title: "Erro ao pesquisar clima, tente novamente",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      });
  });

  return (
    <div>
      <Head>
        <title>Clima {city ? "- " + city : ""}</title>
      </Head>

      <Box height="100vh" width="100%">
        <Box
          height="100%"
          width="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box w="2vw" className="sidebar-container" style={{ position: "fixed", top: 0, left: 0, bottom: 0 }}>
            <Sidebar />
          </Box>

          <Box w="98vw" height="100vh">
            <Box
              mr="16px"
              ml="57px"
              display="flex"
              flexDir="column"
              justifyContent="center"
              alignItems="center"
            >
              <FormControl width={480} as="form" onSubmit={onSubmit} isRequired>
                <Box w="100%" marginY="4" dir="row">
                  <FormLabel>Nome da cidade</FormLabel>
                  <InputGroup>
                    <Input
                      type="text"
                      placeholder="Digite o nome da cidade"
                      {...register("city", { required: true })}
                    />
                    <IconButton
                      ml="16px"
                      aria-label="Search database"
                      icon={<BsSearch />}
                      type="submit"
                      colorScheme="messenger"
                    />
                  </InputGroup>
                </Box>
              </FormControl>
              {weather && <Weather data={weather} />}
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
function toast(arg0: {
  title: string;
  status: string;
  duration: number;
  isClosable: boolean;
  position: string;
}) {
  throw new Error("Function not implemented.");
}

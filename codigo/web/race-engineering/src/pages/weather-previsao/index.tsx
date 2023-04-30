import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BsSearch } from "react-icons/bs";
import Sidebar from "@/components/sidebar/Sidebar";
import Head from "next/head";
import {
    Box,
    FormControl,
    FormLabel,
    IconButton,
    Input,
    InputGroup,
    Flex,
    Text
} from "@chakra-ui/react";

type Params = {
    city: string;
  };
  
  const descriptionTranslations = {
    "clear sky": "céu limpo",
    "few clouds": "algumas nuvens",
    "scattered clouds": "nuvens dispersas",
    "broken clouds": "nuvens quebradas",
    "overcast clouds": "céu nublado",
    "light rain": "chuva fraca",
    "moderate rain": "chuva moderada",
    "heavy intensity rain": "chuva forte",
    // Adicione aqui as demais traduções
  };
  
  type Props = {
    data: {
      city: {
        name: string;
      };
      list: {
        dt_txt: string;
        main: {
          temp: number;
        };
        weather: {
          description: keyof typeof descriptionTranslations;
          icon: string;
        }[];
      }[];
    };
  };

export default function Home() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState<Props["data"] | null>(null);
    const { register, handleSubmit } = useForm<Params>();

    const onSubmit = handleSubmit((data, event) => {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${data.city}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;
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
                <title>{city ? `Clima - ${city}` : 'Clima'}</title>
            </Head>

            <Box height="100vh" width="100%">
  <Box
    height="100%"
    width="100%"
    display="flex"
    justifyContent="center"
    alignItems="center"
  >
    <Box w="2vw" className="sidebar-container">
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

        {weather && (
          <Box mt={10}>
            <Text fontSize="3xl" fontWeight="bold" mb={4}>
              Previsão do tempo para {city}
            </Text>
            <Flex wrap="wrap">
              {weather.list.map((item) => (
                <Box
                  key={item.dt_txt}
                  m={4}
                  border="1px solid #ccc"
                  borderRadius="md"
                  p={4}
                  textAlign="center"
                >
                  <Text>{new Date(item.dt_txt).toLocaleString('pt-BR')}</Text>
                  <Text>{(item.main.temp - 273.15).toFixed(1)}°C</Text>
                  <Text>{descriptionTranslations[item.weather[0].description] || item.weather[0].description}</Text>

                  <img
                    src={`https://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                    alt={item.weather[0].description}
                  />
                </Box>
              ))}
            </Flex>
          </Box>
        )}
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


  
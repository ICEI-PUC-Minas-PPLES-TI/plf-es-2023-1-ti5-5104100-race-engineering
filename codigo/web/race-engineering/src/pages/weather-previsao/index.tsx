import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BsSearch } from "react-icons/bs";
import Sidebar from "@/components/sidebar/Sidebar";
import Head from "next/head";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';

import {
  Box,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  Flex,
  Text,
  Icon
} from "@chakra-ui/react";
import { MdOutlineWaterDrop, MdWindPower } from "react-icons/md";
import { CloseIcon, CheckIcon } from "@chakra-ui/icons";


type Params = {
  city: string;
  date: string;
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
        humidity: number;
      };
      weather: {
        description: keyof typeof descriptionTranslations;
        icon: string;
      }[];
      wind: {
        speed: number;
      }
    }[];
  };
};

export default function Home() {
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState<Props["data"] | null>(null);
  const [originalWeather, setOriginalWeather] = useState<Props["data"] | null>(null);
  const { register, handleSubmit } = useForm<Params>();
  const [showFilter, setShowFilter] = useState(false);
  const [searchSuccess, setSearchSuccess] = useState(false);

  const onSubmit = handleSubmit((data, event) => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${data.city}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}${data.date ? `&dt=${new Date(data.date).getTime() / 1000}` : ''}`;
    setCity(data.city);
    setDate(data.date);
    setShowFilter(true);
    axios
      .get(url)
      .then((response) => {
        const { data } = response;
        event?.target?.reset();
        setWeather(data);
        setOriginalWeather(data);
        setShowFilter(true); // exibe o filtro apenas se a pesquisa for bem-sucedida
        setSearchSuccess(true); // define que a pesquisa foi bem-sucedida
      })
      .catch((error) => {
        console.log(error);
        let errorMessage = "Erro ao pesquisar clima, tente novamente";
        if (error.response) {
          if (error.response.status === 404) {
            errorMessage = "Cidade não encontrada, verifique se o nome está correto e tente novamente";
          } else {
            errorMessage = `Erro na chamada da API: ${error.response.status} - ${error.response.data.message}`;
          }
        }
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setSearchSuccess(false); // define que a pesquisa não foi bem-sucedida
      });
  });


  const handleDateClick = (event: { target: { value: string; }; }) => {
    const selectedDate = new Date(event.target.value + 'T00:00:00-03:00').toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }).substr(0, 10);
    if (originalWeather) { // usar os dados originais para filtrar
      const filteredData = originalWeather.list.filter((item) => {
        const itemDate = new Date(item.dt_txt).toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }).substr(0, 10);
        return itemDate === selectedDate;
      });
      const filteredWeather = {
        ...originalWeather,
        list: filteredData
      };
      setWeather(filteredWeather);
    }
  };

  const handleClearFilter = () => {
    setCity("");
    setDate("");
    setWeather(originalWeather);
  };

  return (
    <div>
      <Head>
        <title>{city ? `Clima - ${city}` : 'Clima'}</title>
      </Head>

      <Box height="100vh" width="100%" padding="0 12%">
        <Box
          height="100%"
          width="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            w="2vw"
            className="sidebar-container"
            style={{ position: "fixed", top: 0, left: 0, bottom: 0 }}
          >
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
                <ToastContainer />
              </FormControl>



              {/* exibe o filtro somente se a cidade foi pesquisada */}
              {searchSuccess && showFilter && (
                <FormControl dir="row" w="50%">
                  <FormLabel>Filtro</FormLabel>
                  <InputGroup>
                    <Input
                      type="date"
                      placeholder="Digite a data"
                      {...register("date")}
                      onBlur={handleDateClick}
                    />
                    <IconButton
                      ml="16px"
                      icon={<CheckIcon />}
                      aria-label="Selecione uma data"
                    >
                    </IconButton>
                    <IconButton
                      icon={<CloseIcon />}
                      aria-label="Limpar filtro"
                      onClick={handleClearFilter}
                      ml={2}
                    />
                  </InputGroup>
                </FormControl>
              )}

              {searchSuccess && weather && (
                <Box mt={10}>
                  <Text fontSize="3xl" fontWeight="bold" mb={4}>
                    Previsão do tempo {city.split(' ').map((word, index) => {
                      if (index !== 0) {
                        return ' ' + word.charAt(0).toUpperCase() + word.slice(1);
                      }
                      return word.charAt(0).toUpperCase() + word.slice(1);
                    })}
                  </Text>

                  <Flex wrap="wrap">
                    {weather.list.map((item) => (
                      <Box
                        key={item.dt_txt}
                        m={4}
                        border="2px solid #ccc"
                        borderRadius="md"
                        p={4}
                        textAlign="center"
                        bg="white"
                        width={weather.list.length === 1 ? "50%" : weather.list.length === 2 ? "48%" : "17%"}
                      >
                        <Text>{new Date(item.dt_txt).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}</Text>
                        <Text>{(item.main.temp - 273.15).toFixed(1)}°C</Text>
                        <Text>{descriptionTranslations[item.weather[0].description] || item.weather[0].description}</Text>

                        <Flex alignItems="center">
                          <Text>
                            <Icon as={MdWindPower} mr={2} />
                            {`${(item.wind.speed * 3.6).toFixed(2)}km/h`}
                          </Text>
                          <Text ml={4}>
                            <Icon as={MdOutlineWaterDrop} mr={2} />
                            {`${item.main.humidity}%`}
                          </Text>
                        </Flex>
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

const descriptionTranslations = {
  "clear sky": "Céu Limpo",
  "few clouds": "Algumas Nuvens",
  "scattered clouds": "Nuvens Dispersas",
  "broken clouds": "Nuvens Fragmentadas",
  "overcast clouds": "Céu Nublado",
  "light rain": "Chuva Fraca",
  "moderate rain": "Chuva Moderada",
  "heavy intensity rain": "Chuva Forte",
  "very heavy rain": "Chuva Muito Forte",
  "extreme rain": "Chuva Extrema",
  "freezing rain": "Chuva Congelante",
  "light snow": "Neve Fraca",
  "heavy snow": "Neve Forte",
  "sleet": "Aguaneve",
  "shower rain": "Chuva de Banho",
  "thunderstorm": "Trovoadas",
  "thunderstorm with light rain": "Trovoadas com Chuva Fraca",
  "thunderstorm with heavy rain": "Trovoadas com Chuva Forte",
  "thunderstorm with rain": "Trovoadas com Chuva",
  "snow": "Neve",
  "mist": "Neblina",
  "haze": "Nevoeiro",
  "fog": "Névoa",
  "smoke": "Fumaça",
  "dust": "Poeira",
  "sand": "Areia",
  "ash": "Cinzas",
  "tornado": "Tornado",
  "squalls": "Rajadas de Vento",
};
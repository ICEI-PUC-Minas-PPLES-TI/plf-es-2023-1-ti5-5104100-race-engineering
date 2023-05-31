import "react-toastify/dist/ReactToastify.css";

/* eslint-disable react/no-children-prop */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { toast, ToastContainer } from "react-toastify";

import Sidebar from "@/components/sidebar/Sidebar";
import api from "@/services/api";
import { dataToSelectOptions } from "@/shared/utils/dataToSelectOptions";
import { getIdList } from "@/shared/utils/getIdList";
import { AtSignIcon, EmailIcon, LockIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  FormControl,
  FormLabel,
  Heading,
  Highlight,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";

import { options } from "./option-mock";

type Register = {
  startDate: string;
  endDate: string;
  totalLaps: number;
  name: string;
  analystId: number;
  circuitId: number;
  mechanics: Array<any>;
  drivers: Array<any>;
  teams: Array<any>;
};

const RegisterPage = () => {
  const animatedComponents = makeAnimated();

  const router = useRouter();
  const { register, handleSubmit } = useForm<Register>();
  const toast = useToast();

  const [show, setShow] = useState(false);
  const [selectedDrivers, setSelectedDrivers] = useState([]);
  const [selectedMechanics, setSelectedMechanics] = useState([]);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [selectedAnalyst, setSelectedAnalyst] = useState(0);
  const [selectedCircuit, setSelectedCircuit] = useState(0);

  const handleClick = () => setShow(!show);

  // BACKEND
  const [drivers, setDrivers] = useState([]);
  const [mechanics, setMechanics] = useState([]);
  const [teams, setTeams] = useState([]);
  const [analysts, setAnalysts] = useState([]);
  const [circuits, setCircuits] = useState([]);

  useEffect(() => {
    (async () => {
      const { data: driversResponse } = await api.get("/drivers");

      const { data: mechanicsResponse } = await api.get("/users/mechanics");
      const { data: teamsResponse } = await api.get("/teams");
      const { data: analystsResponse } = await api.get("/users/analysts");
      const { data: circuitsResponse } = await api.get("/circuits");

      setAnalysts(analystsResponse);
      setDrivers(driversResponse);
      setMechanics(mechanicsResponse);
      setTeams(teamsResponse);
      setCircuits(circuitsResponse);
    })();

    return () => {};
  }, []);

  const onSubmit = handleSubmit((data, event) => {
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);

    data.mechanics = getIdList({
      list: mechanics,
    });

    data.teams = getIdList({
      list: teams,
    });

    data.analystId = getIdList({
      list: analysts,
    })[0].id;

    data.drivers = getIdList({
      list: drivers,
    }).slice(0, 5);

    data.totalLaps = Number(data.totalLaps);

    data.circuitId = getIdList({
      list: circuits,
    })[0].id;

    if (endDate < startDate) {
      toast({
        title:
          "A data de Início da Corrida não pode ser anterior à data do Fim da Corrida",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      return; // Cancel submission
    }

    api
      .post("/races", data)
      .then(() => {
        event?.target?.reset();
        toast({
          title: "Cadastro realizado com sucesso",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        router.push("/");
      })
      .catch((err) => {
        toast({
          title: "Erro ao fazer cadastro, tente novamente",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      });
  });

  return (
    <Box
      height="100vh"
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box w="2vw" className="sidebar-container">
        <Sidebar />
      </Box>

      <Box w="98vw" justifyContent="center" alignItems="center">
        <FormControl
          width={480}
          margin="auto"
          as="form"
          onSubmit={onSubmit}
          isRequired
        ></FormControl>
      </Box>
    </Box>
  );
};

export default RegisterPage;

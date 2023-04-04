import { useRouter } from "next/router";
import { useState } from "react";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
} from "@chakra-ui/react";

const LoginPage = () => {
  const options = ["Mecânico", "Analista", "Piloto"];
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [typeUser, setTypeUser] = useState("");
  const [selected, setSelected] = useState("");

  const handleChange = (event: any) => {
    setSelected(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(email, password, typeUser);
  };

  return (
    <Box
      height="100vh"
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <VStack spacing={4} align="stretch" maxWidth={500}>
        <FormControl id="email" width={380}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Digite seu email"
          />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Senha</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Digite sua senha"
          />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Tipo de usuário</FormLabel>
          <Select value={selected} onChange={handleChange}>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </FormControl>

        <Box display="flex" width="100%">
          <Button
            colorScheme="messenger"
            variant="ghost"
            onClick={() => {
              router.back();
            }}
            width="50%"
            mr="3"
          >
            Voltar
          </Button>
          <Button
            colorScheme="messenger"
            onClick={handleSubmit}
            width="50%"
            ml="3"
          >
            Cadastrar
          </Button>
        </Box>
      </VStack>
    </Box>
  );
};

export default LoginPage;

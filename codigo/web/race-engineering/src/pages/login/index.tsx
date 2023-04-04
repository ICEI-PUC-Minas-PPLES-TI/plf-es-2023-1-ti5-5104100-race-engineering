import { useRouter } from "next/router";
import { useState } from "react";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(email, password);
  };

  return (
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
      <Box display="flex" width="100%">
        <Button
          colorScheme="messenger"
          variant="ghost"
          onClick={() => {
            router.push("/register-user");
          }}
          width="50%"
          mr="3"
        >
          Cadastrar
        </Button>
        <Button
          colorScheme="messenger"
          onClick={handleSubmit}
          width="50%"
          ml="3"
        >
          Fazer login
        </Button>
      </Box>
    </VStack>
  );
};

export default LoginPage;

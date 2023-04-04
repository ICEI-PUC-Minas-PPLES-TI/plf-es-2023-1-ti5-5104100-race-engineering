/* eslint-disable react/no-children-prop */
import { useRouter } from "next/router";
import { useState } from "react";

import UserForm from "@/components/user-fields/user-fields";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  Stack,
  VStack,
} from "@chakra-ui/react";

const LoginPage = () => {
  const options = ["Mecânico", "Analista", "Piloto"];
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [typeUser, setTypeUser] = useState("");
  const [selected, setSelected] = useState("");
  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

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
      <Box background={"white"} padding={8} width={480}>
        <VStack spacing={4}>
          <UserForm />
          <FormControl id="userType">
            <Select value={selected} onChange={handleChange}>
              <option hidden>Tipo de usuário</option>
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
                router.push("/");
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
    </Box>
  );
};

export default LoginPage;

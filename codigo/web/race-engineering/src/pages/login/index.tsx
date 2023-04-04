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
  Stack,
  VStack,
} from "@chakra-ui/react";

type Form = {
  name: string;
  email: string;
  password: string;
  type: string;
};

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const router = useRouter();
  const handleClick = () => setShow(!show);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(email, password);
  };

  return (
    <VStack spacing={4} align="stretch" maxWidth={500}>
      <Stack spacing={4} width={380}>
        <UserForm />
      </Stack>
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

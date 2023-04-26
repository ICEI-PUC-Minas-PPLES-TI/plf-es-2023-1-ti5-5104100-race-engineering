import Image from "next/image";
import React from "react";

import { months } from "@/shared/mock/months";
import {
  Box,
  Center,
  Divider,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";

const Weather = ({ data }: any) => {
  const date = new Date();
  const currentMonth = months[date.getMonth()];
  const currentDay = date.getDay();
  const dayAndMonth = `${currentDay} de ${currentMonth}`;

  return (
    <>
      {data.main && (
        <Box w="100%" backgroundColor="#ffffff" borderRadius="8" padding="16px">
          <StatGroup>
            <Stat>
              <StatLabel>Temperatura</StatLabel>
              <StatNumber>
                <StatArrow type="increase" />
                {data.main.temp}º
              </StatNumber>
              <StatHelpText>{dayAndMonth}</StatHelpText>
            </Stat>
            <Center height="100px" mr="32px">
              <Divider orientation="vertical" />
            </Center>
            <Stat>
              <StatLabel>Temperatura mínima</StatLabel>
              <StatNumber>
                <StatArrow type="decrease" />
                {data.main.temp_min}º
              </StatNumber>
              <StatHelpText>{dayAndMonth}</StatHelpText>
            </Stat>
            <Center height="100px" mr="32px">
              <Divider orientation="vertical" />
            </Center>
            <Stat>
              <StatLabel>Temperatura máxima</StatLabel>
              <StatNumber>
                <StatArrow type="increase" />
                {data.main.temp_max}º
              </StatNumber>
              <StatHelpText>{dayAndMonth}</StatHelpText>
            </Stat>
          </StatGroup>
        </Box>
      )}
    </>
  );
};

export default Weather;

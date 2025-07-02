// Chakra imports
import { Flex } from "@chakra-ui/react";
import React from "react";
import Authors from "./components/Authors";
import Projects from "./components/Projects";
import { tablesTableData, dashboardTableData } from "variables/general";

function Tables() {
  return (
    <Flex direction='column' pt={{ base: "0px", md: "0px" }}>
      <Projects
        title={"Validation Status"}
        captions={["Event", "Tentative Outcome", "Commitment", "Attestation Threshold", ""]}
        data={dashboardTableData}
      />
    </Flex>
  );
}

export default Tables;

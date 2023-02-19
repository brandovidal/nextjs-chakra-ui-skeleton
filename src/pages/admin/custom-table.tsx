import React, { useState, useEffect } from "react";

import {
  Box,
  Flex,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import Card from "components/card/Card";

import {
  getData,
  formatRowData,
} from "../../views/admin/customTables/variables/data";

import AdminLayout from "layouts/admin";

import Table from "../../views/admin/customTables/components/Table";
import { columns } from "views/admin/customTables/variables/columnsData";

export default function CustomTable() {
  const [pageData, setPageData] = useState({
    rowData: [],
    isLoading: false,
    totalPages: 0,
    totalRows: 0,
  });

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setPageData((prevState) => ({
      ...prevState,
      rowData: [],
      isLoading: true,
    }));

    console.log(
      "🚀 ~ file: custom-table.tsx:60 ~ useEffect ~ currentPage",
      currentPage
    );
    getData(currentPage)
      .then((info) => {
        const { totalPages, totalPassengers = 0, data } = info;

        setPageData({
          isLoading: false,
          rowData: formatRowData(data),
          totalPages,
          totalRows: 100,
        });
      })
      .catch((error) => {
        setPageData({
          isLoading: false,
          rowData: [],
          totalPages: 0,
          totalRows: 0,
        });
      });
  }, [currentPage]);

  const textColor = useColorModeValue("secondaryGray.900", "white");

  return (
    <AdminLayout>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <SimpleGrid
          mb="20px"
          columns={{ sm: 1, md: 1 }}
          spacing={{ base: "20px", xl: "20px" }}
        >
          <Card
            flexDirection="column"
            w="100%"
            px="0px"
            overflowX={{ sm: "scroll", lg: "hidden" }}
          >
            <Flex px="25px" justify="space-between" mb="20px" align="center">
              <Text
                color={textColor}
                fontSize="22px"
                fontWeight="700"
                lineHeight="100%"
              >
                Custom Table{" "}
                <small>
                  ({`${pageData.totalRows} registros` || "Loading..."})
                </small>
              </Text>
            </Flex>
            <Table
              columnsData={columns}
              tableData={pageData.rowData}
              isLoading={pageData.isLoading}
              totalRows={pageData.totalRows}
              currentPage={currentPage}
              pageChangeHandler={setCurrentPage}
              rowsPerPage={10}
            />
          </Card>
        </SimpleGrid>
      </Box>
    </AdminLayout>
  );
}

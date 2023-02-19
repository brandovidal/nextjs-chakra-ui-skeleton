import { Flex, Text, useColorModeValue } from "@chakra-ui/react";

import { TableProps } from "views/admin/default/variables/columnsData";

import ReactTable from "libs/ReactTable/ReactTable";
import Pagination from "libs/ReactTable/Pagination";

const Table = ({
  columnsData,
  tableData,
  totalRows,
  isLoading,
  manualPagination = false,
  currentPage,
  pageChangeHandler,
}: TableProps) => {
  const textColor = useColorModeValue("secondaryGray.900", "white");

  return (
    <>
      {isLoading ? (
        <Flex justifyContent="center" alignItems="center" py="10">
          <Text color={textColor}>Loading...</Text>
        </Flex>
      ) : (
        <>
          <ReactTable
            columnsData={columnsData}
            tableData={tableData}
            isLoading={isLoading}
            manualPagination={manualPagination}
          />
          <Pagination
            totalRows={totalRows}
            isLoading={isLoading}
            currentPage={currentPage}
            pageChangeHandler={pageChangeHandler}
            rowsPerPage={10}
          />
        </>
      )}
    </>
  );
};

export default Table;

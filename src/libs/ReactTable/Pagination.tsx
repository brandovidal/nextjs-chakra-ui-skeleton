import { Button, Flex, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { PaginationProps } from "views/admin/default/variables/columnsData";

const Pagination = ({
  currentPage,
  pageChangeHandler,
  totalRows,
  rowsPerPage,
  isLoading,
}: PaginationProps) => {
  // Calculating max number of pages
  const totalOfPages = Math.ceil(totalRows / rowsPerPage);

  // State variable to hold the current page. This value is
  // passed to the callback provided by the parent
  // const [_, pageChangeHandler] = useState(1);

  // Navigation arrows enable/disable state
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoNext, setCanGoNext] = useState(true);

  // Creating an array with length equal to no.of pages
  const pagesArray = useMemo(() => {
    const offsetPage = totalOfPages - currentPage + 1;
    if (totalOfPages <= 3) {
      return [...new Array(totalOfPages)].map((_, index) => index + 1);
    } else if (offsetPage <= 2 && offsetPage > 0) {
      return [totalOfPages - 2, totalOfPages - 1, totalOfPages];
    }
    return [currentPage, currentPage + 1, currentPage + 2];
  }, [totalOfPages, currentPage]);

  // Onclick handlers for the butons
  const onNextPage = () => pageChangeHandler(currentPage + 1);
  const onPrevPage = () => pageChangeHandler(currentPage - 1);
  const onPageSelect = (pageNo: number) => pageChangeHandler(pageNo);

  useEffect(() => {
    if (totalOfPages === currentPage) {
      setCanGoNext(false);
    } else {
      setCanGoNext(true);
    }

    if (currentPage === 1) {
      setCanGoBack(false);
    } else {
      setCanGoBack(true);
    }
  }, [totalOfPages, currentPage]);

  // To set the starting index of the page
  useEffect(() => {
    pageChangeHandler(currentPage);
  }, [currentPage, pageChangeHandler, rowsPerPage]);

  const textColor = useColorModeValue("gray.500", "white");

  return (
    <>
      {isLoading ? (
        <Flex justifyContent="center" alignItems="center" py="10">
          <Text color={textColor}>Pagination...</Text>
        </Flex>
      ) : totalOfPages > 1 ? (
        <Flex
          flexDirection={["column", "column", "row", "row"]}
          justifyContent="space-between"
          alignItems="center"
          gap={["3", "3", "0", "0"]}
          px="5"
        >
          <Text color={textColor}>
            P&aacute;gina {currentPage} de {totalOfPages}
          </Text>

          <Stack direction="row">
            {currentPage === 1 ? null : (
              <Button
                variant="outline"
                borderRadius="full"
                onClick={onPrevPage}
                disabled={!canGoBack}
              >
                &#8249;
              </Button>
            )}

            {pagesArray.map((number) => (
              <Button
                key={number}
                borderRadius="full"
                onClick={() => onPageSelect(number)}
                variant={number === currentPage ? "solid" : "outline"}
                bg={number === currentPage ? "brand.500" : "transparent"}
                color={number === currentPage ? "white" : "gray.400"}
              >
                {number}
              </Button>
            ))}

            {currentPage === totalOfPages ? null : (
              <Button
                variant="outline"
                borderRadius="full"
                onClick={onNextPage}
                disabled={!canGoNext}
              >
                &#8250;
              </Button>
            )}
          </Stack>
        </Flex>
      ) : null}
    </>
  );
};

export default Pagination;

import { Button, Flex, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

const Pagination = ({ pageChangeHandler, totalRows, rowsPerPage }: any) => {
  // Calculating max number of pages
  const noOfPages = Math.ceil(totalRows / rowsPerPage);

  // Creating an array with length equal to no.of pages
  const pagesArr = [...new Array(noOfPages)];

  // State variable to hold the current page. This value is
  // passed to the callback provided by the parent
  const [currentPage, setCurrentPage] = useState(1);

  // Navigation arrows enable/disable state
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoNext, setCanGoNext] = useState(true);

  // Onclick handlers for the butons
  const onNextPage = () => setCurrentPage(currentPage + 1);
  const onPrevPage = () => setCurrentPage(currentPage - 1);
  const onPageSelect = (pageNo: number) => setCurrentPage(pageNo);

  // Disable previous and next buttons in the first and last page
  // respectively
  useEffect(() => {
    if (noOfPages === currentPage) {
      setCanGoNext(false);
    } else {
      setCanGoNext(true);
    }
    if (currentPage === 1) {
      setCanGoBack(false);
    } else {
      setCanGoBack(true);
    }
  }, [noOfPages, currentPage]);

  // To set the starting index of the page
  useEffect(() => {
    const skipFactor = (currentPage - 1) * rowsPerPage;
    // Some APIs require skip for paginaiton. If needed use that instead
    // pageChangeHandler(skipFactor);
    pageChangeHandler(currentPage);
  }, [currentPage, pageChangeHandler, rowsPerPage]);

  const textColor = useColorModeValue("gray.400", "white");

  return (
    <>
      {noOfPages > 1 ? (
        <Flex direction="row" px="5" justifyContent="space-between">
          <Text color={textColor}>
            Page {currentPage} of {noOfPages}
          </Text>

          <Stack direction="row">
            <Button
              variant="outline"
              borderRadius="full"
              onClick={onPrevPage}
              disabled={!canGoBack}
            >
              &#8249;
            </Button>

            {pagesArr.map((num, index) => (
              <Button
                key={index}
                borderRadius="full"
                onClick={() => onPageSelect(index + 1)}
                variant={index + 1 === currentPage ? "solid" : "outline"}
                bg={index + 1 === currentPage ? "brand.500" : "gray.100"}
                color={index + 1 === currentPage ? "white" : "gray.400"}
                // className={`${styles.pageBtn}  ${
                //   index + 1 === currentPage ? styles.activeBtn : ""
                // }`}
              >
                {index + 1}
              </Button>
            ))}

            <Button
              variant="outline"
              borderRadius="full"
              onClick={onPrevPage}
              disabled={!canGoNext}
            >
              &#8250;
            </Button>
          </Stack>
        </Flex>
      ) : null}
    </>
  );
};

export default Pagination;

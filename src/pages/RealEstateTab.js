import React, { useEffect, useState } from "react";
import CustomTable, { DeleteButton } from "../components/layout/CustomTable";
import { useDispatch, useSelector } from "react-redux";
import { deleteReatEstateQuery, getRealEstateData } from "../Redux/ApiCalls";

const column = ["S.No.", "Email", "Phone Number", "Message", "Actions"];
const RealEstateTab = () => {
  const [resultPerPage, setResultPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const {
    isLoading,
    isError,
    error,
    data: realEstateData,
  } = useSelector((state) => state.realEstate);

  const numOfPages = Math.ceil(realEstateData?.length / resultPerPage);

  const dispatch = useDispatch();

  const getRealEstate = async () => {
    await getRealEstateData(dispatch);
    setCurrentPage(1);
  };

  const handleDelete = async (id) => {
    await deleteReatEstateQuery(dispatch, id);
    getRealEstate();
  };

  const getCurrentData = (data) => {
    const indexOfLastItem = currentPage * resultPerPage;
    const indexOfFirstItem = indexOfLastItem - resultPerPage;
    return data.slice(indexOfFirstItem, indexOfLastItem);
  };
  // console.log(resultPerPage);

  const pageHandler = (p) => setCurrentPage(p);

  useEffect(() => {
    getRealEstate();
    setData(realEstateData);
  }, []);

  useEffect(() => {
    setData(getCurrentData(realEstateData));
  }, [isLoading, currentPage, resultPerPage]);
  return (
    <CustomTable
      loading={isLoading}
      column={column}
      rowNo={resultPerPage}
      paging={realEstateData.length > resultPerPage}
      rowProps={{
        setResultPerPage,
      }}
      pageProps={{
        numOfPages,
        curPage: currentPage,
      }}
      pageHandler={pageHandler}
    >
      {data.map((query, i) => (
        <tr key={query._id}>
          <td>{(currentPage - 1) * resultPerPage + i + 1}</td>
          <td>{query.email}</td>
          <td>{query.phone_no}</td>
          <td>{query.message}</td>
          <td>
            <DeleteButton onClick={() => handleDelete(query._id)} />
          </td>
        </tr>
      ))}
    </CustomTable>
  );
};

export default RealEstateTab;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { GetPrescriptionForm } from "../Redux/ApiCalls";
// import ViewCard from "../components/layout/ViewCard";

// const ViewFaq = () => {
//   const { id } = useParams();

//   const [modalShow, setModalShow] = useState(false);

//   const handleFetchForm = async () => {
//     await GetPrescriptionForm(dispatch);
//   };
//   useEffect(() => {
//     handleFetchForm();
//   }, []);
//   console.log(data);
//   return (
//     <ViewCard
//       title={"Company Details"}
//       data={data?.company}
//       setModalShow={setModalShow}
//       keyProps={keyProps}
//       reducerProps={{ error, isLoading, isSuccess }}
//     >
//       {/* <EditModel show={modalShow} onHide={() => setModalShow(false)} /> */}
//       {!modalShow && <ToastContainer />}
//     </ViewCard>
//   );
// };

// export default ViewFaq;

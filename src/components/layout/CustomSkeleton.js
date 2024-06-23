import React from "react";
import Skeleton from "react-loading-skeleton";

const CustomSkeleton = ({ resultPerPage, column }) => {
  // console.log({ resultPerPage, column });
  
  return [...Array(parseInt(resultPerPage)).keys()].map((r) => (
    <tr key={r}>
      {[...Array(column).keys()].map((d) => (
        <td key={d}>
          <Skeleton height={30} />
        </td>
      ))}
    </tr>
  ));
};

export default CustomSkeleton;

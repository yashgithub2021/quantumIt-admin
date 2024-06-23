import React, { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";

const CustomPagination = ({ pages, pageHandler, curPage }) => {
  //   console.log("cur page", curPage);
  const [left, setLeft] = useState();
  const [right, setRight] = useState();

  const getPageArray = () => {
    const arr = [...Array(pages).keys()].slice(left + 1, right);
    // console.log(curPage === left);
    // console.log(left, right, arr);
    return arr;
  };

  useEffect(() => {
    if (pages <= 5) {
      setLeft(-1);
      setRight(pages);
    } else {
      if (curPage <= 3) {
        setLeft(1);
        setRight(5);
      } else if (curPage >= pages - 2) {
        setLeft(pages - 4);
        setRight(pages);
      } else {
        setLeft(curPage - 2);
        setRight(curPage + 2);
      }
    }
  }, [curPage, pages]);

  return (
    <div className="mt-3 float-end">
      <Pagination>
        {pages <= 5 ? (
          <>
            {getPageArray().map((i) => (
              <Pagination.Item
                key={i}
                active={i + 1 === curPage}
                activeLabel=""
                onClick={() => pageHandler(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}
          </>
        ) : (
          <>
            <Pagination.First
              disabled={curPage === 1}
              onClick={() => pageHandler(1)}
            />
            <Pagination.Prev
              disabled={curPage === 1}
              onClick={() => pageHandler(curPage - 1)}
            />
            <Pagination.Item
              active={curPage === left}
              activeLabel=""
              onClick={() => pageHandler(left)}
            >
              {console.log("ffdfdf", left)}
              {left}
            </Pagination.Item>
            <Pagination.Ellipsis />

            {getPageArray().map((i) => (
              <Pagination.Item
                key={i}
                active={curPage === i}
                activeLabel=""
                onClick={() => pageHandler(i)}
              >
                {i}
              </Pagination.Item>
            ))}

            <Pagination.Ellipsis />
            <Pagination.Item
              active={curPage === right}
              activeLabel=""
              onClick={() => pageHandler(right)}
            >
              {right}
            </Pagination.Item>
            <Pagination.Next
              disabled={curPage === pages}
              onClick={() => pageHandler(curPage + 1)}
            />
            <Pagination.Last
              disabled={curPage === pages}
              onClick={() => pageHandler(pages)}
            />
          </>
        )}
      </Pagination>
    </div>
  );
};

export default CustomPagination;

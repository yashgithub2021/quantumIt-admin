import { Button, Card, Form, InputGroup, Table } from "react-bootstrap";
import { FaEye, FaSearch, FaTrashAlt } from "react-icons/fa";
import CustomSkeleton from "./CustomSkeleton";
import CustomPagination from "./CustomPagination";
import { useNavigate } from "react-router-dom";

export default function CustomTable(props) {
  const navigate = useNavigate();
  // console.log(props);
  const {
    loading,
    column,
    rowNo: resultPerPage,
    rowProps,
    paging,
    pageProps,
    pageHandler,
    search,
    searchProps,
    isCreateBtn,
    createBtnProps,
  } = props;
  const { setResultPerPage } = rowProps;
  const { numOfPages, curPage } = pageProps;
  let searchInput, setSearchInput, setQuery;
  if(search) {
    searchInput = searchProps.searchInput;
    setSearchInput = searchProps.setSearchInput;
    setQuery = searchProps.setQuery;
  }

  let createURL, text;
  if(isCreateBtn) {
    createURL = createBtnProps.createURL;
    text = createBtnProps.text;
  }

  const len = column.length;
  return (
    <Card>
      <Card.Header>
        {isCreateBtn && createURL && <Button
          onClick={() => {
            navigate(createURL);
          }}
          type="success"
          className="btn btn-primary btn-block mt-1"
        >
          Add {text && text}
        </Button>}
        {search && <div className="search-box float-end">
          <InputGroup>
            <Form.Control
              aria-label="Search Input"
              placeholder="Search"
              type="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <InputGroup.Text
              style={{ cursor: "pointer" }}
              onClick={() => {
                setQuery(searchInput);
                pageHandler(1);
              }}
            >
              <FaSearch />
            </InputGroup.Text>
          </InputGroup>
        </div>}
      </Card.Header>
      <Card.Body>
        <Table responsive striped bordered hover>
          <thead>
            <tr>{len && column.map((col) => <th key={col}>{col}</th>)}</tr>
          </thead>
          <tbody>
            {loading ? (
              <CustomSkeleton resultPerPage={resultPerPage} column={len} />
            ) : (
              <>{props.children}</>
            )}
          </tbody>
        </Table>
      </Card.Body>
      <Card.Footer>
        <div className="float-start d-flex align-items-center mt-3">
          <p className="p-bold m-0 me-3">Row No.</p>
          <Form.Group controlId="resultPerPage">
            <Form.Select
              value={resultPerPage}
              onChange={(e) => {
                setResultPerPage(e.target.value);
                pageHandler(1);
              }}
              aria-label="Default select example"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </Form.Select>
          </Form.Group>
        </div>
        {paging && (
          <CustomPagination
            pages={numOfPages}
            pageHandler={pageHandler}
            curPage={curPage}
          />
        )}
      </Card.Footer>
    </Card>
  );
}

export const ViewButton = ({ onClick }) => {
  return (
    <Button onClick={onClick} type="success" className="btn btn-primary">
      <FaEye />
    </Button>
  );
};

export const DeleteButton = ({ onClick }) => {
  return (
    <Button onClick={onClick} type="danger" className="btn btn-danger ms-2">
      <FaTrashAlt className="m-auto" />
    </Button>
  );
};

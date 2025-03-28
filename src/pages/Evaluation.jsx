import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetEvaluationForm,
  SetEvaluationForm,
  UpdateEvaluationForm,
  DeleteEvaluationForm,
  GetCategories,
  AddCategory,
  DeleteCategory,
} from "../Redux/ApiCalls";
import { Form, Container, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { toastOptions } from "../utils/error";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the styles
import { generateRandomSixDigitNumber } from "../utils/function";
import CustomPagination from "../components/layout/CustomPagination";
import axiosInstance from "../utils/axiosUtil";
const Evaluation = () => {
  const { isFetching, error, errMsg, evaluationform } = useSelector(
    (state) => state.eval
  );
  const { Categories, isFetchingCat } = useSelector(
    (state) => state.categories
  );
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [keypoint, setKeypoint] = useState("");
  const [keyinsight, setKeyinsight] = useState("");
  const [validator, setValidator] = useState(0);
  const [confirmShow, setconfirmShow] = useState(false);
  const [verifyKey, setVerifyKey] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [Id, setId] = useState(null);
  const [categoryFormShow, setCategoryFormShow] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  
  const transactionsPerPage = 5; // Number of transactions per page

  const handleClose = () => {
    setShow(false);
    setEditMode(false);
    setEditId(null);
    resetForm();
  };

  const handleShow = () => setShow(true);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    quote: "",
    readTime: "",
    custom_url: "",
    meta_title: "",
    meta_desc: "",
    blogImage: null,
    blogImage2: null,
  });
  console.log(formData,'formData');
  const quillRef = useRef(null); // Ref for Quill instance
  
  
  
  const resetForm = () => {
    setFormData({
      title: "",
      category: "",
      description: "",
      quote: "",
      readTime: "",
      custom_url: "",
      meta_title: "",
      meta_desc: "",
      blogImage: null,
      blogImage2: null,
    });
  };

  const handleDescriptionChange = (value) => {
    setFormData({ ...formData, description: value });
  };

  const handleFetchBlogs = async () => {
    await GetEvaluationForm(dispatch);
  };

  const handleFetchCategories = async () => {
    await GetCategories(dispatch);
    console.log(Categories);
  };

  const handleEdit = (blog) => {
    setEditMode(true);
    setEditId(blog.id);
    setFormData({
      title: blog.title,
      category: blog.category,
      description: blog.description,
      quote: blog.quote,
      readTime: blog.readTime,
      custom_url: blog.custom_url,
      meta_title: blog.meta_title,
      meta_desc: blog.meta_desc,
    });
    handleShow();
  };

  const validateFormData = () => {
    const { title, category, description, quote, readTime } = formData;

    if (!title || !category || !description || !quote || !readTime) {
      toast.error("Please fill all the required fields.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateFormData()) return;
    const form = new FormData();

    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        if (Array.isArray(formData[key])) {
          formData[key].forEach((item, index) => {
            form.append(`${key}[${index}]`, item);
          });
        } else {
          form.append(key, formData[key]);
        }
      }
    }

    try {
      if (editMode && editId) {
        await UpdateEvaluationForm(dispatch, editId, form);
        if (!isFetching && !error) {
          toast.success("Blog Updated Successfully", toastOptions);
          handleClose();
        }
      } else {
        const blog = await SetEvaluationForm(dispatch, form);
        console.log("Response from SetEvaluationForm:", blog);
        console.log("State after dispatch:", isFetching, error, errMsg);

        if (!isFetching && !error) {
          handleClose();
        }
      }
    } catch (e) {
      console.error("Error occurred:", e);
    }

    await handleFetchBlogs();
  };

  const handleVerify = (id) => {
    setValidator(generateRandomSixDigitNumber());
    console.log(validator);
    setconfirmShow(true);
    setId(id);
  };

  const handleDelete = async () => {
    if (confirmShow) {
      if (validator === verifyKey) {
        console.log(validator);
        await DeleteEvaluationForm(dispatch, Id);
        setconfirmShow(false);
        setId(null);
        setVerifyKey(0);
        if (!isFetching && !error) {
          handleClose();
          toast.success("Blog Deleted Successfully", toastOptions);
          await handleFetchBlogs();
        }
      } else {
        toast.error("Key doesn't match", toastOptions);
      }
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategory) {
      toast.error("Please enter a category name", toastOptions);
      return;
    }
    await AddCategory(dispatch, { name: newCategory });
    setNewCategory("");
    setCategoryFormShow(false);
    await handleFetchCategories();
  };

  const handleDeleteCategory = async (categoryId) => {
    await DeleteCategory(dispatch, categoryId);
    await handleFetchCategories();
  };

  useEffect(() => {
    handleFetchBlogs();
    handleFetchCategories();
  }, []);

  useEffect(() => {
    if (!isFetching && error) {
      toast.error(errMsg?.message, toastOptions);
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching]);

  const transactionList = evaluationform || [];
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactionList.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  const pageHandler = (pageNumber) => setCurrentPage(pageNumber);

  

  // const uploadImageToServer = async (file) => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("image", file);

  //     const response = await axiosInstance.post("/api/blogs/upload-image", formData, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     });

  //     return response.data.imageUrl;
  //   } catch (error) {
  //     console.error("Image upload failed:", error);
  //     return null;
  //   } }
    //   description image handler 
    // const imageHandler = () => {
    //   const input = document.createElement("input");
    //   input.setAttribute("type", "file");
    //   input.setAttribute("accept", "image/*");
    //   input.click();
    
    //   input.onchange = async () => {
    //     const file = input.files[0];
    //     if (!file) return;
    
    //     const imageUrl = await uploadImageToServer(file).catch((error) => {
    //       console.error("Failed to upload image:", error);
    //       return null;
    //     });
    //     if (!imageUrl) return;
    
    //     setTimeout(() => {
    //       const quillInstance = quillRef.current?.getEditor();
    //       if (!quillRef.current || !quillInstance) {
    //         console.error("Quill editor is not initialized yet.");
    //         return;
    //       }
    
    //       let range = quillInstance.getSelection();
    //       if (!range) {
    //         console.warn("Invalid selection, moving to the end...");
    //         range = { index: quillInstance.getLength(), length: 0 };
    //       }
    
    //       quillInstance.insertEmbed(range.index, "image", imageUrl);
    //       quillInstance.setSelection(range.index + 1);
    //     }, 50);
    
    //     // Cleanup the input element
    //     document.body.removeChild(input);
    //   };
    
    //   // Append the input element to the DOM
    //   document.body.appendChild(input);
    // };
    
    
  
      const modules = {
        toolbar: {
          container: [
            [{ header: [1, 2, 3, 4, false] }, { font: [] }], // Headers & fonts
            [{ size: ["small", false, "large", "huge"] }], // Proper size options
            ["bold", "italic", "underline", "strike", "blockquote"], // Text styling
            [
              { list: "ordered" },
              { list: "bullet" },
              { indent: "-1" },
              { indent: "+1" },
            ], // Lists & indents
            ["link"], // Links & images
            ["clean"], // Remove formatting
          ],
          // handlers: {
          //   image: imageHandler, 
          // },
        },
      };
      const formats = [
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        // "code-block",
        "list",
        "bullet",
        "link",
        "image",
        "video",
        "font",
        "align",
        "color",
        "background",
        "header",
        "indent",
        "size",
        "script",
        "clean",
        // "code",
        "direction",
      ];
      const uploadImageToServer = async (file) => {
        try {
          const formData = new FormData();
          formData.append("image", file);
    
          const response = await axiosInstance.post("/api/blogs/upload-image", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
    
          return response.data.imageUrl; // API must return { imageUrl: "https://your-s3-url.com/image.jpg" }
        } catch (error) {
          console.error("Image upload failed:", error);
          return null;
        }
      };
      const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
    
        const imageUrl = await uploadImageToServer(file);
        if (imageUrl) {
          const newEditorValue = setFormData((form)=>({...form,description:formData.description +  `<img src="${imageUrl}" alt="uploaded-img" />` }))
          
          
          
         
        }
      };
      const handleChange = (value) => {
      
        setFormData((prev) => ({ ...prev, description: value.toString("html") }));
      };
  return (
    <div className="container-fluid">
      <div
        className="my-3 pb-2 row"
        style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.2)" }}
      >
        <div className="col-md-6">
          <h3>Blogs</h3>
        </div>
        <div className="col-md-6 d-flex justify-content-end align-items-center">
          <Button variant="primary" onClick={handleShow}>
            Add Blog
          </Button>
        </div>
      </div>
      <div className="mb-3 p-2" style={{ marginLeft: "10px" }}>
        <div className=" overflow-x-scroll row w-100 flex justify-content-start align-items-center">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Category</th>
                <th>Read Time</th>
                <th>Image1</th>
                <th>Image2</th>
                <th colSpan={2}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isFetching ? (
                <tr>
                  <td colSpan="7" className="text-center">
                    Loading...
                  </td>
                </tr>
              ) : (
                currentTransactions?.map((blog, i) => (
                  <tr key={blog.id}>
                    <td>{i + 1 + (currentPage - 1) * transactionsPerPage}</td>
                    <td>{blog.title}</td>
                    <td>{blog.category}</td>
                    <td>{blog.readTime}</td>
                    <td>
                      <img
                        alt="img1"
                        loading="lazy"
                        width={130}
                        height={100}
                        src={blog.image}
                      />
                    </td>
                    <td>
                      <img
                        alt="img2"
                        loading="lazy"
                        width={130}
                        height={100}
                        src={blog.image2}
                      />
                    </td>
                    <td>
                      <button
                        onClick={() => handleEdit(blog)}
                        className="btn btn-primary"
                      >
                        <FaEye
                          style={{
                            cursor: "pointer",
                            color: "white",
                            fontSize: "18px",
                            margin: "0",
                          }}
                        />
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => handleVerify(blog.id)}
                        className="btn btn-danger"
                      >
                        <MdDelete
                          style={{
                            cursor: "pointer",
                            color: "white",
                            fontSize: "18px",
                            margin: "0",
                          }}
                        />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
        {transactionList.length > 0 && (
          <CustomPagination
            pages={Math.ceil(transactionList.length / transactionsPerPage)}
            pageHandler={pageHandler}
            curPage={currentPage}
          />
        )}
      </div>

      {/* Modal for Blog Form */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? "Edit Blog" : "Add Blog"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Container className="d-flex justify-content-between gap-2 p-0">
                <Form.Control
                  as="select"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  <option value="">Select Category</option>
                  {Categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </Form.Control>
                <Button onClick={() => setCategoryFormShow(true)}>Add</Button>
              </Container>
            </Form.Group>

            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
             
               <div className="border border-1 p-2">
               <ReactQuill
              ref={quillRef}
                value={formData.description}
                onChange={handleDescriptionChange}
                modules={modules}
                formats={formats}

              />

      {/* ✅ Custom Image Upload Button */}
      <input type="file" accept="image/*" title="Choose image for description" placeholder="Choose image for description" onChange={handleFileUpload} style={{ marginTop: "10px" }} />
    </div>
            </Form.Group>

            <Form.Group controlId="formQuote">
              <Form.Label>Quote</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter quote"
                value={formData.quote}
                onChange={(e) =>
                  setFormData({ ...formData, quote: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="formReadTime">
              <Form.Label>Read Time</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter read time"
                value={formData.readTime}
                onChange={(e) =>
                  setFormData({ ...formData, readTime: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="formReadTime">
              <Form.Label>Custom URL Slug</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Custom URL"
                value={formData.custom_url}
                onChange={(e) =>
                  setFormData({ ...formData, custom_url: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="formReadTime">
              <Form.Label>Custom Meta Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Meta Title"
                value={formData.meta_title}
                onChange={(e) =>
                  setFormData({ ...formData, meta_title: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="formReadTime">
              <Form.Label>Custom Meta Desription</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Meta Desription"
                value={formData.meta_desc}
                onChange={(e) =>
                  setFormData({ ...formData, meta_desc: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="formBlogImage">
              <Form.Label>Blog Image 1</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) =>
                  setFormData({ ...formData, blogImage: e.target.files[0] })
                }
              />
            </Form.Group>

            <Form.Group controlId="formBlogImage2">
              <Form.Label>Blog Image 2</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) =>
                  setFormData({ ...formData, blogImage2: e.target.files[0] })
                }
              />
            </Form.Group>

            <Form.Group className="d-flex justify-content-center">
              <Button
                className="my-3 d-flex justify-content-center align-items-center gap-1"
                variant="primary"
                onClick={handleSubmit}
              >
                {editMode ? "Update Blog" : "Add Blog"}
                {isFetching && (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    style={{ opacity: "0.6" }}
                  />
                )}
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Confirmation Modal */}
      <Modal show={confirmShow} onHide={() => setconfirmShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Please enter the validation key to confirm deletion:{" "}
            <strong>{validator}</strong>
          </p>
          <Form.Control
            type="number"
            placeholder="Enter key"
            value={verifyKey}
            onChange={(e) => setVerifyKey(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setconfirmShow(false)}>
            Cancel
          </Button>
          <Button disabled={isFetching} variant="danger" onClick={handleDelete}>
            Confirm
            {isFetching && (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                style={{ opacity: "0.6", marginInline: "5px" }}
              />
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Category Form Modal */}
      <Modal
        style={{ backgroundColor: "rgba(0, 0, 0, 0.43)" }}
        show={categoryFormShow}
        onHide={() => setCategoryFormShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="d-flex flex-column" onSubmit={handleAddCategory}>
            <Form.Group controlId="formNewCategory">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category name"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
            </Form.Group>
            <Button
              disabled={isFetchingCat}
              type="submit"
              className="my-2 align-self-center"
              variant="primary"
            >
              Add Category
              {isFetchingCat && (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  style={{ opacity: "0.6", marginInline: "5px" }}
                />
              )}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Evaluation;

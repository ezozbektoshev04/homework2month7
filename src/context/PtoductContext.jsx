import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ProductProv = createContext();
const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    code: "",
    description: "",
    price: "",
    priceSale: "",
    file: null,
  });
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();
  // const [file, setFile] = useState(null);

  // const handleFile = (e) => {
  //   setProduct({
  //     name: "",
  //     brand: "",
  //     code: "",
  //     description: "",
  //     price: "",
  //     priceSale: "",
  //     file: e.target.files[0],
  //   });
  // };

  const editData = (id) => {
    const aa = products.filter((el) => {
      if (el.id === id) {
        setProduct({
          id: el.id,
          name: el.name,
          brand: el.brand,
          code: el.code,
          description: el.description,
          price: el.price,
          priceSale: el.priceSale,
        });
      }
      setEdit(true);
    });

    navigate("/add");
  };

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]:
        e.target.name === "file" ? e.target.files[0] : e.target.value,
    });
  };
  const changePage = () => {
    navigate("/add");
    setProduct({
      name: "",
      brand: "",
      code: "",
      description: "",
      price: "",
      priceSale: "",
      file: null,
    });
    setEdit(false);
  };
  const editSave = (values) => {
    // setEdit(true);
    toast("you have successfully edited product");
    try {
      axios.put(
        `https://64dcf61be64a8525a0f76c4d.mockapi.io/api/v1/products/${product.id}`,
        values
      );
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://64dcf61be64a8525a0f76c4d.mockapi.io/api/v1/products"
      );
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const resetData = () => {
    alert("Are you sure to reset your data?");
    setProduct({
      name: "",
      brand: "",
      code: "",
      description: "",
      price: "",
      priceSale: "",
      file: null,
    });
  };

  const handleSubmit = (values) => {
    toast("you have successfully added a new product");
    let config = {
      "Content-type": "multipart/form-data",
    };
    // const { file } = values;
    // console.log(file);
    // let post = new FormData();
    try {
      // post.append("file", File);
      // post.append("body", data);
      // console.log(post);
      axios.post(
        "https://64dcf61be64a8525a0f76c4d.mockapi.io/api/v1/products",
        {
          ...values,
          // file: post,
        },
        config
      );
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };
  <ToastContainer />;
  return (
    <ProductProv.Provider
      value={{
        product,
        handleChange,
        handleSubmit,
        products,
        editData,
        changePage,
        editSave,
        edit,
        resetData,
        // handleFile,
      }}
    >
      {children}
    </ProductProv.Provider>
  );
};
export { ProductProvider };

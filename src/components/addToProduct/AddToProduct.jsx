import React, { useContext, useState } from "react";
import "./add.scss";
import { ProductProv } from "../../context/PtoductContext";
// import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";
const validationSchema = Yup.object({
  name: Yup.string().required("Product name is required!"),
  brand: Yup.string().required("Brand name is required!"),
  code: Yup.string().required("Product code is required!"),
  description: Yup.string().required("Product description is required!"),
});

const AddToProduct = () => {
  const prod = useContext(ProductProv);
  const formik = useFormik({
    initialValues: prod.product,
    onSubmit: (values) => {
      prod.edit == false ? prod.handleSubmit(values) : prod.editSave(values);
      // console.log(formik.values);
    },
    validationSchema,
  });

  const { errors, touched } = formik;

  return (
    <div className="add">
      <div className="d20">
        <button className="btn1">Основные</button>
        <form onSubmit={formik.handleSubmit}>
          <div className="field">
            <label htmlFor="name" className="label1">
              Название <span className="sp1">*</span>
            </label>
            <input
              type="text"
              id="name"
              className="input1"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              // required
            />
            {touched.name && errors.name ? (
              <div className="error">{errors.name}</div>
            ) : null}
          </div>
          <div className="field2">
            <div className="d1">
              <label htmlFor="brand" className="label1">
                Бренд <span className="sp1">*</span>
              </label>
              <input
                type="text"
                id="brand"
                className="input2"
                name="brand"
                value={formik.values.brand}
                onChange={formik.handleChange}
                // required
              />
              {touched.brand && errors.brand ? (
                <div className="error">{errors.brand}</div>
              ) : null}
            </div>
            <div className="d1">
              <label htmlFor="code" className="label1">
                Артикул производителя <span className="sp1">*</span>
              </label>
              <input
                type="text"
                id="code"
                className="input2"
                name="code"
                value={formik.values.code}
                onChange={formik.handleChange}
                // required
              />
              {touched.code && errors.code ? (
                <div className="error">{errors.code}</div>
              ) : null}
            </div>
          </div>
          <div className="field">
            <label htmlFor="description" className="label1">
              Описание <span className="sp1">*</span>
            </label>
            <textarea
              type="text"
              id="description"
              className="note"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              // required
            />
            {touched.description && errors.description ? (
              <div className="error">{errors.description}</div>
            ) : null}
          </div>
          <div className="field2">
            <div className="d1">
              <label htmlFor="price" className="label1">
                Цена
              </label>
              <input
                type="text"
                id="price"
                className="input3"
                name="price"
                value={formik.values.price}
                onChange={formik.handleChange}
              />
            </div>
            <div className="d1">
              <label htmlFor="priceSale" className="label1">
                Цена со скидкой
              </label>
              <input
                type="text"
                id="priceSale"
                className="input3"
                name="priceSale"
                value={formik.values.priceSale}
                onChange={formik.handleChange}
              />
            </div>
          </div>
          <div className="field">
            <label htmlFor="file" className="label1">
              Upload File
            </label>
            <input
              type="file"
              id="file"
              className="input4"
              name="file"
              // value={formik.values.priceSale}
              onChange={(e) => formik.setFieldValue("file", e.target.files[0])}
            />
          </div>
          <div className="add-bot">
            <button
              type="submit"
              className="btn5"
              // onClick={() => navigate("/products")}
            >
              Сохранить
            </button>

            <button type="reset" className="btn6" onClick={prod.resetData}>
              Отмена
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddToProduct;

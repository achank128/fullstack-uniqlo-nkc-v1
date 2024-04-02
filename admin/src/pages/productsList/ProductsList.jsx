import { CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { userRequest } from "../../request";
import "./productsList.scss";
import { Link } from "react-router-dom";
import { CheckCircle, HighlightOff } from "@mui/icons-material";

const formater = Intl.NumberFormat("de-DE");
const ProductsList = () => {
  const [products, setProducts] = useState();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await userRequest.get("/products/all");
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 220,
    },
    {
      field: "name",
      headerName: "Name",
      width: 180,
      renderCell: (params) => {
        return (
          <div className="product-title">
            <img className="product-img" src={params.row.img[0]} alt="img" />
            {params.row.name}
          </div>
        );
      },
    },
    {
      field: "priceLimited",
      headerName: "Price",
      type: "number",
      width: 100,
      renderCell: (params) => {
        return (
          <div>
            <b>{formater.format(params.row.priceLimited)}</b>
          </div>
        );
      },
    },
    {
      field: "size",
      headerName: "Size",
      type: "Number",
      width: 120,
    },
    {
      field: "for",
      headerName: "For",
      width: 100,
    },
    {
      field: "inStock",
      headerName: "Available",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="stock">
            {params.row.inStock ? (
              <CheckCircle className="stocking" />
            ) : (
              <HighlightOff className="out-of-stock" />
            )}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 120,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/products/" + params.row._id}>
              <button className="btn-edit">View</button>
            </Link>
          </>
        );
      },
    },
  ];

  return (
    <div id="products-list">
      <div className="heading">
        <div className="header">
          <h2>Products</h2>
        </div>
        <div className="button">
          <Link to="/products/new">
            <button className="btn-success">Create Product</button>
          </Link>
        </div>
      </div>

      {products ? (
        <div className="table" style={{ height: 425, width: "100%" }}>
          <DataGrid
            rows={products}
            columns={columns}
            pageSize={6}
            rowsPerPageOptions={[5]}
            getRowId={(row) => row._id}
            checkboxSelection
          />
        </div>
      ) : (
        <div className="loading-content">
          <CircularProgress color="success" />
        </div>
      )}
    </div>
  );
};

export default ProductsList;

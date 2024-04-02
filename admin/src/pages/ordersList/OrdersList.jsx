import React, { useEffect, useState } from "react";
import "./ordersList.scss";
import { userRequest } from "../../request";
import { DataGrid } from "@mui/x-data-grid";
import { CircularProgress } from "@mui/material";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
const formater = Intl.NumberFormat("de-DE");
const OrdersList = () => {
  const [orders, setOrders] = useState();

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("/orders");
        setOrders(res.data.orders);
      } catch (error) {}
    };
    getOrders();
  }, []);

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 220,
    },
    {
      field: "address",
      headerName: "Full name",
      width: 160,
      renderCell: (params) => {
        return <div>{params.row.address.fullName}</div>;
      },
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      width: 80,
    },
    {
      field: "total",
      headerName: "Total",
      type: "Number",
      width: 120,
      renderCell: (params) => {
        return (
          <div>
            <b>{formater.format(params.row.total)}</b>
          </div>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Day",
      type: "Date",
      width: 120,
      renderCell: (params) => {
        return <div>{dayjs(params.row.createdAt).format("DD-MM-YYYY")}</div>;
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
    },
    {
      field: "action",
      headerName: "Action",
      width: 140,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/orders/" + params.row._id}>
              <button className="btn-edit">View</button>
            </Link>
          </>
        );
      },
    },
  ];

  return (
    <div id="orders-list">
      <div className="heading">
        <div className="header">
          <h2>Orders</h2>
        </div>
        <div className="button"></div>
      </div>

      {orders ? (
        <div className="table" style={{ height: 425, width: "100%" }}>
          <DataGrid
            rows={orders}
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

export default OrdersList;

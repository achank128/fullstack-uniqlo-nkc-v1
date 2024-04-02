import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { userRequest } from "../../request";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import "./customersList.scss";

const CustomersList = () => {
  const [customers, setCustomers] = useState();

  useEffect(() => {
    const getCustomers = async () => {
      try {
        const res = await userRequest.get("/users");
        setCustomers(res.data);
      } catch (error) {}
    };
    getCustomers();
  }, []);

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 220,
    },
    {
      field: "email",
      headerName: "Email",
      width: 220,
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 100,
    },
    {
      field: "birthday",
      headerName: "Birthday",
      type: "Date",
      width: 120,
      renderCell: (params) => {
        return <div>{dayjs(params.row.birthday).format("DD/MM/YYYY")}</div>;
      },
    },

    {
      field: "action",
      headerName: "Action",
      width: 120,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/customers/" + params.row._id}>
              <button className="btn-edit">View</button>
            </Link>
          </>
        );
      },
    },
  ];

  return (
    <div id="customers-list">
      <div className="heading">
        <div className="header">
          <h2>Customers</h2>
        </div>
        <div className="button"></div>
      </div>

      {customers ? (
        <div className="table" style={{ height: 425, width: "100%" }}>
          <DataGrid
            rows={customers}
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

export default CustomersList;

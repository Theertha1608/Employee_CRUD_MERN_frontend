"use client";

import React, { useEffect, useState } from "react";
import { useTable, useGlobalFilter } from "react-table";
import axios from "axios";

const ViewAllEmp = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:9000/employee/get-all-emp");
        setData(response.data.employees);
        console.log("responsedata",response.data)
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  const columns = React.useMemo(
    () => [
      { Header: "ID", accessor: "id" },
      { Header: "Employee Name", accessor: "emp_name" },
      { Header: "Department", accessor: "department" },
      { Header: "Age", accessor: "emp_age" },
    ],
    []
  );

  
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable({ columns, data }, useGlobalFilter);

  const { globalFilter } = state;

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-[600px] md:w-[900px] md:h-[700px]">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <input
              type="text"
              value={globalFilter || ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search..."
              className="mb-4 p-2 border border-gray-300 rounded-md w-full"
            />
            <table {...getTableProps()} style={{ width: "100%" }}>
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()}>
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewAllEmp;
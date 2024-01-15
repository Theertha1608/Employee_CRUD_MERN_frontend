"use client";
import React, { useEffect, useState } from "react";
import { useTable, useGlobalFilter } from "react-table";
import axios from "axios";
import Link from "next/link";

const ViewAllEmp = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9000/employee/get-all-emp"
      );
      setData(response.data.employees);
      console.log("responsedata", response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const columns = React.useMemo(
    () => [
      { Header: "ID", accessor: (row, id) => id + 1 },

      { Header: "Employee Name", accessor: "emp_name" },
      { Header: "Email", accessor: "email" },
      { Header: "Department", accessor: "department" },
      { Header: "Phone Number", accessor: "phone_number" },
      { Header: "Address", accessor: "emp_address" },
      { Header: "Age", accessor: "emp_age" },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="flex">
            <button
              onClick={() => handleDelete(row.original._id)}
              className="bg-red-500 text-white py-1 px-2 rounded-md mr-2 text-xs"
            >
              Delete
            </button>
            <Link
              href={{
                pathname: "/update-emp",
                query: { id: `${row.original._id}` },
              }}
            >
              <button
                onClick={() => handleUpdate(row.original._id)}
                className="bg-blue-500 text-white py-1 px-2 rounded-md text-xs"
              >
                Update
              </button>
            </Link>
          </div>
        ),
      },
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

  const handleDelete = async (empId) => {
    console.log("emp,", empId);
    try {
      if (!empId) {
        console.error("Invalid empI provided");
        return;
      }

      await axios.delete(`http://localhost:9000/employee/delete-emp/${empId}`);

      fetchData();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleUpdate = async (_id) => {
    try {
    } catch (error) {
      console.error("Error navigating to update page:", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full md:w-[900px] md:h-[700px]">
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
            <div className="overflow-x-auto">
              <table {...getTableProps()} className="w-full table-auto">
                <thead className="bg-gray-200">
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps()}
                          className="p-3 text-left font-bold"
                        >
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
                          <td {...cell.getCellProps()} className="p-3">
                            {cell.render("Cell")}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewAllEmp;

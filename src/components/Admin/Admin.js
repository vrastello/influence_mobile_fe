import React from "react";
import getOffers from "../Services/Api";
import { useMemo, useState, useEffect } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

function Admin({ token }) {
  const [offers, setOffers] = useState([]);
  const tokenString = token.token;
  const roleString = token.role;

  const offerList = async () => {
    const res = await getOffers(tokenString, roleString);
    setOffers(res.offers);
  };

  useEffect(() => {
    offerList();
  }, []);

  const data = offers;

  const columns = useMemo(
    () => [
      {
        accessorKey: "title",
        header: "Title",
        muiTableHeadCellProps: { sx: { color: "green" } },
        Cell: ({ cell }) => <span>{cell.getValue()}</span>,
      },
      {
        accessorKey: "gender",
        header: "Gender",
        muiTableHeadCellProps: { sx: { color: "green" } },
        Cell: ({ cell }) => <span>{cell.getValue()}</span>,
      },
      {
        accessorKey: "description",
        header: "Description",
        muiTableHeadCellProps: { sx: { color: "green" } },
        Cell: ({ cell }) => <span>{cell.getValue()}</span>,
      },
      {
        accessorKey: "payout",
        header: "Payout",
        muiTableHeadCellProps: { sx: { color: "green" } },
        Cell: ({ cell }) => <span>{cell.getValue()}</span>,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnOrdering: true,
    enableRowSelection: false,
    enablePagination: true,
  });

  return (
    <div>
      <div>
        <MaterialReactTable table={table} />
      </div>
    </div>
  );
}

export default Admin;

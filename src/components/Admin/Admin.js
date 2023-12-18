import React from "react";
import getOffers from "../Services/Api";
import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, IconButton } from "@mui/material";
import AssessmentIcon from "@mui/icons-material/Assessment";
import OfferView from "./OfferView";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

function Admin({ token }) {
  const [offers, setOffers] = useState([]);
  const [rowId, setRowID] = useState("");
  const tokenString = token.token;
  const roleString = token.role;
  let navigate = useNavigate();

  // we have to call api again to get total list of offers for admin
  const offerList = async () => {
    const res = await getOffers(tokenString, roleString, rowId);
    setOffers(res.offers);
  };

  useEffect(() => {
    offerList();
  }, []);

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

  function handleOfferView(id) {
    console.log(`handleOfferView: ${id}`);
    setRowID(rowId);
    navigate(`/admin/offer-view/${id}`);
  }

  return (
    <div>
      <div>
        <MaterialReactTable
          columns={columns}
          data={offers}
          enableColumnOrdering
          enablePagination
          enableRowActions
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}>
              {console.log(row.original.id)}
              <IconButton
                color="primary"
                onClick={() => handleOfferView(row.original.id)}
              >
                <AssessmentIcon />
              </IconButton>
            </Box>
          )}
        />
      </div>
    </div>
  );
}

export default Admin;

import React from "react";
import getAdminOffers from "../Services/getAdminOffers";
import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, IconButton } from "@mui/material";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { MaterialReactTable } from "material-react-table";
import ErrorMessage from "../App/ErrorMessage";

function Admin({ token, error, setError }) {
  const [offers, setOffers] = useState([]);
  const [rowId, setRowID] = useState("");
  const tokenString = token.token;
  let navigate = useNavigate();

  // we have to call api again to get total list of offers for admin
  useEffect(() => {
    const offerList = async () => {
      try {
        const res = await getAdminOffers(tokenString);
        if (!res.ok) {
          console.log(res.status, res.statusText);
          throw new Error(`Status ${res.status}, ${res.statusText}`);
        } else {
          const data = await res.json();
          setOffers(data.offers);
          console.log(`data: ${data}`);
        }
      } catch (error) {
        setError(error.message);
        navigate("/");
      }
    };
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
    navigate(`/admin/${id}`);
  }

  return (
    <div>
      <div>
        <ErrorMessage hasError={error} />
      </div>
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

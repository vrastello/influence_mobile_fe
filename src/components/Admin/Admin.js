import React from "react";
import getAdminOffers from "../Services/getAdminOffers";
import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, IconButton } from "@mui/material";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { MaterialReactTable } from "material-react-table";
import ErrorMessage from "../App/ErrorMessage";
import NavBar from "../App/NavBar";

function Admin({ token, error, setError }) {
  const [offers, setOffers] = useState([]);
  const [rowId, setRowID] = useState("");
  const tokenString = token.token;
  const roleString = token.role;
  let navigate = useNavigate();

  // We could have just pulled all data from api at home route then we wouldn't
  // need to make another api call here, but we want to authenticate this request
  // user can change session storage
  // so checking token presence is not enough, we need to validate on BE
  useEffect(() => {
    const offerList = async () => {
      try {
        const res = await getAdminOffers(tokenString);
        if (!res.ok) {
          throw new Error(`Status ${res.status}, ${res.statusText}`);
        } else {
          const data = await res.json();
          setOffers(data.offers);
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
    setRowID(rowId);
    navigate(`/admin/${id}`);
  }

  return (
    <div>
      <div>
        <NavBar role={roleString} />
      </div>
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

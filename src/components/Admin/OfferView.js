import React, { useEffect, useState, useMemo } from "react";
import { useParams, Outlet } from "react-router-dom";
import showOffer from "../Services/showOffer";
import { MaterialReactTable } from "material-react-table";
import ErrorMessage from "../App/ErrorMessage";
import { useNavigate } from "react-router-dom";

/*
another api call not needed for data, since we already have that in state
but since we want to authenticate this request anyways, we 
might as well request api with id to make use of react router params
user could try to access this route by changing the url
*/

function OfferView({ token, error, setError }) {
  const [offerDetails, setOfferDetails] = useState([]);
  const [offer, setOffer] = useState([]);
  const tokenString = token.token;
  const rowParams = useParams();
  const navigate = useNavigate();

  // have to make call to validate token, user can change session storage
  // so token presence is not as secure as BE validation
  useEffect(() => {
    const offerList = async () => {
      try {
        const res = await showOffer(tokenString, rowParams.id);
        if (!res.ok) {
          throw new Error(`Status ${res.status}, ${res.statusText}`);
        } else {
          const data = await res.json();
          setOfferDetails(data.offer_details);
          setOffer(data);
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
        accessorKey: "start_age",
        header: "Start Age",
        muiTableHeadCellProps: { sx: { color: "green" } },
        Cell: ({ cell }) => <span>{cell.getValue()}</span>,
      },
      {
        accessorKey: "end_age",
        header: "End Age",
        muiTableHeadCellProps: { sx: { color: "green" } },
        Cell: ({ cell }) => <span>{cell.getValue()}</span>,
      },
      {
        accessorKey: "play_hours",
        header: "Play Hours",
        muiTableHeadCellProps: { sx: { color: "green" } },
        Cell: ({ cell }) => <span>{cell.getValue()}</span>,
      },
    ],
    []
  );

  return (
    <div>
      <div>
        <h2>{offer?.title}</h2>
        <div>
          <p>
            <strong>Description:</strong> {offer?.description}
          </p>
          <p>
            <strong>Gender:</strong> {offer?.gender}
          </p>
          <p>
            <strong>Payout</strong> {offer?.payout}
          </p>
        </div>
      </div>
      <div>
        <ErrorMessage hasError={error} />
      </div>
      <div>
        <MaterialReactTable
          columns={columns}
          data={offerDetails}
          enableColumnOrdering
          enablePagination
        />
      </div>
      <Outlet />
    </div>
  );
}

export default OfferView;

import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import getOffers from "../Services/Api";
import { MaterialReactTable } from "material-react-table";

/*
another api call not needed for data, since we already have that in state
but since we want to authenticate this request anyways, we 
might as well request api with id to get the offer we want
*/

function OfferView({ token }) {
  const [offer, setOffer] = useState([]);
  const tokenString = token.token;
  const rowParams = useParams();
  console.log(`rowParams: ${rowParams.id}`);

  const offerList = async () => {
    const res = await getOffers(tokenString, null, rowParams.id);
    console.log(`res: ${JSON.stringify(res)}`);
    setOffer(res.offer_details);
  };

  useEffect(() => {
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

  console.log(`offer: ${offer?.title}`);
  return (
    <div>
      <h2>OfferView</h2>
      <h2>{offer?.title}</h2>
      <div>
        <MaterialReactTable
          columns={columns}
          data={offer}
          enableColumnOrdering
          enablePagination
        />
      </div>
    </div>
  );
}

export default OfferView;

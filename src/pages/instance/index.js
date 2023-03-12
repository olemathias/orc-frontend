import { withApiData } from "utils/fetching";
import { DataGrid } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "next/link";

export const getServerSideProps = withApiData(undefined, {
  route: "instance",
  prop: "apiData",
});

export default function Home({ apiData }) {
  const instances = apiData.data.results;
  return (
    <Container sx={{ height: "100%", width: "100%" }}>
      <Typography gutterBottom variant="h4" component="div">
        Instances
      </Typography>
      <DataGrid
        autoHeight
        rows={instances}
        columns={[
          {
            field: "id",
            headerName: "ID",
            width: 200,
            renderCell: (params) => (
              <Link href={`/instance/${params.row.id}`}>{params.row.id}</Link>
            ),
          },
          { field: "name", headerName: "Name", width: 200 },
          {
            field: "platform",
            headerName: "Platform",
            width: 200,
            valueGetter: ({ row }) => row.platform.name,
          },
          {
            field: "network",
            headerName: "Network",
            width: 200,
            valueGetter: ({ row }) => row.network.name,
          },
        ]}
      />
    </Container>
  );
}

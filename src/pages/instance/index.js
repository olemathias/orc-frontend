import { withApiData } from "utils/fetching";
import { DataGrid } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
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
      <Button
        sx={{ mb: 2 }}
        variant="outlined"
        href="/instance/create"
        LinkComponent={Link} // NextJS Link
      >
        Create instance
      </Button>
      <DataGrid
        autoHeight
        rows={instances}
        columns={[
          {
            field: "id",
            headerName: "ID",
            width: 250,
            renderCell: (params) => (
              <Button
                href={`/instance/${params.row.id}`}
                LinkComponent={Link} // NextJS Link
              >
                {params.row.id}
              </Button>
            ),
          },
          { field: "name", headerName: "Name", width: 150 },
          {
            field: "platform",
            headerName: "Platform",
            width: 150,
            valueGetter: ({ row }) => row.platform.name,
          },
          {
            field: "network",
            headerName: "Network",
            width: 150,
            valueGetter: ({ row }) => row.network.name,
          },
          {
            field: "template",
            headerName: "Template",
            width: 150,
            valueGetter: ({ row }) => row.template.name,
          },
        ]}
      />
    </Container>
  );
}

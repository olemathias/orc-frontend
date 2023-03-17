import { withApiData } from "utils/fetching";
import { DataGrid } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export const getServerSideProps = withApiData(undefined, {
  route: "platform",
  prop: "apiData",
});

export default function Home({ apiData }) {
  const platforms = apiData.data.results;
  return (
    <Container sx={{ height: "100%" }}>
      <Typography gutterBottom variant="h4" component="div">
        Platforms
      </Typography>
      <DataGrid
        autoHeight
        rows={platforms}
        columns={[
          { field: "id", headerName: "ID", width: 250 },
          { field: "name", headerName: "Name", width: 150 },
          {
            field: "ipam_provider_config_type",
            valueGetter: ({ row }) => {
              return row.ipam_provider_config.type;
            },
            headerName: "IPAM Provider",
            width: 150,
          },
        ]}
      />
    </Container>
  );
}

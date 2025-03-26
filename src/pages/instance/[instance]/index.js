import { useState } from "react";
import { withApiData } from "utils/fetching";
import { useSession } from "next-auth/react";
import getConfig from "next/config";
import axios from "axios";
import { useRouter } from "next/router";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { DataGrid } from "@mui/x-data-grid";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

const { publicRuntimeConfig } = getConfig();
const apiUrl = publicRuntimeConfig.apiUrl;

export const getServerSideProps = withApiData(undefined, {
  route: ({ params }) => `instance/${params.instance}/`,
  prop: "instanceData",
});

export default function ShowInstance({ instanceData }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [showDeleteInstanceDialog, setShowDeleteInstanceDialog] =
    useState(false);
  const instance = instanceData.data;

  const deleteInstance = async () => {
    try {
      const response = await axios({
        method: "delete",
        url: `${apiUrl}/instance/${instance.id}/`,
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });
      const { data } = response;
      router.push(`/instance/`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container sx={{ height: "100%" }}>
      <Typography gutterBottom variant="h4" component="div">
        {instance.name}
      </Typography>
      <Button
        sx={{ mb: 2 }}
        variant="outlined"
        onClick={() => setShowDeleteInstanceDialog(true)}
      >
        Delete
      </Button>
      <TableContainer component={Paper} sx={{ marginTop: 2, marginBottom: 2 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Server Name</TableCell>
              <TableCell>{instance.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Domain</TableCell>
              <TableCell>
                {instance.platform?.dns_forward_provider_config?.domain}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Platform</TableCell>
              <TableCell>{instance.platform?.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Network</TableCell>
              <TableCell>{instance.network?.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Instance Template</TableCell>
              <TableCell>{instance.template?.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>IPv4</TableCell>
              <TableCell>
                {instance.ipam_provider_state?.ip_addresses[0]?.address}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>IPv6</TableCell>
              <TableCell>
                {instance.ipam_provider_state?.ip_addresses[1]?.address}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Created</TableCell>
              <TableCell>{instance.created}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Updated</TableCell>
              <TableCell>{instance.updated}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="ipam">
          <Typography sx={{ width: "33%", flexShrink: 0 }}>IPAM</Typography>
          <Typography sx={{ color: "text.secondary" }}>
            {instance.ipam_provider_state?.type}
            {" - "}
            {instance.ipam_provider_state?.status}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <pre>{JSON.stringify(instance.ipam_provider_state, null, 2)}</pre>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="vm">
          <Typography sx={{ width: "33%", flexShrink: 0 }}>VM</Typography>
          <Typography sx={{ color: "text.secondary" }}>
            {instance.vm_provider_state?.type}
            {" - "}
            {instance.vm_provider_state?.status}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <pre>{JSON.stringify(instance.vm_provider_state, null, 2)}</pre>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="vm">
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Forward DNS
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            {instance.dns_forward_provider_state?.type}
            {" - "}
            {instance.dns_forward_provider_state?.status}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <pre>
            {JSON.stringify(instance.dns_forward_provider_state, null, 2)}
          </pre>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="vm">
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Reverse DNS
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            {instance.dns_reverse_provider_state?.type}
            {" - "}
            {instance.dns_reverse_provider_state?.status}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <pre>
            {JSON.stringify(instance.dns_reverse_provider_state, null, 2)}
          </pre>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="vm">
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Identity Management
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            {instance.identity_management_provider_state?.type}
            {" - "}
            {instance.identity_management_provider_state?.status}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <pre>
            {JSON.stringify(
              instance.identity_management_provider_state,
              null,
              2
            )}
          </pre>
        </AccordionDetails>
      </Accordion>

      <Paper sx={{ mt: 2, pl: 1, pr: 1, pb: 2 }}>
        <Typography sx={{ p: 1 }} gutterBottom variant="h5" component="div">
          Tags
        </Typography>
        <DataGrid
          rowSelection={false}
          autoHeight
          rows={instance.tags}
          getRowId={(row) => row.key}
          columns={[
            { field: "key", headerName: "Key", width: 200 },
            { field: "value", headerName: "Value", width: 200 },
          ]}
        />
      </Paper>
      <Dialog open={showDeleteInstanceDialog}>
        <DialogTitle id="alert-dialog-title">
          Delete instance {instance.name}?
        </DialogTitle>
        <DialogActions>
          <Button
            variant="outlined"
            autoFocus
            onClick={() => setShowDeleteInstanceDialog(false)}
          >
            Cancel
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => deleteInstance(instance.id)}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

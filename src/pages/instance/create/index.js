import { useState } from "react";
import { withApiData } from "utils/fetching";
import { useSession } from "next-auth/react";
import getConfig from "next/config";
import axios from "axios";
import { useRouter } from "next/router";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

const { publicRuntimeConfig } = getConfig();
const apiUrl = publicRuntimeConfig.apiUrl;

export const getServerSideProps = withApiData(undefined, {
  route: "platform",
  prop: "apiData",
});

export default function Home({ apiData }) {
  const router = useRouter();
  const platforms = apiData.data.results;
  const { data: session } = useSession();

  const [vmConfig, setVmConfig] = useState({
    platform: {},
    network: {},
    template: {},
    name: "",
    memory: 4,
    cpu_cores: 2,
    os_disk: 32,
    tags: [],
  });

  const [cleanVmConfig, setCleanVmConfig] = useState(vmConfig);

  const setConfig = (key, value) => {
    // Reset all if platform is changed
    if (key === "platform" && value !== vmConfig.platform) {
      setVmConfig({
        ...vmConfig,
        platform: value,
        network: {},
        template: {},
      });
      setCleanVmConfig({
        ...cleanVmConfig,
        platform: value?.id,
        network: "",
        template: "",
      });
      return;
    }
    setVmConfig({ ...vmConfig, [key]: value });
    if (key === "platform" || key === "network" || key === "template") {
      setCleanVmConfig({ ...cleanVmConfig, [key]: value?.id });
    } else {
      setCleanVmConfig({ ...cleanVmConfig, [key]: value });
    }
  };

  const createServer = async () => {
    try {
      const response = await axios({
        method: "post",
        url: `${apiUrl}/instance/`,
        data: cleanVmConfig,
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });
      const { data } = response;
      console.log(data);
      router.push(`/instance/${data.id}`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container sx={{ height: "100%" }}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography gutterBottom variant="h4" component="div">
          Create Instance
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              label="Instance Name"
              fullWidth
              variant="standard"
              value={vmConfig.name}
              onChange={({ target }) => setConfig("name", target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              multiple={false}
              variant="standard"
              fullWidth
              options={platforms}
              autoHighlight
              getOptionLabel={(option) => option?.name ?? ""}
              renderOption={(props, option) => (
                <Box component="li" {...props}>
                  {option.name} ({option.dns_forward_provider_config?.domain})
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Platform"
                  inputProps={{
                    ...params.inputProps,
                  }}
                />
              )}
              value={vmConfig.platform ?? null}
              onChange={(e, value) => setConfig("platform", value)}
            />
          </Grid>
          {vmConfig?.platform?.id && (
            <>
              <Grid item xs={12}>
                <Autocomplete
                  multiple={false}
                  variant="standard"
                  fullWidth
                  options={vmConfig.platform.networks}
                  autoHighlight
                  getOptionLabel={(option) => option?.name ?? ""}
                  renderOption={(props, option) => (
                    <Box component="li" {...props}>
                      {option.name}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Network"
                      inputProps={{
                        ...params.inputProps,
                      }}
                    />
                  )}
                  value={vmConfig.network ?? null}
                  onChange={(e, value) => setConfig("network", value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  multiple={false}
                  variant="standard"
                  fullWidth
                  options={vmConfig.platform.instance_templates}
                  autoHighlight
                  getOptionLabel={(option) => option?.name ?? ""}
                  renderOption={(props, option) => (
                    <Box component="li" {...props}>
                      {option.name}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Instance Template"
                      inputProps={{
                        ...params.inputProps,
                      }}
                    />
                  )}
                  value={vmConfig.template ?? null}
                  onChange={(e, value) => setConfig("template", value)}
                />
              </Grid>
            </>
          )}
          {vmConfig.template?.id && (
            <>
              <Grid item xs={4}>
                <TextField
                  required
                  label="CPU Cores"
                  fullWidth
                  variant="standard"
                  value={vmConfig.cpu_cores}
                  onChange={({ target }) =>
                    setConfig("cpu_cores", target.value)
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  required
                  label="Memory in GB"
                  fullWidth
                  variant="standard"
                  value={vmConfig.memory}
                  onChange={({ target }) => setConfig("memory", target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  required
                  label="OS Disk in GB"
                  fullWidth
                  variant="standard"
                  value={vmConfig.os_disk}
                  onChange={({ target }) => setConfig("os_disk", target.value)}
                />
              </Grid>
            </>
          )}
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button sx={{ mt: 3, ml: 1 }}>Cancel</Button>
          <Button
            onClick={() => createServer()}
            disabled={
              !vmConfig.name ||
              !vmConfig.platform?.id ||
              !vmConfig.network?.id ||
              !vmConfig.template?.id ||
              !vmConfig.cpu_cores ||
              !vmConfig.memory ||
              !vmConfig.os_disk
            }
            variant="contained"
            sx={{ mt: 3, ml: 1 }}
          >
            Create
          </Button>
        </Box>
      </Paper>
      <Paper variant="outlined">
        <Grid container spacing={3}>
          <Grid item xs={12} sx={{ m: 2 }}>
            <Typography gutterBottom variant="h6" component="div">
              Raw JSON
            </Typography>
            <pre>{JSON.stringify(cleanVmConfig, null, 2)}</pre>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

import { useState } from "react";
import { withApiData } from "utils/fetching";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import Paper from "@mui/material/Paper";

export const getServerSideProps = withApiData(undefined, {
  route: "platform",
  prop: "apiData",
});

export default function Home({ apiData }) {
  const platforms = apiData.data.results;

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
  const [validVmConfig, setValidVmConfig] = useState(true);

  const setConfig = (key, value) => {
    setVmConfig({ ...vmConfig, [key]: value });
    if (key == "platform" || key == "network" || key == "template") {
      console.log(key);
      console.log(value);
      setCleanVmConfig({ ...cleanVmConfig, [key]: value?.id });
    } else {
      setCleanVmConfig({ ...cleanVmConfig, [key]: value });
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
                    autoComplete: "new-password",
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
                        autoComplete: "new-password",
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
                        autoComplete: "new-password",
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
      </Paper>
      <Paper>
        <Grid container spacing={3}>
          <Grid item xs={12} sx={{ m: 2 }}>
            {JSON.stringify(cleanVmConfig, null, 2)}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
  /*     <>
      <Container header={<Header variant="h2">Instance Config</Header>}>
        <FormField label="Name">
          <Input
            placeholder="Enter instance name"
            value={vmConfig.name}
            onChange={({ detail }) => setConfig("name", detail.value)}
          />
        </FormField>
        <FormField label="Platform">
          <Select
            placeholder="Select Platform"
            selectedAriaLabel="Selected"
            empty="No platforms supported"
            selectedOption={vmConfig.platform?.value ? vmConfig.platform : null}
            onChange={({ detail }) =>
              setConfig("platform", detail.selectedOption)
            }
            filteringType="auto"
            options={platforms.map((platform) => {
              var tags = [
                platform.ipam_provider_config?.type,
                platform.dns_forward_provider_config?.type,
                platform.dns_reverse_provider_config?.type,
                platform.vm_provider_config?.type,
                platform.configuration_management_provider_config?.type,
                platform.identity_management_provider_config?.type,
              ];
              return {
                label: platform.name,
                value: platform.id,
                tags: [...new Set(tags)],
              };
            })}
          />
        </FormField>
        {vmConfig?.platform?.value ? (
          <>
            <FormField label="Network">
              <Select
                placeholder="Select Network"
                selectedAriaLabel="Selected"
                empty="No networks supported"
                selectedOption={
                  vmConfig?.network?.value ? vmConfig.network : null
                }
                onChange={({ detail }) =>
                  setConfig("network", detail.selectedOption)
                }
                options={selectedPlatform?.networks.map((network) => {
                  return {
                    label: network.name,
                    value: network.id,
                  };
                })}
              />
            </FormField>
            <FormField label="Instance Template">
              <Select
                placeholder="Select Instance Template"
                selectedAriaLabel="Selected"
                empty="No images found on this platform"
                selectedOption={vmConfig.image.value ? vmConfig.image : null}
                onChange={({ detail }) =>
                  setConfig("image", detail.selectedOption)
                }
                options={selectedPlatform?.instance_images.map((image) => {
                  return {
                    label: image.name,
                    value: image.id,
                  };
                })}
              />
            </FormField>
          </>
        ) : (
          ""
        )}
      </Container>
      {vmConfig?.image?.value ? (
        <Container header={<Header variant="h2">Hardware Config</Header>}>
          <FormField label="Memory GB">
            <Input
              placeholder="Instance Memory in GB"
              value={vmConfig.memory}
              onChange={({ detail }) => setConfig("memory", detail.value)}
              inputMode="numeric"
              type="number"
            />
          </FormField>
          <FormField label="CPU Cores">
            <Input
              placeholder="Instance CPU Cores"
              value={vmConfig.cpu_cores}
              onChange={({ detail }) => setConfig("cpu_cores", detail.value)}
              inputMode="numeric"
              type="number"
            />
          </FormField>
          <FormField label="OS Disk GB">
            <Input
              placeholder="Instance OS Disk in GB"
              value={vmConfig.os_disk}
              onChange={({ detail }) => setConfig("os_disk", detail.value)}
              inputMode="numeric"
              type="number"
            />
          </FormField>
        </Container>
      ) : (
        ""
      )}
      <Container header={<Header variant="h2">Tags</Header>}>
        <TagEditor
          i18nStrings={{
            keyPlaceholder: "Enter key",
            valuePlaceholder: "Enter value",
            addButton: "Add new tag",
            removeButton: "Remove",
            undoButton: "Undo",
            undoPrompt: "This tag will be removed upon saving changes",
            loading: "Loading tags that are associated with this instance",
            keyHeader: "Key",
            valueHeader: "Value",
            optional: "optional",
            keySuggestion: "Custom tag key",
            valueSuggestion: "Custom tag value",
            emptyTags: "No tags associated with the instance.",
            tooManyKeysSuggestion: "You have more keys than can be displayed",
            tooManyValuesSuggestion:
              "You have more values than can be displayed",
            keysSuggestionLoading: "Loading tag keys",
            keysSuggestionError: "Tag keys could not be retrieved",
            valuesSuggestionLoading: "Loading tag values",
            valuesSuggestionError: "Tag values could not be retrieved",
            emptyKeyError: "You must specify a tag key",
            maxKeyCharLengthError:
              "The maximum number of characters you can use in a tag key is 128.",
            maxValueCharLengthError:
              "The maximum number of characters you can use in a tag value is 256.",
            duplicateKeyError: "You must specify a unique tag key.",
            invalidKeyError:
              "Invalid key. Keys can only contain Unicode letters, digits, white space and any of the following: _.:/=+@-",
            invalidValueError:
              "Invalid value. Values can only contain Unicode letters, digits, white space and any of the following: _.:/=+@-",
            tagLimit: (availableTags, tagLimit) =>
              availableTags === tagLimit
                ? "You can add up to " + tagLimit + " tags."
                : availableTags === 1
                ? "You can add up to 1 more tag."
                : "You can add up to " + availableTags + " more tags.",
            tagLimitReached: (tagLimit) =>
              tagLimit === 1
                ? "You have reached the limit of 1 tag."
                : "You have reached the limit of " + tagLimit + " tags.",
            tagLimitExceeded: (tagLimit) =>
              tagLimit === 1
                ? "You have exceeded the limit of 1 tag."
                : "You have exceeded the limit of " + tagLimit + " tags.",
            enteredKeyLabel: (key) => 'Use "' + key + '"',
            enteredValueLabel: (value) => 'Use "' + value + '"',
          }}
          tags={vmConfig.tags}
          onChange={({ detail }) => setConfig("tags", detail.tags)}
          tagLimit={10}
        />
      </Container>

      <Container header={<Header variant="h2">Raw JSON</Header>}>
        {JSON.stringify(cleanVmConfig, null, 2)}
      </Container>

      <Container>
        <Button disabled={validVmConfig ? false : true} variant="primary">
          Create instance
        </Button>
      </Container>
    </> */
}

import {
  FormControl,
  type SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";

import { text } from "~/assets/text/index.js";
import { TextInputField } from "~/components/input-field/index.js";
import { PrimaryButton } from "~/components/primary-button/index.js";
import { SelectField } from "~/components/select-field";
import { SUPPORT_TOPIC } from "~/constants/support.js";
import { styles } from "~/styles/pages/support.js";
import { api } from "~/utils/api.js";

function Support() {
  const copywrite = text.support;

  const [topic, setTopic] = useState<(typeof SUPPORT_TOPIC)[number] | "">("");
  const [email, setEmail] = useState<string>("");
  const [issue, setIssue] = useState<string>("");

  const supportForm = api.support.sendEmail.useMutation();

  // TODO: casting unknown as string is not ideal but Mui types seem to require it
  // https://stackoverflow.com/questions/58675993/typescript-react-select-onchange-handler-type-error
  const handleTopic = (event: SelectChangeEvent<unknown>) =>
    setTopic(event.target.value as (typeof SUPPORT_TOPIC)[number]);
  const handleEmail = (event: { target: { value: string } }) =>
    setEmail(event.target.value);
  const handleIssue = (event: { target: { value: string } }) =>
    setIssue(event.target.value);

  const handleSubmit = () => {
    supportForm.mutate({
      sender: email,
      message: issue,
      subject: topic,
    });
  };

  return (
    <Stack sx={styles.container}>
      <Typography variant="h1" color="common.black" pt={10} textAlign="center">
        {text.general.support}
      </Typography>
      <Typography variant="body1" sx={styles.text}>
        {copywrite.main[0]}
        <br />
        {copywrite.main[1]}
      </Typography>
      <FormControl sx={styles.formContainer} fullWidth>
        <SelectField
          onChange={handleTopic}
          value={topic}
          options={[...SUPPORT_TOPIC]}
          placeholder={copywrite.placeholder.topic}
          heading={copywrite.input.topic}
          fullWidth
        />
        <TextInputField
          placeholder={copywrite.placeholder.email}
          heading={copywrite.input.email}
          value={email}
          onChange={handleEmail}
        />
        <TextInputField
          placeholder={copywrite.placeholder.issue}
          heading={copywrite.input.issue}
          fullWidth
          container={styles.issueInput}
          value={issue}
          onChange={handleIssue}
        />
        <PrimaryButton sx={styles.button} onClick={handleSubmit}>
          Send
        </PrimaryButton>
      </FormControl>
    </Stack>
  );
}

export default Support;

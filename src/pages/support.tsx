import { FormControl, Typography, type SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import { useErrorBoundary } from "react-error-boundary";

import { text } from "~/assets/text/index.js";
import { TextInputField } from "~/components/input-field/index.js";
import { PrimaryButton } from "~/components/primary-button/index.js";
import { SelectField } from "~/components/select-field/index.js";
import { errorMessage } from "~/constants/error-messages.js";
import {
  knownTopic,
  validEmailSchema,
  validIssueSchema,
  validTopicSchema,
  validation,
} from "~/constants/index.js";
import { SUPPORT_TOPIC, type SupportTopic } from "~/constants/support.js";
import { PageLayout } from "~/containers/page-layout/index.js";
import { styles } from "~/styles/pages/support.js";
import { api } from "~/utils/api.js";

const Support = () => {
  const copywrite = text.support;
  const { textLength } = validation;

  const [topic, setTopic] = useState<(typeof SUPPORT_TOPIC)[number]>("");
  const [email, setEmail] = useState<string>("");
  const [issue, setIssue] = useState<string>("");
  const { showBoundary } = useErrorBoundary();

  const supportForm = api.support.sendEmail.useMutation();

  // TODO: casting unknown as string is not ideal but Mui types seem to require it
  // https://stackoverflow.com/questions/58675993/typescript-react-select-onchange-handler-type-error
  const handleTopic = (event: SelectChangeEvent<unknown>) =>
    setTopic(event.target.value as SupportTopic);

  const handleEmail = (event: { target: { value: string } }) => {
    if (errors.email) validateForm.email();
    setEmail(event.target.value);
  };

  const handleIssue = (event: { target: { value: string } }) => {
    if (errors.issue) validateForm.issue();
    setIssue(event.target.value);
  };

  const [errors, setValidation] = useState({
    topic: "",
    email: "",
    issue: "",
  });

  const validateForm = {
    topic: () =>
      setValidation((prevState) => ({
        ...prevState,
        topic:
          !validTopicSchema.safeParse(topic).success && knownTopic(topic)
            ? validation.invalid.topic
            : "",
      })),

    email: () =>
      setValidation((prevState) => ({
        ...prevState,
        email: !validEmailSchema.safeParse(email).success
          ? validation.invalid.email
          : "",
      })),

    issue: () =>
      setValidation((prevState) => ({
        ...prevState,
        issue: !validIssueSchema.safeParse(issue).success
          ? textLength.long.error
          : "",
      })),
  };

  const handleSubmit = () => {
    try {
      await supportForm.mutateAsync({ email, issue, topic });
    } catch (e) {
      e instanceof Error
        ? console.error(`[${errorMessage.support}]: ${e.message}`, e)
        : console.error(e);

      showBoundary(errorMessage.support);
    }
  };

  return (
    <PageLayout title={text.general.support}>
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
          onBlur={validateForm.email}
          validationError={errors.email}
        />
        <TextInputField
          placeholder={copywrite.placeholder.issue}
          heading={copywrite.input.issue}
          fullWidth
          container={styles.issueInput}
          value={issue}
          onChange={handleIssue}
          onBlur={validateForm.issue}
          validationError={errors.issue}
          multiline
        />
        <PrimaryButton
          sx={styles.button}
          onClick={handleSubmit}
          disabled={!!Object.values(errors).join("")}
        >
          Send
        </PrimaryButton>
      </FormControl>
    </PageLayout>
  );
};

export default Support;

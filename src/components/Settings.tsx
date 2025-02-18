import { useRef } from "react";
import { useForm } from "@mantine/form";
import { NumberInput, Group, Button, NumberInputHandlers } from "@mantine/core";

import styles from "./settings.module.css";

export const Settings = ({
  focusTime,
  breakTime,
  setSubmittedValues,
}: {
  focusTime: number;
  breakTime: number;
  setSubmittedValues: any;
}) => {
  const handlersRef = useRef<NumberInputHandlers>(null);

  // Initialize the form with default or saved values
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      focusTime: focusTime || 25, // Default focus time is 15 if not set
      breakTime: breakTime || 10, // Default break time is 10 if not set
    },
  });
  // When form is submitted, save the values to localStorage
  const handleSubmit = (val: typeof form.values) => {
    setSubmittedValues(val);
    window.localStorage.setItem("timeValues", JSON.stringify(val)); // Save to localStorage
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} className={styles.container}>
      <h1>Settings</h1>

      <NumberInput
        allowNegative={false}
        allowDecimal={false}
        label="Set Focus Time"
        placeholder="set time"
        handlersRef={handlersRef}
        step={5}
        min={5}
        max={120}
        defaultValue={focusTime}
        key={form.key("focusTime")}
        {...form.getInputProps("focusTime")}
      />

      <Group mt="md" justify="center">
        <Button
          onClick={() => handlersRef.current?.decrement()}
          variant="default"
        >
          Decrement by 5
        </Button>

        <Button
          onClick={() => handlersRef.current?.increment()}
          variant="default"
        >
          Increment by 5
        </Button>
      </Group>
      <NumberInput
        allowNegative={false}
        allowDecimal={false}
        variant="filled"
        label="Set Break Time"
        placeholder="set Break time"
        // handlersRef={handlersRef}
        step={5}
        min={5}
        max={60}
        defaultValue={breakTime || 10}
        key={form.key("breakTime")}
        {...form.getInputProps("breakTime")}
      />

      <Group mt="md" justify="center">
        <Button
          onClick={() => handlersRef.current?.decrement()}
          variant="default"
        >
          Decrement by 5
        </Button>

        <Button
          onClick={() => handlersRef.current?.increment()}
          variant="default"
        >
          Increment by 5
        </Button>
      </Group>

      <Button type="submit" mt="md">
        Submit
      </Button>
    </form>
  );
};

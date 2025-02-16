import { ActionIcon, RingProgress, Text, Center } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconCheck } from "@tabler/icons-react";

import styles from "./progressBar.module.css";

export const ProgressBar = ({
  timer,
  label,
}: {
  timer: string;
  label: string;
}) => {
  const isFinished = label === "100%";
  const isMobile = useMediaQuery("(max-width: 767px)");
  //   const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1024px)");
  //   const isDesktop = useMediaQuery("(min-width: 1025px)");
  return (
    <>
      <RingProgress
        className={styles.container}
        sections={[
          { value: Number(timer), color: isFinished ? "teal" : "blue" },
        ]}
        thickness={isMobile ? 20 : 40}
        size={isMobile ? 200 : 400}
        label={
          <Text
            c={isFinished ? "green" : "blue"}
            fw={700}
            ta="center"
            size="xl"
          >
            {isFinished ? (
              <ActionIcon
                color="teal"
                variant="light"
                radius="xl"
                size="input-xl"
              >
                <IconCheck size={50} />
              </ActionIcon>
            ) : (
              label
            )}
          </Text>
        }
      />
    </>
  );
};

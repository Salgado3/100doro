import { MouseEvent, SetStateAction, useState } from "react";
import {
  IconGauge,
  IconFingerprint,
  IconActivity,
  IconChevronRight,
} from "@tabler/icons-react";
import { Box, NavLink } from "@mantine/core";
const data = [
  { icon: IconGauge, label: "home" },
  {
    icon: IconFingerprint,
    label: "settings",
    rightSection: <IconChevronRight size={16} stroke={1.5} />,
  },
  { icon: IconActivity, label: "Community stats" },
];

export const Navbar = ({ setActiveComponent }: any) => {
  const [active, setActive] = useState(0);
  const handleClick = (
    e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>,
    index: SetStateAction<number>
  ) => {
    console.log("jaimes e.target", e, e.target);
    setActive(index);
    setActiveComponent(e.target?.textContent as string);
  };

  const items = data.map((item, index) => (
    <NavLink
      href="#required-for-focus"
      key={item.label}
      active={index === active}
      label={item.label}
      description={item?.description || ""}
      rightSection={item.rightSection}
      leftSection={<item.icon size={16} stroke={1.5} />}
      onClick={(e) => handleClick(e, index)}
    />
  ));

  return <Box w={220}>{items}</Box>;
};

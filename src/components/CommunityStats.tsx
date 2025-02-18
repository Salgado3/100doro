import { Table } from "@mantine/core";

import styles from "./communityStats.module.css";
import UserChart from "./UserChart";

const mockData = [
  { rank: 1, name: "John Doe", score: 98 },
  { rank: 2, name: "Jane Smith", score: 92 },
  { rank: 3, name: "Samuel Green", score: 88 },
  { rank: 4, name: "Emily Brown", score: 85 },
  { rank: 5, name: "Michael Johnson", score: 82 },
  { rank: 6, name: "Alice White", score: 78 },
  { rank: 7, name: "David Black", score: 75 },
  { rank: 8, name: "Sophia Blue", score: 70 },
  { rank: 9, name: "Olivia Pink", score: 68 },
  { rank: 10, name: "Liam Grey", score: 65 },
];

export const CommunityStats = () => {
  const rows = mockData.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element.rank}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.score}</Table.Td>
    </Table.Tr>
  ));
  return (
    <>
      <Table className={styles.table}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th className={styles.tableHeader}> Rank</Table.Th>
            <Table.Th className={styles.tableHeader}>UserName</Table.Th>
            <Table.Th className={styles.tableHeader}>Points</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      <UserChart />
    </>
  );
};

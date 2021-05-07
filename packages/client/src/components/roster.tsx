import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Player, Team } from "@bball/simulation/src";
import { Link as GatsbyLink } from "gatsby";

const Roster: React.FC<{ team: Team; starters?: boolean }> = ({
  team,
  starters,
}) => {
  const players = starters ? team.roster.starters : team.roster.allPlayers;
  return (
    <Table variant="simple" bg="white" size="sm" marginBottom="2" color="black">
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Rating</Th>
          <Th>Pos</Th>
        </Tr>
      </Thead>
      <Tbody>
        {players.map((player: Player) => (
          <Tr key={player.id}>
            <Td>
              <ChakraLink as={GatsbyLink} to="/player/" state={{ player }}>
                {player.name}
              </ChakraLink>
            </Td>
            <Td>{player.rating}</Td>
            <Td>{player.pos}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default Roster;
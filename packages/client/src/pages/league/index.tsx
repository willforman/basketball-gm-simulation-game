import React, { useEffect } from "react";
import { useLeague } from "../../context/league";
import Layout from "../../components/layout";
import StandingsTable from "../../components/standingsTable";
import { navigate } from "gatsby";
import { Grid, GridItem, Text } from "@chakra-ui/layout";
import Schedule from "../../components/schedule";

const LeagueIndex: React.FC = () => {
  const { league } = useLeague();

  // if navigated to this page without a league, will go back
  // to create league page
  useEffect(() => {
    if (league == null) {
      navigate("/");
    }
  });

  if (league == null) {
    return <div></div>;
  }

  return (
    <Layout>
      <Grid templateColumns="1fr 1fr" gap={4}>
        <GridItem>
          <StandingsTable league={league} />
        </GridItem>
        <GridItem>
          <Text size="3xl" fontWeight="extrabold">
            {`Week: ${league.regularSeason.weekIdx + 1} / ${
              league.regularSeason.numWeeks
            }`}
          </Text>
          <Schedule games={league.regularSeason.getWeekGames(0)} />
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default LeagueIndex;

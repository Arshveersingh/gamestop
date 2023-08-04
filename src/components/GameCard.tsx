import { Card, CardBody, HStack, Heading, Image } from "@chakra-ui/react";
import { Game } from "../hooks/useGames";
import { PlatfromIconList } from "./PlatfromIconList";
import { CriticScore } from "./CriticScore";
import getCroppedImages from "../services/image-url";
import { Emoji } from "./Emoji";
import { Link } from "react-router-dom";

interface Props {
  game: Game;
}

export const GameCard = ({ game }: Props) => {
  return (
    <Card>
      <Image src={getCroppedImages(game.background_image)}></Image>
      <CardBody>
        <HStack justifyContent={"space-between"} marginBottom={3}>
          <PlatfromIconList
            platforms={game.parent_platforms.map((p) => p.platform)}
          ></PlatfromIconList>
          <CriticScore score={game.metacritic}></CriticScore>
        </HStack>
        <Heading fontSize={"2xl"}>
          {" "}
          <Link to={`/games/${game.slug}`}>{game.name}</Link>{" "}
        </Heading>
        <Emoji rating={game.rating_top}></Emoji>
      </CardBody>
    </Card>
  );
};

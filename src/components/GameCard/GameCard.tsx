import {
  Card,
  CardBody,
  HStack,
  Heading,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Game from "../../entities/Game";
import getCroppedImages from "../../services/image-url";
import { CriticScore } from "../CriticScore";
import { Emoji } from "../Emoji";
import { PlatformIconList } from "../PlatformIconList";
import styles from "./GameCard.module.css";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

interface Props {
  game: Game;
}
// Returns true if the game is released
const checkReleaseDate = (releaseDate: string) => {
  return releaseDate <= new Date().toISOString().split("T")[0]; // format YYYY-MM-DD
};

export const GameCard = ({ game }: Props) => {
  const backgroundColor = useColorModeValue("whitesmoke", "gray.700");

  return (
    <Card background={backgroundColor}>
      <Link to={`/games/${game.slug}`}>
        <Image
          width={"100%"}
          className={styles.gameCardImage}
          src={getCroppedImages(game.background_image)}
        ></Image>
      </Link>
      <CardBody paddingY={2} paddingX={3}>
        <HStack justifyContent={"space-between"} marginBottom={2}>
          <PlatformIconList
            platforms={game.parent_platforms?.map((p) => p.platform)}
          ></PlatformIconList>
          <CriticScore score={game.metacritic}></CriticScore>
        </HStack>
        <Heading
          fontSize={"xl"}
          fontFamily="'Bebas Neue', 'Roboto', 'Sans-Serif';"
          display="flex"
          justifyContent="space-between"
          alignItems={"center"}
        >
          <Link to={`/games/${game.slug}`}>
            <Text noOfLines={1} fontWeight={1} letterSpacing={2}>
              {game.name}
            </Text>
          </Link>
          <Emoji
            rating={checkReleaseDate(game.released) ? game.rating : -1}
          ></Emoji>
        </Heading>
      </CardBody>
    </Card>
  );
};

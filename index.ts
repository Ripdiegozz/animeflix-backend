import { ANIME } from "@consumet/extensions";

const animeProvider = new ANIME.Gogoanime();

animeProvider
  .fetchEpisodeSources("naruto-episode-1")
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
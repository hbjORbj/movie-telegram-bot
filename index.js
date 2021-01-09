const dotenv = require("dotenv");
dotenv.config();
const axios = require("axios");
const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

bot.help((ctx) =>
  ctx.reply("Enter the title of a movie you would like to know about 😃")
);

bot.on("sticker", (ctx) => ctx.reply("😎"));

bot.on("text", async (ctx) => {
  const movieTitle = ctx.message.text.trim();
  ctx.replyWithMarkdown("_Looking for_ " + "... " + movieTitle);
  await axios
    .get(
      `http://www.omdbapi.com/?apikey=${
        process.env.MOVIE_API_KEY
      }&t=${movieTitle.replace(/ /g, "+")}`
    )
    .then((response) => {
      const movie = response.data;
      if (movie.Response == "True") {
        const {
          Title,
          Year,
          Rated,
          Released,
          Runtime,
          Director,
          Actors,
          Plot,
          Country,
          Awards,
          Poster,
          imdbRating,
        } = movie;
        ctx.replyWithPhoto(
          { url: Poster },
          {
            caption:
              "Title: " +
              `_${Title}_` +
              "\nYear: " +
              `_${Year}_` +
              "\nRated: " +
              `_${Rated}_` +
              "\nReleased: " +
              `_${Released}_` +
              "\nRuntime: " +
              `_${Runtime}_` +
              "\nActors: " +
              `_${Actors}_` +
              "\nCountry: " +
              `_${Country}_` +
              "\nDirector: " +
              `_${Director}_` +
              "\nAwards: " +
              `_${Awards}_` +
              "\nIMDB Rating: " +
              `_${imdbRating}_` +
              "\n\nPlot: " +
              `_${Plot}_`,
            parse_mode: "Markdown",
          }
        );
      } else {
        ctx.reply("There is no such movie 😂");
      }
    });
});

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

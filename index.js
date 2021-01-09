const dotenv = require("dotenv");
dotenv.config();
const axios = require("axios");
const { Telegraf } = require("telegraf");
const { getCaption, reformatTitle } = require("./utils");

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

bot.help((ctx) =>
  ctx.reply("Enter the title of a movie you would like to know about 😃")
);

bot.on("sticker", (ctx) => ctx.reply("😎"));

bot.on("text", async (ctx) => {
  let movieTitle = ctx.message.text.trim();
  ctx.replyWithMarkdown("_Looking for_ " + "... " + movieTitle);
  movieTitle = reformatTitle(movieTitle);

  const url = `http://www.omdbapi.com/?apikey=${process.env.MOVIE_API_KEY}&t=${movieTitle}`;

  await axios.get(url).then((response) => {
    const movie = response.data;
    if (movie.Error) {
      ctx.reply("There is no such movie 😂");
    } else {
      const caption = getCaption(movie);
      ctx.replyWithPhoto(
        {
          url:
            movie.Poster !== "N/A"
              ? movie.Poster
              : process.env.DEFAULT_POSTER_URL,
        },
        {
          caption: caption,
          parse_mode: "Markdown",
        }
      );
    }
  });
});

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

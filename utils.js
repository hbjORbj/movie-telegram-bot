exports.getCaption = (movie) => {
  let {
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
    imdbRating,
  } = movie;

  if (Title === "N/A") {
    Title = "Can't find Title 😭";
  }
  if (Year === "N/A") {
    Year = "Can't find Year 😭";
  }
  if (Rated === "N/A") {
    Rated = "Can't find Rated 😭";
  }
  if (Released === "N/A") {
    Released = "Can't find Released 😭";
  }
  if (Runtime === "N/A") {
    Runtime = "Can't find Runtime 😭";
  }
  if (Director === "N/A") {
    Director = "Can't find Director 😭";
  }
  if (Actors === "N/A") {
    Actors = "Can't find Actors 😭";
  }
  if (Plot === "N/A") {
    Plot = "Can't find Plot 😭";
  }
  if (Country === "N/A") {
    Country = "Can't find Country 😭";
  }
  if (Awards === "N/A") {
    Awards = "Can't find Awards 😭";
  }
  if (imdbRating === "N/A") {
    imdbRating = "Can't find IMDB Rating 😭";
  }

  let recommendMsg = "";
  if (Number(imdbRating) > 5 && Number(imdbRating) < 7) {
    recommendMsg = "\n\nSeems alright 😧";
  } else if (Number(imdbRating) >= 7) {
    recommendMsg = "\n\nI recommend this movie 😍";
  }

  return (
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
    `_${Plot}_` +
    recommendMsg
  );
};

exports.reformatTitle = (title) => {
  let newTitle = "";
  // eliminate extra space between words
  for (let i = 0; i < title.length; i++) {
    if (title[i] === " " && title[i + 1] === " ") {
      continue;
    } else {
      newTitle += title[i];
    }
  }
  // replace every empty space with + so fetching data succeeds
  newTitle = newTitle.replace(/ /g, "+");
  return newTitle;
};

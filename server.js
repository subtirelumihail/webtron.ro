const express = require("express");
const path = require("path");
const translations = {
  en: require("./translations/en.json"),
  ro: require("./translations/ro.json")
};

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'hbs');

// Serve static files (CSS, JavaScript, images)
app.use('/static', express.static(path.join(__dirname, 'public')));


// get device language
app.use((req, res) => {
  const language = req.headers["accept-language"]?.slice(0, 2);
  res.locals.language = language;
  res.locals.translations = translations[language] || translations.en;
  next();
});

// Routes
app.get("/", (req, res) =>  res.render("index", res.locals.translations));
app.get("/team", (req, res) =>  res.render("team", res.locals.translations));
app.get("/integrations", (req, res) =>  res.render("integrations", res.locals.translations));

// Handle 404
app.use((req, res) => {
  res.status(404).send("404 - Page Not Found");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

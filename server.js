const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'hbs');

// Serve static files (CSS, JavaScript, images)
app.use('/static', express.static(path.join(__dirname, 'public')));

// Routes
app.get("/", (req, res) =>  res.render("index"));
app.get("/team", (req, res) =>  res.render("team"));
app.get("/integrations", (req, res) =>  res.render("integrations"));

// Handle 404
app.use((req, res) => {
  res.status(404).send("404 - Page Not Found");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

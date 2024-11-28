const express = require("express");
const cors = require("cors");
const lib = require("./utils");
const app = express();
const port = 3000;

app.use(
	cors({
		origin: "*", // allow requests from any other server
	})
);
app.get("/short/:id", async (req, res) => {
	try {
		const id = req.params.id;
		const url = await lib.findOrigin(id);
		if (url == null) {
			res.send("<h1>404</h1>");
		} else {
			res.send(url);
		}
	} catch (err) {
		res.send(err);
	}
});

app.post("/create", async (req, res) => {
	try {
		const url = req.query.url;
		console.log(url);
		const newID = await lib.shortUrl(url);
		res.send(newID);
	} catch (err) {
		res.send(err);
	}
});

app.listen(port, () => {
	console.log(`CS1 app listening on port ${port}`);
});

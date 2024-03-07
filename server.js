const http = require("http");
const { getReq, postReq, deleteReq, putReq } = require("./methods");
const dataFromFile = require("./data/data.json");
require("dotenv").config();

const PORT = process.env.PORT || 8887;

const server = http.createServer((req, res) => {
	req.message = dataFromFile;
	try {
		switch (req.method) {
			case "GET":
				getReq(req, res);
				break;
			case "POST":
				postReq(req, res);
				break;
			case "PUT":
				putReq(req, res);
				break;
			case "DELETE":
				deleteReq(req, res);
				break;
			default:
				res.statusCode = 404;
				res.setHeader("Content-type", "Application/json");
				res.write(
					JSON.stringify({
						title: "UNDEFINED_ROUTE",
						message: "Route not found",
					})
				);
				res.end();
		}
	} catch (error) {
		res.statusCode = 404;
		res.setHeader("Content-type", "Application/json");
		res.write(JSON.stringify({ error, message: "Route not found" }));
		res.end();
	}
});

server.listen(PORT, () => {
	console.log("Listening on port:", PORT);
});

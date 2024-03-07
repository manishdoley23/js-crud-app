const crypto = require("crypto");

const writeToFile = require("../utils/write-to-file");
const bodyParser = require("../utils/body-parser");

module.exports = async (req, res) => {
	if (req.url === "/api/data") {
		const message = req.message;

		try {
			const reqBody = await bodyParser(req);
			reqBody.id = crypto.randomUUID();
			message.push(reqBody);
			writeToFile(message);
			res.statusCode = 201;
			res.setHeader("Content-type", "application/json");
			res.end();
		} catch (error) {
			res.writeHead(400, { "Content-type": "application/json" });
			res.end(
				JSON.stringify({
					error,
					title: "Bad request",
					message: "Can't insert new item",
				})
			);
		}
	} else {
		res.writeHead(404, { "Content-type": "Application/json" });
		res.end(
			JSON.stringify({
				title: "Bad request",
				message: "New item can't be inserted",
			})
		);
	}
};

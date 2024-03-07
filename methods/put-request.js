const bodyParser = require("../utils/body-parser");
const writeToFile = require("../utils/write-to-file");

module.exports = async (req, res) => {
	const baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
	const id = req.url.split("/")[3];

	if (baseUrl === "/api/data/") {
		const parsedReq = await bodyParser(req);
		const foundMsg = req.message.findIndex((msg) => msg.id === id);
		if (foundMsg === -1) {
			res.writeHead(404, { "Content-type": "application/json" });
			res.end(
				JSON.stringify({
					title: "Invalid request",
					message: "Errored at put",
				})
			);
		} else {
			req.message[foundMsg] = { id, ...parsedReq };
			writeToFile(req.message);
			res.writeHead(200, { "Content-type": "application/json" });
			res.end();
		}
	} else {
		res.writeHead(404, { "Content-type": "application/json" });
		res.end(
			JSON.stringify({
				title: "Invalid request",
				message: "Errored at put",
			})
		);
	}
};

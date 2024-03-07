const writeToFile = require("../utils/write-to-file");

module.exports = (req, res) => {
	const baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
	const idx = req.url.split("/")[3];

	if (baseUrl === "/api/data/") {
		const filteredItems = req.message.filter((msg) => msg.id !== idx);
		if (filteredItems.length < req.message.length) {
			writeToFile(filteredItems);
			res.statusCode = 204;
			res.setHeader("Content-type", "application/json");
			res.end();
		} else {
			res.writeHead(403, { "Content-type": "application/json" });
			res.end(
				JSON.stringify({ title: "Not found", message: "ID not valid" })
			);
		}
	} else {
		res.statusCode = 404;
		res.setHeader("Content-type", "application/json");
		res.write(
			JSON.stringify({
				title: "Error in delete",
				message: "Errored in delete",
			})
		);
		res.end();
	}
};

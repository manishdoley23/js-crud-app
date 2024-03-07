const fs = require("fs");
const path = require("path");

module.exports = (content) => {
	try {
		const pathToData = path.join(__dirname, "..", "data", "data.json");
		fs.writeFileSync(pathToData, JSON.stringify(content), "utf-8");
	} catch (error) {
		console.log("Errored during file write", error);
	}
};

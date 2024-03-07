module.exports = (request) => {
	return new Promise((resolve, reject) => {
		try {
			let parsedReq = "";
			request.on("data", (chunk) => {
				parsedReq += chunk;
			});
			request.on("end", () => {
				resolve(JSON.parse(parsedReq));
			});
		} catch (error) {
			console.log("Error in parsing:", error);
			reject(error);
		}
	});
};

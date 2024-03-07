module.exports = (req, res) => {
	try {
		// const reqUrl = req.url;

		// let idxLastSlash = 0;
		// for (let i = 0; i < reqUrl.length; ++i) {
		// 	if (reqUrl[i] === "/") {
		// 		idxLastSlash = i;
		// 	}
		// }

		// let baseAddress = "";
		// const url = reqUrl.split("/");
		// const idx = url[url.length - 1];
		// if (idx === "data") {
		// 	baseAddress = reqUrl;
		// } else {
		// 	for (let i = 0; i < idxLastSlash; ++i) {
		// 		baseAddress += reqUrl[i];
		// 	}
		// }

		// if (reqUrl === BASE_ADDRESS) {
		// 	res.statusCode = 200;
		// 	res.setHeader("Content-type", "Application/json");
		// 	res.write(JSON.stringify(req.message));
		// 	res.end();
		// } else if (baseAddress === BASE_ADDRESS) {
		// 	const data = req.message;
		// 	const filteredItems = data.filter((val) => val.id === idx);
		// 	if (filteredItems.length > 0) {
		// 		res.statusCode = 200;
		// 		res.setHeader("Content-type", "Application/json");
		// 		res.write(JSON.stringify(filteredItems));
		// 		res.end();
		// 	} else {
		// 		res.writeHead(404, { "Content-type": "Application/json" });
		// 		res.end(
		// 			JSON.stringify({
		// 				title: "Not found",
		// 				message: "Item not available",
		// 			})
		// 		);
		// 	}
		// } else {
		// 	res.writeHead(404, { "Content-type": "Application/json" });
		// 	res.write(
		// 		JSON.stringify({
		// 			title: "Not Found",
		// 			message: "Route not found",
		// 		})
		// 	);
		// 	res.end();
		// }

		// Minimized version of the above code
		let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
		let id = req.url.split("/")[3];

		if (req.url === "/api/data") {
			res.statusCode = 200;
			res.setHeader("Content-type", "application/json");
			res.write(JSON.stringify(req.message));
			res.end();
		} else if (id && baseUrl === "/api/data/") {
			const filteredData = req.message.filter(
				(message) => message.id === id
			);
			if (filteredData.length > 0) {
				res.writeHead(200, { "Content-type": "application/json" });
				res.end(JSON.stringify(filteredData));
			} else {
				res.writeHead(404, { "Content-type": "application/json" });
				res.end(
					JSON.stringify({
						title: "Bad request here",
						message: "Request not found",
					})
				);
			}
		} else {
			res.writeHead(404, { "Content-type": "application/json" });
			res.end(
				JSON.stringify({
					title: "Bad request",
					message: "Request not found",
				})
			);
		}
	} catch (error) {
		res.statusCode = 404;
		res.setHeader("Content-type", "Application/json");
		res.writeMessage({ error, message: "Errored at get" });
		res.end();
	}
};

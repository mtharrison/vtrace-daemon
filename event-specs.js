var eventSpecs = {
	"sessionStarted": {
		domain: "general",
		process_name: "none",
		bounds: "none"
	},
	"vpapiInitGameRequested": {
		domain: "network/api",
		process_name: "Vpapi initting game",
		bounds: "start"
	},
	"vpapiInitGameResponseReceived": {
		domain: "network/api",
		process_name: "Vpapi initting game",
		bounds: "end"
	},
};

module.exports = eventSpecs;
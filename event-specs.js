var eventSpecs = {
	"sessionStarted": {
		domain: "general",
		process_name: "none",
		process_bound: "none"
	},
	"vpapiInitFakeAPIUsed": {
		domain: "network/api",
		process_name: "Vpapi initting game",
		process_bound: "none"
	},
	"vpapiInitGameRequested": {
		domain: "network/api",
		process_name: "Vpapi initting game",
		process_bound: "start"
	},
	"vpapiInitGameResponseReceived": {
		domain: "network/api",
		process_name: "Vpapi initting game",
		process_bound: "end"
	},
};

module.exports = eventSpecs;
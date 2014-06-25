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
	"vpapiDealRequested": {
		domain: "network/api",
		process_name: "Vpapi dealing",
		process_bound: "start"
	},
	"vpapiDealResponseReceived": {
		domain: "network/api",
		process_name: "Vpapi dealing",
		process_bound: "end"
	},
	"vpapiDrawRequested": {
		domain: "network/api",
		process_name: "Vpapi drawing",
		process_bound: "start"
	},
	"vpapiDrawResponseReceived": {
		domain: "network/api",
		process_name: "Vpapi drawing",
		process_bound: "end"
	},
	"vpapiPlayerinfoRequested": {
		domain: "network/api",
		process_name: "Vpapi getting player info",
		process_bound: "start"
	},
	"vpapiPlayerinfoResponseReceived": {
		domain: "network/api",
		process_name: "Vpapi getting player info",
		process_bound: "end"
	},
	"vpapiEndgameRequested": {
		domain: "network/api",
		process_name: "Vpapi ending game",
		process_bound: "start"
	},
	"vpapiEndgameResponseReceived": {
		domain: "network/api",
		process_name: "Vpapi ending game",
		process_bound: "end"
	},
	"resizeCalled": {
		domain: "rendering/canvas",
		process_name: "Resizing canvas",
		process_bound: "none"
	},
};

module.exports = eventSpecs;
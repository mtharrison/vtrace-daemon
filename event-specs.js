var eventSpecs = {
	"sessionStarted": 					{ domain: "general", process_name: "none", bounds: "none" },
	"initGameStarted": 					{ domain: "server", process_name: "Server initting game", bounds: "start" },
	"initGameFinished": 				{ domain: "server", process_name: "Server initting game", bounds: "end" },
	"vpapiInitGameRequested": 			{ domain: "network/api", process_name: "Vpapi initting game", bounds: "start" },
	"vpapiInitGameResponseReceived":    { domain: "network/api", process_name: "Vpapi initting game", bounds: "end" },
	"vpapiInitFakeAPIUsed": 			{ domain: "network/api", process_name: "Vpapi initting game", bounds: "none" },
	"gameLoadStarted": 					{ domain: "network/ws", process_name: "Loading game client side", bounds: "start" },
	"gameLoadFinished": 				{ domain: "network/ws", process_name: "Loading game client side", bounds: "end" },	
	"startGameStarted": 				{ domain: "server", process_name: "Server starting game", bounds: "start" },
	"startGameFinished": 				{ domain: "network/api", process_name: "Server starting game", bounds: "end" },
	"stateChangedStarted":    			{ domain: "network/api", process_name: "Updating game state", bounds: "start" },
	"stateChangedFinished": 			{ domain: "network/api", process_name: "Updating game state", bounds: "end" },
};

module.exports = eventSpecs;
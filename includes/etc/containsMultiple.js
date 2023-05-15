const containsMultiple = (isSafe, string, commands, safeCommands, denyCommands) => {
	let commandsLength = commands.length;
	let safeCommandsLength = safeCommands.length;
	let denyCommandsLength = denyCommands.length;
	if (string.length == 0) {
		return true;
	}
	for (let i = 0; i < denyCommandsLength; i++) {
		if (string.includes(denyCommands[i])) {
			isSafe = false;
			return false;
		}
	}
	for (let i = 0; i < commandsLength; i++) {
		if (string.includes(commands[i])) {
			isSafe = true;
			return true;
		}
	}
	if (isSafe) {
		for (let i = 0; i < safeCommandsLength; i++) {
			if (string == safeCommands[i]) {
				return true;
			}
		}
		isSafe = false;
		return false;
	}
}
export function randomID() {
	return "_" + (Math.random() * Date.now()).toString(36).replace(".", "");
}
#!/bin/env node

import { readFile, writeFile, readdir } from "node:fs/promises"

const dirs = (await readdir(".", { withFileTypes: true }))
	.filter(x => x.isDirectory() && !x.name.startsWith("."))
	.map(x => x.name);

const html = (await readFile("index.template.html", "utf-8")).replace("{exercises}", dirs.map(x => `\t\t\t<li><a href="${x}">${cap(x.replace(/^\d+-/, "").replaceAll("-", " "))}</a></li>`).join("\n"));
await writeFile("index.html", html);

function cap(s) {
	return s.charAt(0).toUpperCase() + s.slice(1);
}

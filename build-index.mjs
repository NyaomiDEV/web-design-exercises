#!/bin/env node

import { readFile, writeFile, readdir } from "node:fs/promises"

const dirs = (await readdir(".", { withFileTypes: true }))
	.filter(x => x.isDirectory() && !x.name.startsWith("."))
	.map(x => x.name);

const html = (await readFile("index.template.html", "utf-8")).replace("{exercises}", dirs.map(x => `\t\t\t<li><a href="${x}">${x}</a></li>`).join("\n"));
await writeFile("index.html", html);

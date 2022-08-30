module.exports = {
	printWidth: 80,
	semi: true,
	tabWidth: 2,
	useTabs: false,
	singleQuote: false,
	endOfLine: "auto",
	trailingComma: "none",
	bracketSpacing: true,
	htmlWhitespaceSensitivity: "ignore",
	parsers: {
		".jsx": "flow",
		".scss": "scss",
		".ts": "typescript",
		".less": "css",
		".vue": "vue",
		".nvue": "vue",
		".ux": "vue",
		".yml": "yaml",
	}
};

module.exports = {
	"env": {
		"node": true,
		"browser": true,
		"commonjs": true,
		"es2021": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended"
	],
	"overrides": [
	],
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		"ecmaVersion": "latest"
	},
	"plugins": [
		"react",
		"@typescript-eslint"
	],
	"rules": {
		"indent": [
			"error",
			"tab"
		],
		/*"linebreak-style": [
			"error",
			"windows"
		],*/
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"always"
		],
		"react/react-in-jsx-scope": "off",
		"react/prop-types": "off",
		"no-mixed-spaces-and-tabs": 0, // disable rule
		"@typescript-eslint/no-var-requires": 0,
		"@typescript-eslint/no-inferrable-types": "off",
		"linebreak-style": 0 ,
	}
};

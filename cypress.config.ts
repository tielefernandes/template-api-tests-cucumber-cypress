import { defineConfig } from "cypress";
import * as createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import { createEsbuildPlugin } from "@badeball/cypress-cucumber-preprocessor/esbuild";

export default defineConfig({

	env: {
		requestMode: true,
		chromeWebSecurity: false
	},
	e2e: {
		specPattern: "**/*.feature",
		async setupNodeEvents(
			on: Cypress.PluginEvents,
			config: Cypress.PluginConfigOptions
		): Promise<Cypress.PluginConfigOptions> {
			await addCucumberPreprocessorPlugin(on, config);

			on(
				"file:preprocessor",
				createBundler({
					plugins: [createEsbuildPlugin(config)],
				})
			);

			return config;
		},
	},
});
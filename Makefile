# This expects you to already have made the debugging world.
defaults:
	@node --no-warnings=ExperimentalWarning ts_lua_project_bridge.ts
	@echo Starting Luanti.
	@luanti --server --gameid ruantis --world $$HOME/.minetest/worlds/world1

assets:
	@node --no-warnings=ExperimentalWarning ts_lua_project_bridge.ts --copy-media

watch:
	@npx tstl --watch

clean:
	@node --no-warnings=ExperimentalWarning ts_lua_project_bridge.ts --rebuild-code --copy-media

release:
	@node --no-warnings=ExperimentalWarning ts_lua_project_bridge.ts --create-release

optimize_pngs:
	@./scripts/optimize_pngs.sh
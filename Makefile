# This expects you to already have made the debugging world.
defaults:
	@npx tstl
	@echo Starting Luanti.
	@luanti --go --gameid ruantis --world $$HOME/.minetest/worlds/world1

watch:
	@npx tstl --watch

clean:
	@node --no-warnings=ExperimentalWarning ts_lua_project_bridge.ts --rebuild-code --copy-media

release:
	@node --no-warnings=ExperimentalWarning ts_lua_project_bridge.ts --create-release

optimize_pngs:
	@./scripts/optimize_pngs.sh
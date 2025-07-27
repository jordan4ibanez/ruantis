# This expects you to already have made the debugging world.
defaults:
	@npx tstl
	@echo Starting Luanti.
	@luanti --go --gameid ruantis --world $$HOME/.minetest/worlds/world1

watch:
	@npx tstl --watch

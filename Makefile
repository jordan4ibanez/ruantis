# This expects you to already have made the debugging world1.
defaults:
# 	@npx tstl
	@echo Starting Luanti.
	@luanti --go --gameid ruantis --world $$HOME/.minetest/worlds/world1

# You're supposed to just have this running as you code.
watch:
	@npx tstl --watch

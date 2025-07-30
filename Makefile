# This expects you to already have made the debugging world1.
defaults:
#!! DANGER ZONE !!

# 	@rm -rf $$HOME/.minetest/worlds/world1/
# 	@mkdir $$HOME/.minetest/worlds/world1/
# 	@echo "gameid = ruantis" > $$HOME/.minetest/worlds/world1/world.mt
	
#!! END DANGER ZONE !!

# 	@npx tstl
	@echo Starting Luanti.
	@luanti --go --gameid ruantis --world $$HOME/.minetest/worlds/world1

# You're supposed to just have this running as you code.
watch:
	@npx tstl --watch

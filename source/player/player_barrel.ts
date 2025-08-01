import { deployPlayerAnimation } from "./animation";
import { deployCommandOverrides } from "./command_overrides";
import { deployInventoryHandling } from "./inventory";
import { deployPlayerEntity } from "./player";
import { deployClientTracker } from "./tracker";
import { deployWindowHandling } from "./window";

/**
 * Tree-shake removal function.
 *
 * Never use this!
 */
export function deployPlayer(): void {}

deployClientTracker();
deployWindowHandling();
deployInventoryHandling();
deployCommandOverrides();
deployPlayerEntity();
deployPlayerAnimation();

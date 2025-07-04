export { HikingIcon } from "./HikingIcon";
export { HorseRidingIcon } from "./HorseRidingIcon";
export { KayakingIcon } from "./KayakingIcon";
export { RaftingIcon } from "./RaftingIcon";

import { HikingIcon } from "./HikingIcon";
import { HorseRidingIcon } from "./HorseRidingIcon";
import { KayakingIcon } from "./KayakingIcon";
// Import for internal use
import { RaftingIcon } from "./RaftingIcon";

// Activity icon mapping for easy access
export const ActivityIcons = {
	rafting: RaftingIcon,
	kayaking: KayakingIcon,
	kayak: KayakingIcon, // alias
	riding: HorseRidingIcon,
	hiking: HikingIcon,
} as const;

export type ActivityType = keyof typeof ActivityIcons;

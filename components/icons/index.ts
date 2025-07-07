// biome-ignore lint/performance/noBarrelFile: Icon exports are intentionally organized here for better DX
export { HikingIcon } from "./HikingIcon.tsx";
export { HorseRidingIcon } from "./HorseRidingIcon.tsx";
export { KayakingIcon } from "./KayakingIcon.tsx";
export { RaftingIcon } from "./RaftingIcon.tsx";

import { HikingIcon } from "./HikingIcon.tsx";
import { HorseRidingIcon } from "./HorseRidingIcon.tsx";
import { KayakingIcon } from "./KayakingIcon.tsx";
// Import for internal use
import { RaftingIcon } from "./RaftingIcon.tsx";

// Activity icon mapping for easy access
export const ActivityIcons = {
  rafting: RaftingIcon,
  kayaking: KayakingIcon,
  kayak: KayakingIcon, // alias
  riding: HorseRidingIcon,
  hiking: HikingIcon,
} as const;

export type ActivityType = keyof typeof ActivityIcons;

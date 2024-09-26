import { HIGH_LEVEL_NAME, HIGH_LEVEL_VALUE, MEDIUM_LEVEL_NAME, MEDIUM_LEVEL_VALUE, START_LEVEL_NAME } from "../const/levels"

export function userLevel(visits: number | undefined): string {
    if (!visits) return START_LEVEL_NAME
    if (visits >= HIGH_LEVEL_VALUE) return HIGH_LEVEL_NAME
    if (visits >= MEDIUM_LEVEL_VALUE) return MEDIUM_LEVEL_NAME
    return START_LEVEL_NAME
}
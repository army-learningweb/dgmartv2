export const MegabyteFormat = (byte : number) => {
    return Math.round(byte / (1024 * 2)) + "MB"
}
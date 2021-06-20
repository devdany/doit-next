export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const makeShortAddress = (address: string) => {
  const start = address.substring(0, 5)
  const last = address.substring(address.length - 5, address.length);
  return `${start}...${last}`
}
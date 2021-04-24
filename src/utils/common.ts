export const toArray = <A = unknown>(value: A | A[] | undefined): A[] => {
  if (!value) {
    return []
  }

  return Array.isArray(value) ? value : [value]
}

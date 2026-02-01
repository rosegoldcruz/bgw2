export const doorCollections = Array.from({ length: 99 }, (_, idx) => {
  const num = idx + 1
  const padded = num.toString().padStart(3, "0")
  return {
    id: `door-${padded}`,
    name: `Door ${padded}`,
    image: `/bg-finals-4x/${num}.webp`,
  }
})

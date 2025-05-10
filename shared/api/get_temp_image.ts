export default function get_temp_image(seed: number = 1224) {
  function seededRandom(seed: number) {
    return Math.abs(Math.sin(seed) * 10000) % 1;
  }
  const idx: number = Math.floor(seededRandom(seed) * 100) + 1;


  return `/img/tmpImgs/${idx}.jpg`
}

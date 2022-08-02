# Galaga Notes

## Necessary Features / Functions

- Draw/remove things from the screen
- Move things across the screen
- Detect collision
  - GetBoundingClientRect()
  - Check AABB's
  - Remove bullet and enemy when hit.
  - Remove player life when hit.
- Track player lives.
- Get scores by destroying enemies.
- Use window.requestAnimationFrame() to loop through animation frames.


Game happens in a large `<canvas>`. Each object on the screen is its own individual `<canvas>`.
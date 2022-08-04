# Space Invaders

![hello](invader-gh-banner.png)

A web-based recreation of the 1978 Arcade Classic *Space Invaders*.

## Notes

## Contributors

- [Daniel Shiraishi](https://github.com/KaliFox20)
- [Robert Shepley](https://github.com/ShepleySound)
- [Timothee Odushina](https://github.com/timothee2022)
- [Alan Chelko](https://github.com/dtuskippy)

## Domain Model, Object Constructors

```mermaid
classDiagram
  class Score
  class Player
  class Invader
  class Bullet
  class Collider

  Invader : element
  Invader : Collider
  Invader : sourceImg
  Invader : pointsValue
  Invader : updateCanvas()
  Invader : nextSprite()
  Invader : removeInvader()
  Invader *-- Collider
  
  Bullet *-- Collider
  Bullet: element
  Bullet : Collider
  Bullet : animationStart
  Bullet : removeBullet()

  Player *-- Collider
  Player : element
  Player : Collider
  Player : sourceImg
  Player : move()
  Player : updateCanvas()

  Score : initials
  Score : score
  Score : loadScores)
  Score : saveScores()
  Score : clearScores()

  Collider : element
  Collider : deleteCollider()
  Collider : checkCollisions()

```

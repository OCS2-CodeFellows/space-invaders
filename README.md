# final-project

## Notes

## Contributors

- Daniel Shiraishi
- Robert Shepley
- Timothee Odushina
- Alan Chelko


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

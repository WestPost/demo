import Food from './food.js'
import Snake from './snake.js'

// 游戏入口文件
class Game {
  // 初始化
  constructor() {
    this.food = new Food()
    this.snake = new Snake()

    this.map = map
    // 定时器，蛇规律动
    this.timerId = null
  }

  start() {
    // 开始，渲染到地图上
    this.food.render(this.map)
    this.snake.render(this.map)
    this.runSnake()
    this.bindKey()
  }

  // 绑定键盘事件
  bindKey() {
    document.addEventListener('keydown', e => {
      switch(e.keyCode) {
        case 37:
          this.snake.direction = 'left'
          break
        case 38:
          this.snake.direction = 'top'
          break
        case 39:
          this.snake.direction = 'right'
          break
        case 40:
          this.snake.direction = 'bottom'
          break
      }
    })
  }

  // 蛇动起来
  runSnake() {
    this.timerId = setInterval(() => {
      this.snake.move(this.food, this.map)
      // 按照蛇的长度宽度分割地图
      let maxX = this.map.offsetWidth / this.snake.width
      let maxY = this.map.offsetHeight / this.snake.height
      let headX = this.snake.body[0].x
      let headY = this.snake.body[0].y
      // 左右撞到了 headX < 0 || headX >= maxX 
      // 上下撞到了 headY < 0 || headY >= maxY
      if(headX < 0 || headX >= maxX || headY < 0 || headY >= maxY) {
        alert('游戏结束')
        // 清除定时器，蛇停止移动
        clearInterval(this.timerId)
        return
      }
      this.snake.render(this.map)
    }, 200)
  }
}
export default Game
// 蛇类
class Snake {
  // 宽 高 方向
  constructor({ width = 20, height = 20, direction = 'right' } = {}) {
    // 每一吃一个食物，都是一条新蛇，管理
    this.elements = []

    this.width = width
    this.height = height
    this.direction = direction

    // 蛇的身体(节点) 第一个元素是蛇头
    this.body = [
      {x: 3,y: 2,color: 'red'},
      {x: 2,y: 2,color: 'blue'},
      {x: 1,y: 2,color: 'blue'}
    ]
  }
  // 蛇的移动交互
  move(food, map) {
    for(let i = this.body.length - 1; i > 0; i--) {
      // 后一节前进到前一节上
      this.body[i].x = this.body[i - 1].x
      this.body[i].y = this.body[i - 1].y
    }
    // 获取蛇头
    let head = this.body[0]
    // 移动的方向
    switch(this.direction) {
      case 'right':
        head.x += 1
        break
      case 'left':
        head.x -= 1
        break
      case 'top':
        head.y -= 1
        break
      case 'bottom':
        head.y += 1
        break
    }
    // 蛇吃食物
    let headX = head.x * this.width
    let headY = head.y * this.height

    if(headX === food.x && headY === food.y) {
      let num = 0
      // 吃到了，在最后面加一节
      let last = this.body[this.body.length - 1]
      this.body.push({
        x: last.x,
        y: last.y,
        color: last.color
      })
      food.render(map) // 重新生成食物
    }

  }

  render(map) {
    // 删除旧蛇
    this.remove();
    // 创建新蛇
    for(let i = 0, len = this.body.length; i < len; i++) {
      let object = this.body[i]
      let div = document.createElement('div')
      map.appendChild(div)

      this.elements.push(div)

      // 设置div的样式 这里object => 类数组，蛇身各节自己的
      div.style.position = 'absolute'
      div.style.width = this.width + 'px'
      div.style.height = this.height + 'px'
      div.style.left = object.x * this.width + 'px'
      div.style.top = object.y * this.height + 'px'
      div.style.backgroundColor = object.color
    }
  }

  remove() {
     // 从最后往前删
     for( let i = this.elements.length - 1; i >= 0; i--) {
      // div
      this.elements[i].parentNode.removeChild(this.elements[i])
      // 删除数组中的元素
      this.elements.splice(i, 1)
    }
  }
}
export default Snake
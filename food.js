// 导入模块
import { getRandom } from './util.js'

// 食物类
class Food {
  // 构造器 (每一个class都有，会默认添加) => 数据初始化
  // let { width, x, y} = options || {} (花括号里面的东西相当于这样) 省下一个 options
  constructor({ x = 0, y = 0, width = 20, height = 20, color = 'green'} = {}) {
    // 数据需要存储器 管理食物的数组
    this.elements = []

    this.x = x // x轴
    this.y = y // y轴
    this.width = width // 宽度
    this.height = height // 高度
    this.color = color // 颜色
  }

  // 渲染函数
  render(map) {
    this.remove() // 删除之前创建的
    // map.offsetWidth / this.width 将整个地图按照食物得到宽度分为这么多份，高同理
    // x, y坐标
    this.x = getRandom(0, map.offsetWidth / this.width - 10) * this.width
    this.y = getRandom(0, map.offsetHeight / this.height - 1) * this.height

    // dom操作 将食物追加到地图上
    let div = document.createElement('div')
    map.appendChild(div)
    // 缓存
    this.elements.push(div)

    // 设置div的样式
    div.style.position = 'absolute'
    div.style.left = this.x + 'px'
    div.style.top = this.y + 'px'
    div.style.width = this.width + 'px'
    div.style.height = this.height + 'px'
    div.style.backgroundColor = this.color
  }

  remove() {
    // 从最后往前删
    for( let i = this.elements.length - 1; i >= 0; i--) {
      // 删除dom
      this.elements[i].parentNode.removeChild(this.elements[i])
      // 删除数组中的元素
      this.elements.splice(i, 1)
    }
  }
}
export default Food
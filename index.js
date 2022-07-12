const fs = require('fs')
const imagePath = './Sticker-100'
const baseUrl = 'https://npm.elemecdn.com/sticker-heo@0.19.0/Sticker-100'
/**
 * 获取文件名
 * @param {string} name
 */
function getName(name) {
  return name.split('.')[0]
}
/**
 * 生成twikoo格式json文件
 * @param {Array<string>} nameList
 */
function twikoo(nameList) {
  const key = `<img src="${baseUrl}/害羞.png" style="width: 30px;top: 4px;position: relative;" title="Heo">`
  const result = {
    [key]: {
      type: 'image',
      container: []
    }
  }
  nameList.forEach((name) => {
    result[key].container.push({
      icon: `<img src="${baseUrl}/${name}">`,
      text: `heo-${getName(name)}`
    })
  })
  return result
}

/**
 * 生成valine格式json文件
 * @param {Array<string>} nameList
 */
function valine(nameList) {
  const result = {}
  nameList.forEach((name) => {
    result[`${getName(name)}`] = `${baseUrl}/${name}`
  })
  return result
}

/**
 * 生成valine格式json文件
 * @param {Array<string>} nameList
 */
function artalk(nameList) {
  const result = {
    name: 'Heo',
    type: 'image',
    items: []
  }
  nameList.forEach((item) => {
    result.items.push({
      key: `heo-${getName(item)}`,
      val: `${baseUrl}/${item}`
    })
  })
  return result
}

const fileNameList = fs.readdirSync(imagePath)
const twikooObject = twikoo(fileNameList)
fs.writeFileSync('./twikoo.json', JSON.stringify(twikooObject))
const valineObject = valine(fileNameList)
fs.writeFileSync('./valine.json', JSON.stringify(valineObject))
const artalkObject = artalk(fileNameList)
fs.writeFileSync('./artalk.json', JSON.stringify(artalkObject))

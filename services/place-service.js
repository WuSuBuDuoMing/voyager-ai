/**
 * 景点服务模块
 * 提供景点数据的 CRUD 操作，基于本地存储实现
 *
 * @module services/place-service
 * @version 1.12.0
 * @license MIT
 * @author WuSuBuDuoMing
 */

const { getStorage, setStorage } = require('../utils/storage-utils')
const { generateId } = require('../utils/mock-utils')
const STORAGE_KEY = 'places'

/**
 * 模拟景点数据
 */
const MOCK_PLACES = [
  { id: 'p1', tripId: 'trip_001', name: '浅草寺', type: '历史', image: 'https://picsum.photos/400/300?random=101', rating: 4.8, price: 0, favorite: true, visited: true, address: '东京都台东区浅草2-3-1', description: '东京最古老的寺庙，雷门是必打卡地标' },
  { id: 'p2', tripId: 'trip_001', name: '东京塔', type: '拍照', image: 'https://picsum.photos/400/300?random=102', rating: 4.6, price: 120, favorite: true, visited: false, address: '东京都港区芝公园4-2-8', description: '东京标志性建筑，夜景绝美' },
  { id: 'p3', tripId: 'trip_001', name: '筑地市场', type: '美食', image: 'https://picsum.photos/400/300?random=103', rating: 4.9, price: 0, favorite: true, visited: true, address: '东京都中央区筑地', description: '海鲜美食天堂，新鲜刺身必尝' },
  { id: 'p4', tripId: 'trip_001', name: '秋叶原', type: '购物', image: 'https://picsum.photos/400/300?random=104', rating: 4.5, price: 0, favorite: false, visited: false, address: '东京都千代田区', description: '动漫迷的圣地，电子产品天堂' },
  { id: 'p5', tripId: 'trip_001', name: '新宿御苑', type: '自然', image: 'https://picsum.photos/400/300?random=105', rating: 4.7, price: 50, favorite: false, visited: true, address: '东京都新宿区内藤町11', description: '城市中的绿洲，樱花季最美' },
  { id: 'p6', tripId: 'trip_001', name: '迪士尼乐园', type: '亲子', image: 'https://picsum.photos/400/300?random=106', rating: 4.9, price: 550, favorite: true, visited: false, address: '千叶县浦安市舞浜1-1', description: '亚洲最受欢迎的迪士尼乐园' },
  { id: 'p7', tripId: 'trip_001', name: '台场', type: '夜景', image: 'https://picsum.photos/400/300?random=107', rating: 4.4, price: 0, favorite: false, visited: false, address: '东京都港区台场', description: '海滨休闲区，彩虹大桥夜景' },
  { id: 'p8', tripId: 'trip_001', name: '明治神宫', type: '历史', image: 'https://picsum.photos/400/300?random=108', rating: 4.7, price: 0, favorite: true, visited: true, address: '东京都涩谷区代代木神园町1-1', description: '东京最大的神社，感受日本传统文化' }
]

/**
 * 获取指定行程的所有景点
 * @param {string} tripId - 行程 ID
 * @returns {Promise<Array>} 景点列表
 */
async function getPlaces(tripId) {
  let allPlaces = getStorage(STORAGE_KEY)
  if (!allPlaces) {
    allPlaces = MOCK_PLACES
    setStorage(STORAGE_KEY, allPlaces)
  }
  return allPlaces.filter(p => p.tripId === tripId)
}

/**
 * 添加景点
 * @param {Object} place - 景点数据
 * @returns {Promise<Object>} 添加后的景点
 */
async function addPlace(place) {
  const allPlaces = getStorage(STORAGE_KEY) || []
  const newPlace = { ...place, id: generateId('place') }
  allPlaces.push(newPlace)
  setStorage(STORAGE_KEY, allPlaces)
  return newPlace
}

/**
 * 更新景点信息
 * @param {string} id - 景点 ID
 * @param {Object} updates - 更新字段
 * @returns {Promise<Object|null>} 更新后的景点
 */
async function updatePlace(id, updates) {
  const allPlaces = getStorage(STORAGE_KEY) || []
  const index = allPlaces.findIndex(p => p.id === id)
  if (index === -1) return null
  allPlaces[index] = { ...allPlaces[index], ...updates }
  setStorage(STORAGE_KEY, allPlaces)
  return allPlaces[index]
}

/**
 * 删除景点
 * @param {string} id - 景点 ID
 * @returns {Promise<boolean>} 是否删除成功
 */
async function deletePlace(id) {
  const allPlaces = getStorage(STORAGE_KEY) || []
  const filtered = allPlaces.filter(p => p.id !== id)
  setStorage(STORAGE_KEY, filtered)
  return true
}

/**
 * 切换收藏状态
 * @param {string} id - 景点 ID
 * @returns {Promise<Object|null>} 更新后的景点
 */
async function toggleFavorite(id) {
  const allPlaces = getStorage(STORAGE_KEY) || []
  const place = allPlaces.find(p => p.id === id)
  if (!place) return null
  place.favorite = !place.favorite
  setStorage(STORAGE_KEY, allPlaces)
  return place
}

/**
 * 切换已访问状态
 * @param {string} id - 景点 ID
 * @returns {Promise<Object|null>} 更新后的景点
 */
async function toggleVisited(id) {
  const allPlaces = getStorage(STORAGE_KEY) || []
  const place = allPlaces.find(p => p.id === id)
  if (!place) return null
  place.visited = !place.visited
  setStorage(STORAGE_KEY, allPlaces)
  return place
}

module.exports = {
  getPlaces,
  addPlace,
  updatePlace,
  deletePlace,
  toggleFavorite,
  toggleVisited
}

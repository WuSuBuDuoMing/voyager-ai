/**
 * 美食服务模块
 * 提供美食清单的 CRUD 操作及收藏、评价功能
 * 基于本地存储实现，首次调用自动加载模拟数据
 *
 * @module services/food-service
 * @version 1.12.0
 * @license MIT
 * @author WuSuBuDuoMing
 */

const { getStorage, setStorage } = require('../utils/storage-utils')
const { generateId } = require('../utils/mock-utils')

/** 本地存储键名 */
const STORAGE_KEY = 'food'

/**
 * 模拟美食数据
 * 包含多个旅行的推荐美食记录
 * @type {Array<Object>}
 */
const MOCK_FOOD = [
  // ===== trip_001 东京美食 =====
  {
    id: 'f1',
    tripId: 'trip_001',
    name: '一蘭拉面',
    type: '拉面',
    image: 'https://picsum.photos/400/300?random=201',
    rating: 4.9,
    priceRange: '¥60-100',
    favorite: true,
    eaten: true,
    tags: ['必吃', '排队名店'],
    address: '新宿中央东口店',
    description: '博多豚骨拉面的代表，独家一人食隔间设计。汤底浓郁，面条劲道，可以根据喜好调整辣度和配料。',
    tips: '建议避开饭点高峰期，凌晨去基本不用排队',
    reviews: [
      { user: '旅行达人', rating: 5, content: '汤底真的太浓郁了！', date: '2026-07-16' }
    ]
  },
  {
    id: 'f2',
    tripId: 'trip_001',
    name: '寿司大',
    type: '寿司',
    image: 'https://picsum.photos/400/300?random=202',
    rating: 4.8,
    priceRange: '¥200-400',
    favorite: true,
    eaten: false,
    tags: ['高级', '预约制'],
    address: '银座店',
    description: '米其林三星寿司店，采用当日最新鲜的食材，师傅手艺精湛。',
    tips: '需要提前一个月预约',
    reviews: []
  },
  {
    id: 'f3',
    tripId: 'trip_001',
    name: '筑地海鲜丼',
    type: '海鲜',
    image: 'https://picsum.photos/400/300?random=203',
    rating: 4.7,
    priceRange: '¥100-200',
    favorite: false,
    eaten: true,
    tags: ['海鲜', '早市'],
    address: '筑地场外市场',
    description: '新鲜的海鲜盖饭，金枪鱼、海胆、三文鱼等应有尽有。',
    tips: '早上6点去可以看金枪鱼拍卖',
    reviews: [
      { user: '吃货小王', rating: 5, content: '海鲜新鲜到爆炸！', date: '2026-07-17' }
    ]
  },
  {
    id: 'f4',
    tripId: 'trip_001',
    name: '和牛烤肉',
    type: '烤肉',
    image: 'https://picsum.photos/400/300?random=204',
    rating: 4.8,
    priceRange: '¥300-600',
    favorite: true,
    eaten: false,
    tags: ['高级', '必吃'],
    address: '六本木',
    description: 'A5和牛入口即化，脂肪分布均匀，是烤肉中的极品体验。',
    tips: '建议点拼盘可以品尝不同部位',
    reviews: []
  },
  {
    id: 'f5',
    tripId: 'trip_001',
    name: '抹茶甜品',
    type: '甜品',
    image: 'https://picsum.photos/400/300?random=205',
    rating: 4.5,
    priceRange: '¥40-80',
    favorite: false,
    eaten: true,
    tags: ['甜品', '下午茶'],
    address: '宇治抹茶本店',
    description: '正宗宇治抹茶制作的各种甜品，抹茶冰淇淋和抹茶蛋糕是招牌。',
    tips: '季节限定款一定要尝',
    reviews: []
  },
  {
    id: 'f6',
    tripId: 'trip_001',
    name: '章鱼小丸子',
    type: '小吃',
    image: 'https://picsum.photos/400/300?random=206',
    rating: 4.3,
    priceRange: '¥20-40',
    favorite: false,
    eaten: true,
    tags: ['小吃', '街头美食'],
    address: '浅草仲见世通',
    description: '外酥内软的章鱼小丸子，配上特制酱汁和木鱼花，经典的日式街头小吃。',
    tips: '刚出炉的最好吃',
    reviews: []
  },
  // ===== trip_005 北京美食 =====
  {
    id: 'f7',
    tripId: 'trip_005',
    name: '全聚德烤鸭',
    type: '烤鸭',
    image: 'https://picsum.photos/400/300?random=207',
    rating: 4.6,
    priceRange: '¥200-400',
    favorite: true,
    eaten: true,
    tags: ['必吃', '老字号'],
    address: '前门店',
    description: '百年老字号，正宗挂炉烤鸭，皮脆肉嫩，搭配薄饼、葱丝和甜面酱。',
    tips: '建议提前预约，旺季排队长',
    reviews: [
      { user: '美食家', rating: 5, content: '皮真的太脆了，必须配白糖吃！', date: '2026-05-01' }
    ]
  },
  {
    id: 'f8',
    tripId: 'trip_005',
    name: '东来顺涮羊肉',
    type: '火锅',
    image: 'https://picsum.photos/400/300?random=208',
    rating: 4.7,
    priceRange: '¥150-300',
    favorite: true,
    eaten: true,
    tags: ['老字号', '铜锅'],
    address: '王府井店',
    description: '清真铜锅涮羊肉，肉质鲜嫩，蘸料是独家秘方，麻酱蒜泥完美搭配。',
    tips: '冬天吃最有氛围，夏天也不错',
    reviews: []
  },
  // ===== trip_007 京都美食 =====
  {
    id: 'f9',
    tripId: 'trip_007',
    name: '怀石料理',
    type: '怀石',
    image: 'https://picsum.photos/400/300?random=209',
    rating: 4.9,
    priceRange: '¥800-1500',
    favorite: true,
    eaten: true,
    tags: ['高级', '传统'],
    address: '祇园先斗町',
    description: '正宗京都怀石料理，一道道精心呈现的料理如同艺术品，每一道都有季节的意味。',
    tips: '建议穿和服前往更有仪式感',
    reviews: [
      { user: '料理控', rating: 5, content: '每道菜都是艺术品，美到不忍下口', date: '2026-03-25' }
    ]
  },
  {
    id: 'f10',
    tripId: 'trip_007',
    name: '汤豆腐',
    type: '豆腐',
    image: 'https://picsum.photos/400/300?random=210',
    rating: 4.5,
    priceRange: '¥100-200',
    favorite: false,
    eaten: true,
    tags: ['素食', '京都特色'],
    address: '南禅寺附近',
    description: '京都名物汤豆腐，用南禅寺的泉水制作，简单却美味。',
    tips: '南禅寺参道上有很多汤豆腐店',
    reviews: []
  },
  // ===== trip_004 三亚美食 =====
  {
    id: 'f11',
    tripId: 'trip_004',
    name: '第一市场海鲜加工',
    type: '海鲜',
    image: 'https://picsum.photos/400/300?random=211',
    rating: 4.6,
    priceRange: '¥150-300',
    favorite: true,
    eaten: true,
    tags: ['必吃', '实惠'],
    address: '第一市场',
    description: '自己挑选新鲜海鲜，找加工店烹饪，价格比海鲜餐厅便宜一半以上。',
    tips: '记得砍价，加工费一般15-30元/道',
    reviews: []
  },
  {
    id: 'f12',
    tripId: 'trip_004',
    name: '椰子鸡火锅',
    type: '火锅',
    image: 'https://picsum.photos/400/300?random=212',
    rating: 4.7,
    priceRange: '¥100-200',
    favorite: true,
    eaten: true,
    tags: ['海南特色', '必吃'],
    address: '三亚市区',
    description: '用新鲜椰子水做锅底，文昌鸡鲜嫩多汁，汤头清甜可口。',
    tips: '先喝汤再涮菜，椰子水是灵魂',
    reviews: [
      { user: '美食猎人', rating: 5, content: '椰子水锅底太好喝了，喝了三碗汤！', date: '2026-04-02' }
    ]
  }
]

/**
 * 从存储中加载美食数据，若无缓存则使用模拟数据
 * @returns {Array<Object>} 美食数组
 * @private
 */
function _loadFood() {
  return getStorage(STORAGE_KEY) || MOCK_FOOD
}

/**
 * 保存美食数据到本地存储
 * @param {Array<Object>} foods - 要保存的美食数组
 * @private
 */
function _saveFood(foods) {
  setStorage(STORAGE_KEY, foods)
}

/**
 * 获取指定旅行的美食列表
 * @param {string} tripId - 旅行 ID
 * @returns {Array<Object>} 美食列表
 */
function getFoodByTripId(tripId) {
  return _loadFood().filter(f => f.tripId === tripId)
}

/**
 * 获取单个美食详情
 * @param {string} id - 美食 ID
 * @returns {Object|null} 美食对象，未找到返回 null
 */
function getFoodById(id) {
  return _loadFood().find(f => f.id === id) || null
}

/**
 * 收藏/取消收藏美食
 * 切换美食的收藏状态
 * @param {string} id - 美食 ID
 * @returns {Object|null} 更新后的美食，未找到返回 null
 */
function toggleFavorite(id) {
  const allFoods = _loadFood()
  const food = allFoods.find(f => f.id === id)
  if (!food) return null
  food.favorite = !food.favorite
  _saveFood(allFoods)
  return food
}

/**
 * 标记已吃/未吃美食
 * 切换美食的已吃状态
 * @param {string} id - 美食 ID
 * @returns {Object|null} 更新后的美食，未找到返回 null
 */
function toggleEaten(id) {
  const allFoods = _loadFood()
  const food = allFoods.find(f => f.id === id)
  if (!food) return null
  food.eaten = !food.eaten
  _saveFood(allFoods)
  return food
}

/**
 * 为美食添加评价
 * @param {string} id - 美食 ID
 * @param {Object} review - 评价内容
 * @param {string} review.user - 评价用户
 * @param {number} review.rating - 评分（1-5）
 * @param {string} review.content - 评价文本
 * @returns {Object|null} 更新后的美食，未找到返回 null
 */
function addFoodReview(id, review) {
  const allFoods = _loadFood()
  const food = allFoods.find(f => f.id === id)
  if (!food) return null
  if (!food.reviews) {
    food.reviews = []
  }
  food.reviews.push({
    ...review,
    date: new Date().toISOString().split('T')[0]
  })
  _saveFood(allFoods)
  return food
}

/**
 * 获取指定旅行收藏的美食列表
 * @param {string} tripId - 旅行 ID
 * @returns {Array<Object>} 收藏的美食列表
 */
function getFavoriteFoods(tripId) {
  return _loadFood().filter(f => f.tripId === tripId && f.favorite)
}

module.exports = {
  getFoodByTripId,
  getFoodById,
  toggleFavorite,
  toggleEaten,
  addFoodReview,
  getFavoriteFoods
}

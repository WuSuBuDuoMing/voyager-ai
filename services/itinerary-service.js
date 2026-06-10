/**
 * 行程安排服务模块
 * 提供每日行程的 CRUD 操作及模拟行程生成功能
 * 基于本地存储实现，首次调用自动加载模拟数据
 * @module services/itinerary-service
 */

const { getStorage, setStorage } = require('../utils/storage-utils')
const { generateId, randomFromArray } = require('../utils/mock-utils')
const { getDayCount } = require('../utils/date-utils')
const { MOCK_ITINERARY } = require('../data/mock-itinerary')

/** 本地存储键名 */
const STORAGE_KEY = 'itinerary'

/**
 * 从存储中加载行程数据，若无缓存则使用模拟数据
 * @returns {Array<Object>} 行程安排数组
 * @private
 */
function _loadItinerary() {
  return getStorage(STORAGE_KEY) || MOCK_ITINERARY
}

/**
 * 保存行程数据到本地存储
 * @param {Array<Object>} itinerary - 要保存的行程数组
 * @private
 */
function _saveItinerary(itinerary) {
  setStorage(STORAGE_KEY, itinerary)
}

/**
 * 常见目的地的模拟活动模板
 * 用于 generateMockItinerary 自动生成行程
 * @private
 */
const ACTIVITY_TEMPLATES = {
  // 热门景点（按目的地分类）
  _places: {
    '东京': ['浅草寺参拜', '东京塔/晴空塔展望', '涩谷十字路口打卡', '明治神宫散步', '秋叶原电器街', '新宿御苑赏花', '台场海滨公园', '银座逛街'],
    '巴黎': ['卢浮宫参观', '埃菲尔铁塔', '凯旋门登顶', '塞纳河游船', '蒙马特高地', '凡尔赛宫', '奥赛博物馆', '圣心大教堂'],
    '曼谷': ['大皇宫/玉佛寺', '卧佛寺按摩', '水上市场体验', '考山路夜市', '郑王庙日落', '暹罗广场购物', '四面佛参拜', '恰图恰周末市场'],
    '三亚': ['亚龙湾海滩', '蜈支洲岛潜水', '南山寺祈福', '天涯海角', '热带天堂森林公园', '椰梦长廊日落', '第一市场海鲜', '免税城购物'],
    '北京': ['天安门升旗', '故宫博物院', '八达岭长城', '颐和园', '天坛公园', '南锣鼓巷', '什刹海/后海', '王府井大街'],
    '成都': ['大熊猫基地', '宽窄巷子', '武侯祠/锦里', '杜甫草堂', '春熙路/太古里', '人民公园喝茶', '文殊院', '建设路小吃'],
    '京都': ['伏见稻荷千本鸟居', '金阁寺', '岚山竹林', '清水寺', '花见小路', '天龙寺', '二条城', '哲学之道'],
    '首尔': ['景福宫', '北村韩屋村', '明洞购物', '弘大街头', '南山塔', 'COEX星空图书馆', '广藏市场', '梨泰院'],
    '新加坡': ['滨海湾花园', '环球影城', '鱼尾狮公园', '牛车水', '小印度', '圣淘沙岛', '植物园', '克拉码头'],
    '悉尼': ['悉尼歌剧院', '海港大桥', '邦迪海滩', '蓝山国家公园', '鱼市场', '塔龙加动物园', '达令港', 'The Rocks'],
    '伦敦': ['大英博物馆', '白金汉宫', '伦敦塔', '泰晤士河游船', '大本钟', '海德公园', '诺丁山', '格林威治'],
    '冰岛': ['蓝湖温泉', '黄金圈', '极光追踪', '冰川徒步', '黑沙滩', '雷克雅未克大教堂', '冰河湖', '间歇泉'],
    '马尔代夫': ['水上别墅浮潜', '出海看海豚', '无人岛野餐', '深潜体验', '日落巡航', 'SPA按摩', '海底餐厅', '星空观赏'],
    '西安': ['兵马俑', '古城墙骑行', '回民街美食', '大雁塔', '陕西历史博物馆', '华清宫', '大唐不夜城', '钟鼓楼'],
    '丽江': ['丽江古城', '玉龙雪山', '束河古镇', '拉市海骑马', '蓝月谷', '白沙古镇', '木府', '万古楼']
  },

  // 早晨活动通用模板
  _morning: [
    '早餐体验当地特色美食',
    '早起前往热门景点（避开人流）',
    '晨间散步感受城市气息',
    '当地市场探索与早茶',
    '酒店周边晨跑或散步'
  ],

  // 午后活动通用模板
  _afternoon: [
    '游览核心景区',
    '特色街区漫步与购物',
    '文化体验活动',
    '咖啡馆小憩与拍照',
    '参观博物馆或艺术展'
  ],

  // 傍晚活动通用模板
  _evening: [
    '观赏日落最佳观景点',
    '当地美食街/夜市探索',
    '夜间景观打卡',
    '酒吧街或特色小酒馆',
    '温泉或SPA放松'
  ],

  // 美食推荐
  _foods: {
    '东京': ['一蘭拉面', '寿司大', '筑地海鲜丼', '和牛烤肉', '章鱼小丸子', '抹茶甜品', '居酒屋烤串', '天妇罗'],
    '巴黎': ['可颂面包', '法式鹅肝', '马卡龙', '蜗牛', '牛排薯条', '法式洋葱汤', '焦糖布丁', '可丽饼'],
    '曼': ['Pad Thai炒河粉', '冬阴功汤', '芒果糯米饭', '青木瓜沙拉', '泰式奶茶', '烤肉串', '椰子冰淇淋', '海鲜烧烤'],
    '三亚': ['海鲜大排档', '椰子鸡火锅', '海南鸡饭', '清补凉', '抱罗粉', '椰子饭', '东山羊', '和乐蟹'],
    '北京': ['北京烤鸭', '铜锅涮肉', '炸酱面', '豆汁焦圈', '卤煮火烧', '驴打滚', '冰糖葫芦', '爆肚'],
    '成都': ['火锅', '串串香', '担担面', '兔头', '钟水饺', '甜水面', '肥肠粉', '蛋烘糕'],
    '京都': ['怀石料理', '汤豆腐', '抹茶甜品', '�的寿司', '京都拉面', '和果子', '渍物', '京料理'],
    '首尔': ['烤肉', '炸鸡啤酒', '部队火锅', '石锅拌饭', '冷面', '紫菜包饭', '辣炒年糕', '绿豆煎饼'],
    '新加坡': ['海南鸡饭', '辣椒螃蟹', '叻沙', '肉骨茶', '咖椰吐司', '椰浆饭', '炒粿条', '印度煎饼'],
    '悉尼': ['生蚝', '肉派', '炸鱼薯条', 'Flat White咖啡', '袋鼠肉', 'Pavlova蛋糕', 'Vegemite吐司', 'BBQ'],
    '伦敦': ['炸鱼薯条', '英式早餐', '牧羊人派', '司康饼', '下午茶', 'Sunday Roast', '肉馅饼', 'Sticky Toffee Pudding'],
    '冰岛': ['羊肉汤', '发酵鲨鱼', '热狗', 'Skyr酸奶', '龙虾汤', '冰岛马肉', '黑面包', '鱼干'],
    '马尔代夫': ['金枪鱼料理', '椰子饭', '海鲜BBQ', '咖喱', '烤章鱼', '热带水果', '椰子水', '龙虾'],
    '西安': ['羊肉泡馍', '肉夹馍', '凉皮', 'Biangbiang面', '油泼面', '胡辣汤', '甑糕', '酸梅汤'],
    '丽江': ['腊排骨火锅', '鸡豆凉粉', '纳西烤鱼', '酥油茶', '丽江粑粑', '三文鱼', '鲜花饼', '米灌肠']
  }
}

/**
 * 根据旅行信息生成模拟行程
 * 根据出发/结束日期生成每天的行程，每个时段包含活动列表
 * @param {string} tripId - 关联的旅行 ID
 * @param {Object} tripData - 旅行数据
 * @param {string} tripData.destination - 目的地
 * @param {string} tripData.startDate - 出发日期
 * @param {string} tripData.endDate - 结束日期
 * @param {string} [tripData.style='normal'] - 旅行风格
 * @returns {Array<Object>} 生成的每日行程数组
 */
function generateMockItinerary(tripId, tripData) {
  const { destination, startDate, endDate, style } = tripData
  const days = getDayCount(startDate, endDate)
  const itinerary = []

  /** 获取目的地专属景点列表，没有则使用通用模板 */
  const places = ACTIVITY_TEMPLATES._places[destination] || [
    '城市中心广场', '当地博物馆', '历史古迹参观', '特色街区漫步',
    '公园自然风光', '美食街探索', '夜景观赏', '文化体验活动'
  ]

  /** 获取目的地专属美食列表 */
  const foods = ACTIVITY_TEMPLATES._foods[destination] || [
    '当地特色小吃', '传统正餐', '网红餐厅', '街头美食',
    '甜品下午茶', '夜市小吃', '早餐店', '地方特色饮品'
  ]

  // 根据每天生成行程
  for (let i = 0; i < days; i++) {
    const currentDate = new Date(startDate)
    currentDate.setDate(currentDate.getDate() + i)
    const dateStr = currentDate.toISOString().split('T')[0]

    // 计算当天使用哪些景点（每天分配2-3个主要景点）
    const placeOffset = i * 3
    const dayPlaces = []
    for (let j = 0; j < 3; j++) {
      const idx = (placeOffset + j) % places.length
      dayPlaces.push(places[idx])
    }

    // 第一天包含抵达，最后一天包含返程
    const isFirstDay = i === 0
    const isLastDay = i === days - 1

    const morning = isFirstDay
      ? ['抵达目的地', '酒店入住与休整', ...dayPlaces.slice(0, 1)]
      : ['早餐体验', dayPlaces[0]]

    const afternoon = isLastDay
      ? ['收拾行李退房', '最后的伴手礼采购', '前往机场/车站']
      : [dayPlaces[1], foods[i % foods.length] + '午餐', dayPlaces[2] || '特色街区漫步']

    const evening = isLastDay
      ? ['搭乘返程交通', '结束愉快的旅行']
      : ['晚餐体验: ' + foods[(i + 2) % foods.length], randomFromArray(ACTIVITY_TEMPLATES._evening)]

    // 生成预计费用（根据旅行风格调整）
    const baseCostMap = { 'budget': 800, 'normal': 1500, 'luxury': 4000 }
    const baseCost = baseCostMap[style] || 1500
    const estimatedCost = baseCost + Math.floor(Math.random() * 500)

    itinerary.push({
      id: generateId('day'),
      tripId: tripId,
      dayIndex: i + 1,
      date: dateStr,
      title: `第${i + 1}天 - ${isFirstDay ? '初到' + destination : isLastDay ? '告别' + destination : destination + '探索'}`,
      morning: morning,
      afternoon: afternoon,
      evening: evening,
      estimatedCost: estimatedCost,
      actualCost: 0,
      transport: '公共交通/步行',
      tips: [`${destination}出行建议提前规划`, '注意当地天气变化', '保存好重要证件'],
      backupPlan: '如遇天气不佳，改为室内活动或购物'
    })
  }

  return itinerary
}

/**
 * 获取指定旅行的所有每日行程
 * 按天数序号升序排列
 * @param {string} tripId - 旅行 ID
 * @returns {Array<Object>} 每日行程数组（按 dayIndex 升序）
 */
function getItineraryByTripId(tripId) {
  return _loadItinerary()
    .filter(item => item.tripId === tripId)
    .sort((a, b) => a.dayIndex - b.dayIndex)
}

/**
 * 获取某一天的行程安排
 * @param {string} tripId - 旅行 ID
 * @param {number} dayIndex - 天数序号（从 1 开始）
 * @returns {Object|null} 当天行程对象，未找到返回 null
 */
function getDayPlan(tripId, dayIndex) {
  return _loadItinerary().find(
    item => item.tripId === tripId && item.dayIndex === dayIndex
  ) || null
}

/**
 * 创建新的日程安排
 * @param {Object} data - 日程数据（需包含 tripId, dayIndex, date, title 等）
 * @returns {Object} 新创建的日程
 */
function createDayPlan(data) {
  const itinerary = _loadItinerary()
  const newPlan = {
    id: generateId('day'),
    ...data
  }
  itinerary.push(newPlan)
  _saveItinerary(itinerary)
  return newPlan
}

/**
 * 更新日程安排
 * 合并传入的字段到已有日程中
 * @param {string} id - 日程 ID
 * @param {Object} updates - 要更新的字段
 * @returns {Object|null} 更新后的日程，未找到返回 null
 */
function updateDayPlan(id, updates) {
  const itinerary = _loadItinerary()
  const idx = itinerary.findIndex(item => item.id === id)
  if (idx === -1) return null
  itinerary[idx] = { ...itinerary[idx], ...updates }
  _saveItinerary(itinerary)
  return itinerary[idx]
}

/**
 * 删除日程安排
 * @param {string} id - 日程 ID
 * @returns {boolean} 始终返回 true
 */
function deleteDayPlan(id) {
  const itinerary = _loadItinerary().filter(item => item.id !== id)
  _saveItinerary(itinerary)
  return true
}

module.exports = {
  getItineraryByTripId,
  getDayPlan,
  createDayPlan,
  updateDayPlan,
  deleteDayPlan,
  generateMockItinerary
}

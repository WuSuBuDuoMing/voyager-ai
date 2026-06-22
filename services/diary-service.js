/**
 * 日记服务模块
 * 提供旅行日记的 CRUD 操作，基于本地存储实现
 * 首次调用时自动加载模拟数据，后续操作读写本地缓存
 *
 * @module services/diary-service
 * @version 1.12.0
 * @license MIT
 * @author WuSuBuDuoMing
 */

const { getStorage, setStorage } = require('../utils/storage-utils')
const { generateId } = require('../utils/mock-utils')

/** 本地存储键名 */
const STORAGE_KEY = 'diaries'

/**
 * 模拟日记数据
 * 包含多条真实风格的旅行日记记录
 * @type {Array<Object>}
 */
const MOCK_DIARIES = [
  {
    id: 'd1',
    tripId: 'trip_004',
    title: '抵达三亚，海风迎面',
    content: '经过三个小时的飞行，终于抵达了三亚凤凰机场。一出机场就被温暖的海风包围，和北方的寒冷形成了鲜明对比。酒店在亚龙湾，面朝大海，阳台上就能看到日落。放下行李后迫不及待地去海滩散步，沙子细腻柔软，海水清澈见底。晚上在酒店附近找了一家海鲜大排档，点了石斑鱼和大虾，新鲜又便宜。',
    date: '2026-04-01',
    mood: 'happy',
    weather: '☀️',
    cost: 1800,
    steps: 12000,
    photos: ['https://picsum.photos/300/300?random=301', 'https://picsum.photos/300/300?random=302', 'https://picsum.photos/300/300?random=303']
  },
  {
    id: 'd2',
    tripId: 'trip_004',
    title: '蜈支洲岛潜水初体验',
    content: '今天去了蜈支洲岛，这是此行最期待的项目——潜水！第一次潜入海底，看到了五颜六色的珊瑚和热带鱼，那种震撼无法用语言形容。教练很耐心，水下拍了很多照片。岛上风景也很美，情人桥、观日岩都值得打卡。',
    date: '2026-04-02',
    mood: 'excited',
    weather: '☀️',
    cost: 2200,
    steps: 18000,
    photos: ['https://picsum.photos/300/300?random=304', 'https://picsum.photos/300/300?random=305']
  },
  {
    id: 'd3',
    tripId: 'trip_004',
    title: '南山寺祈福',
    content: '上午去了南山寺，108米的海上观音像非常壮观。在寺庙里虔诚地祈福，希望家人平安健康。中午在素斋餐厅吃了午饭，没想到素菜也能做得这么好吃。下午去了天涯海角，虽然就是几块大石头，但"天涯海角"四个字确实很有意境。',
    date: '2026-04-03',
    mood: 'peaceful',
    weather: '☁️',
    cost: 1200,
    steps: 15000,
    photos: ['https://picsum.photos/300/300?random=306']
  },
  {
    id: 'd4',
    tripId: 'trip_004',
    title: '亚龙湾热带天堂森林公园',
    content: '今天安排了亚龙湾热带天堂森林公园，这里是《非诚勿扰2》的取景地。走了全海景玻璃栈道，脚下就是悬崖和大海，有点腿软但景色绝美。过江龙索桥也很刺激，摇摇晃晃地走过去，风景这边独好。',
    date: '2026-04-04',
    mood: 'excited',
    weather: '☀️',
    cost: 1500,
    steps: 22000,
    photos: ['https://picsum.photos/300/300?random=307', 'https://picsum.photos/300/300?random=308', 'https://picsum.photos/300/300?random=309', 'https://picsum.photos/300/300?random=310']
  },
  {
    id: 'd5',
    tripId: 'trip_004',
    title: '最后一天，恋恋不舍',
    content: '最后一天没有安排太多行程，在酒店睡到自然醒，享受了最后的海景早餐。收拾行李的时候才发现买了好多特产，椰子糖、芒果干、黄灯笼辣椒酱塞满了一整个行李箱。中午退房后去了第一市场买了最后一批海鲜，这次三亚之行完美收官。虽然晒黑了两个色号，但一切都值得！',
    date: '2026-04-05',
    mood: 'nostalgic',
    weather: '☀️',
    cost: 3100,
    steps: 8000,
    photos: ['https://picsum.photos/300/300?random=311', 'https://picsum.photos/300/300?random=312']
  },
  {
    id: 'd6',
    tripId: 'trip_005',
    title: '故宫一日，穿越时光',
    content: '凌晨四点半就爬起来去看天安门升旗仪式，虽然是五一假期人山人海，但看到国旗升起的那一刻还是热血沸腾。上午参观了故宫博物院，每一座宫殿都让人惊叹于古代工匠的精湛技艺。在景山公园山顶俯瞰故宫全景，那种震撼无法言说。晚上在王府井吃了正宗的北京烤鸭，皮脆肉嫩，太满足了。',
    date: '2026-05-01',
    mood: 'excited',
    weather: '☀️',
    cost: 580,
    steps: 25000,
    photos: ['https://picsum.photos/300/300?random=320', 'https://picsum.photos/300/300?random=321', 'https://picsum.photos/300/300?random=322']
  },
  {
    id: 'd7',
    tripId: 'trip_005',
    title: '不到长城非好汉',
    content: '今天的目标是八达岭长城！一大早就出发了，到了才发现人比想象中更多。但随着一步步往上爬，看着绵延起伏的城墙和远处的山峦，终于理解了什么叫"不到长城非好汉"。好汉坡确实有点陡，爬到顶的时候气喘吁吁但成就感满满。晚上回来吃了东来顺涮羊肉，铜锅涮肉太香了。',
    date: '2026-05-02',
    mood: 'tired',
    weather: '☁️',
    cost: 650,
    steps: 28000,
    photos: ['https://picsum.photos/300/300?random=323', 'https://picsum.photos/300/300?random=324']
  },
  {
    id: 'd8',
    tripId: 'trip_007',
    title: '岚山竹林与樱花隧道',
    content: '京都的岚山简直美得不真实！早上七点就到了竹林小径，几乎没有游客，阳光从竹叶间洒落，像走进了一幅画。渡月桥边的樱花正值盛放，粉白的花瓣随风飘落在河面上。下午在天龙寺庭园静坐了半小时，看着锦鲤在池中游弋，内心无比平静。晚上穿和服在祇园散步，花见小路偶遇了一位真正的艺妓。',
    date: '2026-03-26',
    mood: 'peaceful',
    weather: '☀️',
    cost: 14800,
    steps: 20000,
    photos: ['https://picsum.photos/300/300?random=330', 'https://picsum.photos/300/300?random=331', 'https://picsum.photos/300/300?random=332', 'https://picsum.photos/300/300?random=333']
  },
  {
    id: 'd9',
    tripId: 'trip_007',
    title: '金阁寺的金色倒影',
    content: '今天去了金阁寺，阳光下整座建筑金光闪闪，倒映在池塘中美得让人窒息。然后去了龙安寺看枯山水庭园，15块石头无论从哪个角度看都只能看到14块，据说能看到全部15块的人能得到幸福。下午逛了二条城，德川家康的"鹂鸣地板"设计巧妙，踩上去会发出鸟鸣声防止刺客。',
    date: '2026-03-27',
    mood: 'happy',
    weather: '☁️',
    cost: 9500,
    steps: 16000,
    photos: ['https://picsum.photos/300/300?random=334', 'https://picsum.photos/300/300?random=335']
  },
  {
    id: 'd10',
    tripId: 'trip_011',
    title: '大英博物馆的震撼',
    content: '在伦敦的第一天就去了大英博物馆，本来打算只看两小时，结果逛了整整半天。罗塞塔石碑、帕特农神庙雕塑、中国馆的敦煌壁画......每一件展品背后都有厚重的历史。最让我感触的是中国馆，看到那些流失海外的文物，心情很复杂。下午在考文特花园看了一场街头表演，艺人的水平真的很专业。',
    date: '2026-04-10',
    mood: 'peaceful',
    weather: '☁️',
    cost: 7500,
    steps: 18000,
    photos: ['https://picsum.photos/300/300?random=340', 'https://picsum.photos/300/300?random=341']
  },
  {
    id: 'd11',
    tripId: 'trip_013',
    title: '马代的第一个日落',
    content: '从水上别墅的玻璃地板看到海龟游过的那一刻，我知道这趟旅行值了。下午浮潜看到了色彩斑斓的珊瑚群，热带鱼在身边穿梭，像置身于一个梦幻的水下世界。傍晚在沙滩上享用了一顿浪漫的晚餐，脚下是细腻的白沙，耳边是轻柔的海浪，抬头是满天的星斗。这辈子都不会忘记这个夜晚。',
    date: '2026-02-10',
    mood: 'romantic',
    weather: '☀️',
    cost: 14800,
    steps: 5000,
    photos: ['https://picsum.photos/300/300?random=350', 'https://picsum.photos/300/300?random=351', 'https://picsum.photos/300/300?random=352']
  }
]

/**
 * 心情选项配置
 * @type {Array<Object>}
 */
const MOOD_OPTIONS = [
  { key: 'happy', emoji: '😊', label: '开心' },
  { key: 'excited', emoji: '🤩', label: '兴奋' },
  { key: 'peaceful', emoji: '😌', label: '平静' },
  { key: 'tired', emoji: '😫', label: '疲惫' },
  { key: 'surprised', emoji: '😲', label: '惊喜' },
  { key: 'romantic', emoji: '💑', label: '浪漫' },
  { key: 'nostalgic', emoji: '🥺', label: '怀念' }
]

/**
 * 天气选项配置
 * @type {Array<Object>}
 */
const WEATHER_OPTIONS = [
  { key: 'sunny', emoji: '☀️', label: '晴' },
  { key: 'cloudy', emoji: '☁️', label: '多云' },
  { key: 'rainy', emoji: '🌧', label: '雨' },
  { key: 'snowy', emoji: '❄️', label: '雪' },
  { key: 'foggy', emoji: '🌫', label: '雾' }
]

/**
 * 从存储中加载日记数据，若无缓存则使用模拟数据
 * @returns {Array<Object>} 日记数组
 * @private
 */
function _loadDiaries() {
  return getStorage(STORAGE_KEY) || MOCK_DIARIES
}

/**
 * 保存日记数据到本地存储
 * @param {Array<Object>} diaries - 要保存的日记数组
 * @private
 */
function _saveDiaries(diaries) {
  setStorage(STORAGE_KEY, diaries)
}

/**
 * 获取指定旅行的所有日记
 * 按日期降序排列
 * @param {string} tripId - 旅行 ID
 * @returns {Array<Object>} 日记列表（按日期降序）
 */
function getDiariesByTripId(tripId) {
  return _loadDiaries()
    .filter(d => d.tripId === tripId)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
}

/**
 * 获取单篇日记
 * @param {string} id - 日记 ID
 * @returns {Object|null} 日记对象，未找到返回 null
 */
function getDiaryById(id) {
  return _loadDiaries().find(d => d.id === id) || null
}

/**
 * 获取所有日记（所有旅行的日记汇总）
 * 按日期降序排列
 * @returns {Array<Object>} 全部日记列表
 */
function getAllDiaries() {
  return _loadDiaries()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
}

/**
 * 创建新日记
 * 自动生成 ID
 * @param {Object} data - 日记数据（title, content, date, tripId 等）
 * @returns {Object} 新创建的日记
 */
function createDiary(data) {
  const allDiaries = _loadDiaries()
  const newDiary = {
    id: generateId('diary'),
    ...data
  }
  allDiaries.push(newDiary)
  _saveDiaries(allDiaries)
  return newDiary
}

/**
 * 更新日记
 * 合并传入的字段到已有日记中
 * @param {string} id - 日记 ID
 * @param {Object} updates - 要更新的字段
 * @returns {Object|null} 更新后的日记，未找到返回 null
 */
function updateDiary(id, updates) {
  const allDiaries = _loadDiaries()
  const index = allDiaries.findIndex(d => d.id === id)
  if (index === -1) return null
  allDiaries[index] = { ...allDiaries[index], ...updates }
  _saveDiaries(allDiaries)
  return allDiaries[index]
}

/**
 * 删除日记
 * @param {string} id - 日记 ID
 * @returns {boolean} 始终返回 true
 */
function deleteDiary(id) {
  const allDiaries = _loadDiaries()
  const filtered = allDiaries.filter(d => d.id !== id)
  _saveDiaries(filtered)
  return true
}

/**
 * 获取心情选项配置
 * @returns {Array<Object>} 心情选项列表
 */
function getMoodOptions() {
  return MOOD_OPTIONS
}

/**
 * 获取天气选项配置
 * @returns {Array<Object>} 天气选项列表
 */
function getWeatherOptions() {
  return WEATHER_OPTIONS
}

module.exports = {
  getDiariesByTripId,
  getDiaryById,
  getAllDiaries,
  createDiary,
  updateDiary,
  deleteDiary,
  getMoodOptions,
  getWeatherOptions
}

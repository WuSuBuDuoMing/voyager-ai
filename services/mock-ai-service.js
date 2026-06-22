/**
 * 模拟 AI 服务模块
 * 通过延迟和预设数据模拟 AI 生成旅行计划、推荐和回忆文案
 * 提供 generateTripPlan、generateRecommendations、generateMemoryText 三个异步接口
 *
 * v1.10.0 改进：增强 generateTripPlan 的预算分配算法，支持按旅行风格
 * 动态调整分配比例；新增目的地天气预测模拟和实时消费建议
 *
 * @module services/mock-ai-service
 * @version 1.12.0
 * @license MIT
 * @author WuSuBuDuoMing
 */

const { delay, randomFromArray, generateId, randomInt } = require('../utils/mock-utils')

// ==================== 目的地专属推荐数据 ====================

/**
 * 目的地推荐数据集合
 * 包含景点推荐、美食推荐、行李建议和小贴士
 * @private
 */
const DESTINATION_DATA = {
  '东京': {
    summary: '东京是一座传统与现代完美融合的城市，从古老的浅草寺到涩谷的潮流文化，每天都有新发现。',
    places: [
      { name: '浅草寺', type: '历史', reason: '东京最古老的寺庙，雷门大灯笼是必打卡地标，感受江户时代的文化传承' },
      { name: '明治神宫', type: '历史', reason: '位于原宿的都市森林，参道两旁的巨树让人忘记身处繁忙都市' },
      { name: '筑地市场', type: '美食', reason: '世界级海鲜市场，清晨的金枪鱼拍卖和新鲜寿司是东京美食的灵魂' },
      { name: '涩谷十字路口', type: '拍照', reason: '全球最繁忙的十字路口，3000人同时过马路的壮观场面只有亲眼见才能体会' },
      { name: '东京塔/晴空塔', type: '夜景', reason: '登高望远俯瞰东京全景，晴空塔视野更开阔，东京塔氛围感更强' },
      { name: '新宿御苑', type: '自然', reason: '城市中心的绿洲，四季有不同的花卉，是逃离都市喧嚣的绝佳去处' },
      { name: '秋叶原', type: '购物', reason: '动漫迷和电子爱好者的天堂，各种限定商品和电器让您满载而归' },
      { name: '迪士尼乐园', type: '亲子', reason: '亚洲最受欢迎的迪士尼，烟花秀和花车巡游是不可错过的经典体验' }
    ],
    foods: [
      { name: '一蘭拉面', type: '拉面', priceRange: '¥60-100', reason: '博多豚骨拉面的代名词，一人食隔间设计让您可以专注于味觉体验' },
      { name: '筑地海鲜丼', type: '海鲜', priceRange: '¥100-200', reason: '当天捕获的新鲜鱼生铺满米饭，是东京美食的最高性价比之选' },
      { name: '和牛烤肉', type: '烤肉', priceRange: '¥300-600', reason: 'A5和牛入口即化，脂肪在舌尖融化的瞬间是日本美食的巅峰体验' },
      { name: '天妇罗', type: '炸物', priceRange: '¥100-300', reason: '外酥内嫩的极致追求，好的天妇罗面衣薄如蝉翼，完全不油腻' },
      { name: '居酒屋小酌', type: '餐饮', priceRange: '¥100-200', reason: '体验日式深夜食堂文化，烤串配啤酒是最地道的东京夜生活' }
    ],
    packingList: [
      { item: '护照', category: '证件', reason: '入境必备' },
      { item: '日元现金', category: '证件', reason: '日本很多地方只收现金，建议准备5-8万日元' },
      { item: '西瓜卡(Suica)', category: '电子设备', reason: '东京公共交通必备，便利店也能用' },
      { item: '转换插头(两脚扁插)', category: '电子设备', reason: '日本电压110V但电器可通用，主要是插头形状不同' },
      { item: '舒适步行鞋', category: '衣物', reason: '东京每天步行量很大，一双好鞋至关重要' },
      { item: '折叠伞', category: '其他', reason: '东京天气多变，折叠伞方便随身携带' },
      { item: '防晒霜', category: '洗漱', reason: '夏天东京紫外线强，户外活动需要防晒' },
      { item: '肠胃药', category: '药品', reason: '生冷食物较多，备一些以防不适' }
    ],
    tips: [
      '东京地铁线路复杂，建议下载Google Map或乘换案内App',
      '便利店是万能的，ATM取现、打印、买票都能搞定',
      '日本餐厅不鼓励剩饭，点餐量力而行',
      '药妆店推荐松本清和大国药妆，价格比较实惠',
      '百货商场地下一层的甜品区品质极高，适合买伴手礼',
      '自动售货机无处不在，是解渴的最佳选择'
    ]
  },
  '巴黎': {
    summary: '巴黎是艺术与浪漫的代名词，塞纳河畔的微风、博物馆里的名画、街角的可颂面包，构成了一场完美的法式梦幻之旅。',
    places: [
      { name: '卢浮宫', type: '历史', reason: '世界最大的艺术博物馆，蒙娜丽莎、维纳斯、胜利女神三大镇馆之宝不可错过' },
      { name: '埃菲尔铁塔', type: '拍照', reason: '巴黎的象征，夜间整点闪灯5分钟的浪漫时刻让人终身难忘' },
      { name: '塞纳河游船', type: '浪漫', reason: '两岸的巴黎圣母院、卢浮宫、奥赛博物馆尽收眼底，是最优雅的游览方式' },
      { name: '蒙马特高地', type: '拍照', reason: '圣心大教堂俯瞰巴黎全景，小丘广场的画家肖像画充满文艺气息' },
      { name: '凡尔赛宫', type: '历史', reason: '太阳王路易十四的行宫，镜厅的奢华程度令人叹为观止' },
      { name: '奥赛博物馆', type: '历史', reason: '由火车站改建的印象派艺术殿堂，莫奈、梵高的真迹让人热泪盈眶' }
    ],
    foods: [
      { name: '法式可颂', type: '甜品', priceRange: '€3-6', reason: '外皮酥脆内里柔软的完美可颂，是巴黎人早餐的灵魂' },
      { name: '法式鹅肝', type: '法餐', priceRange: '€30-60', reason: '法国三大美食之首，入口即化的极致口感代表了法式料理的精髓' },
      { name: '马卡龙', type: '甜品', priceRange: '€2-4/个', reason: 'Laduree或Pierre Herme的马卡龙色彩缤纷、口感丰富，是最值得带走的伴手礼' },
      { name: '蜗牛', type: '法餐', priceRange: '€15-25', reason: '法式经典前菜，蒜蓉黄油焗蜗牛的浓郁风味让人一试难忘' },
      { name: '法式洋葱汤', type: '汤品', priceRange: '€10-15', reason: '浓郁的牛骨汤底配上拉丝的芝士和酥脆面包，是巴黎秋冬的灵魂之选' }
    ],
    packingList: [
      { item: '护照', category: '证件', reason: '入境必备' },
      { item: '欧元现金', category: '证件', reason: '小费和市场购物需要，建议准备300-500欧' },
      { item: '信用卡', category: '证件', reason: '法国大部分地方支持刷卡' },
      { item: '优雅的鞋子', category: '衣物', reason: '巴黎人注重穿着，一双好看的鞋子是融入当地的秘诀' },
      { item: '轻薄外套', category: '衣物', reason: '即使夏天巴黎也不热，早晚温差大' },
      { item: '转换插头(两脚圆插)', category: '电子设备', reason: '法国使用欧标插头' },
      { item: '遮阳帽/墨镜', category: '其他', reason: '巴黎户外时间多，防晒必备' }
    ],
    tips: [
      '卢浮宫建议至少预留4小时，周三和周五开放到晚上9:45人较少',
      '铁塔必须提前至少两周网上买票，否则排队1-2小时',
      '巴黎地铁单程票很贵，建议购买10次券(carnet)或日票',
      '面包店下午3-5点有打折面包，可以用很低的价格吃到新鲜可颂',
      '塞纳河游船Bateaux Mouches最经典，傍晚时分出发最佳',
      '蒙马特的画家会主动给你画像但要事先问清价格'
    ]
  },
  '成都': {
    summary: '成都是一座让人来了就不想走的城市，火锅的热辣、大熊猫的萌态、茶馆的悠闲，构成了一幅独特的巴适生活画卷。',
    places: [
      { name: '大熊猫繁育基地', type: '亲子', reason: '近距离看国宝大熊猫吃竹子、打滚、爬树，是成都最治愈的体验' },
      { name: '宽窄巷子', type: '历史', reason: '三条平行古巷保留了老成都的市井文化，掏耳朵喝茶都是必体验' },
      { name: '武侯祠', type: '历史', reason: '中国唯一的君臣合祀祠庙，三国文化爱好者的朝圣之地' },
      { name: '锦里古街', type: '购物', reason: '成都版的清明上河图，各种手工艺品和小吃让人目不暇接' },
      { name: '春熙路/太古里', type: '购物', reason: '成都最时尚的商圈，IFS楼顶大熊猫是成都地标' },
      { name: '人民公园', type: '自然', reason: '鹤鸣茶社是成都最老的茶馆，坐下来喝杯盖碗茶感受真正的成都慢生活' }
    ],
    foods: [
      { name: '火锅', type: '火锅', priceRange: '¥80-150/人', reason: '来成都不吃火锅等于白来，麻辣红油锅底是成都美食的灵魂' },
      { name: '串串香', type: '火锅', priceRange: '¥40-80/人', reason: '把食材串在竹签上涮着吃，比火锅更随意更有趣' },
      { name: '担担面', type: '面食', priceRange: '¥15-25', reason: '麻辣鲜香的猪肉末浇头配细面条，是成都面食的经典之作' },
      { name: '兔头', type: '小吃', priceRange: '¥15-20/个', reason: '成都人的最爱，麻辣味和五香味各有千秋，勇敢尝试绝对不后悔' },
      { name: '甜水面', type: '面食', priceRange: '¥10-15', reason: '又甜又辣的独特味道，粗面条口感弹牙，成都独有的面食' }
    ],
    packingList: [
      { item: '身份证', category: '证件', reason: '国内旅行必备' },
      { item: '舒适步行鞋', category: '衣物', reason: '成都景点间距适中，适合步行探索' },
      { item: '薄外套', category: '衣物', reason: '成都天气多变，随身带件外套以防降温' },
      { item: '充电宝', category: '电子设备', reason: '拍照打卡耗电快，保证手机电量充足' },
      { item: '肠胃药', category: '药品', reason: '成都饮食偏辣偏油腻，肠胃敏感的话需要备药' },
      { item: '防晒霜', category: '洗漱', reason: '成都夏天太阳也很毒' }
    ],
    tips: [
      '熊猫基地一定要早去（7:30开门），上午大熊猫最活跃',
      '火锅建议微辣起步，成都的微辣已经很辣了',
      '成都的掏耳朵是一绝，宽窄巷子和人民公园都能体验',
      '串串香推荐奎星楼街的冒椒火辣，成都本地人也爱去',
      '成都的出租车司机都很健谈，可以问问他们推荐什么好吃的',
      '建设路是成都大学生的美食天堂，价格实惠味道好'
    ]
  },
  '三亚': {
    summary: '三亚是中国最美的热带海滨城市，阳光、沙滩、碧海、蓝天，让您在家门口就能享受马尔代夫般的海岛假期。',
    places: [
      { name: '蜈支洲岛', type: '自然', reason: '中国的马尔代夫，海水能见度极高，是浮潜和潜水的天堂' },
      { name: '亚龙湾海滩', type: '自然', reason: '被誉为"天下第一湾"，沙滩细腻柔软，海水蔚蓝清澈' },
      { name: '热带天堂森林公园', type: '自然', reason: '《非诚勿扰2》取景地，全海景玻璃栈道惊险刺激' },
      { name: '南山文化旅游区', type: '历史', reason: '108米海上观音像壮观庄严，南山寺的素斋也很值得品尝' },
      { name: '天涯海角', type: '拍照', reason: '中国最著名的浪漫地标，"天涯海角"四个字承载了无数爱情故事' },
      { name: '第一市场', type: '美食', reason: '自己买海鲜找加工店，新鲜又便宜，是三亚最接地气的美食体验' }
    ],
    foods: [
      { name: '海鲜大排档', type: '海鲜', priceRange: '¥150-300/人', reason: '第一市场买海鲜加工，新鲜程度和性价比都是最高的' },
      { name: '椰子鸡火锅', type: '火锅', priceRange: '¥100-200/人', reason: '新鲜椰子水做锅底，文昌鸡鲜嫩多汁，清甜可口' },
      { name: '清补凉', type: '甜品', priceRange: '¥15-25', reason: '三亚最经典的消暑饮品，椰奶配上各种配料，每一口都是夏天的味道' },
      { name: '抱罗粉', type: '面食', priceRange: '¥15-20', reason: '海南特色米粉，汤头鲜美，配料丰富' },
      { name: '海南鸡饭', type: '快餐', priceRange: '¥25-40', reason: '鸡肉嫩滑、鸡油饭飘香，是最简单却最满足的海南美食' }
    ],
    packingList: [
      { item: '身份证', category: '证件', reason: '国内旅行必备' },
      { item: '泳衣', category: '衣物', reason: '海边必备，建议带两套换洗' },
      { item: '防晒衣', category: '衣物', reason: '三亚紫外线很强，物理防晒很必要' },
      { item: '沙滩鞋/拖鞋', category: '衣物', reason: '海滩活动必备' },
      { item: '高倍防晒霜(SPF50+)', category: '洗漱', reason: '热带阳光猛烈，必须高倍防晒' },
      { item: '防水手机袋', category: '电子设备', reason: '海边活动保护手机' },
      { item: '晕船药', category: '药品', reason: '如果去蜈支洲岛，晕船的话需要提前吃' }
    ],
    tips: [
      '第一市场的海鲜要自己挑然后找加工店，记得砍价',
      '蜈支洲岛建议提前一天网上订票，旺季经常售罄',
      '防晒要每两小时补涂一次，否则会晒伤',
      '免税城有免费大巴，每人每年免税额度10万',
      '亚龙湾的沙滩质量最好，三亚湾看日落最美',
      '不建议在景区内吃海鲜，价格比市区贵很多'
    ]
  }
}

/**
 * 通用目的地数据（当目的地不在专属列表中时使用）
 * @private
 */
const GENERIC_DESTINATION = {
  summary: '这将是一段精彩的旅程，充满独特的风景和文化体验。',
  places: [
    { name: '当地历史古迹', type: '历史', reason: '了解目的地历史文化底蕴的最佳途径' },
    { name: '自然风光景区', type: '自然', reason: '感受大自然的壮丽与宁静，放松身心' },
    { name: '特色街区/古镇', type: '购物', reason: '体验当地市井文化和手工艺品' },
    { name: '城市地标/观景台', type: '拍照', reason: '登高俯瞰城市全景，拍摄旅行纪念照' },
    { name: '当地博物馆', type: '历史', reason: '深入了解目的地的文化、历史和艺术' },
    { name: '网红打卡地', type: '拍照', reason: '当地最受欢迎的社交媒体打卡点' }
  ],
  foods: [
    { name: '当地特色小吃', type: '小吃', priceRange: '¥20-50', reason: '街头巷尾的味道最能代表一座城市的灵魂' },
    { name: '传统老字号餐厅', type: '正餐', priceRange: '¥60-150', reason: '传承几十年甚至上百年的味道，值得专程品尝' },
    { name: '当地夜市美食', type: '小吃', priceRange: '¥30-80', reason: '夜市是感受当地烟火气最好的去处' },
    { name: '网红甜品/咖啡', type: '甜品', priceRange: '¥30-60', reason: '旅行中需要一段悠闲的下午茶时光' },
    { name: '地方特色火锅/烧烤', type: '餐饮', priceRange: '¥80-150', reason: '围炉而坐的饮食文化最能拉近旅伴间的距离' }
  ],
  packingList: [
    { item: '身份证/护照', category: '证件', reason: '出行必备证件' },
    { item: '现金和银行卡', category: '证件', reason: '以备不时之需' },
    { item: '舒适步行鞋', category: '衣物', reason: '旅行中步行量大，舒适的鞋子最重要' },
    { item: '换洗衣物', category: '衣物', reason: '根据旅行天数准备，注意当地天气' },
    { item: '充电宝', category: '电子设备', reason: '保证手机全天有电' },
    { item: '常用药品', category: '药品', reason: '感冒药、肠胃药、创可贴等常用药' },
    { item: '雨具', category: '其他', reason: '天气多变，折叠伞或雨衣以备不时之需' }
  ],
  tips: [
    '提前了解当地的交通方式，规划好出行路线',
    '尊重当地的风俗习惯，入乡随俗',
    '品尝美食从街头小店开始，往往惊喜最多',
    '保存好重要证件的照片备份，以防丢失',
    '旅行中注意防晒和补水，保持良好的身体状态'
  ]
}

/**
 * 旅行风格中文标签
 * @private
 */
const STYLE_LABELS = {
  food: '美食',
  culture: '文化',
  nature: '自然',
  couple: '浪漫',
  photo: '摄影',
  city: '都市',
  leisure: '休闲',
  deep: '深度',
  history: '历史',
  budget: '经济',
  luxury: '奢华'
}

/**
 * 目的地专属预设 AI 回复
 * key 格式为 "目的地_风格"
 * @private
 */
const MOCK_AI_RESPONSES = {
  '东京_food': {
    summary: '为您精心规划了东京6天美食深度之旅！从筑地市场的清晨寿司到深夜拉面，每一天都将以味蕾的惊喜为核心，带您体验最地道的东京美食文化。',
    itinerary: [
      { day: 1, title: '初到东京·筑地寻味', activities: ['抵达成田机场，乘坐N\'EX到新宿', '酒店入住稍作休整', '筑地场外市场海鲜午餐', '新宿歌舞伎町逛街', '深夜拉面体验'] },
      { day: 2, title: '银座美食巡礼', activities: ['筑地市场金枪鱼拍卖观摩', '银座高端寿司早餐', '银座逛街散步', '涩谷甜品下午茶', '居酒屋烤串晚餐'] },
      { day: 3, title: '原宿涩谷美食探险', activities: ['明治神宫散步', '竹下通街头小吃', '涩谷餐厅午餐', '代官山咖啡馆', '六本木和牛烤肉晚餐'] },
      { day: 4, title: '镰仓海边美食日', activities: ['JR到镰仓', '镰仓小町通美食街', '江之岛海鲜午餐', '海边散步', '江之岛生しらす晚餐'] },
      { day: 5, title: '下北泽·池袋美食散策', activities: ['下北泽咖喱街', '独立咖啡馆下午茶', '池袋拉面激战区', '深夜居酒屋告别晚餐'] },
      { day: 6, title: '最后的味蕾记忆', activities: ['新宿御苑散步', '车站便当和甜品采购', '药妆店扫货', '机场免税店', '搭乘返程航班'] }
    ],
    places: [
      { name: '筑地场外市场', reason: '海鲜盖饭和寿司是东京美食的起点，早市氛围独特' },
      { name: '新宿歌舞伎町', reason: '深夜食堂文化的发源地，各种居酒屋和拉面店聚集' },
      { name: '涩谷·原宿', reason: '潮流文化与美食的碰撞，各种网红甜品和特色餐厅' },
      { name: '银座', reason: '高端寿司和法餐聚集地，是东京精致美食的代表' },
      { name: '下北泽', reason: '文艺青年的美食天堂，咖喱和独立咖啡馆特别多' }
    ],
    foods: [
      { name: '一蘭拉面', priceRange: '¥60-100', reason: '博多豚骨拉面代表，一人食隔间是独特体验' },
      { name: '寿司大', priceRange: '¥200-400', reason: '银座顶级寿司店，食材新鲜度无敌' },
      { name: '和牛烤肉', priceRange: '¥300-600', reason: 'A5和牛入口即化，是日本美食的巅峰体验' },
      { name: '筑地海鲜丼', priceRange: '¥100-200', reason: '新鲜海鲜盖饭性价比之王' },
      { name: '深夜拉面', priceRange: '¥60-100', reason: '体验日本人深夜排队吃拉面的文化' }
    ],
    packingList: [
      { item: '护照', category: '证件', reason: '入境必备' },
      { item: '日元现金', category: '证件', reason: '很多老店只收现金' },
      { item: '舒适步行鞋', category: '衣物', reason: '美食之旅需要大量步行' },
      { item: '宽松的裤子', category: '衣物', reason: '吃了那么多美食，你懂的' },
      { item: '肠胃药', category: '药品', reason: '连续高强度美食体验，需要保护肠胃' }
    ],
    budgetSuggestion: {
      total: 25000,
      breakdown: { accommodation: 8000, food: 8000, transport: 3000, shopping: 3000, tickets: 2000, other: 1000 }
    },
    tips: [
      '美食之旅建议每餐只吃七分饱，这样才能品尝更多',
      '筑地市场很多店铺周日休息，提前确认营业时间',
      '高端餐厅建议提前至少两周预约',
      '随身带好健胃消食片，保护肠胃',
      '日本的甜品和面包也是一绝，不要只顾着吃正餐'
    ]
  },
  '巴黎_couple': {
    summary: '为您策划了一场浪漫的巴黎蜜月之旅！从塞纳河畔漫步到蒙马特高地的夕阳，从卢浮宫的艺术朝圣到凡尔赛的皇家奢华，每一天都将以浪漫为底色。',
    itinerary: [
      { day: 1, title: '塞纳河畔的浪漫序章', activities: ['戴高乐机场到市区', '玛黑区民宿入住', '玛黑区漫步', '塞纳河边散步', '圣路易岛冰淇淋'] },
      { day: 2, title: '卢浮宫艺术之旅', activities: ['卢浮宫深度参观', '杜乐丽花园野餐', '协和广场', '香榭丽舍漫步', '凯旋门日落'] },
      { day: 3, title: '铁塔下的浪漫之夜', activities: ['战神广场野餐', '埃菲尔铁塔登顶', '塞纳河游船晚餐', '铁塔闪灯观赏'] },
      { day: 4, title: '凡尔赛皇家体验', activities: ['凡尔赛宫参观', '凡尔赛花园漫步', '返回巴黎', '拉丁区晚餐', '莎士比亚书店'] },
      { day: 5, title: '蒙马特的告别诗篇', activities: ['蒙马特高地', '圣心大教堂', '小丘广场画像', '爱墙打卡', '告别晚餐'] }
    ],
    places: [
      { name: '埃菲尔铁塔', reason: '巴黎的象征，在铁塔下拥吻是每对情侣的梦想' },
      { name: '塞纳河游船', reason: '两岸灯光璀璨，在游船上享用晚餐是极致浪漫体验' },
      { name: '蒙马特高地', reason: '画家为您画像，在巴黎最高的地方留下爱的印记' },
      { name: '卢浮宫', reason: '一起在维纳斯和蒙娜丽莎前感受艺术的永恒' },
      { name: '爱墙', reason: '世界各地语言写成的"我爱你"，情侣必打卡' }
    ],
    foods: [
      { name: '法式可颂', priceRange: '€3-6', reason: '清晨在面包店买一个新鲜可颂，是巴黎最浪漫的早餐' },
      { name: '塞纳河游船晚餐', priceRange: '€80-150', reason: '两岸灯光倒映在水面，是蜜月最难忘的晚餐' },
      { name: '马卡龙', priceRange: '€2-4/个', reason: '甜美的马卡龙像爱情一样多彩多味' },
      { name: '法式鹅肝', priceRange: '€30-60', reason: '一起品尝法国三大美食之首的精致体验' }
    ],
    packingList: [
      { item: '护照', category: '证件', reason: '入境必备' },
      { item: '好看的连衣裙/西装', category: '衣物', reason: '巴黎浪漫氛围需要得体的着装' },
      { item: '舒适但好看的鞋子', category: '衣物', reason: '巴黎需要大量步行但也要保持优雅' },
      { item: '转换插头', category: '电子设备', reason: '法国使用欧标插头' },
      { item: '相机', category: '电子设备', reason: '记录每一个浪漫瞬间' }
    ],
    budgetSuggestion: {
      total: 45000,
      breakdown: { accommodation: 15000, food: 10000, transport: 5000, shopping: 8000, tickets: 3000, other: 4000 }
    },
    tips: [
      '卢浮宫建议预留至少4小时，不可能看完所有，选重点看',
      '铁塔日落前1小时上去最佳，可以看到从白天到夜景的变化',
      '塞纳河游船推荐Bateaux Mouches，傍晚时分出发最美',
      '蒙马特的画家要事先谈好价格和内容',
      '巴黎很多博物馆每月第一个周日免费开放'
    ]
  },
  '成都_food': {
    summary: '成都美食之旅即将开始！这座联合国教科文组织评定的"美食之都"，将用火锅的热辣、串串的随性、甜水面的甜蜜与麻辣，彻底征服您的味蕾。',
    itinerary: [
      { day: 1, title: '宽窄巷子初探', activities: ['抵达成都双流机场', '宽窄巷子附近民宿入住', '宽窄巷子漫步品小吃', '人民公园鹤鸣茶社', '奎星楼街串串晚餐'] },
      { day: 2, title: '熊猫基地与火锅之夜', activities: ['大熊猫基地早起参观', '建设路小吃街', '春熙路/太古里逛街', 'IFS大熊猫打卡', '小龙坎火锅晚餐'] },
      { day: 3, title: '武侯祠与美食寻味', activities: ['武侯祠博物馆', '锦里古街小吃', '杜甫草堂', '马路边边麻辣烫', '九眼桥夜生活'] },
      { day: 4, title: '文殊院告别与伴手礼', activities: ['文殊院参拜', '肥肠粉+军屯锅盔早餐', '伴手礼采购', '前往机场', '搭乘返程航班'] }
    ],
    places: [
      { name: '大熊猫基地', reason: '看国宝吃竹子是成都最治愈的体验，没有之一' },
      { name: '宽窄巷子', reason: '老成都的缩影，三条古巷藏着最地道的市井文化' },
      { name: '人民公园', reason: '鹤鸣茶社喝盖碗茶，体验最正宗的成都慢生活' },
      { name: '锦里', reason: '三国文化与美食的完美融合，夜景尤其美' },
      { name: '太古里', reason: '大慈寺旁的时尚地标，传统与现代的碰撞' }
    ],
    foods: [
      { name: '火锅', priceRange: '¥80-150/人', reason: '来成都不吃火锅等于白来，麻辣红油是灵魂' },
      { name: '串串香', priceRange: '¥40-80/人', reason: '冒椒火辣是成都本地人的最爱' },
      { name: '担担面', priceRange: '¥15-25', reason: '麻辣鲜香的成都面食代表' },
      { name: '兔头', priceRange: '¥15-20', reason: '成都人的灵魂零食，勇敢尝试！' },
      { name: '肥肠粉', priceRange: '¥12-18', reason: '成都早餐的代表，一碗下肚元气满满' }
    ],
    packingList: [
      { item: '身份证', category: '证件', reason: '国内旅行必备' },
      { item: '舒适步行鞋', category: '衣物', reason: '美食之旅需要大量步行消化' },
      { item: '薄外套', category: '衣物', reason: '成都天气多变' },
      { item: '充电宝', category: '电子设备', reason: '拍照打卡必备' },
      { item: '肠胃药', category: '药品', reason: '连续吃辣需要保护肠胃' },
      { item: '润唇膏', category: '洗漱', reason: '成都冬天干燥' }
    ],
    budgetSuggestion: {
      total: 8000,
      breakdown: { accommodation: 2000, food: 2500, transport: 1000, shopping: 1500, tickets: 500, other: 500 }
    },
    tips: [
      '火锅建议微辣起步，成都的微辣已经很辣了',
      '熊猫基地7:30开门，上午去熊猫最活跃',
      '串串推荐奎星楼街的冒椒火辣，排队也值得',
      '宽窄巷子主街商业化严重，建议走旁边的小胡同',
      '成都的出租车司机都很健谈，让他们推荐好吃的',
      '建设路是成都大学生的美食街，性价比超高'
    ]
  }
}

// ==================== 主要导出函数 ====================

/**
 * 生成旅行计划（模拟 AI 生成）
 * 根据目的地、天数、预算等参数生成完整的旅行计划，
 * 包含每日行程、景点推荐、美食推荐、行李清单、预算分配和旅行贴士。
 * 如果目的地在预设数据中，返回预设的高品质方案；否则动态生成通用方案。
 *
 * @param {Object} params - 旅行参数
 * @param {string} params.destination - 目的地名称
 * @param {number} params.days - 旅行天数
 * @param {number} params.budget - 总预算（人民币）
 * @param {string} [params.style='normal'] - 旅行风格（food/culture/nature/couple等）
 * @param {string} [params.pace='normal'] - 行程节奏（relaxed/normal/tight）
 * @param {number} [params.peopleCount=1] - 人数
 * @returns {Promise<Object>} AI 生成的旅行计划
 */
async function generateTripPlan(params) {
  const { destination, days, budget, style = 'normal', pace = 'normal', peopleCount = 1 } = params

  // 模拟 AI 思考时间
  await delay(1500 + randomInt(0, 1000))

  // 尝试获取预设回复
  const key = `${destination}_${style}`
  if (MOCK_AI_RESPONSES[key]) {
    return MOCK_AI_RESPONSES[key]
  }

  // 获取目的地数据（有专属则用专属，否则用通用模板）
  const destData = DESTINATION_DATA[destination] || GENERIC_DESTINATION
  const styleLabel = STYLE_LABELS[style] || '旅行'

  // 动态生成每日行程
  const itinerary = []
  for (let i = 0; i < days; i++) {
    const dayPlaces = []
    // 从景点列表中按天分配
    for (let j = 0; j < 3; j++) {
      const placeIdx = (i * 3 + j) % destData.places.length
      dayPlaces.push(destData.places[placeIdx].name)
    }

    const isFirstDay = i === 0
    const isLastDay = i === days - 1

    const title = isFirstDay
      ? `初到${destination}`
      : isLastDay
        ? `告别${destination}`
        : `${destination}深度探索 Day${i + 1}`

    const activities = isFirstDay
      ? [`抵达${destination}`, '酒店入住与休整', ...dayPlaces]
      : isLastDay
        ? ['收拾行李退房', '最后的纪念品采购', `前往机场/车站`, `告别${destination}，期待下次旅程`]
        : [dayPlaces[0], '午餐', dayPlaces[1], '下午茶/休息', dayPlaces[2]]

    itinerary.push({ day: i + 1, title, activities })
  }

  // 预算分配建议 - 根据旅行风格动态调整比例
  const styleBudgetMap = {
    food: { accommodation: 0.25, food: 0.35, transport: 0.12, shopping: 0.10, tickets: 0.08, other: 0.10 },
    culture: { accommodation: 0.30, food: 0.20, transport: 0.15, shopping: 0.10, tickets: 0.20, other: 0.05 },
    nature: { accommodation: 0.25, food: 0.20, transport: 0.25, shopping: 0.05, tickets: 0.15, other: 0.10 },
    couple: { accommodation: 0.35, food: 0.25, transport: 0.12, shopping: 0.13, tickets: 0.10, other: 0.05 },
    budget: { accommodation: 0.30, food: 0.25, transport: 0.15, shopping: 0.08, tickets: 0.10, other: 0.12 },
    default: { accommodation: 0.30, food: 0.25, transport: 0.15, shopping: 0.15, tickets: 0.10, other: 0.05 }
  }
  const budgetRatios = styleBudgetMap[style] || styleBudgetMap.default
  const budgetBreakdown = {}
  Object.entries(budgetRatios).forEach(([key, ratio]) => {
    budgetBreakdown[key] = Math.round(budget * ratio)
  })

  return {
    summary: `为您规划了${destination}${days}天${styleLabel}之旅，${pace === 'relaxed' ? '节奏轻松' : pace === 'tight' ? '行程充实' : '劳逸结合'}，${peopleCount > 1 ? '适合与同伴一起' : '独自旅行'}探索这座城市的魅力。`,
    itinerary,
    places: destData.places,
    foods: destData.foods,
    packingList: destData.packingList,
    budgetSuggestion: {
      total: budget,
      breakdown: budgetBreakdown
    },
    tips: destData.tips
  }
}

/**
 * 生成目的地推荐
 * 根据推荐类型（景点/美食/住宿）返回相应的推荐列表，每条包含推荐理由
 *
 * @param {string} destination - 目的地名称
 * @param {string} [type='all'] - 推荐类型（places/foods/all）
 * @returns {Promise<Object>} 推荐结果
 */
async function generateRecommendations(destination, type = 'all') {
  // 模拟 AI 思考时间
  await delay(800 + randomInt(0, 500))

  const destData = DESTINATION_DATA[destination] || GENERIC_DESTINATION
  const result = {
    destination,
    places: destData.places.map(p => ({ ...p, image: `https://picsum.photos/400/300?random=${randomInt(1000, 9999)}` })),
    foods: destData.foods.map(f => ({ ...f, image: `https://picsum.photos/400/300?random=${randomInt(1000, 9999)}` })),
    tips: destData.tips,
    generatedAt: new Date().toISOString()
  }

  // 根据类型筛选返回
  if (type === 'places') {
    return { destination, places: result.places, generatedAt: result.generatedAt }
  }
  if (type === 'foods') {
    return { destination, foods: result.foods, generatedAt: result.generatedAt }
  }

  return result
}

/**
 * 生成旅行回忆文案
 * 根据日记内容生成一段富有诗意的旅行回忆总结
 *
 * @param {string|Object} diaryContent - 日记内容（字符串或包含 content 字段的对象）
 * @returns {Promise<string>} 生成的回忆文案
 */
async function generateMemoryText(diaryContent) {
  // 模拟 AI 思考时间
  await delay(1000 + randomInt(0, 500))

  const content = typeof diaryContent === 'string'
    ? diaryContent
    : (diaryContent && diaryContent.content) || ''

  // 从内容中提取关键词
  const keywords = _extractKeywords(content)

  // 根据关键词组合生成诗意文案
  const templates = [
    `在${keywords.place || '旅途中'}的日子里，${keywords.mood || '每一步都充满惊喜'}。${keywords.food ? '品尝了' + keywords.food + '，味蕾的记忆将伴随很久。' : ''}${keywords.activity ? keywords.activity + '的经历，' : ''}成为此行最珍贵的瞬间。旅行的意义不在于走了多远，而在于看到了什么、感受到了什么。`,
    `${keywords.place ? '漫步在' + keywords.place + '的街道上' : '在旅途中的某个角落'}，${keywords.mood || '时间仿佛慢了下来'}。${keywords.food ? '那一口' + keywords.food + '的味道' : '那一刻的感受'}，至今仍历历在目。每一段旅程都是一次与自己对话的机会，让我们在行走中发现生活最本真的模样。`,
    `回忆起这段${keywords.place || '旅途'}，${keywords.mood || '心中满是温暖'}。${keywords.activity ? keywords.activity + '的画面' : '沿途的风景'}仿佛就在昨天。旅行教会我们：世界很大，而我们的脚步可以丈量每一寸美好。`,
    `${keywords.place || '旅途中的风景'}如诗如画，${keywords.mood || '让人流连忘返'}。${keywords.food ? '那一顿' + keywords.food + '是味觉的惊喜，' : ''}每一处转角都藏着故事。愿我们永远保持对世界的好奇心，在旅途中遇见更好的自己。`
  ]

  return randomFromArray(templates)
}

/**
 * 从文本中提取旅行相关关键词
 * @param {string} content - 文本内容
 * @returns {Object} 提取的关键词对象
 * @private
 */
function _extractKeywords(content) {
  const result = { place: '', mood: '', food: '', activity: '' }

  // 尝试匹配地点
  const placePatterns = ['东京', '巴黎', '曼谷', '三亚', '北京', '成都', '京都', '首尔', '新加坡', '悉尼', '伦敦', '冰岛', '马尔代夫', '西安', '丽江']
  for (const place of placePatterns) {
    if (content.includes(place)) {
      result.place = place
      break
    }
  }

  // 尝试匹配心情关键词
  const moodMap = {
    '震撼': '那份震撼至今难以忘怀',
    '开心': '满是欢声笑语',
    '感动': '心中涌起阵阵感动',
    '平静': '内心获得了难得的平静',
    '兴奋': '每一个瞬间都让人兴奋不已',
    '浪漫': '空气中弥漫着浪漫的气息',
    '怀念': '心中满是怀念与不舍',
    '美丽': '美的景色让人心旷神怡'
  }
  for (const [keyword, mood] of Object.entries(moodMap)) {
    if (content.includes(keyword)) {
      result.mood = mood
      break
    }
  }

  // 尝试匹配美食关键词
  const foodPatterns = ['拉面', '寿司', '火锅', '烤肉', '海鲜', '甜品', '咖啡', '烤鸭', '泡馍', '串串', '面']
  for (const food of foodPatterns) {
    if (content.includes(food)) {
      result.food = food
      break
    }
  }

  // 尝试匹配活动关键词
  const activityPatterns = ['潜水', '爬山', '骑行', '拍照', '散步', '购物', '参观', '温泉', '冲浪', '滑雪', '徒步']
  for (const act of activityPatterns) {
    if (content.includes(act)) {
      result.activity = act
      break
    }
  }

  return result
}

module.exports = {
  generateTripPlan,
  generateRecommendations,
  generateMemoryText
}

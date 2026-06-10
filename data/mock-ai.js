/**
 * 模拟 AI 生成结果数据
 * 预构建的高质量 AI 推荐响应，用于行程生成 mock
 * @module data/mock-ai
 */

const MOCK_AI_RESPONSES = {
  // ====== 东京 + 美食 ======
  '东京_food': {
    summary: '为您精心规划了一场东京美食之旅！从传统和食到创意料理，从深夜拉面到清晨市场，让您用味蕾感受东京的万千风味。建议穿着宽松的裤子来，因为好吃的实在太多了！🍽️',
    itinerary: [
      {
        dayIndex: 1,
        title: '筑地市场与银座和食初体验',
        morning: ['抵达成田机场', 'Narita Express到新宿', '酒店入住'],
        afternoon: ['丰洲市场海鲜午餐', '银座和食街漫步', '资生堂Parlour下午茶'],
        evening: ['新宿思い出横丁居酒屋', '思出横丁串烧体验'],
        estimatedCost: 15000,
        transport: 'Narita Express + 地铁',
        tips: ['丰洲市场建议上午去，下午很多店关', '居酒屋记得提前预约'],
        backupPlan: '如果丰洲市场关门，改去涩谷的拉面横丁'
      },
      {
        dayIndex: 2,
        title: '浅草传统美食巡礼',
        morning: ['浅草寺参拜', '仲见世通小吃巡礼', '人形烧、草饼、炸馒头'],
        afternoon: ['月岛文字烧体验', '两国国技馆参观', '相扑博物馆'],
        evening: ['秋叶原女仆咖啡体验', '上野阿美横丁夜市小吃'],
        estimatedCost: 12000,
        transport: '地铁日票',
        tips: ['仲见世通的小吃不要一次吃太多', '文字烧要自己动手做'],
        backupPlan: '下雨天可改为上野室内活动'
      },
      {
        dayIndex: 3,
        title: '拉面与甜品的幸福一天',
        morning: ['新宿御苑散步', '花园咖啡', '自制三明治早餐'],
        afternoon: ['涩谷拉面竞技场', '原宿竹下通甜品街', '表参道精品咖啡'],
        evening: ['六本木夜景餐厅', '东京塔展望台'],
        estimatedCost: 13000,
        transport: '地铁',
        tips: ['拉面竞技场有多家名店，建议每家只点小份', '表参道的咖啡店很有设计感'],
        backupPlan: '如果排队太久，涩谷站内也有很多好吃的'
      },
      {
        dayIndex: 4,
        title: '镰仓海景与江之岛海鲜',
        morning: ['江之电到镰仓', '长谷寺散步', '镰仓小町通小吃'],
        afternoon: ['江之岛海鲜盖饭', '江之岛展望台', '湘南海岸散步'],
        evening: ['�的崎渔港新鲜刺身', '回程江之电夕阳'],
        estimatedCost: 15000,
        transport: '江之电一日券',
        tips: ['江之岛的海鲜盖饭要排队，建议11点前到', '回程江之电看日落超美'],
        backupPlan: '天气不好改去箱根温泉'
      },
      {
        dayIndex: 5,
        title: '深度和食体验日',
        morning: ['东京车站一番街', '便当美食街', '站内甜品购买'],
        afternoon: ['�的布和牛午餐体验', '日本桥人形町', '老铺和果子品尝'],
        evening: ['新桥深夜食堂', '日比谷公园夜景'],
        estimatedCost: 20000,
        transport: '地铁',
        tips: ['和牛建议选午餐套餐更划算', '老铺和果子可以买伴手礼'],
        backupPlan: '新桥找不到店就去涩谷美食街'
      },
      {
        dayIndex: 6,
        title: '告别东京的最后一顿',
        morning: ['酒店退房', '最后的便利店采购', '车站便当选购'],
        afternoon: ['成田机场免税店', '机场拉面最后一碗'],
        evening: ['启程回国'],
        estimatedCost: 8000,
        transport: 'Narita Express',
        tips: ['机场的拉面也很不错', '别忘了买东京Banana'],
        backupPlan: '如航班延误，机场有很多美食打发时间'
      }
    ],
    places: [
      { name: '丰洲市场', type: 'food', reason: '东京最大的海鲜市场，寿司大和大和寿司是排队名店，新鲜的金枪鱼刺身绝对值得早起', rating: 4.5 },
      { name: '浅草寺', type: 'history', reason: '东京最古老的寺庙，周边小吃街是品尝传统日式小吃的最佳场所', rating: 4.3 },
      { name: '涩谷拉面竞技场', type: 'food', reason: '汇集了日本各地的拉面名店，一次可以品尝多种风味', rating: 4.4 },
      { name: '银座和食街', type: 'food', reason: '银座的高级和食餐厅聚集地，午餐套餐性价比极高', rating: 4.6 },
      { name: '江之岛', type: 'nature', reason: '海景与美食的完美结合，海鲜盖饭和新鲜刺身是必尝', rating: 4.5 },
      { name: '新宿思い出横丁', type: 'food', reason: '昭和风情的窄巷，几十家居酒屋和串烧店，氛围感满分', rating: 4.2 }
    ],
    foods: [
      { name: '寿司大', type: '寿司', reason: '丰洲市场的人气No.1，新鲜度无可挑剔，omakase套餐约¥4000', priceRange: '¥3000-5000/人' },
      { name: '一蘭拉面', type: '拉面', reason: '博多豚骨拉面代表，浓厚汤底配细面，一个人也能舒适享用', priceRange: '¥80-120/人' },
      { name: '烧肉toraji', type: '烤肉', reason: '银座顶级和牛烤肉，A5和牛入口即化，建议预约', priceRange: '¥8000-15000/人' },
      { name: '月岛文字烧', type: '小吃', reason: '东京特色小吃，在铁板上DIY文字烧，体验感满分', priceRange: '¥500-800/人' },
      { name: '木村家人形烧', type: '甜品', reason: '浅草百年老店，热腾腾的人形烧是仲见世通的最佳伴手礼', priceRange: '¥200-400/份' }
    ],
    packingList: [
      { name: '护照', category: 'documents', quantity: 1, note: '确认有效期6个月以上' },
      { name: '机票行程单', category: 'documents', quantity: 1, note: '' },
      { name: '酒店确认单', category: 'documents', quantity: 1, note: '' },
      { name: 'Suica交通卡', category: 'other', quantity: 1, note: '建议提前购买或在机场充值' },
      { name: '日元现金', category: 'other', quantity: 1, note: '小店和居酒屋很多只收现金' },
      { name: '充电宝', category: 'electronics', quantity: 1, note: '拍照多必备' },
      { name: '转换插头', category: 'electronics', quantity: 1, note: '日本电压100V，两脚扁插可直接用' },
      { name: '轻便外套', category: 'clothes', quantity: 1, note: '商场和地铁冷气足' },
      { name: '防晒霜', category: 'toiletries', quantity: 1, note: 'SPF50+' },
      { name: '肠胃药', category: 'medicine', quantity: 1, note: '生冷食物多，备着安心' }
    ],
    budgetSuggestion: {
      total: 65000,
      breakdown: {
        transport: 12000,
        accommodation: 20000,
        food: 22000,
        tickets: 5000,
        shopping: 5000,
        other: 1000
      }
    },
    tips: [
      '丰洲市场建议工作日去，周末人太多',
      '日本餐厅很多需要脱鞋，穿方便穿脱的鞋',
      '拉面吃完是不用把汤喝完的',
      '日本的便利店美食也值得一试，饭团和炸鸡都很好吃',
      '建议提前在Tabelog上查好餐厅，热门店一定要预约',
      '现金很重要，很多小店和老铺不支持刷卡',
      '带个环保袋，日本不提供免费购物袋'
    ]
  },

  // ====== 巴黎 + 休闲 ======
  '巴黎_couple': {
    summary: '为您和伴侣量身打造了一场浪漫巴黎之旅！在塞纳河畔散步、在蒙马特看日落、在米其林餐厅享受烛光晚餐...每一天都是写给爱情的情书。🌹',
    itinerary: [
      {
        dayIndex: 1,
        title: '塞纳河畔的浪漫邂逅',
        morning: ['抵达巴黎', '酒店入住（选塞纳河附近）', '酒店花园咖啡'],
        afternoon: ['埃菲尔铁塔', '战神广场野餐', '铁塔登顶看巴黎全景'],
        evening: ['塞纳河游船晚餐', '夜景拍摄'],
        estimatedCost: 40000,
        transport: 'RER + 步行',
        tips: ['铁塔建议预约登顶时间', '游船晚餐需提前2周预约'],
        backupPlan: '如果下雨，改为橘园美术馆和杜乐丽花园咖啡'
      },
      {
        dayIndex: 2,
        title: '蒙马特的画家与咖啡',
        morning: ['蒙马特圣心大教堂', '小丘广场画家画像', '爱墙打卡'],
        afternoon: ['红磨坊外观', '蒙马特葡萄园', '小鹿甜品店'],
        evening: ['狡兔酒吧', '蒙马特晚餐'],
        estimatedCost: 30000,
        transport: '地铁 + 步行',
        tips: ['小丘广场的画家可以讨价还价', '蒙马特的阶梯穿平底鞋'],
        backupPlan: '下午去毕加索博物馆'
      },
      {
        dayIndex: 3,
        title: '凡尔赛宫的金色午后',
        morning: ['RER前往凡尔赛', '凡尔赛宫参观'],
        afternoon: ['凡尔赛花园漫步', '小特里亚农宫', '花园午餐'],
        evening: ['返回巴黎', '香榭丽舍大街散步', '凯旋门夜景'],
        estimatedCost: 25000,
        transport: 'RER C线',
        tips: ['凡尔赛建议至少半天', '花园很大可以租高尔夫球车'],
        backupPlan: '如果天气不好，改为奥赛博物馆'
      },
      {
        dayIndex: 4,
        title: '左岸咖啡与艺术',
        morning: ['卢浮宫（提前预约）', '蒙娜丽莎与胜利女神'],
        afternoon: ['左岸花神咖啡馆', '莎士比亚书店', '拉丁区漫步'],
        evening: ['米其林餐厅晚餐', '塞纳河夜散步'],
        estimatedCost: 45000,
        transport: '地铁 + 步行',
        tips: ['卢浮宫周三周五开到晚上9:45', '米其林餐厅需提前1个月预约'],
        backupPlan: '卢浮宫太大，建议提前选好想看的区域'
      },
      {
        dayIndex: 5,
        title: '巴黎的告别吻',
        morning: ['玛黑区早午餐', '粉色咖啡店打卡', '玛黑区设计师店'],
        afternoon: ['橘园美术馆', '杜乐丽花园', '协和广场'],
        evening: ['离巴黎前最后一杯红酒', '前往机场'],
        estimatedCost: 20000,
        transport: '地铁 + RER',
        tips: ['玛黑区的Falafel是巴黎最好吃的', '可以买些红酒当伴手礼'],
        backupPlan: '购物时间不够可以去老佛爷百货'
      }
    ],
    places: [
      { name: '埃菲尔铁塔', type: 'photo', reason: '巴黎的象征，日落时分最美，建议预约登顶', rating: 4.7 },
      { name: '蒙马特', type: 'photo', reason: '巴黎最有艺术气息的街区，画家广场和小教堂都很浪漫', rating: 4.5 },
      { name: '卢浮宫', type: 'history', reason: '世界最大的艺术博物馆，达芬奇的蒙娜丽莎就在里面', rating: 4.8 },
      { name: '塞纳河', type: 'photo', reason: '傍晚在河边散步是最浪漫的事', rating: 4.6 },
      { name: '凡尔赛宫', type: 'history', reason: '法国王室的华丽行宫，镜厅和花园让人叹为观止', rating: 4.7 },
      { name: '莎士比亚书店', type: 'shopping', reason: '巴黎最文艺的书店，海明威曾是常客', rating: 4.4 }
    ],
    foods: [
      { name: '花神咖啡馆', type: '咖啡', reason: '左岸最著名的咖啡馆，萨特和波伏瓦曾在此写作', priceRange: '€15-25/人' },
      { name: 'L\'As du Fallafel', type: '快餐', reason: '玛黑区最强法拉费尔三明治，排队也值得', priceRange: '€8-12/人' },
      { name: 'Angelina', type: '甜品', reason: '百年老店，热巧克力浓到可以用勺子吃', priceRange: '€15-30/人' },
      { name: 'Le Comptoir du Panthéon', type: '法餐', reason: '性价比极高的法式小酒馆，鹅肝和鸭胸很推荐', priceRange: '€25-40/人' }
    ],
    packingList: [
      { name: '护照', category: 'documents', quantity: 1, note: '检查签证有效期' },
      { name: '欧元现金', category: 'other', quantity: 1, note: '小费和小店用' },
      { name: '舒适步行鞋', category: 'clothes', quantity: 2, note: '巴黎走路很多' },
      { name: '轻薄外套', category: 'clothes', quantity: 1, note: '早晚温差大' },
      { name: '相机', category: 'electronics', quantity: 1, note: '巴黎太美需要好相机' },
      { name: '转换插头', category: 'electronics', quantity: 1, note: '法标圆头两孔' },
      { name: '香水', category: 'toiletries', quantity: 1, note: '也可以到巴黎再买' }
    ],
    budgetSuggestion: {
      total: 80000,
      breakdown: {
        transport: 8000,
        accommodation: 30000,
        food: 25000,
        tickets: 8000,
        shopping: 5000,
        other: 4000
      }
    },
    tips: [
      '巴黎地铁很发达但要注意扒手',
      '法国餐厅的小费已包含在账单里，不需要额外给',
      '卢浮器建议预约入场时间，现场排队可能要1-2小时',
      '周日大部分商店关门，购物安排在工作日',
      '巴黎的自来水可以直接喝',
      '带一件优雅的衣服，法国人很注重晚餐着装'
    ]
  },

  // ====== 成都 + 深度游 ======
  '成都_deep': {
    summary: '为您打造深度成都文化之旅！从千年都江堰到国宝大熊猫，从麻辣火锅到盖碗茶，用4天时间体验最地道的巴蜀生活。这是一场关于慢生活、美食和历史的深度对话。🐼',
    itinerary: [
      {
        dayIndex: 1,
        title: '成都的慢生活序章',
        morning: ['人民公园鹤鸣茶社', '喝盖碗茶', '看大爷打麻将'],
        afternoon: ['宽窄巷子', '掏耳朵体验', '巷子里的文艺小店'],
        evening: ['锦里古街', '三大炮、糖油果子', '川剧变脸表演'],
        estimatedCost: 500,
        transport: '地铁 + 步行',
        tips: ['鹤鸣茶社周末人多建议早去', '川剧变脸提前买票'],
        backupPlan: '如果下雨，改为成都博物馆'
      },
      {
        dayIndex: 2,
        title: '大熊猫与三国文化',
        morning: ['大熊猫繁育研究基地', '看熊猫吃早餐', '月亮产房'],
        afternoon: ['武侯祠', '红墙竹影拍照', '锦里午餐'],
        evening: ['九眼桥酒吧街', '河边散步', '夜生活体验'],
        estimatedCost: 600,
        transport: '地铁 + 打车',
        tips: ['熊猫基地一定要早去，上午最活跃', '武侯祠的红墙是网红拍照点'],
        backupPlan: '熊猫基地下雨天熊猫可能不出来'
      },
      {
        dayIndex: 3,
        title: '都江堰与青城山',
        morning: ['包车前往都江堰', '参观水利工程', '安澜索桥'],
        afternoon: ['青城山前山', '建福宫', '天师洞', '老君阁'],
        evening: ['返回市区', '蜀九香火锅', '体验正宗川味'],
        estimatedCost: 650,
        transport: '包车往返',
        tips: ['都江堰和青城山一天比较赶，建议包车', '火锅建议下午5点去排队'],
        backupPlan: '只去都江堰不爬山，下午回市区逛春熙路'
      },
      {
        dayIndex: 4,
        title: '市井烟火与告别',
        morning: ['建设路小吃街', '各种小吃早餐', '成都第二人民医院旁的冒菜'],
        afternoon: ['杜甫草堂', '浣花溪公园', '诗歌文化'],
        evening: ['春熙路太古里', '最后的成都美食', '返程'],
        estimatedCost: 400,
        transport: '地铁 + 步行',
        tips: ['建设路小吃街是本地人最爱', '杜甫草堂很安静适合散步'],
        backupPlan: '时间充裕可以去东郊记忆看看工业风'
      }
    ],
    places: [
      { name: '大熊猫繁育研究基地', type: 'family', reason: '全球最大的大熊猫繁育中心，近距离观看国宝卖萌', rating: 4.7 },
      { name: '都江堰', type: 'history', reason: '2000多年前的水利奇迹，至今仍在灌溉成都平原', rating: 4.6 },
      { name: '武侯祠', type: 'history', reason: '三国文化圣地，红墙竹影是最美拍照点', rating: 4.4 },
      { name: '青城山', type: 'nature', reason: '道教名山，幽甲天下的青城天下幽', rating: 4.5 },
      { name: '宽窄巷子', type: 'shopping', reason: '成都最有名的历史文化街区，小吃和文艺并存', rating: 4.3 },
      { name: '锦里', type: 'shopping', reason: '三国文化主题街，夜景很美', rating: 4.2 }
    ],
    foods: [
      { name: '蜀九香火锅', type: '火锅', reason: '成都本地人最爱的火锅之一，牛油锅底香浓醇厚', priceRange: '¥80-120/人' },
      { name: '鹤鸣茶社', type: '茶馆', reason: '百年老茶馆，体验最地道的成都盖碗茶文化', priceRange: '¥20-40/人' },
      { name: '三大炮', type: '小吃', reason: '锦里的招牌小吃，糯米团子蘸红糖，甜糯可口', priceRange: '¥10-15/份' },
      { name: '龙抄手', type: '面食', reason: '成都老字号，红油抄手皮薄馅大', priceRange: '¥15-25/人' },
      { name: '建设路小吃', type: '小吃', reason: '本地人推荐的深夜美食街，烤猪蹄、锅巴土豆都绝了', priceRange: '¥30-50/人' }
    ],
    packingList: [
      { name: '身份证', category: 'documents', quantity: 1, note: '' },
      { name: '短袖T恤', category: 'clothes', quantity: 4, note: '成都夏季较热' },
      { name: '薄外套', category: 'clothes', quantity: 1, note: '室内空调冷' },
      { name: '雨伞', category: 'other', quantity: 1, note: '成都多雨' },
      { name: '舒适运动鞋', category: 'clothes', quantity: 1, note: '爬青城山必备' },
      { name: '充电宝', category: 'electronics', quantity: 1, note: '' },
      { name: '肠胃药', category: 'medicine', quantity: 1, note: '辣的食物容易拉肚子' },
      { name: '润喉糖', category: 'medicine', quantity: 1, note: '吃辣后嗓子可能不舒服' },
      { name: '防晒霜', category: 'toiletries', quantity: 1, note: '' }
    ],
    budgetSuggestion: {
      total: 5000,
      breakdown: {
        transport: 800,
        accommodation: 1500,
        food: 1500,
        tickets: 500,
        shopping: 500,
        other: 200
      }
    },
    tips: [
      '成都的辣是真的辣，不能吃辣记得说"微辣"',
      '熊猫基地一定要上午去，下午熊猫都在睡觉',
      '成都出租车起步价便宜，短途打车很划算',
      '火锅吃完衣服会有味道，建议带件备用衣服',
      '成都的茶馆可以坐一下午，没人赶你',
      '春熙路太古里可以偶遇明星，很多明星店也在这里',
      '成都人说话很可爱，会不自觉被带偏'
    ]
  }
}

module.exports = { MOCK_AI_RESPONSES }

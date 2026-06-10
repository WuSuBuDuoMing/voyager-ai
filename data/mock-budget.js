/**
 * 模拟预算记录数据
 * 包含多个旅行的预算支出记录，覆盖交通、住宿、餐饮、门票等分类
 * @module data/mock-budget
 */

const MOCK_BUDGET_RECORDS = [
  // ========== trip_001 东京 (总预算 25000) ==========
  { id: 'budget_001', tripId: 'trip_001', category: 'transport', amount: 5000, description: '机票往返(上海-东京成田)', date: '2026-07-14', isFixed: true },
  { id: 'budget_002', tripId: 'trip_001', category: 'transport', amount: 800, description: 'Narita Express往返', date: '2026-07-15', isFixed: true },
  { id: 'budget_003', tripId: 'trip_001', category: 'transport', amount: 500, description: '地铁西瓜卡充值', date: '2026-07-15', isFixed: false },
  { id: 'budget_004', tripId: 'trip_001', category: 'accommodation', amount: 4800, description: '新宿区酒店(6晚)', date: '2026-07-15', isFixed: true },
  { id: 'budget_005', tripId: 'trip_001', category: 'food', amount: 1500, description: '筑地寿司+一兰拉面', date: '2026-07-16', isFixed: false },
  { id: 'budget_006', tripId: 'trip_001', category: 'food', amount: 1200, description: '居酒屋晚餐', date: '2026-07-15', isFixed: false },
  { id: 'budget_007', tripId: 'trip_001', category: 'food', amount: 800, description: '便利店+快餐', date: '2026-07-16', isFixed: false },
  { id: 'budget_008', tripId: 'trip_001', category: 'tickets', amount: 3800, description: 'TeamLab Planets门票', date: '2026-07-17', isFixed: true },
  { id: 'budget_009', tripId: 'trip_001', category: 'shopping', amount: 3000, description: '药妆店采购', date: '2026-07-19', isFixed: false },
  { id: 'budget_010', tripId: 'trip_001', category: 'shopping', amount: 1500, description: '唐吉诃德/杂货', date: '2026-07-17', isFixed: false },
  { id: 'budget_011', tripId: 'trip_001', category: 'food', amount: 1000, description: '下北泽咖喱+甜品', date: '2026-07-19', isFixed: false },
  { id: 'budget_012', tripId: 'trip_001', category: 'other', amount: 500, description: '伴手礼(东京车站一番街)', date: '2026-07-20', isFixed: false },

  // ========== trip_002 巴黎 (总预算 45000) ==========
  { id: 'budget_013', tripId: 'trip_002', category: 'transport', amount: 12000, description: '机票往返(上海-巴黎)', date: '2026-08-09', isFixed: true },
  { id: 'budget_014', tripId: 'trip_002', category: 'transport', amount: 600, description: 'RER B机场到市区', date: '2026-08-10', isFixed: true },
  { id: 'budget_015', tripId: 'trip_002', category: 'transport', amount: 400, description: 'Navigo周卡(地铁公交)', date: '2026-08-10', isFixed: true },
  { id: 'budget_016', tripId: 'trip_002', category: 'accommodation', amount: 8000, description: '玛黑区民宿(5晚)', date: '2026-08-10', isFixed: true },
  { id: 'budget_017', tripId: 'trip_002', category: 'tickets', amount: 2600, description: '埃菲尔铁塔登顶', date: '2026-08-12', isFixed: true },
  { id: 'budget_018', tripId: 'trip_002', category: 'tickets', amount: 3400, description: '卢浮宫门票', date: '2026-08-11', isFixed: true },
  { id: 'budget_019', tripId: 'trip_002', category: 'tickets', amount: 4200, description: '凡尔赛宫门票', date: '2026-08-13', isFixed: true },
  { id: 'budget_020', tripId: 'trip_002', category: 'food', amount: 1500, description: '法式餐厅晚餐', date: '2026-08-11', isFixed: false },
  { id: 'budget_021', tripId: 'trip_002', category: 'food', amount: 2000, description: '塞纳河游船晚餐', date: '2026-08-12', isFixed: true },
  { id: 'budget_022', tripId: 'trip_002', category: 'shopping', amount: 6000, description: '老佛爷百货/春天百货', date: '2026-08-11', isFixed: false },
  { id: 'budget_023', tripId: 'trip_002', category: 'food', amount: 800, description: 'Pierre Hermé马卡龙+咖啡', date: '2026-08-10', isFixed: false },
  { id: 'budget_024', tripId: 'trip_002', category: 'other', amount: 1200, description: '明信片/冰箱贴/书籍', date: '2026-08-14', isFixed: false },

  // ========== trip_003 曼谷 (总预算 12000) ==========
  { id: 'budget_025', tripId: 'trip_003', category: 'transport', amount: 2500, description: '机票往返(广州-曼谷)', date: '2026-06-19', isFixed: true },
  { id: 'budget_026', tripId: 'trip_003', category: 'transport', amount: 300, description: '机场快线+BTS', date: '2026-06-20', isFixed: false },
  { id: 'budget_027', tripId: 'trip_003', category: 'accommodation', amount: 2400, description: '素坤逸区酒店(5晚)', date: '2026-06-20', isFixed: true },
  { id: 'budget_028', tripId: 'trip_003', category: 'food', amount: 200, description: '考山路夜市美食', date: '2026-06-20', isFixed: false },
  { id: 'budget_029', tripId: 'trip_003', category: 'food', amount: 350, description: 'Jay Fai蟹肉蛋卷', date: '2026-06-21', isFixed: false },
  { id: 'budget_030', tripId: 'trip_003', category: 'tickets', amount: 500, description: '大皇宫门票', date: '2026-06-20', isFixed: true },
  { id: 'budget_031', tripId: 'trip_003', category: 'tickets', amount: 800, description: '水上市场半日游', date: '2026-06-21', isFixed: true },
  { id: 'budget_032', tripId: 'trip_003', category: 'shopping', amount: 1500, description: '暹罗广场购物', date: '2026-06-21', isFixed: false },
  { id: 'budget_033', tripId: 'trip_003', category: 'other', amount: 400, description: '泰式按摩2小时x2', date: '2026-06-22', isFixed: false },

  // ========== trip_004 三亚 (总预算 10000) ==========
  { id: 'budget_034', tripId: 'trip_004', category: 'transport', amount: 2800, description: '机票往返(上海-三亚)', date: '2026-04-01', isFixed: true },
  { id: 'budget_035', tripId: 'trip_004', category: 'transport', amount: 200, description: '机场到亚龙湾出租车', date: '2026-04-01', isFixed: false },
  { id: 'budget_036', tripId: 'trip_004', category: 'accommodation', amount: 3500, description: '亚龙湾海景酒店(4晚)', date: '2026-04-01', isFixed: true },
  { id: 'budget_037', tripId: 'trip_004', category: 'food', amount: 600, description: '第一市场海鲜加工', date: '2026-04-01', isFixed: false },
  { id: 'budget_038', tripId: 'trip_004', category: 'food', amount: 400, description: '椰子鸡火锅', date: '2026-04-02', isFixed: false },
  { id: 'budget_039', tripId: 'trip_004', category: 'tickets', amount: 1440, description: '蜈支洲岛门票+快艇', date: '2026-04-02', isFixed: true },
  { id: 'budget_040', tripId: 'trip_004', category: 'tickets', amount: 500, description: '浮潜体验', date: '2026-04-02', isFixed: true },
  { id: 'budget_041', tripId: 'trip_004', category: 'shopping', amount: 1200, description: '三亚免税城', date: '2026-04-03', isFixed: false },

  // ========== trip_005 北京 (总预算 8000) ==========
  { id: 'budget_042', tripId: 'trip_005', category: 'transport', amount: 2400, description: '机票往返(成都-北京)', date: '2026-04-30', isFixed: true },
  { id: 'budget_043', tripId: 'trip_005', category: 'transport', amount: 200, description: '地铁+公交(4天)', date: '2026-05-01', isFixed: false },
  { id: 'budget_044', tripId: 'trip_005', category: 'accommodation', amount: 2000, description: '王府井附近酒店(3晚)', date: '2026-05-01', isFixed: true },
  { id: 'budget_045', tripId: 'trip_005', category: 'tickets', amount: 240, description: '故宫+景山公园', date: '2026-05-01', isFixed: true },
  { id: 'budget_046', tripId: 'trip_005', category: 'tickets', amount: 160, description: '八达岭长城', date: '2026-05-02', isFixed: true },
  { id: 'budget_047', tripId: 'trip_005', category: 'tickets', amount: 120, description: '颐和园+恭王府', date: '2026-05-03', isFixed: true },
  { id: 'budget_048', tripId: 'trip_005', category: 'food', amount: 600, description: '全聚德烤鸭晚餐', date: '2026-05-02', isFixed: false },
  { id: 'budget_049', tripId: 'trip_005', category: 'food', amount: 400, description: '东来顺涮羊肉', date: '2026-05-01', isFixed: false },
  { id: 'budget_050', tripId: 'trip_005', category: 'food', amount: 300, description: '回民街小吃', date: '2026-05-02', isFixed: false },
  { id: 'budget_051', tripId: 'trip_005', category: 'other', amount: 200, description: '伴手礼(稻香村点心)', date: '2026-05-04', isFixed: false },

  // ========== trip_006 成都 (总预算 8000) ==========
  { id: 'budget_052', tripId: 'trip_006', category: 'transport', amount: 1600, description: '机票往返(北京-成都)', date: '2026-09-11', isFixed: true },
  { id: 'budget_053', tripId: 'trip_006', category: 'transport', amount: 300, description: '机场到宽窄巷子', date: '2026-09-12', isFixed: false },
  { id: 'budget_054', tripId: 'trip_006', category: 'accommodation', amount: 2400, description: '宽窄巷子附近民宿(4晚)', date: '2026-09-12', isFixed: true },
  { id: 'budget_055', tripId: 'trip_006', category: 'food', amount: 500, description: '冒椒火辣串串', date: '2026-09-12', isFixed: false },
  { id: 'budget_056', tripId: 'trip_006', category: 'food', amount: 600, description: '小龙坎火锅', date: '2026-09-13', isFixed: false },
  { id: 'budget_057', tripId: 'trip_006', category: 'tickets', amount: 110, description: '大熊猫基地门票', date: '2026-09-13', isFixed: true },
  { id: 'budget_058', tripId: 'trip_006', category: 'tickets', amount: 100, description: '武侯祠+杜甫草堂', date: '2026-09-14', isFixed: true },
  { id: 'budget_059', tripId: 'trip_006', category: 'shopping', amount: 500, description: '伴手礼(张飞牛肉/花椒)', date: '2026-09-15', isFixed: false },

  // ========== trip_007 京都 (总预算 20000) ==========
  { id: 'budget_060', tripId: 'trip_007', category: 'transport', amount: 5000, description: '机票往返(上海-大阪)', date: '2026-03-24', isFixed: true },
  { id: 'budget_061', tripId: 'trip_007', category: 'transport', amount: 600, description: 'JR京都站一日券', date: '2026-03-25', isFixed: false },
  { id: 'budget_062', tripId: 'trip_007', category: 'accommodation', amount: 6000, description: '祇园町屋(5晚)', date: '2026-03-25', isFixed: true },
  { id: 'budget_063', tripId: 'trip_007', category: 'tickets', amount: 4000, description: '和服体验(2人)', date: '2026-03-25', isFixed: true },
  { id: 'budget_064', tripId: 'trip_007', category: 'food', amount: 1200, description: '先斗町京料理晚餐', date: '2026-03-25', isFixed: false },
  { id: 'budget_065', tripId: 'trip_007', category: 'tickets', amount: 3000, description: '岚山嵯峨野小火车', date: '2026-03-26', isFixed: true },

  // ========== trip_008 首尔 (总预算 15000) ==========
  { id: 'budget_066', tripId: 'trip_008', category: 'transport', amount: 3500, description: '机票往返(上海-首尔)', date: '2026-07-04', isFixed: true },
  { id: 'budget_067', tripId: 'trip_008', category: 'transport', amount: 200, description: 'AREX机场快线', date: '2026-07-05', isFixed: false },
  { id: 'budget_068', tripId: 'trip_008', category: 'accommodation', amount: 3600, description: '明洞区酒店(4晚)', date: '2026-07-05', isFixed: true },
  { id: 'budget_069', tripId: 'trip_008', category: 'food', amount: 500, description: '广藏市场美食', date: '2026-07-05', isFixed: false },
  { id: 'budget_070', tripId: 'trip_008', category: 'food', amount: 600, description: '姜虎东白丁烤肉', date: '2026-07-06', isFixed: false },
  { id: 'budget_071', tripId: 'trip_008', category: 'shopping', amount: 4000, description: '明洞购物(化妆品/服饰)', date: '2026-07-05', isFixed: false },
  { id: 'budget_072', tripId: 'trip_008', category: 'tickets', amount: 3000, description: '景福宫韩服体验(2人)', date: '2026-07-06', isFixed: true },

  // ========== trip_009 新加坡 (总预算 18000) ==========
  { id: 'budget_073', tripId: 'trip_009', category: 'transport', amount: 4000, description: '机票往返(上海-新加坡)', date: '2026-09-30', isFixed: true },
  { id: 'budget_074', tripId: 'trip_009', category: 'transport', amount: 200, description: '地铁EZ-Link卡', date: '2026-10-01', isFixed: false },
  { id: 'budget_075', tripId: 'trip_009', category: 'accommodation', amount: 6000, description: '滨海湾附近酒店(4晚)', date: '2026-10-01', isFixed: true },
  { id: 'budget_076', tripId: 'trip_009', category: 'food', amount: 200, description: '小贩中心美食(3餐)', date: '2026-10-01', isFixed: false },
  { id: 'budget_077', tripId: 'trip_009', category: 'tickets', amount: 1640, description: '环球影城门票(2人)', date: '2026-10-02', isFixed: true },

  // ========== trip_010 悉尼 (总预算 35000) ==========
  { id: 'budget_078', tripId: 'trip_010', category: 'transport', amount: 8000, description: '机票往返(上海-悉尼)', date: '2026-11-14', isFixed: true },
  { id: 'budget_079', tripId: 'trip_010', category: 'accommodation', amount: 10000, description: '歌剧院附近酒店(7晚)', date: '2026-11-15', isFixed: true },
  { id: 'budget_080', tripId: 'trip_010', category: 'tickets', amount: 800, description: '悉尼歌剧院导览', date: '2026-11-15', isFixed: true }
]

module.exports = {
  MOCK_BUDGET_RECORDS
}

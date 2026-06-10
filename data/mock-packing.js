/**
 * 模拟行李清单数据
 * 包含默认通用清单模板和行程专属定制清单
 * @module data/mock-packing
 */

/** 默认行李清单模板 (通用，约40项) */
const MOCK_PACKING_DEFAULT = [
  // 证件类
  { id: 'pack_001', tripId: '', name: '护照', category: 'documents', isPacked: true, quantity: 1, isDefault: true, note: '检查有效期6个月以上' },
  { id: 'pack_002', tripId: '', name: '身份证', category: 'documents', isPacked: true, quantity: 1, isDefault: true, note: '' },
  { id: 'pack_003', tripId: '', name: '机票行程单', category: 'documents', isPacked: true, quantity: 1, isDefault: true, note: '电子版存手机' },
  { id: 'pack_004', tripId: '', name: '酒店预订确认单', category: 'documents', isPacked: false, quantity: 1, isDefault: true, note: '' },
  { id: 'pack_005', tripId: '', name: '旅行保险单', category: 'documents', isPacked: false, quantity: 1, isDefault: true, note: '电子版存手机' },
  { id: 'pack_006', tripId: '', name: '护照复印件', category: 'documents', isPacked: false, quantity: 2, isDefault: true, note: '分开存放' },
  { id: 'pack_007', tripId: '', name: '证件照片', category: 'documents', isPacked: false, quantity: 2, isDefault: true, note: '2寸白底' },

  // 衣物类
  { id: 'pack_008', tripId: '', name: 'T恤', category: 'clothes', isPacked: false, quantity: 5, isDefault: true, note: '按天数准备' },
  { id: 'pack_009', tripId: '', name: '短裤/长裤', category: 'clothes', isPacked: false, quantity: 3, isDefault: true, note: '' },
  { id: 'pack_010', tripId: '', name: '内裤', category: 'clothes', isPacked: false, quantity: 5, isDefault: true, note: '可带一次性' },
  { id: 'pack_011', tripId: '', name: '袜子', category: 'clothes', isPacked: false, quantity: 5, isDefault: true, note: '' },
  { id: 'pack_012', tripId: '', name: '睡衣', category: 'clothes', isPacked: false, quantity: 1, isDefault: true, note: '' },
  { id: 'pack_013', tripId: '', name: '外套/薄风衣', category: 'clothes', isPacked: false, quantity: 1, isDefault: true, note: '防空调冷风' },
  { id: 'pack_014', tripId: '', name: '运动鞋', category: 'clothes', isPacked: false, quantity: 1, isDefault: true, note: '舒适最重要' },
  { id: 'pack_015', tripId: '', name: '拖鞋', category: 'clothes', isPacked: false, quantity: 1, isDefault: true, note: '酒店不一定有' },
  { id: 'pack_016', tripId: '', name: '泳衣', category: 'clothes', isPacked: false, quantity: 1, isDefault: true, note: '海边/温泉可用' },

  // 电子设备类
  { id: 'pack_017', tripId: '', name: '手机充电器', category: 'electronics', isPacked: true, quantity: 1, isDefault: true, note: '' },
  { id: 'pack_018', tripId: '', name: '充电宝(20000mAh)', category: 'electronics', isPacked: true, quantity: 1, isDefault: true, note: '不能托运' },
  { id: 'pack_019', tripId: '', name: '转换插头', category: 'electronics', isPacked: false, quantity: 1, isDefault: true, note: '确认目的地插座标准' },
  { id: 'pack_020', tripId: '', name: '耳机', category: 'electronics', isPacked: true, quantity: 1, isDefault: true, note: '降噪耳机飞机上用' },
  { id: 'pack_021', tripId: '', name: '数据线', category: 'electronics', isPacked: false, quantity: 2, isDefault: true, note: '带备用的' },
  { id: 'pack_022', tripId: '', name: '相机', category: 'electronics', isPacked: false, quantity: 1, isDefault: true, note: '根据需要' },
  { id: 'pack_023', tripId: '', name: '相机充电器', category: 'electronics', isPacked: false, quantity: 1, isDefault: true, note: '' },
  { id: 'pack_024', tripId: '', name: '自拍杆/三脚架', category: 'electronics', isPacked: false, quantity: 1, isDefault: true, note: '拍照必备' },

  // 洗漱用品类
  { id: 'pack_025', tripId: '', name: '牙刷', category: 'toiletries', isPacked: false, quantity: 1, isDefault: true, note: '可到了再买' },
  { id: 'pack_026', tripId: '', name: '牙膏', category: 'toiletries', isPacked: false, quantity: 1, isDefault: true, note: '' },
  { id: 'pack_027', tripId: '', name: '洗面奶', category: 'toiletries', isPacked: false, quantity: 1, isDefault: true, note: '用小分装瓶' },
  { id: 'pack_028', tripId: '', name: '防晒霜', category: 'toiletries', isPacked: false, quantity: 1, isDefault: true, note: 'SPF50+，海边必备' },
  { id: 'pack_029', tripId: '', name: '面霜/乳液', category: 'toiletries', isPacked: false, quantity: 1, isDefault: true, note: '小分装瓶' },
  { id: 'pack_030', tripId: '', name: '湿纸巾', category: 'toiletries', isPacked: false, quantity: 1, isDefault: true, note: '旅行装' },
  { id: 'pack_031', tripId: '', name: '免洗洗手液', category: 'toiletries', isPacked: false, quantity: 1, isDefault: true, note: '小瓶' },

  // 药品类
  { id: 'pack_032', tripId: '', name: '感冒药', category: 'medicine', isPacked: false, quantity: 1, isDefault: true, note: '' },
  { id: 'pack_033', tripId: '', name: '肠胃药', category: 'medicine', isPacked: false, quantity: 1, isDefault: true, note: '水土不服备用' },
  { id: 'pack_034', tripId: '', name: '创可贴', category: 'medicine', isPacked: false, quantity: 5, isDefault: true, note: '' },
  { id: 'pack_035', tripId: '', name: '晕车药', category: 'medicine', isPacked: false, quantity: 1, isDefault: true, note: '如果晕车' },
  { id: 'pack_036', tripId: '', name: '止痛药', category: 'medicine', isPacked: false, quantity: 1, isDefault: true, note: '' },

  // 其他
  { id: 'pack_037', tripId: '', name: '雨伞', category: 'other', isPacked: false, quantity: 1, isDefault: true, note: '折叠款' },
  { id: 'pack_038', tripId: '', name: '收纳袋', category: 'other', isPacked: false, quantity: 5, isDefault: true, note: '衣物分类' },
  { id: 'pack_039', tripId: '', name: '眼罩', category: 'other', isPacked: false, quantity: 1, isDefault: true, note: '飞机上用' },
  { id: 'pack_040', tripId: '', name: 'U型枕', category: 'other', isPacked: false, quantity: 1, isDefault: true, note: '飞机上用' }
]

/** 行程专属定制清单 (trip_001 东京 约60项) */
const MOCK_PACKING_CUSTOM = [
  // 证件类 (继承默认)
  { id: 'pack_101', tripId: 'trip_001', name: '护照', category: 'documents', isPacked: true, quantity: 1, isDefault: false, note: '有效期到2027年3月' },
  { id: 'pack_102', tripId: 'trip_001', name: '身份证', category: 'documents', isPacked: true, quantity: 1, isDefault: false, note: '' },
  { id: 'pack_103', tripId: 'trip_001', name: '机票行程单', category: 'documents', isPacked: true, quantity: 1, isDefault: false, note: '已存手机' },
  { id: 'pack_104', tripId: 'trip_001', name: '酒店预订确认', category: 'documents', isPacked: true, quantity: 1, isDefault: false, note: 'Booking.com确认单' },
  { id: 'pack_105', tripId: 'trip_001', name: '日本签证', category: 'documents', isPacked: true, quantity: 1, isDefault: false, note: '贴在护照上' },
  { id: 'pack_106', tripId: 'trip_001', name: '护照复印件', category: 'documents', isPacked: true, quantity: 2, isDefault: false, note: '分别放在行李箱和随身包' },
  { id: 'pack_107', tripId: 'trip_001', name: '日元现金', category: 'documents', isPacked: true, quantity: 1, isDefault: false, note: '约5万日元' },

  // 衣物类
  { id: 'pack_108', tripId: 'trip_001', name: 'T恤', category: 'clothes', isPacked: true, quantity: 6, isDefault: false, note: '深色系方便搭配' },
  { id: 'pack_109', tripId: 'trip_001', name: '短裤', category: 'clothes', isPacked: true, quantity: 3, isDefault: false, note: '7月东京很热' },
  { id: 'pack_110', tripId: 'trip_001', name: '薄长裤', category: 'clothes', isPacked: false, quantity: 2, isDefault: false, note: '进寺庙需要' },
  { id: 'pack_111', tripId: 'trip_001', name: '内裤', category: 'clothes', isPacked: true, quantity: 6, isDefault: false, note: '旅行装' },
  { id: 'pack_112', tripId: 'trip_001', name: '袜子', category: 'clothes', isPacked: true, quantity: 6, isDefault: false, note: '进寺庙脱鞋需要' },
  { id: 'pack_113', tripId: 'trip_001', name: '轻薄外套', category: 'clothes', isPacked: false, quantity: 1, isDefault: false, note: '地铁空调很冷' },
  { id: 'pack_114', tripId: 'trip_001', name: '运动鞋', category: 'clothes', isPacked: true, quantity: 1, isDefault: false, note: '走很多路' },
  { id: 'pack_115', tripId: 'trip_001', name: '凉鞋', category: 'clothes', isPacked: false, quantity: 1, isDefault: false, note: '日常穿' },
  { id: 'pack_116', tripId: 'trip_001', name: '泳衣', category: 'clothes', isPacked: false, quantity: 1, isDefault: false, note: '如果去温泉' },
  { id: 'pack_117', tripId: 'trip_001', name: '帽子', category: 'clothes', isPacked: false, quantity: 1, isDefault: false, note: '遮阳' },

  // 电子设备类
  { id: 'pack_118', tripId: 'trip_001', name: '手机充电器', category: 'electronics', isPacked: true, quantity: 1, isDefault: false, note: '' },
  { id: 'pack_119', tripId: 'trip_001', name: '充电宝', category: 'electronics', isPacked: true, quantity: 1, isDefault: false, note: '20000mAh，随身携带' },
  { id: 'pack_120', tripId: 'trip_001', name: '日本转换插头', category: 'electronics', isPacked: true, quantity: 1, isDefault: false, note: '两脚扁插(日本是A型)' },
  { id: 'pack_121', tripId: 'trip_001', name: '耳机', category: 'electronics', isPacked: true, quantity: 1, isDefault: false, note: 'Sony降噪耳机' },
  { id: 'pack_122', tripId: 'trip_001', name: '数据线', category: 'electronics', isPacked: true, quantity: 2, isDefault: false, note: 'Lightning+Type-C' },
  { id: 'pack_123', tripId: 'trip_001', name: '相机', category: 'electronics', isPacked: true, quantity: 1, isDefault: false, note: 'Sony A7III' },
  { id: 'pack_124', tripId: 'trip_001', name: '相机电池', category: 'electronics', isPacked: true, quantity: 3, isDefault: false, note: '备用电池2块' },
  { id: 'pack_125', tripId: 'trip_001', name: '相机充电器', category: 'electronics', isPacked: true, quantity: 1, isDefault: false, note: '' },
  { id: 'pack_126', tripId: 'trip_001', name: 'SD卡', category: 'electronics', isPacked: true, quantity: 2, isDefault: false, note: '64G x 2' },
  { id: 'pack_127', tripId: 'trip_001', name: '自拍杆', category: 'electronics', isPacked: false, quantity: 1, isDefault: false, note: '' },

  // 洗漱用品类
  { id: 'pack_128', tripId: 'trip_001', name: '牙刷牙膏套装', category: 'toiletries', isPacked: false, quantity: 1, isDefault: false, note: '日本酒店有，但带自己的更卫生' },
  { id: 'pack_129', tripId: 'trip_001', name: '洗面奶', category: 'toiletries', isPacked: false, quantity: 1, isDefault: false, note: '小分装瓶' },
  { id: 'pack_130', tripId: 'trip_001', name: '防晒霜', category: 'toiletries', isPacked: false, quantity: 1, isDefault: false, note: 'SPF50，日本紫外线强' },
  { id: 'pack_131', tripId: 'trip_001', name: '面霜', category: 'toiletries', isPacked: false, quantity: 1, isDefault: false, note: '' },
  { id: 'pack_132', tripId: 'trip_001', name: '湿纸巾', category: 'toiletries', isPacked: false, quantity: 1, isDefault: false, note: '日本没有公共垃圾桶' },
  { id: 'pack_133', tripId: 'trip_001', name: '免洗洗手液', category: 'toiletries', isPacked: false, quantity: 1, isDefault: false, note: '' },
  { id: 'pack_134', tripId: 'trip_001', name: '止汗喷雾', category: 'toiletries', isPacked: false, quantity: 1, isDefault: false, note: '7月东京非常热' },

  // 药品类
  { id: 'pack_135', tripId: 'trip_001', name: '感冒药', category: 'medicine', isPacked: false, quantity: 1, isDefault: false, note: '' },
  { id: 'pack_136', tripId: 'trip_001', name: '肠胃药', category: 'medicine', isPacked: false, quantity: 1, isDefault: false, note: '防止拉肚子' },
  { id: 'pack_137', tripId: 'trip_001', name: '创可贴', category: 'medicine', isPacked: false, quantity: 5, isDefault: false, note: '' },
  { id: 'pack_138', tripId: 'trip_001', name: '止痛药', category: 'medicine', isPacked: false, quantity: 1, isDefault: false, note: '' },
  { id: 'pack_139', tripId: 'trip_001', name: '防蚊贴/驱蚊液', category: 'medicine', isPacked: false, quantity: 1, isDefault: false, note: '夏天蚊子多' },
  { id: 'pack_140', tripId: 'trip_001', name: '中暑药', category: 'medicine', isPacked: false, quantity: 1, isDefault: false, note: '7月东京35度+' },

  // 其他
  { id: 'pack_141', tripId: 'trip_001', name: '折叠雨伞', category: 'other', isPacked: false, quantity: 1, isDefault: false, note: '7月有阵雨' },
  { id: 'pack_142', tripId: 'trip_001', name: '收纳袋', category: 'other', isPacked: true, quantity: 6, isDefault: false, note: '衣物分类' },
  { id: 'pack_143', tripId: 'trip_001', name: '眼罩', category: 'other', isPacked: false, quantity: 1, isDefault: false, note: '飞机上用' },
  { id: 'pack_144', tripId: 'trip_001', name: 'U型枕', category: 'other', isPacked: false, quantity: 1, isDefault: false, note: '飞机上用' },
  { id: 'pack_145', tripId: 'trip_001', name: '小手帕', category: 'other', isPacked: false, quantity: 2, isDefault: false, note: '日本擦手用，很多洗手间没纸' },
  { id: 'pack_146', tripId: 'trip_001', name: '折叠环保袋', category: 'other', isPacked: false, quantity: 2, isDefault: false, note: '日本塑料袋收费' },
  { id: 'pack_147', tripId: 'trip_001', name: '免税购物清单', category: 'other', isPacked: false, quantity: 1, isDefault: false, note: '提前列好要买的东西' },
  { id: 'pack_148', tripId: 'trip_001', name: '日语常用语手册', category: 'other', isPacked: false, quantity: 1, isDefault: false, note: '下载了离线翻译App' },
  { id: 'pack_149', tripId: 'trip_001', name: '西瓜卡(Suica)', category: 'other', isPacked: true, quantity: 1, isDefault: false, note: '已提前购买实体卡' },
  { id: 'pack_150', tripId: 'trip_001', name: '小零钱包', category: 'other', isPacked: false, quantity: 1, isDefault: false, note: '日本硬币很多，需要专门装' }
]

module.exports = {
  MOCK_PACKING_DEFAULT,
  MOCK_PACKING_CUSTOM
}

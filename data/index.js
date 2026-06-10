/**
 * 模拟数据统一导出入口
 * @module data
 */

const { MOCK_TRIPS } = require('./mock-trips')
const { MOCK_ITINERARY } = require('./mock-itinerary')
const { MOCK_PLACES } = require('./mock-places')
const { MOCK_FOOD } = require('./mock-food')
const { MOCK_BUDGET_RECORDS } = require('./mock-budget')
const { MOCK_PACKING_DEFAULT, MOCK_PACKING_CUSTOM } = require('./mock-packing')
const { MOCK_DIARIES } = require('./mock-diary')
const { MOCK_AI_RESPONSES } = require('./mock-ai')

module.exports = {
  MOCK_TRIPS,
  MOCK_ITINERARY,
  MOCK_PLACES,
  MOCK_FOOD,
  MOCK_BUDGET_RECORDS,
  MOCK_PACKING_DEFAULT,
  MOCK_PACKING_CUSTOM,
  MOCK_DIARIES,
  MOCK_AI_RESPONSES
}

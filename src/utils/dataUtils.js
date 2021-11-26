/**
 * 集合資料內需要的屬性
 * @date 2021-11-26
 * @param {array} tagItems 需要的屬性名稱
 * @param {array} data 所有資料
 * @returns {array} 需求的屬性集合
 */
export const dataFilter = (tagItems, data) => {
  let tagAry = [...tagItems]
  let filterTagAry = []

  data.forEach((room) => {
    tagAry.forEach((tag) => {
      if (filterTagAry.includes(room[tag])) return false
      filterTagAry = [...filterTagAry, room[tag]]
    })
  })
  filterTagAry = filterTagAry.filter((item) => item)
  return filterTagAry.sort()
}

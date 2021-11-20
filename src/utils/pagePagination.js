export function pageData(allData, activePage, pageGroup = 8) {
  let endIndex = pageGroup * activePage - 1
  let startIndex = endIndex - pageGroup + 1

  return allData.slice(startIndex, endIndex + 1)
}

export function pageRun(activePage = 1, totalPage) {
  let initPageAry = [1, 2, 3, 4, 5]
  if (activePage < 4) return initPageAry

  if (activePage === totalPage || activePage > totalPage - 3) {
    initPageAry = []
    for (let i = totalPage; i > totalPage - 5; i--) {
      initPageAry.push(i)
    }
    return initPageAry.sort()
  }

  initPageAry = [
    activePage - 2,
    activePage - 1,
    activePage,
    activePage + 1,
    activePage + 2,
  ]
  return initPageAry
}

export default {
  // 获取狱务公开信息
  getNewsList(state, params) {
    state.newsList.contents = params.news
    state.newsList.total = params.newsSize
  },
  getNewsDetail(state, res) {
    state.news = res.data
  },
  // 根据id获取新闻信息
  getNewsById: (state, id) => state.news.forEach(nw => nw.id === Number(id) && (state.newsForEdit = nw)),
  // 每页显示条数，当前页码，搜索条件发生变化时执行的方法
  // searchPrisonAffairsDisclosure(state, pagination) {
  //   let prisonAffairsDisclosure = []
  //   // 当有搜索条件时执行的操作
  //   if (pagination.value !== '') {
  //     for (let pado of state[`${pagination.c}Origin`]) {
  //       for (let key in pado) {
  //         if (pado[key] && new RegExp(pagination.value).test(pado[key].toString())) {
  //           prisonAffairsDisclosure.push(pado)
  //           break
  //         }
  //       }
  //     }
  //     prisonAffairsDisclosure.length && (state[`${pagination.c}Total`] = prisonAffairsDisclosure.length)
  //     prisonAffairsDisclosure = prisonAffairsDisclosure.slice(pagination.page, pagination.page + pagination.limit)
  //   } else {// 当不带搜索条件时执行的操作
  //     state[`${pagination.c}Total`] = state[`${pagination.c}Origin`].length
  //     prisonAffairsDisclosure = state[`${pagination.c}Origin`].slice(pagination.page, pagination.page + pagination.limit)
  //   }
  //   state[pagination.c] = prisonAffairsDisclosure
  // },
  // 编辑狱务公开信息
  editNews: (state, editNewsResult) => {
    state.editNewsResult = editNewsResult
  },
  // 添加狱务公开信息
  addNews: (state, addNewsResult) => {
    state.addNewsResult = addNewsResult
  },
  // 根据id删除狱务公开信息
  deleteNewsById(state, deleteNewsResult) {
    let id = deleteNewsResult.id
    // let c = deleteNewsResult.c
    delete deleteNewsResult.id
    // delete deleteNewsResult.c
    state.news.forEach((item, index, pad) => {
      if (item.id === Number(id)) {
        pad.splice(index, 1)
        // state[`${c}Origin`].forEach((item, index, pado) => {
        //   item.id === Number(id) && pado.splice(index, 1)
        // })
        // state[`${c}Total`]--
        state.newsTotal--
      }
    })
    state.deleteNewsResult = deleteNewsResult
  }
}

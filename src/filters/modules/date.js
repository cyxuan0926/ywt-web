let fillPre = (val) => {
  return `00${ val }`.slice(-2)
}
export default {
  // 日期过滤器
  Date(time) {
    if (!time) return ''
    else if (time < 0) return ''
    let date = new Date(time),
      year = date.getFullYear(),
      month = fillPre(date.getMonth() + 1),
      day = fillPre(date.getDate()),
      hour = fillPre(date.getHours()),
      minute = fillPre(date.getMinutes()),
      second = fillPre(date.getSeconds())
    return `${ year }-${ month }-${ day } ${ hour }:${ minute }:${ second }`
  },
  dateFormate(date, fmt = 'yyyy-MM-dd') {
    if (!date) return
    if (date instanceof Date === false) date = new Date(date)
    var o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      'S': date.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (`${ date.getFullYear() }`).substr(4 - RegExp.$1.length))
    for (let k in o) {
      if (new RegExp(`(${ k })`).test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${ o[k] }`).substr((`${ o[k] }`).length)))
    }
    return fmt
  }
}

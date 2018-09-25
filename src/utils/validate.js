import dateFormate from '@/filters/modules/date'
import * as helper from './helper'

const isEmpty = (val) => {
  if ([undefined, null, ''].indexOf(val) > -1) {
    return true
  }
  else {
    return false
  }
}

export default {
  required: (rule, value, callback) => {
    let pattern = /^\s*(.*?)\s*$/
    if (isEmpty(value)) {
      callback(new Error())
    }
    else if (typeof value === 'string' && isEmpty(value.replace(pattern, '$1'))) {
      callback(new Error(rule.message))
    }
    else {
      callback()
    }
  },
  phone: (rule, value, callback) => {
    var pattern = /^1\d{10}$/
    if (value && (pattern.test(value))) {
      callback()
    }
    else {
      callback(new Error('手机号格式错误'))
    }
  },
  isFee: (rule, value, callback) => {
    let num = Number(value)
    if (isNaN(num)) {
      callback(new Error('请输入数字'))
    }
    else if (parseInt(num * 100) !== num * 100) {
      callback(new Error('最多保留两位小数'))
    }
    else {
      callback()
    }
  },
  isNumber: (rule, value, callback) => {
    if (isEmpty(value)) {
      callback()
    }
    else if (!Number.isInteger(Number(value))) {
      callback(new Error('请输入整数'))
    }
    else {
      callback()
    }
  },
  noChinese: (rule, value, callback) => {
    if (isEmpty(value)) {
      callback()
      return
    }
    let pattern = /[\u4e00-\u9fa5]+/g
    if (pattern.test(value)) {
      callback(new Error('请输入中文以外的字符'))
    }
    else {
      callback()
    }
  },
  numberRange: (rule, value, callback) => {
    let val = Number(value)
    if (!isEmpty(rule.min) && !isEmpty(rule.max) && (val < rule.min || val > rule.max)) {
      callback(new Error(`请输入${ rule.min }-${ rule.max }之间的数字`))
    }
    else if (!isEmpty(rule.min) && isEmpty(rule.max) && val < rule.min) {
      callback(new Error(`请输入大于${ rule.min }的数字`))
    }
    else if (isEmpty(rule.min) && !isEmpty(rule.max) && val > rule.max) {
      callback(new Error(`请输入小于${ rule.max }的数字`))
    }
    else {
      callback()
    }
  },
  lengthRange: (rule, value, callback) => {
    if (!isEmpty(rule.min) && !isEmpty(rule.max) && (helper.trimString(value).length < rule.min || helper.trimString(value).length > rule.max)) {
      callback(new Error(`请输入${ rule.min }到${ rule.max }个字符`))
    }
    else if (!isEmpty(rule.min) && isEmpty(rule.max) && helper.trimString(value).length < rule.min) {
      callback(new Error(`请输入${ rule.min }以上个字符`))
    }
    else if (isEmpty(rule.min) && !isEmpty(rule.max) && helper.trimString(value).length > rule.max) {
      callback(new Error(`请输入${ rule.max }以下个字符`))
    }
    else {
      callback()
    }
  },
  timeRange: (rule, value, callback) => { // 只比较时间先后, 设置时间列表时专用
    if (!value) {
      callback()
      return
    }
    let minTime = '', time = dateFormate.dateFormate(new Date(`1971-01-01 ${ value[0] }`), 'hh:mm')
    if (rule.prev) minTime = dateFormate.dateFormate(new Date(`1971-01-01 ${ rule.prev[1] }`), 'hh:mm')
    if (time < minTime) {
      rule.flag[rule.prop] = false
      callback(new Error(`开始时间最早为${ rule.prev[1] }`))
    }
    else if (value[0] === value[1]) {
      rule.flag[rule.prop] = false
      callback(new Error('间隔时间过短'))
    }
    else if (value[1].indexOf('23:59') > -1) {
      rule.flag[rule.prop] = false
      callback()
    }
    else {
      rule.flag[rule.prop] = true
      callback()
    }
  }
}

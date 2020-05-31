/**
 * 设置属性
 * @param {*} itemKey 
 * @param {*} val 
 */
export function setItem(itemKey, val) {
  window.localStorage.setItem(itemKey, JSON.stringify(val))
}

/**
 * 获取属性
 * @param {*} itemKey 
 */
export function getItem(itemKey) {
  const val = window.localStorage.getItem(itemKey)
  return JSON.parse(val)
}


// var shine_hfrao = {
//   // chunk: function (array, size = 1) {
//   //   var resultAry = []
//   //   var itemAry = []
//   //   var count = 0

//   //   for (var i = 0; i < array.length; i++) {
//   //     count++
//   //     if (count <= size) {
//   //       itemAry.push(array[i])
//   //     } else if (count > size) {
//   //       count = 0
//   //       resultAry.push(itemAry.slice())
//   //       itemAry = []
//   //       itemAry.push(array[i])
//   //     }
//   //   }
//   //   if (itemAry.length) {
//   //     resultAry.push(itemAry.slice())
//   //   }
//   //   return resultAry
//   // },

//   // 转换"a=asdf&b=aef&c=3&c=2&c=5&d=wfe"为对象

// }

var shine_hfrao = (function () {
  function parseQueryString(str) {
    var obj = {}
    var pairs = str.split('&')
    pairs.forEach(function (pair) {
      var [key, val] = pair.split('=')
      if (obj.hasOwnProperty(key)) {
        if (!Array.isArray(obj[key])) {
          obj[key] = [obj[key]]
        }
        obj[key].push(val)
      } else {
        obj[key] = val
      }
    })
    return obj
  }

  function compact(arr) {
    var newArr = []
    for (var i = 0; i < arr.length; i++) {
      if (arr[i]) {
        newArr.push(arr[i])
      }
    }
    return newArr
  }

  function fill(arr, val, start, end) {
    if (start === undefined) {
      start = 0
    }
    if (end === undefined) {
      end = arr.length
    }
    for (var i = start; i < end; i++) {
      arr[i] = val
    }
    return arr
  }

  function filter(array, predicate) {

    predicate = iteratee(predicate)

    var result = []
    for (var i = 0; i < array.length; i++) {
      if (predicate(array[i], i, array)) {
        result.push(array[i])
      }
    }
  }
  //
  function drop(arr, n) {
    if (n === undefined) {
      n = 1
    }
    if (n > arr.length) {
      n = arr.length
    }
    while (n) {
      arr.shift()
      n--
    }
    return arr
  }

  // 删除数组尾部的 n 个元素，返回删除后的原数组
  function dropRight(arr, n = 1) {
    if (n > arr.length) {
      n = arr.length
    }
    arr.splice(arr.length - n)
    return arr
  }

  // 创建一个切片数组，去除array中从起点开始到 predicate 返回假值结束部分。predicate 会传入3个参数： (value, index, array)。
  function dropWhile(arr, predicate) {

    if (Object.prototype.toString.call(predicate) === '[object Function]') {
      for (var i = 0; i < arr.length; i++) {
        if (!predicate(arr[i], i, arr)) {
          arr.splice(0, i)
          return arr
        }
      }
      return arr
    }
    if (Object.prototype.toString.call(predicate) === '[object Object]') {
      for (var i = 0; i < arr.length; i++) {
        var is = true
        for (key in arr[i]) {
          if (arr[i][key] !== predicate[key]) {
            is = false
          }
        }
        if (!is) {
          arr.splice(0, i)
          return arr
        }
      }
      return arr

    }
    if (Object.prototype.toString.call(predicate) === '[object Array]') {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i][predicate[0]] !== predicate[1]) {
          arr.splice(0, i)
          return arr
        }
      }
      return arr
    }
    if (Object.prototype.toString.call(predicate) === '[object String]') {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i][predicate] !== true) {
          arr.splice(0, i)
          return arr
        }
      }
      return arr
    }


  }

  // 创建一个切片数组，去除array中从 predicate 返回假值开始到尾部的部分。predicate 会传入3个参数： (value, index, array)。
  function dropRightWhile(arr, predicate) {

    if (Object.prototype.toString.call(predicate) === '[object Function]') {
      for (var i = arr.length - 1; i >= 0; i--) {
        if (!predicate(arr[i], i, arr)) {
          arr.splice(i + 1)
          return arr
        }
      }
      return arr
    }
    if (Object.prototype.toString.call(predicate) === '[object Object]') {
      for (var i = arr.length - 1; i >= 0; i--) {
        var is = true
        for (key in arr[i]) {
          if (arr[i][key] !== predicate[key]) {
            is = false
          }
        }
        if (!is) {
          arr.splice(i + 1)
          return arr
        }
      }
      return arr
    }
    if (Object.prototype.toString.call(predicate) === '[object Array]') {
      for (var i = arr.length - 1; i >= 0; i--) {
        if (arr[i][predicate[0]] !== predicate[1]) {
          arr.splice(i + 1)
          return arr
        }
      }
      return arr
    }
    if (Object.prototype.toString.call(predicate) === '[object String]') {
      for (var i = arr.length - 1; i >= 0; i--) {
        if (arr[i][predicate] !== true) {
          arr.splice(i + 1)
          return arr
        }
      }
      return arr
    }
  }

  function findIndex(array, predicate, fromIndex = 0) {
    if (typeof predicate === 'function') {
      for (var i = fromIndex; i < array.length; i++) {
        if (predicate(array[i], i, array)) {
          return i
        }
      }
      return -1
    }
    if (Array.isArray(predicate)) {
      for (var i = fromIndex; i < array.length; i++) {
        if (array[i][predicate[0]] === predicate[1]) {
          return i
        }
      }

      return -1
    }
    if (typeof predicate === 'object') {
      for (var i = fromIndex; i < array.length; i++) {
        var is = true
        for (key in array[i]) {
          if (array[i][key] !== predicate[key]) {
            is = false
            break
          }
        }
        if (is) {
          return i
        }
      }
      return -1
    }
    if (typeof predicate === 'string') {
      for (var i = fromIndex; i < array.length; i++) {
        if (array[i][predicate] === true) {
          return i
        }
      }

      return -1
    }

  }

  function findLastIndex(array, predicate, fromIndex = array.length - 1) {
    if (typeof predicate === 'function') {
      for (var i = fromIndex; i >= 0; i--) {
        if (predicate(array[i], i, array)) {
          return i
        }
      }
      return -1
    }
    if (Array.isArray(predicate)) {
      for (var i = fromIndex; i >= 0; i--) {
        if (array[i][predicate[0]] === predicate[1]) {
          return i
        }
      }

      return -1
    }
    if (typeof predicate === 'object') {
      for (var i = fromIndex; i >= 0; i--) {
        var is = true
        for (key in array[i]) {
          if (array[i][key] !== predicate[key]) {
            is = false
            break
          }
        }
        if (is) {
          return i
        }
      }
      return -1
    }
    if (typeof predicate === 'string') {
      for (var i = fromIndex; i >= 0; i--) {
        if (array[i][predicate] === true) {
          return i
        }
      }

      return -1
    }
  }

  function flatten(array) {
    return array.reduce(function (result, item, index, array) {

      return result.concat(item)

    }, [])
  }

  function flattenDeep(array) {
    return array.reduce(function (result, item, index, array) {
      if (Array.isArray(item)) {
        return result.concat(flattenDeep(item))
      } else {
        return result.concat(item)
      }
    }, [])
  }

  function flattenDepth(array, depth = 1) {
    return array.reduce(function (result, item, index, array) {
      if (Array.isArray(item) && depth > 1) {
        depth--
        return result.concat(flattenDepth(item, depth))
      } else {
        return result.concat(item)
      }
    }, [])
  }


  function chunk(array, size) {
    var result = [];
    for (var i = 0; i < array.length; i += size) {
      var part = array.slice(i, i + size)
      result.push(part)
    }
    return result
  }
  function fromPairs(arr) {
    var result = {}
    for (var i = 0; i < arr.length; i++) {
      result[arr[i][0]] = arr[i][1]
    }
    return result
  }

  function head(arr) {
    return arr[0]
  }

  function indexOf(arr, val, formIndex = 0) {
    for (var i = formIndex; i < arr.length; i++) {
      if (arr[i] === val) {
        return i
      }
    }
    return -1
  }

  function lastIndexOf(arr, val, lastIndex = arr.length - 1) {
    for (var i = lastIndex; i >= 0; i--) {
      if (arr[i] === val) {
        return i
      }
    }
    return -1
  }

  function initial(arr) {
    delete arr[arr.length - 1]
    arr.length--
    return arr
  }

  function join(arr, separator = ',') {
    var str = ''
    for (var i = 0; i < arr.length; i++) {
      str += arr[i]
      if (i !== arr.length - 1) {
        str += separator
      }
    }
    return str
  }

  function last(arr) {
    if (arr.length) {
      return arr[arr.length - 1]
    }
  }

  function remove() { }

  function pull(arr) {
    for (var i = 1; i < arguments.length; i++) {
      var item = arguments[i]

      for (var j = 0; j < arr.length; j++) {
        if (arr[j] === item) {
          arr.splice(j, 1)
        }
      }
    }
    return arr
  }

  function pullAll(array, values) {
    // for (var i = 0; i < values.length; i++) {
    //   var value = values[i]
    //   for (var j = 0; j < array.length; j++) {
    //     var arrayVal = array[j]
    //     if (value === arrayVal) {
    //       array.splice(j, 1)
    //     }
    //   }
    // }
    // return array
    return pullAllBy(array, values, identity)
  }

  function pullAllBy(array, values, predicate) {
    var predicate = iteratee(predicate)
    for (var i = 0; i < array.length; i++) {
      var item = array[i]
      for (var j = 0; j < values.length; j++) {
        var value = values[j]
        if (predicate(item) === predicate(value)) {
          array.splice(i, 1)
          i--
          break
        }
      }
    }
    return array
  }

  function pullAllWith(array, values, comparator) {
    for (var i = 0; i < values.length; i++) {
      var value = values[i]
      for (var j = 0; j < array.length; j++) {
        var arrayVal = array[j]
        if (comparator(value, arrayVal)) {
          array.splice(j, 1)
        }
      }
    }
    return array
  }

  function reverse(array) {
    var i = 0;
    var j = array.length - 1
    var medium
    while (i < j) {
      medium = array[i]
      array[i] = array[j]
      array[j] = medium
      i++
      j--
    }
    return array
  }

  // 过滤arr中的值等于values中的值，返回一个过滤值后的新数组
  function difference(arr, ...values) {
    var result = []
    values = flatten(values)
    for (var i = 0; i < arr.length; i++) {
      var item = arr[i]
      var isHas = false
      for (var j = 0; j < values.length; j++) {
        if (item === values[j]) {
          isHas = true
          break
        }
      }
      if (!isHas) {
        result.push(item)
      }
    }
    return result
  }
  function differenceBy(array, ...values) {
    if (!Array.isArray(values[values.length - 1]) && typeof values[values.length - 1][0] !== 'number') {
      var predicate = values.pop()
      var predicate = iteratee(predicate)
    } else {
      var predicate = identity
    }
    var result = []
    var combineValues = []
    for (var k = 0; k < values.length; k++) {
      combineValues = combineValues.concat(values[k])
    }
    for (var i = 0; i < array.length; i++) {
      var item = array[i]
      var isDiff = true
      for (var j = 0; j < combineValues.length; j++) {
        var value = combineValues[j]
        if (predicate(item) === predicate(value)) {
          isDiff = false
          break
        }
      }
      if (isDiff) {
        result.push(item)
      }
    }
    return result
  }

  function differenceWith(array, values, comparator) {
    var result = []
    for (var i = 0; i < values.length; i++) {
      var value = values[i]
      for (var j = 0; j < array.length; j++) {
        var arrayVal = array[j]
        if (!comparator(value, arrayVal)) {
          result.push(arrayVal)
        }
      }
    }
    return result
  }

  function intersection(...arrays) {
    var result = []
    for (var i = 0; i < arrays[0].length; i++) {
      var item = arrays[0][i]
      var isHas = true
      for (var j = 1; j < arrays.length; j++) {
        if (arrays[j].indexOf(item) < 0) {
          isHas = false
        }
      }
      if (isHas) {
        result.push(item)
      }
    }
    return result
  }

  function intersectionBy(...arrays) {
    var predicate = arrays[arrays.length - 1]
    for (var i = 0; i < arrays[0].length; i++) {
      if (typeof predicate === 'function') {
        var result = []
        var initItem = arrays[0][i]
        var itemFirst = predicate(initItem)
        var isHas = true
        for (var j = 1; j < arrays.length - 1; j++) {
          for (var k = 0; k < arrays[j].length; k++) {
            var item = predicate(arrays[j][k])
            if (item !== itemFirst) {
              isHas = false
            } else {
              isHas = true
              break
            }
          }
        }
        if (isHas) {
          result.push(initItem)
        }
        return result
      }

      if (typeof predicate === 'string') {
        for (var i = 0; i < arrays[0].length; i++) {
          if (!arrays[0][i].hasOwnProperty(predicate)) {
            return []
          }
          var result = []
          var isHas = true
          var itemFirst = arrays[0][i][predicate]
          for (var j = 1; j < arrays.length - 1; j++) {
            for (var k = 0; k < arrays[j].length; k++) {
              if (itemFirst !== arrays[j][k][predicate]) {
                isHas = false
              } else {
                isHas = true
              }
            }
          }
          if (isHas) {
            var obj = {}
            obj[predicate] = itemFirst
            result.push(obj)
          }
          return result
        }
      }

    }
  }

  function intersectionWith(...arrays) {
    var predicate = arrays[arrays.length - 1]
    for (var i = 0; i < arrays[0].length; i++) {
      var result = []
      var firstValue = arrays[0][i]
      var isHas = true
      for (var j = 1; j < arrays.length - 1; j++) {
        for (var k = 0; k < arrays[j].length; k++) {
          if (predicate(firstValue, arrays[j][k])) {
            isHas = true
            break
          } else {
            isHas = false
          }
        }

      }
      if (isHas) {
        result.push(firstValue)
      }
      return result
    }
  }

  function nth(array, n) {
    if (n >= 0) {
      return array[n]
    } else {
      return array[array.length + n]
    }
  }

  function sortedIndex(array, value) {

  }
  function sum(array) {
    // var result = 0
    // for (var i = 0; i < array.length; i++) {
    //   result += array[i]
    // }
    // return result
    return sumBy(array, identity)
  }

  function sumBy(array, predicate) {
    var result = 0
    for (var i = 0; i < array.length; i++) {
      result += iteratee(predicate)(array[i])
    }
    return result
  }
  // 数组合并
  function union(...arrays) {
    // var result = new Set()
    // for (var array of arrays) {
    //   for (var item of array) {
    //     if (!result.has(item)) {
    //       result.add(item)
    //     }
    //   }
    // }
    // return [...result]
    return unionBy(...arrays, identity)
  }

  function unionBy(...arrays) {
    var result = []
    var set = new Set()
    var predicate = arrays.pop()
    predicate = iteratee(predicate)
    for (var array of arrays) {
      for (var item of array) {
        var t = predicate(item)
        if (!set.has(t)) {
          set.add(t)
          result.push(item)
        }
      }
    }
    return result
  }

  function unionWith(...arrays) {
    var comparator = arrays.pop()
    var result = []
    for (let array of arrays) {
      result = result.concat(array)
    }
    return uniqWith(result, comparator)
  }
  // 数组去重
  function uniq(array) {
    return Array.from(new Set(array));
  }

  function uniqBy(array, predicate) {
    predicate = iteratee(predicate)
    var set = new Set()
    var result = []
    for (var item of array) {
      var newItem = predicate(item)
      if (!set.has(newItem)) {
        set.add(newItem)
        result.push(item)
      }
    }
    return result
  }

  function uniqWith(array, comparator) {
    for (var i = 0; i < array.length - 1; i++) {
      for (var j = i + 1; j < array.length; j++) {
        if (comparator(array[i], array[j])) {
          array.splice(j, 1)
          i--
        }
      }

    }
    return array
  }


  // var zipped = _.zip(['fred', 'barney'], [30, 40], [true, false]);
  // => [['fred', 30, true], ['barney', 40, false]]
  // _.unzip(zipped);
  // => [['fred', 'barney'], [30, 40], [true, false]]
  function unzip(array) {
    return shine_hfrao.zip(...shine_hfrao.zip(...array));
  }

  // var zipped = _.zip([1, 2], [10, 20], [100, 200]);
  // => [[1, 10, 100], [2, 20, 200]]
  // _.unzipWith(zipped, _.add);
  // => [3, 30, 300]
  function unzipWith(arrays, iteratee) {
    var result = []
    for (var i = 0; i < arrays.length - 1; i++) {
      for (var j = 0; j < arrays[i].length; j++) {

        if (!result[j]) {
          result[j] = iteratee(arrays[i][j], arrays[i + 1][j])
        } else {
          result[j] += iteratee(result[j], arrays[i + 1][j])
        }

      }
    }
    return result
  }


  function clone(value) {
    if (value && typeof value === 'object') {
      var result = {}
      for (var key in value) {
        if (value.hasOwnProperty(key)) {
          result[key] = value[key]
        }
      }
      return result
    } else {
      return value
    }
  }

  function deepClone(value) {
    var map = new Map()	// 记录深层的对象中指向包含他的对象形成环的情况，要用map记录已克隆过的对象
    function realDeepClone(value) {
      if (value && typeof value === 'object') {
        if (map.has(value)) {
          return map.get(value)
        }
        var result = {}
        map.set(value, result)
        for (var key in value) {
          if (value.hasOwnProperty(key)) {
            result[key] = realDeepClone(value[key])
          }
        }
        return result
      } else {
        return value
      }
    }
    return realDeepClone(value)
  }

  function shuffle(array) { //随机打乱数组，数组被均匀随机打乱
    for (var i = array.length - 1; i > 0; i--) {
      var randomIdx = i * Math.random() | 0   // 向下取整
      swap(array, randomIdx, i - 1)
    }
    return array
  }

  function swap(array, preIndex, lastIndex) {
    var medium = array[preIndex]
    array[preIndex] = array[lastIndex]
    array[lastIndex] = medium
    return array
  }

  function tail(array) {
    array.shift()
    return array
  }

  function take(array, n = 1) {
    array.splice(n)
    return array
  }

  function takeRight(array, n = 1) {
    if (n >= array.length) {
      return array
    }
    return array.splice(array.length - n)
  }

  function takeWhile(array, predicate) {
    predicate = iteratee(predicate)
    for (var i = 0; i < array.length; i++) {
      if (!predicate(array[i], i, array)) {
        return array.splice(0, i)
      }
    }
  }

  function takeRightWhile(array, predicate) {
    predicate = iteratee(predicate)
    for (var i = array.length - 1; i >= 0; i--) {
      if (!predicate(array[i], i, array)) {
        return array.splice(i + 1)
      }
    }
  }

  function isEqual(value, other) {
    var mapCache = new Map()  // 记录对象或数组产生环的时候，防止栈溢出
    function realIsEqual(value, other) {
      if (value === other) {
        return true
      } else {
        if (Object.prototype.toString.call(value) === '[object Object]' && Object.prototype.toString.call(other) === '[object Object]') {
          if (mapCache.has(value)) {
            return mapCache.get(value)
          }
          mapCache.set(value, true)
          if (Object.keys(value).length !== Object.keys(other).length) {
            return false
          }
          for (key of Object.keys(value)) {
            if (!realIsEqual(value[key], other[key])) {
              return false
            }
          }
          return true
        }
        if (Object.prototype.toString.call(value) === '[object Array]' && Object.prototype.toString.call(other) === '[object Array]') {
          if (mapCache.has(value)) {
            return mapCache.get(value)
          }
          mapCache.set(value, true)
          if (value.length !== other.length) {
            return false
          }
          for (var i = 0; i < value.length; i++) {
            if (!realIsEqual(value[i], other[i])) {
              return false
            }
          }
          return true
        }
        return false
      }
    }
    return realIsEqual(value, other)
  }

  function isEqualWith(value, other, customizer) {

  }
  // 实现
  // _.zip(['fred', 'barney'], [30, 40], [true, false]);
  // => [['fred', 30, true], ['barney', 40, false]]
  function zip(...arrays) {
    var result = []
    for (var i = 0; i < arrays.length; i++) {

      for (var j = 0; j < arrays[i].length; j++) {
        if (!result[j]) {
          result[j] = []
        }
        result[j][i] = arrays[i][j]
      }
    }
    return result
  }

  function zipObject(props = [], values = []) {
    var result = {}
    for (var i = 0; i < props.length; i++) {
      result[props[i]] = values[i]
    }
    return result
  }

  function zipObjectDeep(props = [], values = []) {

  }




  // 一些需要被多个函数使用的函数

  // 判断 target 是否是 obj 的子集
  function isMatch(obj, source) {
    for (var key in source) {
      if (source.hasOwnProperty(key)) {
        if (obj.hasOwnProperty(key)) {
          if (!isEqual(obj[key], source[key])) {
            return false
          }
        } else {
          return false
        }
      }
    }
    return true
  }
  function property(propName) {
    return function (obj) {
      return obj[propName]
    }
  }
  function matches(source) {
    return function (obj) {
      return isMatch(obj, source)
    }
  }
  function matchesProperty(pair) {
    var [key, val] = pair
    return function (obj) {
      return obj[key] == val
    }
  }
  function iteratee(predicate) {
    if (typeof predicate === 'function') {
      return predicate
    }
    if (typeof predicate === 'string') {
      return property(predicate)

    }
    if (Array.isArray(predicate)) {
      return matchesProperty(predicate)
    }
    if (typeof predicate === 'object') {
      return matches(predicate)
    }
  }
  function identity(val) {
    return val
  }
  return {


    takeWhile,
    takeRightWhile,
    takeRight,
    take,
    tail,
    shuffle,
    clone,
    deepClone,
    isEqual,
    isEqualWith,
    identity,
    uniqBy,
    uniq,
    uniqWith,
    union,
    unionBy,
    unionWith,
    sumBy,
    sum,
    parseQueryString,
    compact,
    fill,
    filter,
    drop,
    dropRight,
    dropWhile,
    dropRightWhile,
    findIndex,
    findLastIndex,
    flatten,
    flattenDeep,
    flattenDepth,
    chunk,
    fromPairs,
    head,
    indexOf,
    lastIndexOf,
    initial,
    join,
    last,
    remove,
    pull,
    pullAll,
    pullAllBy,
    pullAllWith,
    reverse,
    difference,
    differenceBy,
    differenceWith,
    intersection,
    intersectionBy,
    intersectionWith,
    nth,
    sortedIndex,
    matches,
    isMatch,
    matchesProperty,
    property,
    unzip,
    unzipWith,
    iteratee,
    zip,
    zipObject,
    zipObjectDeep
  }
})()

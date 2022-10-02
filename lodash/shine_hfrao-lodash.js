
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
    // var copyArray = array.slice()
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
  function differenceBy(array, values, iteratee) {
    var result = []
    for (var i = 0; i < array.length; i++) {
      var notAt = true
      if (iteratee === undefined) {
        var arrayVal = iteratee(initArrayVal)
      }
      if (Array.isArray(iteratee)) {

      }
      if (typeof iteratee === 'function') {
        var initArrayVal = array[i]
        var arrayVal = iteratee(initArrayVal)
      }
      if (typeof iteratee === 'string') {
        var objVal = array[i][iteratee]
      }

      for (var j = 0; j < values.length; j++) {
        if (iteratee === undefined) {
          var arrayVal = iteratee(initArrayVal)
          if (value === arrayVal) {
            notAt = false
            break
          }
        }
        if (typeof iteratee === 'function') {
          var value = iteratee(values[j])
          if (value === arrayVal) {
            notAt = false
            break
          }

        }
        if (typeof iteratee === 'string') {
          var value = values[j][iteratee]
          if (value === objVal) {
            notAt = false
            break
          }
        }


      }
      if (notAt) {
        if (iteratee === undefined) {
          result.push(arrayVal)
        }
        if (typeof iteratee === 'function') {
          result.push(initArrayVal)
        }
        if (typeof iteratee === 'string') {
          result.push(array[i])
        }

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

  function sortedIndex() {

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

  function uniqWith(array) {
  }



  // 一些需要被多个函数使用的函数

  // 判断 target 是否是 obj 的子集
  function isMatch(obj, target) {
    for (var key in target) {
      if (key in obj) {
        if (obj[key] !== target[key]) {
          return false
        }
      } else {
        return false
      }
    }
    return true
  }
  function property(propName) {
    return function (obj) {
      return obj[propName]
    }
  }
  function matches(target) {
    return function (obj) {
      return isMatch(obj, target)
    }
  }
  function matchesProperty(pair) {
    var [key, val] = pair
    return function (obj) {
      return obj[key] = val
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
    uniqBy,
    uniq,
    identity,
    union,
    unionBy,
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
    iteratee
  }
})()

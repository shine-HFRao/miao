var shine_hfrao = {
  // chunk: function (array, size = 1) {
  //   var resultAry = []
  //   var itemAry = []
  //   var count = 0

  //   for (var i = 0; i < array.length; i++) {
  //     count++
  //     if (count <= size) {
  //       itemAry.push(array[i])
  //     } else if (count > size) {
  //       count = 0
  //       resultAry.push(itemAry.slice())
  //       itemAry = []
  //       itemAry.push(array[i])
  //     }
  //   }

  //   if (itemAry.length) {
  //     resultAry.push(itemAry.slice())
  //   }

  //   return resultAry
  // },

  // 转换"a=asdf&b=aef&c=3&c=2&c=5&d=wfe"为对象
  parseQueryString: function (str) {
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
  },

  compact: function (arr) {
    var newArr = []
    for (var i = 0; i < arr.length; i++) {
      if (arr[i]) {
        newArr.push(arr[i])
      }
    }
    return newArr
  },

  fill: function (arr, val, start, end) {
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
  },

  //
  drop: function (arr, n) {
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
  },

  // 删除数组尾部的 n 个元素，返回删除后的原数组
  dropRight: function (arr, n) {
    arr.splice(arr.length - n)
    return arr
  },


  dropRightWhile: function (arr, predicate) {
    var result = []
    for (var i = 0; i < arr.length; i++) {
      if (Object.prototype.toString.call(predicate) === '[object Function]') {
        if (!predicate(arr[i], i, arr)) {
          result.push(arr[i])
        }
      }
      if (Object.prototype.toString.call(predicate) === '[object Object]') {
        var is = true
        for (key in arr[i]) {
          if (arr[i][key] !== predicate[key]) {
            is = false
          }
        }
        if (!is) {
          result.push(arr[i])
        }
      }
      if (Object.prototype.toString.call(predicate) === '[object Array]') {
        if (!(arr[i][predicate[0]] === predicate[1])) {
          result.push(arr[i])
        }
      }
      if (Object.prototype.toString.call(predicate) === '[object String]') {
        if (arr[i].hasOwnProperty(predicate)) {
          result.push(arr[i])
        }
      }
    }

    return result
  },

  // findIndex: function (array, predicate) {
  //   for (var i = 0; i < array.length; i++) {
  //     if (predicate(array[i], i, array)) {
  //       return i
  //     }
  //   }
  // }

  // findLastIndex

  flatten: function (array) {
    return array.reduce(function (result, item, index, array) {

      return result.concat(item)

    }, [])
  },

  flattenDeep: function flattenDeep(array) {
    return array.reduce(function (result, item, index, array) {
      if (Array.isArray(item)) {
        return result.concat(flattenDeep(item))
      } else {
        return result.concat(item)
      }
    }, [])
  },

  flattenDepth: function flattenDepth(array, depth = 1) {
    return array.reduce(function (result, item, index, array) {
      if (Array.isArray(item) && depth > 1) {
        depth--
        return result.concat(flattenDepth(item, depth))
      } else {
        return result.concat(item)
      }
    }, [])
  },


  chunk: function (arr, size) {
    var result = [];
    var startIndex = 0;
    if (size >= arr.length) {
      return arr.slice()
    }
    while (startIndex < arr.length) {
      result.push(arr.slice(startIndex, startIndex + size))
      startIndex += size
    }
    return result
  },

  fromPairs: function (arr) {
    var result = {}
    for (var i = 0; i < arr.length; i++) {
      result[arr[i][0]] = arr[i][1]
    }
    return result
  },

  head: function (arr) {
    return arr[0]
  },

  indexOf: function (arr, val, formIndex = 0) {
    for (var i = formIndex; i < arr.length; i++) {
      if (arr[i] === val) {
        return i
      }
    }
    return -1
  },

  lastIndexOf: function (arr, val, lastIndex = arr.length - 1) {
    for (var i = lastIndex; i >= 0; i--) {
      if (arr[i] === val) {
        return i
      }
    }
    return -1
  },

  initial: function (arr) {
    delete arr[arr.length - 1]
    arr.length--
    return arr
  },

  join: function (arr, separator = ',') {
    var str = ''
    for (var i = 0; i < arr.length; i++) {
      str += arr[i]
      if (i !== arr.length - 1) {
        str += separator
      }
    }
    return str
  },

  last: function (arr) {
    if (arr.length) {
      return arr[arr.length - 1]
    }
  },

  remove: function () {

  },

  pull: function (arr) {
    for (var i = 1; i < arguments.length; i++) {
      var item = arguments[i]

      for (var j = 0; j < arr.length; j++) {
        if (arr[j] === item) {
          arr.splice(j, 1)
        }
      }
    }
    return arr
  },

  // 过滤arr中的值等于values中的值，返回一个过滤值后的新数组
  difference: function (arr, ...values) {
    var result = []
    values = this.flatten(values)
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
  },

  // differenceBy: function (arr, ...values, iteratee) {

  // },

  // differenceWith: function (arr, ...values, iteratee) {

  // },


}

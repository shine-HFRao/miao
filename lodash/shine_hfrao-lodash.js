var shine_hfrao = {
  chunk: function (array, size = 1) {
    var resultAry = []
    var itemAry = []
    var count = 0

    for (var i = 0; i < array.length; i++) {
      count++
      if (count <= size) {
        itemAry.push(array[i])
      } else if (count > size) {
        count = 0
        resultAry.push(itemAry.slice())
        itemAry = []
        itemAry.push(array[i])
      }
    }

    if (itemAry.length) {
      resultAry.push(itemAry.slice())
    }

    return resultAry
  },

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
    for (var i = 0; i < arr.length; i++) {
      if (start === i && i < end) {
        arr[i] = val
      }
    }
    return arr
  },

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

  // findIndex: function (array, predicate) {
  //   for (var i = 0; i < array.length; i++) {
  //     if (predicate(array[i], i, array)) {
  //       return i
  //     }
  //   }
  // }

  // findLastIndex

  flatter: function (array) {
    return array.reduce(function (result, item, index, array) {
      if (Array.isArray(item)) {
        return result.concat(flatter(item))
      } else {
        return result.concat(item)
      }
    }, [])
  },

  flatterDeep: function (array) {
    return array.reduce(function (result, item, index, array) {
      if (Array.isArray(item)) {
        return result.concat(flatterDeep(item))
      } else {
        return result.concat(item)
      }
    }, [])
  },

  flatterDepth: function flatterDepth(array, depth = 1) {
    return array.reduce(function (result, item, index, array) {
      if (Array.isArray(item) && depth > 1) {
        depth--
        return result.concat(flatterDepth(item, depth))
      } else {
        return result.concat(item)
      }
    }, [])
  }
}

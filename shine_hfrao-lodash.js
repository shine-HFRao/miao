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
  }
}

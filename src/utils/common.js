class Common{
  constructor() {

  }
  findLastChild(val) {
		var lastChild 
		if(val.children&&val.children.length>0) {
		  return this.findLastChild(val.children[0])
		}else {
		  lastChild = val
		  return lastChild
		}
  }
  getTreeDeepArr(key, treeData, id) {
    let arr = []; // 在递归时操作的数组
    let returnArr = []; // 存放结果的数组
    let depth = 0; // 定义全局层级
    // 定义递归函数
    function childrenEach(childrenData, depthN) {
      for (var j = 0; j < childrenData.length; j++) {
        depth = depthN; // 将执行的层级赋值 到 全局层级
        arr[depthN] = (childrenData[j][id]);
        if (childrenData[j][id] == key) {
          // returnArr = arr; // 原写法不行, 因 此赋值存在指针关系
          returnArr = arr.slice(0, depthN+1); //将目前匹配的数组，截断并保存到结果数组，
          break
        } else {
          if (childrenData[j].children) {
            depth ++;
            childrenEach(childrenData[j].children, depth);
          }
        }
      }
      return returnArr;
    }
    return childrenEach(treeData, depth)
	}
}
export default new Common()
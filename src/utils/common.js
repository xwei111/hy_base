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
}
export default new Common()
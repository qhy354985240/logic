let arr = [
  { id: 1, name: '部门1', pid: 0 },
  { id: 2, name: '部门2', pid: 1 },
  { id: 3, name: '部门3', pid: 1 },
  { id: 4, name: '部门4', pid: 3 },
  { id: 5, name: '部门5', pid: 4 },
];

// 递归版，性能较差 复杂度O(2的n次方)
function arrayToTree(arr, id) {
  let tree = [];
  arr.forEach(item => {
    if (item.pid === id) {
      item.children = [];
      item.children = item.children.concat(arrayToTree(arr, item.id));
      tree.push(item);
    }
  });
  return tree;
}

// console.log(JSON.stringify(arrayToTree(arr, 0)));

// 使用map

// 第二种使用Map，没有递归，复杂度O(2n)
// 主要思想依赖的是对象是引用类型这个条件
function arrayToTreeMap(arr, id) {
  const map = new Map();
  const result = [];
  arr.forEach(item => {
    map.set(item.id, { ...item, children: [] });
  });

  const value = map.get(id);
  if (value) {
    result.push(value);
  }

  arr.forEach(item => {
    const sonValue = map.get(item.pid);
    if (sonValue) {
      sonValue.children.push(map.get(item.id)); // 重点，每次赋值都是引用类型的值给引用
    }
  });
  return result;
}

// 第三种还是使用Map，同时只遍历一次
function arrayToTreeBest(arr, id) {
  const map = new Map();
  const result = [];

  arr.forEach(item => {
    const parent = map.get(item.pid);
    map.set(item.id, { ...item, children: [] });

    const current = map.get(item.id);
    if (item.id === id) {
      result.push(current);
    }
    if (parent) {
      parent.children.push(current);
    }
  });
  return result;
}

const BinarySearchTree = require("./binarySearch");

const dummyLibrary = [
  { 0: "Computer Science" },
  { 1: "Philosphy" },
  { 2: "Religion" },
  { 3: "Social Sciences" },
  { 4: "Language" },
  { 5: "Science" },
  { 6: "Technology" },
  { 7: "Arts" },
  { 8: "Literature" },
  { 9: "History" }
];

function findLocation(title, dewey) {
  dewey = dewey.toString();
  let sectionNum = dewey.charAt(0);
  for (let i = 0; i < dummyLibrary.length; i++) {
    let index = Object.keys(dummyLibrary[i]).join();
    if (sectionNum.toString() === index) {
      return `${title} is in the ${dummyLibrary[i][i]} section`;
    }
  }
  return `we don't have the book ${title}`;
}

// console.log(findLocation("hellllooo", 203));

// 14 15 19 25 27 35 79 89 90 91 in order
// 35 25 15 14 19 27 89 79 91 90 pre order
// 14 19 15 27 25 79 91 90 89 35 post order

//                  35
//                /    \
//              25      89
//            /   \    /   \
//           15   27  79   90
//          /  \              \
//         14  19              91

// 5 7 6 9 11 10 8 post order
// 8 6 5 7 10 9 11 pre order

//                  8
//               /    \
//             6       10
//           /   \    /   \
//         5      7  9     11

function drillSearchTree() {
  let BST = new BinarySearchTree();

  BST.insert(25, 25);
  BST.insert(15, 15);
  BST.insert(50, 50);
  BST.insert(10, 10);
  BST.insert(24, 24);
  BST.insert(35, 35);
  BST.insert(70, 70);
  BST.insert(4, 4);
  BST.insert(12, 12);
  BST.insert(18, 18);
  BST.insert(31, 31);
  BST.insert(44, 44);
  BST.insert(66, 66);
  BST.insert(90, 90);
  BST.insert(22, 22);

  const sortNumbers = (a, b) => {
    return a - b;
  };

  const inOrderArr = [];

  const inOrder = bst => {
    if (bst.left !== null) {
      inOrderArr.push(bst.left.key);
      inOrder(bst.left);
    }
    if (bst.right !== null) {
      inOrderArr.push(bst.right.key);
      inOrder(bst.right);
    }
  };
  inOrder(BST);
  inOrderArr.push(BST.key);

  //   console.log(inOrderArr.sort(sortNumbers));

  let preOrderLeftArr = [];
  let preOrderRightArr = [];

  const preOrder = bst => {
    function leftPreOrder(bst) {
      if (bst.left !== null) {
        preOrderLeftArr.push(bst.key);
        bst = bst.left;
        leftPreOrder(bst);
      } else {
        preOrderLeftArr.push(bst.key);
      }
      if (bst.right !== null) {
        preOrderLeftArr.push(bst.key);
        bst = bst.right;
        leftPreOrder(bst);
      } else {
        preOrderLeftArr.push(bst.key);
      }
      preOrderLeftArr.push(bst.key);

      for (let count = 0; count < preOrderLeftArr.length; count++) {
        for (let i = 0; i < preOrderLeftArr.length; i++) {
          if (count !== i) {
            if (preOrderLeftArr[count] === preOrderLeftArr[i]) {
              preOrderLeftArr.splice(i, 1);
            }
          }
        }
      }
    }
    function rightPreOrder(bst) {
      if (bst.left !== null) {
        preOrderRightArr.push(bst.key);
        bst = bst.left;
        rightPreOrder(bst);
      } else {
        preOrderRightArr.push(bst.key);
      }
      if (bst.right !== null) {
        preOrderRightArr.push(bst.key);
        bst = bst.right;
        rightPreOrder(bst);
      } else {
        preOrderRightArr.push(bst.key);
      }
      preOrderRightArr.push(bst.key);

      for (let count = 0; count < preOrderRightArr.length; count++) {
        for (let i = 0; i < preOrderRightArr.length; i++) {
          if (count !== i) {
            if (preOrderRightArr[count] === preOrderRightArr[i]) {
              console.log(preOrderRightArr[i]);
              preOrderRightArr.splice(i, 1);
            }
          }
        }
      }
    }

    leftPreOrder(bst);
    // rightPreOrder(bst.right); close but needs some help, gets to (50, 35, 31, 44) missing (70, 66, 90)
  };
  preOrder(BST);

  console.log(preOrderRightArr);
}

console.log(drillSearchTree());

// pre order 25, 15, 10, 4, 12, 24, 18, 22, 50, 35, 31, 44, 70, 66, 90

// In-order 4, 10, 12, 15, 18, 22, 24, 25, 31, 35, 44, 50, 66, 70, 90

// Post-order 4, 12, 10, 22, 18, 24, 15, 31, 44, 35, 66, 90, 70, 50, 25

//                   25
//               /        \
//             15           50
//           /   \       /     \
//         10     24    35       70
//        /   \   /    /   \    /   \
//       4    12 18   31    44 66     90
//                \
//                 22

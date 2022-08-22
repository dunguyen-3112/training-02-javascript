const arr = [1,2,3,4,5]
let arr1 = ['s',true]
console.log(arr.at(0));
console.log(arr1.concat(arr));
let arr2 = [1]

console.log(arr.every(value=>value>0))
console.log(Array(12).fill(2));
console.log(arr.filter(value=>value>3))
console.log(arr.find(value=>value>1));
arr.forEach(item=>console.log(item))
let a = arr.map((item,index)=>{
    return index
})
console.log(a)

const sum = arr.reduce((previousValue,currentValue)=>previousValue+currentValue,0)
console.log(sum);
console.log(arr.reverse());
console.log(arr.slice(3))
console.log(arr.splice(2,1,'Feb'))





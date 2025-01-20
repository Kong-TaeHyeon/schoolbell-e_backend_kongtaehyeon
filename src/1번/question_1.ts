const sortArrDesc = (arr: Array<number>) => {
  return arr.sort((a, b) => b - a);
};

/**
 * @param sortedArr : 내림차순으로 정렬된 배열.
 *
 * @description
 * 분할된 두 정수의 차이가 적으면서 만들 수 있는 가장 큰 정수 두 개를 만들어야한다.
 * 따라서 첫 번째 자리수의 작은 값을 부여 받은 정수는 두 번째 자리수에서는 큰 정수를 부여받도록 번갈아가면서
 * 값을 배분한다.
 *
 */
const divideTwoFromArrForMax = (sortedArr: Array<number>) => {
  let stringA: string = "";
  let stringB: string = "";

  for (let i = 0; i < sortedArr.length; i++) {
    let numA: number = parseInt(stringA);
    let numB: number = parseInt(stringB);

    if (!stringA) stringA = sortedArr[i].toString();
    else if (!stringB) stringB = sortedArr[i].toString();
    else if (numA > numB) stringB += sortedArr[i];
    else stringA += sortedArr[i];
  }

  return [parseInt(stringA), parseInt(stringB)];
};

const solve = (input: Array<number>) => {
  return divideTwoFromArrForMax(sortArrDesc(input));
};

export const solve1 = () => {
  const input = [1, 2, 3, 4, 5];
  const input2 = [1, 2, 3, 4];
  const input3 = [1, 2, 3];

  console.log("문제1--------------------------\n");
  console.log("인풋1 : ", input);
  console.log("정답1 : ", solve(input));
  console.log("------------------------------");

  console.log("인풋2 : ", input2);
  console.log("정답2 : ", solve(input2));
  console.log("------------------------------");

  console.log("인풋3 : ", input3);
  console.log("정답3 : ", solve(input3));
};

const birthDate = document.querySelector("#birthdate");
const submitBtn = document.querySelector("#submit-btn");
const output = document.querySelector("#output");

output.style.display = "none";
function reverseStr(str) {
  let listOfChars = str.split("");
  let reverseListOfChars = listOfChars.reverse();
  let reversedStr = reverseListOfChars.join("");
  return reversedStr;
}

function isPalindrome(str) {
  let reverse = reverseStr(str);
  return str === reverse;
}

function convertDateToStr(date) {
  let dateStr = { day: "", month: "", year: "" };

  if (date.day < 10) {
    dateStr.day = "0" + date.day;
  } else {
    dateStr.day = date.day.toString();
  }
  if (date.month < 10) {
    dateStr.month = "0" + date.month;
  } else {
    dateStr.month = date.month.toString();
  }

  dateStr.year = date.year.toString();

  return dateStr;
}

function allDateFormats(date) {
  let dateStr = convertDateToStr(date);

  let ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  let yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  let mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  let ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  let yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;
  let mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);

  return [ddmmyyyy, yyyymmdd, mmddyyyy, ddmmyy, yymmdd, mmddyy];
}

function checkPalindrome(date) {
  let listOfPalindrome = allDateFormats(date);

  let flag = false;

  for (let i = 0; i < listOfPalindrome.length; i++) {
    if (isPalindrome(listOfPalindrome[i])) {
      flag = true;
      break;
    }
  }
  return flag;
}

function isLeapYear(year) {
  if (year % 400 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return false;
  }
  if (year % 4 === 0) {
    return true;
  }
  return false;
}

function getNextDate(date) {
  let day = date.day + 1;
  let month = date.month;
  let year = date.year;

  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    //check for february
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    } else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  } else {
    //checking if date extends max date in month
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }
  if (month > 12) {
    month = 1;
    year++;
  }

  return {
    day: day,
    month: month,
    year: year,
  };
}

function getNextPalindromeDate(date) {
  let ctr = 0;
  let nextDate = getNextDate(date);

  while (1) {
    ctr++;
    let checkIfPalindrome = checkPalindrome(nextDate);
    if (checkIfPalindrome) {
      break;
    }
    nextDate = getNextDate(nextDate);
  }
  return [ctr, nextDate];
}

const date = {
  day: 31,
  month: 12,
  year: 2020,
};

// it's not working
console.log(getNextPalindromeDate(date));
// console.log(getNextDate(date));

function clickHandler(date) {
  let bdayStr = birthDate.value;

  if (bdayStr !== "") {
    let listOfDate = bdayStr.split("-");
    let date = {
      day: Number(listOfDate[2]),
      month: Number(listOfDate[1]),
      year: Number(listOfDate[0]),
    };

    let isPalindrome = checkPalindrome(date);
    if (isPalindrome) {
      output.style.display = "block";
      output.innerText = `Yay!! your birthdate is a Palindrome 🍰🚀`;
    } else {
      let [ctr, nextDate] = getNextPalindromeDate(date);
      output.style.display = "block";
      output.innerText = `You missed by ${ctr} days. The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year} 😢🎈`;
    }
  }
}

submitBtn.addEventListener("click", clickHandler);

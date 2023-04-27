console.log("Welcome to diary app. This is app.js");
showStories();
let date = new Date();

// 日記をlocalStorage に保存
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  // let answer = document.getElementsByClassName("answer");
  // for (let j = 0; j < 3; j++) {
  //   answer[j] = document.getElementsByClassName("answer"+j);
  //   for (let i = 0; i < answer[j].length; i++) {
  //     if (answer[j][i].checked) {
  //       answer[j].value = answer[j][i].value;
  //       break;
  //     }
  //   }
  // }
  let stories = localStorage.getItem("stories");
  if (stories == null) {
    storiesObj = [];
  } else {
    storiesObj = JSON.parse(stories);
  }
  storiesObj.push({
    date: date.getFullYear() +
      "/" + (date.getMonth() + 1).toString().padStart(2, "0") +
      "/" + date.getDate().toString().padStart(2, "0") +
      " " + date.getHours().toString().padStart(2, "0") +
      ":" + date.getMinutes().toString().padStart(2, "0"),
    value0: questions[0].input,
    value1: questions[1].input,
    value2: questions[2].input,
    value3: questions[3].input,
    value4: questions[4].input,
    value5: questions[5].input,
  });
  localStorage.setItem("stories", JSON.stringify(storiesObj));
  // answer.value = ""; //to make the text blank after clicking the button
  console.log(storiesObj);
  showStories();
});


// Function to show elements from localStorage
function showStories() {
  let stories = localStorage.getItem("stories");
  if (stories == null) {
    storiesObj = [];
  } else {
    storiesObj = JSON.parse(stories);
  }
  let html = "";
  storiesObj.forEach(function (element, index) {
    let date = new Date(element.date);
    let review;
    switch(element.value0){
      case 'すごく良い':
        review = 'veryGood';
        break;
      case '良い':
        review = 'good';
        break;
      case '普通':
        review = 'normal';
        break;
      case '悪い':
        review = 'bad';
        break;
      case 'すごく悪い':
        review = 'veryBad';
        break;
    }
    // 表示修正!!!
    html += `
              <div class="noteCard my-2 mx-2 card ${review}" style="width: 18rem;">
                      <div class="card-body">
                          <h5 class="card-title">${element.date}</h5>
                          <p class="card-text"> 気分：${element.value0}</p>
                          <p class="card-text"> 調子：${element.value1}</p>
                          <p class="card-text"> ${element.value2}</p>
                          <p class="card-text"> ${element.value3}</p>
                          <p class="card-text"> ${element.value4}</p>
                          <p class="card-text"> ${element.value5}</p>
                          <button id="${index}"onclick="deleteStory(this.id)" class="btn btn-primary">削除</button>
                      </div>
                  </div>`;
  });
  let storiesElm = document.getElementById("stories");
  if (storiesObj.length != 0) {
    storiesElm.innerHTML = html;
  } else {
    storiesElm.innerHTML = `日記を記入してください。`;
  }
}

//   // Function to delete a story
function deleteStory(index) {
  //   console.log("I am deleting", index);

  let stories = localStorage.getItem("stories");
  if (stories == null) {
    storiesObj = [];
  } else {
    storiesObj = JSON.parse(stories);
  }

  storiesObj.splice(index, 1);
  localStorage.setItem("stories", JSON.stringify(storiesObj));
  showStories();
}


// let search = document.getElementById('searchTxt');
// search.addEventListener("input", function () {

//   let inputVal = search.value.toLowerCase();
//   // console.log('Input event fired!', inputVal);
//   let storyCards = document.getElementsByClassName('noteCard');
//   Array.from(storyCards).forEach(function (element) {
//     let dateTxt = element.getElementsByTagName("h5")[0].innerText;
//     let cardTxt = element.getElementsByTagName("p")[0].innerText;
//     if (dateTxt.includes(inputVal) || cardTxt.includes(inputVal)) {
//       element.style.display = "block";
//     }
//     else {
//       element.style.display = "none";
//     }
//     // console.log(cardTxt);
//   })
// })

var rangeSlider = document.getElementById("rs-range-line");
var rangeBullet = document.getElementById("rs-bullet");

rangeSlider.addEventListener("input", showSliderValue, false);

function showSliderValue() {
  rangeBullet.innerHTML = rangeSlider.value;
  var bulletPosition = (rangeSlider.value / rangeSlider.max);
  rangeBullet.style.left = rangeSlider.scrollWidth * +rangeSlider.value * 0.01 + "px";
}

rangeBullet.innerHTML = rangeSlider.value;

var boundary = 65;
document.getElementById("button").onclick = function () {
  // ストレス値が80以上だったらここれんへ飛ぶ
  if (+boundary <= +rangeSlider.value) {
    location.href = "https://www.cocoro.chiba-u.jp/chibacbt/kokoren/contents.html";
  }
};

//日記テキストを選択し、保存ダイアログ表示
//参考サイト： https://magazine.techacademy.jp/magazine/20732
var diaryText = document.querySelectorAll("#stories .card-text");
if (diaryText) {
  diaryText.forEach(function(text){
    text.addEventListener('mouseup', function () {
      var selectObject = document.getSelection();
      if (selectObject == "") return false; //何も選択しなかったらなし
      //保存ダイアログ表示
      if (confirm(selectObject + "\n保存しますか？")) {
        //保存処理
        saveCoping(selectObject.toString());
      }
    });
  })
  
}


//コーピングをlocal storageに保存
function saveCoping(text) {
  let copings = localStorage.getItem("copings");
  if (copings == null) {
    copingsObj = [];
  } else {
    copingsObj = JSON.parse(copings);
  }
  copingsObj.push({
    date: date.getFullYear() +
      "/" + (date.getMonth() + 1).toString().padStart(2, "0") +
      "/" + date.getDate().toString().padStart(2, "0") +
      " " + date.getHours().toString().padStart(2, "0") +
      ":" + date.getMinutes().toString().padStart(2, "0"),
    value: text
  });
  localStorage.setItem("copings", JSON.stringify(copingsObj));
}

//コーピングリストを表示
function showCopings() {
  let copings = localStorage.getItem("copings");
  if (copings == null) {
    copingsObj = [];
  } else {
    copingsObj = JSON.parse(copings);
  }
  let html = "";
  copingsObj.forEach(function (element, index) {
    html += `
              <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                      <div class="card-body">
                          <p class="card-text"> ${element.value}</p>
                          <button id="${index}"onclick="deleteCoping(this.id)" class="btn btn-primary">削除</button>
                      </div>
                  </div>`;
  });
  let copingsElm = document.getElementById("copings");
  if (copingsObj.length != 0) {
    copingsElm.innerHTML = html;
  } else {
    copingsElm.innerHTML = `項目がありません`;
  }
}

function deleteCoping(index) {
  //   console.log("I am deleting", index);

  let copings = localStorage.getItem("copings");
  if (copings == null) {
    copingsObj = [];
  } else {
    copingsObj = JSON.parse(copings);
  }

  copingsObj.splice(index, 1);
  localStorage.setItem("copings", JSON.stringify(copingsObj));
  showCopings();
}

// 質問・回答オブジェクト
var questions = {
  0: {
    Q: '今日の気分は？',
    A: ["すごく良い", "良い", "普通", "悪い", "すごく悪い"],
    input: ""
  },
  1: {
    Q: '体の調子はどうですか？',
    A: ["すごく良い", "良い", "普通", "悪い", "すごく悪い"],
    input: ""
  },
  2: {
    Q: '今日楽しかったことはありましたか？',
    A: "",
    input: ""
  },
  3: {
    Q: '今日嬉しかったことはありましたか？',
    A: "",
    input: ""
  },
  4: {
    Q: '今日嫌なことはありましたか？それに対してどういう行動をとりましたか？',
    A: "",
    input: ""
  },
  5:{
    Q: '他に書きたいことはありますか？',
    A: "",
    input: ""
  }
}
// ラジオボタンの場合inputに保存、addBtnのところで保存
// 動的に…参考記事
// single page applicationのときvue.js,react.js使うと手軽

// 現在の質問index
var currentQA = 0;

// 質問を表示
var displayQuestion = document.querySelector("#js-question");
showQuestion();

// 次の質問を表示
function showQuestion() {
  displayQuestion.innerText = questions[currentQA]["Q"];
}

// 次へボタンを押すと現在の内容を一時保存し、次の質問表示
var nextButton = document.getElementById('js-nextbtn');
nextButton.addEventListener("click", function () {
  var currentInput;
  if(currentQA<2){
    var radioButtons = document.querySelectorAll('input[name="inlineRadioOptions"]');
    for (var i= 0;i<radioButtons.length;i++){
      if(radioButtons[i].checked){
        currentInput = radioButtons[i].value;
      }
    }
  }else{
    var textArea = document.querySelector('#js-text'+currentQA);
    currentInput = textArea.value;
  }
  questions[currentQA]['input']=currentInput;
  console.log(questions[currentQA]);
  currentQA++;
  showQuestion();
  showAnswer();
})

// 戻るボタン todo: currentQA--
var nextButton = document.getElementById('js-backbtn');
nextButton.addEventListener("click", function () {
  currentQA--;
  showQuestion();
  showAnswer();
})

// 入力項目を定義
var answer = document.getElementById("js-answer");

function showAnswer() {
  var html = "";
  var currentAnswer = questions[currentQA]["A"]
  // 配列だったら
  if (Array.isArray(currentAnswer)) {
    currentAnswer.forEach(function (element, index) {
      html += `<div class="form-check form-check-inline"><input  class="form-check-input answer answer${currentQA}" type="radio" name="inlineRadioOptions" value="${element}"><label class="form-check-label" for="inlineRadio1">${element}</label></div>`;
    });

  } else {
    html += `<textarea class="form-control answer" id="js-text${currentQA}" rows="3">${currentAnswer}</textarea>`;
  }
  answer.innerHTML = html;
}
showAnswer();

// 保存：
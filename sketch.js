let questions;
let currentQuestionIndex = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;
let radio;
let submitButton;
let resultMessage = "";
let resultColor = "";
let showNextQuestion = false;

function preload() {
  // 使用 p5.Table 讀取 CSV 檔案
  questions = loadTable("questions.csv", "csv", "header");
}

function setup() {  
  createCanvas(windowWidth, windowHeight);
  background("#edede9");
  textAlign(CENTER, CENTER);
  textSize(40); // 將題目文字大小設為40pt
  
  // 創建 radio 選項
  radio = createRadio();
  radio.style('width', '600px');
  radio.style('font-size', '30pt'); // 將選項文字大小設為30pt
  radio.position(width / 2 - 100, height / 2 - 50);
  
  // 創建送出按鈕
  submitButton = createButton('送出');
  submitButton.style('font-size', '24pt'); // 將送出按鈕文字大小縮小10pt
  submitButton.position(width / 2 - 55, height / 2 + 50); // 向左移動5
  submitButton.mousePressed(submitAnswer);
  
  loadQuestion();
}

function draw() {
  background("#edede9"); //不斷塗上背景色
  fill(0);
  textSize(40); // 將題目文字大小設為40pt
  if (currentQuestionIndex < questions.getRowCount()) {
    text(questions.getString(currentQuestionIndex, 'question'), width / 2 - 25, height / 2 - 100); // 將題目文字向左移動25像素
  } else {
    text(`測驗結束! 答對: ${correctAnswers} 題, 答錯: ${incorrectAnswers} 題`, width / 2, height / 2);
    radio.hide(); // 隱藏選項
    submitButton.hide(); // 隱藏送出按鈕
    resultMessage = ""; // 清除結果訊息
  }
  
  fill(resultColor);
  if (currentQuestionIndex < questions.getRowCount()) {
    text(resultMessage, width / 2, height / 2 + 150);
  }
  
  textSize(20);
  fill(0); // 將左上角的字設為黑色
  text("答對題數:" + correctAnswers, 60, 20);
  text("答錯題數:" + incorrectAnswers, 60, 40);
  text("413730101 吳映璇", 95, 60);
}

function loadQuestion() {
  if (currentQuestionIndex < questions.getRowCount()) {
    let question = questions.getRow(currentQuestionIndex);
    radio.elt.innerHTML = ''; // 清空 radio 選項
    radio.option(question.getString('option1'));
    radio.option(question.getString('option2'));
    radio.option(question.getString('option3'));
    radio.option(question.getString('option4'));
    resultMessage = ""; // 清除結果訊息
    resultColor = ""; // 清除結果顏色
    submitButton.html('送出'); // 恢復按鈕文字
    submitButton.style('font-size', '24pt'); // 恢復按鈕字體大小
    submitButton.position(width / 2 - 55, height / 2 + 50); // 恢復按鈕位置
    submitButton.mousePressed(submitAnswer); // 恢復按鈕功能
    showNextQuestion = false; // 重置標誌
  }
}

function submitAnswer() {
  let selectedOption = radio.value();
  if (selectedOption) {
    if (selectedOption === questions.getString(currentQuestionIndex, 'correctAnswer')) {
      resultMessage = "答對了!";
      resultColor = "green";
      correctAnswers++;
    } else {
      resultMessage = "答錯了!";
      resultColor = "red";
      incorrectAnswers++;
    }
    showNextQuestion = true; // 設置標誌
    submitButton.html('下一題'); // 切換按鈕文字
    submitButton.style('font-size', '24pt'); // 縮小按鈕字體大小
    submitButton.position(width / 2 - 63, height / 2 + 50); // 向右移動15，然後向左移動8
    submitButton.mousePressed(nextQuestion); // 切換按鈕功能
  } else {
    resultMessage = "請選擇一個選項";
    resultColor = "red";
  }
}

function nextQuestion() {
  if (showNextQuestion) {
    currentQuestionIndex++;
    loadQuestion();
  }
}
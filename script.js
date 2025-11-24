/* 測驗問題 */
const questions = [
  { text:"1.以下選項中你對什麼比較感興趣？", options:["愛情","網路","躺平","股票","金錢"] },
  { text:"2.如果你有一筆突如其來的錢你會怎麼使用？", options:["花在另一半身上","早花早享受","存起來","投資股票","確認金錢來源是否有問題"] },
  { text:"3.在賭博中的心態", options:["一把接一把，爽到為止","All in啦這樣才是我","根本沒打算要賭","及時止損，有賺就好","小賭怡情，當遊戲在玩"] },
  { text:"4.朋友/愛人向你借錢你會？", options:[" OK啊要多少都借","跟對方說「我也沒錢哈哈」","不借","跟他收利息","確認對方是否被盜帳號"]},
  { text:"5.如果收到簡訊說你的帳號被盜用了並向你要錢，你會？", options:["傳奇怪的訊息回去","我帳號更貴啊你才應該給我錢","忽略簡訊","不相信，直接刪除郵件","核實真偽"]},
  { text:"6.投資賺錢了你會？", options:["存銀行賺利息","課金","我怕賠錢這樣就好了","繼續啊賺更多","好好規劃這筆錢財"]},
  { text:"7.如果收到是我是我詐騙？", options:["跟他談心","問他借的錢什麼時候還","直接掛電話","反跟他推銷保險","「什麼......？他明明已經去世了啊......」"]},
  { text:"8.某賭博網站顯示你「差一點中大獎」，並鼓勵你再儲值一次，你會？", options:["再一課點點就好","儲值啊必須儲","這是騙錢的吧","跟朋友說，讓朋友去儲值","直接關掉頁面"]},
  { text:"9.網購後收到詐騙包裹，你會？", options:["好奇裡面的東西，花錢領回家","隨機抽一名路人送他","不領","送給朋友","查詢網購紀錄"]},
  { text:"10.當你有朋友跟你說出國有高薪工作，你會?", options:["在出境時被警告於是放棄","到了當地被賣掉","拒絕","介紹朋友去","欣然答應 但默默封鎖他"] }
];

const optionToRole = ["role1","role2","role3","role4","role5"];
let currentQuestion = 0;
let scores = { role1:0, role2:0, role3:0, role4:0, role5:0 };

/* 開始測驗 */
function startTest(){
  document.getElementById('home-page').style.display = 'none';
  const quiz = document.getElementById('quiz-page');
  quiz.style.display = 'flex';
  showQuestion();
}

/* 題目顯示 */
function showQuestion(){
  const quiz = document.getElementById('quiz-page');
  const oldContent = quiz.querySelector('.fade-content');

  if(oldContent){
    oldContent.style.opacity = 0;
    oldContent.style.transform = 'translateY(-20px)';
    setTimeout(()=>{
      quiz.removeChild(oldContent);
      displayNewQuestion();
    },300);
  } else {
    displayNewQuestion();
  }

  function displayNewQuestion(){
    const div = document.createElement('div');
    div.className = 'fade-content';
    div.style.opacity = 0;
    div.style.transform = 'translateY(20px)';
    
    div.innerHTML = `
      <h2 id="question-text">${questions[currentQuestion].text}</h2>
      <div id="options-container" style="display:flex; flex-direction:column; gap:2vw; align-items:center;"></div>
    `;

    quiz.appendChild(div);

    setTimeout(()=>{
      div.style.opacity = 1;
      div.style.transform = 'translateY(0)';
    },50);

    const optionsContainer = document.getElementById('options-container');
    questions[currentQuestion].options.forEach((optText,index)=>{
      const btn = document.createElement('button');
      btn.innerText = optText;
      btn.className = 'quiz-option';
      btn.onclick = ()=>selectOption(index);
      optionsContainer.appendChild(btn);
    });
  }
}

/* 選擇答案 */
function selectOption(optionIndex){
  const role = optionToRole[optionIndex];
  scores[role]++;
  currentQuestion++;

  if(currentQuestion < questions.length) showQuestion();
  else showResult();
}

/* 結果頁 */
function showResult(){
  let maxRole = 'role1';
  let maxScore = scores[maxRole];

  for(let r in scores){
    if(scores[r] > maxScore){
      maxRole = r;
      maxScore = scores[r];
    }
  }

  document.getElementById('quiz-page').style.display = 'none';

  const resultPage = document.getElementById('result-page');
  resultPage.innerHTML = '';
  resultPage.style.display = 'flex';
  resultPage.classList.add('show');

  const card = document.createElement('div');
  card.className = 'result-card';

  const title = document.createElement('h2');
  title.id = 'result-title';
  

  const img = document.createElement('img');
  img.id = 'result-image';
  img.src = getResultImage(maxRole);
  img.alt = '結果圖片';

  const restartBtn = document.createElement('button');
  restartBtn.className = 'restart-btn';
  restartBtn.innerText = '再測一次';
  restartBtn.onclick = () => location.reload();

  card.appendChild(title);
  card.appendChild(img);
  card.appendChild(restartBtn);

  resultPage.appendChild(card);
}

function getResultImage(role){
  const roleImages = {
    role1:'images/Butterfly.png',
    role2:'images/idiot.png',
    role3:'images/Autistic man.png',
    role4:'images/fox.png',
    role5:'images/Normal people.png'
  };
  return roleImages[role] || 'images/IMG_2933.PNG';
}

function UniGen() {
  this.uniArr = [];
  this.isUni = function (num, newGen) {
    if (this.uniArr.indexOf(newGen) > -1) {
      //   log("出现重复生成");
      return false;
    }

    if (this.uniArr.length > num) {
      this.uniArr.shift();
    }
    this.uniArr.push(newGen);
    return true;
  };
}

var uniGenEmo = new UniGen();
var uniGenWord = new UniGen();

const genComment = function (base) {
  var comment = "";
  comment += base;
  comment += gen语气词();
  let times = random(1, 3)
  while (times > 0) {
    times--
    comment += genEmo();
  }

  return comment;
};

function genEmo() {
  // 图标获取 https://bj.96weixin.com/tools/emoji
  var emos = [
    "😀",
    "😁",
    "😂",
    "🤣",
    "😃",
    "😄",
    "😆",
    "😉",
    "😊",
    "😋",
    "😘",
    "🙂",
    "😶",
    "😏",
    "😬",
    "👀",
    "👣",
    "👽",
    "🤥",
    "[吐彩虹]",
    "[比心]",
    "[惊喜]",
    "[做鬼脸]",
    "[尬笑]",
    "[红脸]",
    "[摸头]",
    "[呲牙]",
    "[黑脸]",
    "[绝望的凝视]",
    "[听歌]",
    "[飞吻]",
    "[翻白眼]",
    "[愉快]",
    "[得意]",
    "[可怜]",
    "[思考]",
    "[大金牙]",
    "[大笑]",
    "[耶]",
    "[猪头]",
    "[憨笑]",
    "[囧]",
    "[调皮]",
    "[惊讶]",
    "[微笑]",
    "[害羞]",
    "[皱眉]",
    "[吃瓜群众]",
    "[不失礼貌的微笑]",
    "[舔屏]",
    "[互粉]",
    "[泪奔]",
    "[灵机一动]",
    "[小鼓掌]",
    "[嘿哈]",
    "[机智]",
    "[来看我]",
  ];

  var emo = emos[random(0, emos.length - 1)];
  if (!uniGenEmo.isUni(6, emo)) {
    genEmo();
  }

  return emo;
}

function gen语气词() {
  var words = [
    "吧",
    "罢",
    "呗",
    "啵",
    "啦",
    "嘞",
    "咯",
    "啰",
    "喽",
    "呢",
    "呐",
    "哈",
    "呦",
    "嘢",
    "哇",
  ];
  var word = words[random(0, words.length - 1)];
  if (!uniGenWord.isUni(6, word)) {
    gen语气词();
  }

  return word;
}

module.exports = { genComment };

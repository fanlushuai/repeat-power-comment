eles = find();

// log(eles);

for (ele of eles) {
  //   log("ddd");
  //   log(ele);
  log(logEx(ele));
}

function logEx(ele) {
  //   let l = "className:" + ele.className();
  let l = "cN:" + ele.className().replace("android", "").replace("widget", "");

  if (ele.id()) {
    l += " - id: " + ele.id().split("/")[1];
  }

  if (ele.text()) {
    l += " - text: " + ele.text();
  }

  if (ele.contentDescription) {
    l += " - desc: " + ele.contentDescription;
  }

  if (ele.clickable()) {
    l += " - clickable: true";
  }

  if (ele.scrollable()) {
    l += " - scrollable: true";
  }

  return l;
}

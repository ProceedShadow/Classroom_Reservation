function login() {
  var username = document.getElementById('username').value;

  // 假设信息2是"admin"表示管理员
  if (username === 'admin') {
    // 跳转到管理员界面
    window.location.href = 'page1.html';
  } else {
    // 跳转到用户界面
    window.location.href = 'page2.html';
  }
}


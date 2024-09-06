let isClassroomReserved = false;
let queue = [];

document.getElementById('login-form').addEventListener('submit', function (e) {
  e.preventDefault();
  login();
});

document.getElementById('reserve-btn').addEventListener('click', function () {
  reserveClassroom();
});

document.getElementById('join-queue-btn').addEventListener('click', function () {
  joinQueue();
});

function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // 简化的验证登录逻辑，实际项目应使用后台接口验证
  if (username && password) {
    document.getElementById('login-page').style.display = 'none';
    document.getElementById('reservation-page').style.display = 'block';
    updateQueueInfo();
  } else {
    alert('Please enter valid credentials.');
  }
}

function reserveClassroom() {
  if (!isClassroomReserved) {
    isClassroomReserved = true;
    document.getElementById('status').innerText = 'Classroom is reserved.';
    document.getElementById('reserve-btn').style.display = 'none';
    document.getElementById('join-queue-btn').style.display = 'block';
  } else {
    alert('Classroom is already reserved.');
  }
}

function joinQueue() {
  queue.push('User');  // 可以改为当前用户
  updateQueueInfo();
}

function updateQueueInfo() {
  document.getElementById('queue-length').innerText = queue.length;
}

// 将 Flask 传递的变量赋值给 JavaScript 变量
const userInfo = {
  name: "{{ name }}",
  username: "{{ username }}",
  password: "{{ password }}"
};

function showTool(tool) {
  var toolTitle = document.getElementById('toolTitle');
  var toolDescription = document.getElementById('toolDescription');

  if (tool === 'myConfiguration') {
    toolTitle.innerText = "{{ name }} 的用户信息:";

    // TODO: 此界面应该显示姓名、区队、学号、可预约次数

    toolDescription.innerHTML = `<strong>姓名:</strong> ${userInfo.name}<br>
                                  <strong>区队:</strong> 2024级食品药品环境犯罪侦查技术1区队<br>
                                  <strong>学号:</strong> ${userInfo.username}<br>
                                  <strong>账号:</strong> ${userInfo.username}<br>
                                  <strong>可预约次数:</strong> 1<br>
                                  <strong>密码:</strong> ${userInfo.password}`;

  } else if (tool === 'preRegisteration') {
    toolTitle.innerText = '预约申请';
    toolDescription.innerText = '这是工具1的详细信息。';
  } else if (tool === 'myReservation') {
    toolTitle.innerText = '工具2';
    toolDescription.innerText = '这是工具2的详细信息。';
  } else if (tool === 'reservationQueue') {
    toolTitle.innerText = '工具3';
    toolDescription.innerText = '这是工具3的详细信息。';
  } else if (tool === 'Others') {
    toolTitle.innerText = '工具4';
    toolDescription.innerText = '这是工具4的详细信息。';
  }
}


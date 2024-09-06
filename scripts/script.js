// let isClassroomReserved = false;
// let queue = [];

// document.getElementById('login-form').addEventListener('submit', function (e) {
//   e.preventDefault();
//   login();
// });

// document.getElementById('reserve-btn').addEventListener('click', function () {
//   reserveClassroom();
// });

// document.getElementById('join-queue-btn').addEventListener('click', function () {
//   joinQueue();
// });

// function login() {
//   const username = document.getElementById('username').value;
//   const password = document.getElementById('password').value;

//   // 简化的验证登录逻辑，实际项目应使用后台接口验证
//   if (username && password) {
//     document.getElementById('login-page').style.display = 'none';
//     document.getElementById('reservation-page').style.display = 'block';
//     updateQueueInfo();
//   } else {
//     alert('Please enter valid credentials.');
//   }
// }

// function reserveClassroom() {
//   if (!isClassroomReserved) {
//     isClassroomReserved = true;
//     document.getElementById('status').innerText = 'Classroom is reserved.';
//     document.getElementById('reserve-btn').style.display = 'none';
//     document.getElementById('join-queue-btn').style.display = 'block';
//   } else {
//     alert('Classroom is already reserved.');
//   }
// }

// function joinQueue() {
//   queue.push('User');  // 可以改为当前用户
//   updateQueueInfo();
// }

// function updateQueueInfo() {
//   document.getElementById('queue-length').innerText = queue.length;
// }

let classrooms = [
    { id: 1, reserved: false, queue: [] },
    { id: 2, reserved: false, queue: [] },
    { id: 3, reserved: false, queue: [] },
];

document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();
    login();
});

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        document.getElementById('login-page').style.display = 'none';
        document.getElementById('reservation-page').style.display = 'block';
        displayClassrooms();
    } else {
        alert('Please enter valid credentials.');
    }
}

function displayClassrooms() {
    const container = document.getElementById('classrooms-container');
    container.innerHTML = '';

    classrooms.forEach(classroom => {
        const classroomDiv = document.createElement('div');
        classroomDiv.className = 'classroom';

        const classroomStatus = classroom.reserved ? 'Reserved' : 'Available';
        classroomDiv.innerHTML = `
            <h3>Classroom ${classroom.id}</h3>
            <p>Status: ${classroomStatus}</p>
            <p>Queue length: ${classroom.queue.length}</p>
            <button onclick="reserveClassroom(${classroom.id})" ${classroom.reserved ? 'disabled' : ''}>Reserve</button>
            <button onclick="joinQueue(${classroom.id})" ${classroom.reserved ? '' : 'disabled'}>Join Queue</button>
        `;

        container.appendChild(classroomDiv);
    });
}

function reserveClassroom(id) {
    const classroom = classrooms.find(c => c.id === id);
    if (!classroom.reserved) {
        classroom.reserved = true;
        alert(`Classroom ${id} has been reserved.`);
        displayClassrooms();
    }
}

function joinQueue(id) {
    const classroom = classrooms.find(c => c.id === id);
    classroom.queue.push('User');  // 模拟当前用户
    alert(`You have joined the queue for Classroom ${id}.`);
    displayClassrooms();
}

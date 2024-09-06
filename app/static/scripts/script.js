let classrooms = [
    { id: 1, reservations: [] },
    { id: 2, reservations: [] },
    { id: 3, reservations: [] },
];

let currentUser = '';  // 当前登录的用户
let userReservations = [];  // 当前用户的预约信息

document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();
    login();
});

function login() {
    currentUser = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (currentUser && password) {
        document.getElementById('login-page').style.display = 'none';
        document.getElementById('reservation-page').style.display = 'block';
        displayClassrooms();
        displayUserReservations();
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

        const currentReservations = classroom.reservations.length > 0
            ? classroom.reservations.map(res => `From ${res.start} to ${res.end}`).join('<br>')
            : 'No reservations';

        classroomDiv.innerHTML = `
            <h3>Classroom ${classroom.id}</h3>
            <p>Current Reservations:</p>
            <p>${currentReservations}</p>
            <button onclick="openReservationModal(${classroom.id})">Reserve</button>
        `;

        container.appendChild(classroomDiv);
    });
}

function displayUserReservations() {
    const container = document.getElementById('user-reservations');
    container.innerHTML = '';

    if (userReservations.length === 0) {
        container.innerHTML = '<p>You have no current reservations.</p>';
        return;
    }

    userReservations.forEach((reservation, index) => {
        const resDiv = document.createElement('div');
        resDiv.className = 'reservation';

        resDiv.innerHTML = `
            <p>Classroom ${reservation.classroomId}: From ${reservation.start} to ${reservation.end}</p>
            <button onclick="cancelReservation(${index})">Cancel Reservation</button>
        `;

        container.appendChild(resDiv);
    });
}

function openReservationModal(id) {
    document.getElementById('reservation-modal').style.display = 'block';
    document.getElementById('modal-classroom-info').innerText = `Reserving Classroom ${id}`;
    document.getElementById('confirm-reservation').onclick = function() {
        confirmReservation(id);
    };
    document.getElementById('cancel-reservation').onclick = closeReservationModal;
}

function confirmReservation(id) {
    const startTime = document.getElementById('start-time').value;
    const endTime = document.getElementById('end-time').value;

    if (startTime && endTime) {
        const classroom = classrooms.find(c => c.id === id);
        
        // 检查时间冲突
        if (!isTimeConflict(classroom.reservations, startTime, endTime)) {
            classroom.reservations.push({ user: currentUser, start: startTime, end: endTime });
            userReservations.push({ classroomId: id, start: startTime, end: endTime });
            alert(`Classroom ${id} reserved from ${startTime} to ${endTime}`);
            closeReservationModal();
            displayClassrooms();
            displayUserReservations();
        } else {
            alert('The selected time conflicts with an existing reservation.');
        }
    } else {
        alert('Please select valid times.');
    }
}

function isTimeConflict(existingReservations, startTime, endTime) {
    const newStart = new Date(startTime);
    const newEnd = new Date(endTime);

    return existingReservations.some(res => {
        const existingStart = new Date(res.start);
        const existingEnd = new Date(res.end);
        
        return (newStart < existingEnd && newEnd > existingStart);
    });
}

function cancelReservation(index) {
    const reservation = userReservations[index];

    // 从教室的预约列表中删除该预约
    const classroom = classrooms.find(c => c.id === reservation.classroomId);
    classroom.reservations = classroom.reservations.filter(res => !(res.user === currentUser && res.start === reservation.start && res.end === reservation.end));

    // 从用户预约列表中删除该预约
    userReservations.splice(index, 1);

    alert(`Your reservation for Classroom ${reservation.classroomId} from ${reservation.start} to ${reservation.end} has been cancelled.`);
    displayClassrooms();
    displayUserReservations();
}

function closeReservationModal() {
    document.getElementById('reservation-modal').style.display = 'none';
}

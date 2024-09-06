let classrooms = [
    { id: 1, reservations: [] },  // 每个教室有一个 reservations 数组，记录所有预约
    { id: 2, reservations: [] },
    { id: 3, reservations: [] },
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
            classroom.reservations.push({ start: startTime, end: endTime });
            alert(`Classroom ${id} reserved from ${startTime} to ${endTime}`);
            closeReservationModal();
            displayClassrooms();
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

function closeReservationModal() {
    document.getElementById('reservation-modal').style.display = 'none';
}

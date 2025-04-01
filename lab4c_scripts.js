let students = [];

function time_now() {
    let date = new Date();

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let month = months[date.getMonth()];
    let day = date.getDate();
    let year = date.getFullYear();
    let weekday = days[date.getDay()];
    let time = date.toLocaleTimeString(navigator.language, {
        hour: "2-digit",
        minute: "2-digit",
    });

    document.getElementById("displayDate").innerHTML = `Today is ${month} ${day}, ${year}, ${weekday}. <br>The current time is ${time}.`;
}

function generateStudentNumber() {
    return "2024" + Math.floor(10000 + Math.random() * 90000)
}

function validateStudent(name, age, email) {
    if (name.length <= 5 && !name.includes(" ")) {
        alert("Please enter a full name (first name and last name)");
        return false;
    }

    if (isNaN(age) || age < 18 || age > 99 ) {
        alert("Age must be a number between 18 and 99");
        return false;
    }

    if (!email.includes("@")) {
        alert("Please include an '@' in the email address.");
        return false;
    }

    return true;
}

function add_student() {
    let studentNum = generateStudentNumber();
    document.getElementById("studentNumber").value = studentNum;

    let name = document.getElementById("name").value.trim();
    let age = document.getElementById("age").value.trim();
    let email = document.getElementById("email").value.trim();
    let course = document.getElementById("course").value;

    if (!validateStudent(name, age ,email)) return;

    let newStudent = {
        studentNum: studentNum,
        name: name,
        age: age,
        email: email,
        course: course
    };

    students.push(newStudent);
    console.log(students);

    alert(`Student added successfully!\n Student Number: ${studentNum}\n Name: ${name}\n Age: ${age}\n Email: ${email}\n Course: ${course}`);
    
    document.getElementById("studentForm").reset();
    document.getElementById("studentNumber").value = generateStudentNumber();
}

function find_student() {
    let searchID = document.getElementById("searchID").value;

    let student = students.find(student => student.studentNum === searchID);

    if (student) {
        document.getElementById("displayStudent").innerHTML = `
            <strong>Student Found:</strong> <br>
            <strong>Student Number:</strong> ${student.studentNum} <br>
            <strong>Name:</strong> ${student.name} <br>
            <strong>Age:</strong> ${student.age} <br>
            <strong>Email:</strong> ${student.email} <br>
            <strong>Course:</strong> ${student.course} <br>
        `;
    } else {
        document.getElementById("displayStudent").innerHTML = `Student record does not exist!`;
    }
}

window.onload = function() {
    document.getElementById("dateBtn").addEventListener("click", currentDate);
    document.getElementById("submitBtn").addEventListener("click", add_student);
    document.getElementById("searchBtn").addEventListener("click", find_student);
};
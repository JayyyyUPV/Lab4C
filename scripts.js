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
    let studentNum; 
    do {
        studentNum = "2024" + Math.floor(10000 + Math.random() * 90000);
    } while (students.some(student => student.studentNum === studentNum)); 
    return studentNum;
}


function validateStudent(name, age, email) {
    let isValid = true;

    if (name.length <= 5 || !name.includes(" ")) {
        document.getElementById("errorName").innerHTML = "Name should be more than 5 characters and contain a space (First and Last name)";
        isValid = false;
    } else {
        document.getElementById("errorName").innerHTML = "";
    }

    age = Number(age);
    if (isNaN(age) || age < 18 || age > 99) {
        document.getElementById("errorNumber").innerHTML = "Age must be a number between 18 and 99";
        isValid = false;
    } else {
        document.getElementById("errorNumber").innerHTML = "";
    }

    if (!email.endsWith("@up.edu.ph") || email.indexOf("@up.edu.ph") === 0) {
        document.getElementById("errorEmail").innerHTML = "Email must be a valid '@up.edu.ph' email";
        isValid = false;
    } else {
        document.getElementById("errorEmail").innerHTML = "";
    }

    return isValid;
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


    document.getElementById("errorName").innerHTML = "";
    document.getElementById("errorNumber").innerHTML = "";
    document.getElementById("errorEmail").innerHTML = "";

    alert(`Student added successfully!\n Student Number: ${studentNum}\n Name: ${name}\n Age: ${age}\n Email: ${email}\n Course: ${course}`);

    document.getElementById("studentForm").reset();
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

function display_list() {
    if (students.length === 0) {
        document.getElementById("displayAllStudents").innerHTML = "No students available.";
        return;
    }

    let studentList = "<h2>All Students</h2>";
    students.forEach(student => {
        studentList += `
            <p>
                <strong>Student Number:</strong> ${student.studentNum} <br>
                <strong>Name:</strong> ${student.name} <br>
                <strong>Age:</strong> ${student.age} <br>
                <strong>Email:</strong> ${student.email} <br>
                <strong>Course:</strong> ${student.course} <br>
            </p>
            <hr>
        `;
    });

    document.getElementById("displayAllStudents").innerHTML = studentList;
}

window.onload = function() {
    document.getElementById("dateBtn").addEventListener("click", time_now);
    document.getElementById("studentForm").addEventListener("submit", function(event) {
        event.preventDefault();  // Prevent the form from submitting until validation is passed

        let name = document.getElementById("name").value.trim();
        let age = document.getElementById("age").value.trim();
        let email = document.getElementById("email").value.trim();

        if (validateStudent(name, age, email)) {  // Validate all fields
            add_student();  // Only call add_student if validation passes
        }
    });

    document.getElementById("searchBtn").addEventListener("click", find_student);
    document.getElementById("displayAllBtn").addEventListener("click", display_list);
};

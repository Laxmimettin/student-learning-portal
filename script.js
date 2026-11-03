// Course information
const courses = [
  {
    id: 1,
    title: "Complete Web Development",
    category: "Web Development",
    instructor: "John Smith",
    duration: "8 Weeks",
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600",
    description:
      "Learn HTML, CSS, JavaScript and build modern responsive websites.",
    lessons: [
      "HTML Fundamentals",
      "CSS Styling",
      "JavaScript Basics",
      "Responsive Design",
      "Final Project",
    ],
  },
  {
    id: 2,
    title: "Python Programming",
    category: "Programming",
    instructor: "Sarah Johnson",
    duration: "6 Weeks",
    rating: "4.8",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600",
    description: "Learn Python programming from beginner to advanced concepts.",
    lessons: [
      "Python Basics",
      "Variables",
      "Loops",
      "Functions",
      "Mini Project",
    ],
  },
  {
    id: 3,
    title: "Database Management",
    category: "Database",
    instructor: "David Wilson",
    duration: "5 Weeks",
    rating: "4.7",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600",
    description: "Understand SQL, database design and data management.",
    lessons: [
      "Database Basics",
      "SQL Queries",
      "Joins",
      "Normalization",
      "Project",
    ],
  },
  {
    id: 4,
    title: "UI/UX Design Masterclass",
    category: "Design",
    instructor: "Emily Brown",
    duration: "4 Weeks",
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600",
    description: "Create attractive interfaces and user-friendly experiences.",
    lessons: [
      "Design Principles",
      "Color Theory",
      "Typography",
      "Wireframing",
      "Prototype",
    ],
  },
  {
    id: 5,
    title: "Java Programming",
    category: "Programming",
    instructor: "Michael Lee",
    duration: "7 Weeks",
    rating: "4.8",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600",
    description: "Learn object-oriented programming using Java.",
    lessons: [
      "Java Basics",
      "OOP Concepts",
      "Inheritance",
      "Collections",
      "Project",
    ],
  },
  {
    id: 6,
    title: "Full Stack Development",
    category: "Web Development",
    instructor: "Alex Martin",
    duration: "10 Weeks",
    rating: "5.0",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600",
    description:
      "Build full-stack applications using frontend and backend technologies.",
    lessons: ["React", "Node.js", "Express", "MongoDB", "Full Stack Project"],
  },
];

// Load saved enrollment information
let enrolledCourses = JSON.parse(localStorage.getItem("enrolledCourses")) || {};

// Save data
function saveData() {
  localStorage.setItem("enrolledCourses", JSON.stringify(enrolledCourses));
}

// Display courses
function displayCourses(data) {
  const container = document.getElementById("courseList");

  if (data.length === 0) {
    container.innerHTML = "<p>No courses found.</p>";
    return;
  }

  container.innerHTML = data
    .map(
      (course) => `
        <div class="course-card">
            <img src="${course.image}" alt="${course.title}">
            <div class="course-info">
                <span class="category">${course.category}</span>
                <h3>${course.title}</h3>
                <p>Instructor: ${course.instructor}</p>
                <p>Duration: ${course.duration} | ⭐ ${course.rating}</p>

                <div class="course-actions">
                    <button onclick="viewCourse(${course.id})">
                        View Details
                    </button>

                    <button onclick="enrollCourse(${course.id})">
                        ${enrolledCourses[course.id] ? "Enrolled" : "Enroll"}
                    </button>
                </div>
            </div>
        </div>
    `,
    )
    .join("");
}

// Search functionality
function filterCourses() {
  const search = document.getElementById("searchInput").value.toLowerCase();

  const category = document.getElementById("categoryFilter").value;

  const filtered = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(search) ||
      course.instructor.toLowerCase().includes(search);

    const matchesCategory = category === "All" || course.category === category;

    return matchesSearch && matchesCategory;
  });

  displayCourses(filtered);
}

document.getElementById("searchInput").addEventListener("input", filterCourses);

document
  .getElementById("categoryFilter")
  .addEventListener("change", filterCourses);

// Enrollment
function enrollCourse(id) {
  if (enrolledCourses[id]) {
    alert("You are already enrolled in this course!");
    return;
  }

  enrolledCourses[id] = 0;

  saveData();
  updateDashboard();
  filterCourses();

  alert("Successfully enrolled!");
}

// View course details
function viewCourse(id) {
  const course = courses.find((item) => item.id === id);

  const enrolled = enrolledCourses[id] !== undefined;

  const progress = enrolled ? enrolledCourses[id] : 0;

  document.getElementById("modalDetails").innerHTML = `
        <span class="category">${course.category}</span>

        <h2>${course.title}</h2>

        <p>${course.description}</p>

        <p><strong>Instructor:</strong> ${course.instructor}</p>

        <p><strong>Duration:</strong> ${course.duration}</p>

        <h3>Course Curriculum</h3>

        ${course.lessons
          .map(
            (lesson, index) => `
            <div class="lesson">
                ${index + 1}. ${lesson}
                ${enrolled && index < Math.round(progress / 20) ? " ✓" : ""}
            </div>
        `,
          )
          .join("")}

        ${
          enrolled
            ? `<p>Progress: ${progress}%</p>
               <button onclick="completeLesson(${id})"
               ${progress === 100 ? "disabled" : ""}>
               ${progress === 100 ? "Course Completed" : "Complete Next Lesson"}
               </button>`
            : `<button onclick="enrollCourse(${id}); closeModal();">
                Enroll Now
               </button>`
        }
    `;

  document.getElementById("courseModal").style.display = "flex";
}

// Complete lessons
function completeLesson(id) {
  if (enrolledCourses[id] < 100) {
    enrolledCourses[id] += 20;
    saveData();
    updateDashboard();
    viewCourse(id);
  }
}

// Close modal
function closeModal() {
  document.getElementById("courseModal").style.display = "none";
}

// Dashboard
function updateDashboard() {
  const dashboard = document.getElementById("dashboardCourses");

  const enrolledIds = Object.keys(enrolledCourses);

  document.getElementById("totalCourses").textContent = courses.length;

  document.getElementById("enrolledCount").textContent = enrolledIds.length;

  document.getElementById("completedCount").textContent = enrolledIds.filter(
    (id) => enrolledCourses[id] === 100,
  ).length;

  if (enrolledIds.length === 0) {
    dashboard.innerHTML =
      "<p>You haven't enrolled in any courses yet. Explore courses to start learning!</p>";
    return;
  }

  dashboard.innerHTML = enrolledIds
    .map((id) => {
      const course = courses.find((c) => c.id == id);

      if (!course) return "";

      const progress = enrolledCourses[id];

      return `
            <div class="dashboard-card">
                <h3>${course.title}</h3>

                <p>${course.instructor}</p>

                <div class="progress-bar">
                    <div class="progress-fill"
                        style="width:${progress}%"></div>
                </div>

                <p>${progress}% Completed</p>

                <button onclick="viewCourse(${id})">
                    Continue Learning
                </button>
            </div>
        `;
    })
    .join("");
}

// Dashboard navigation
function showDashboard() {
  document.getElementById("dashboard").scrollIntoView({
    behavior: "smooth",
  });
}

// Initial loading
displayCourses(courses);
updateDashboard();

// Close modal on outside click
document
  .getElementById("courseModal")
  .addEventListener("click", function (event) {
    if (event.target === this) {
      closeModal();
    }
  });

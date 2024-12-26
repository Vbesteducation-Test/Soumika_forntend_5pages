// Extract the grade from the URL
const urlParams = new URLSearchParams(window.location.search);
const grade = urlParams.get('grade');
const classSelector = document.getElementById('class-selector');

// Populate the class selector based on the grade
async function fetchGradeDetails(grade) {
    try {
        const response = await fetch(`http://localhost:3000/getGradeDetails?grade=${grade}`);
        const data = await response.json();

        if (data) {
            populateSelectors(data);
        } else {
            alert("Grade details not found");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to fetch grade details");
    }
}

// Populate dropdowns for class, subject, and chapter
function populateSelectors(data) {
    // Populate Grade selector
    const classSelector = document.getElementById('class-selector');
    classSelector.innerHTML = `<option value="${data.grade}">${data.grade}</option>`;

    // Populate Subject selector
    const subjectSelector = document.getElementById('subject-selector');
    subjectSelector.innerHTML = '<option value="">Select Subject</option>';
    data.subjects.forEach(subject => {
        const option = document.createElement('option');
        option.value = subject;
        option.textContent = subject;
        subjectSelector.appendChild(option);
    });

    // Populate Chapter selector
    const chapterSelector = document.getElementById('chapter-selector');
    chapterSelector.innerHTML = '<option value="">Select Chapter</option>';
    data.chapters.forEach(chapter => {
        const option = document.createElement('option');
        option.value = chapter;
        option.textContent = chapter;
        chapterSelector.appendChild(option);
    });
}

// Function to display the summary of selected options
function displaySummary() {
    const classSummary = document.getElementById('class-summary');
    const subjectSummary = document.getElementById('subject-summary');
    const chapterSummary = document.getElementById('chapter-summary');
    
    classSummary.textContent = classSelector.value;
    subjectSummary.textContent = document.getElementById('subject-selector').value;
    chapterSummary.textContent = document.getElementById('chapter-selector').value;

    document.getElementById('summary').style.display = 'block';
}

// Function to clear the selection
function clearSelection() {
    classSelector.value = '';
    document.getElementById('subject-selector').innerHTML = '<option value="">Select Subject</option>';
    document.getElementById('chapter-selector').innerHTML = '<option value="">Select Chapter</option>';
    document.getElementById('summary').style.display = 'none';
}

// Image Carousel Functions
let currentImageIndex = 0;
const images = ['image1.jpg', 'image2.jpg', 'image3.jpg']; // Add your image paths

function showImage(index) {
    const imgElement = document.getElementById('carousel-img');
    imgElement.src = images[index];
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    showImage(currentImageIndex);
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    showImage(currentImageIndex);
}

// Initial image display
showImage(currentImageIndex);

// Heart Button Toggle
function toggleHeart(button) {
    button.classList.toggle('liked');
}

function sharePage() {
    const url = window.location.href;
    const text = `Check out this page: ${url}`;
    if (navigator.share) {
        navigator.share({
            title: 'VBest Education',
            text: text,
            url: url,
        }).then(() => console.log('Successful share'))
          .catch((error) => console.log('Error sharing', error));
    } else {
        alert('Sharing not supported on this browser');
    }
}

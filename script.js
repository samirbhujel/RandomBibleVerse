// Function to fetch Bible data (books, chapters, verses)
function fetchBibleData(fileName) {
  return fetch(fileName)
    .then(response => response.json())
    .catch(error => console.error(`Error loading ${fileName}:`, error));
}

// Load both Old and New Testament data
Promise.all([
  fetchBibleData('assets/old-testament.json'),
  fetchBibleData('assets/new-testament.json')
])
  .then(([oldTestamentData, newTestamentData]) => {
    // Combine both Old and New Testament verses
    const allVerses = [];

    // Add Old Testament verses
    oldTestamentData.books.forEach(book => {
      book.chapters.forEach(chapter => {
        chapter.verses.forEach(verse => {
          allVerses.push(verse);
        });
      });
    });

    // Add New Testament verses
    newTestamentData.books.forEach(book => {
      book.chapters.forEach(chapter => {
        chapter.verses.forEach(verse => {
          allVerses.push(verse);
        });
      });
    });

    // Pick a random verse
    const randomIndex = Math.floor(Math.random() * allVerses.length);
    const randomVerse = allVerses[randomIndex];

    // Display the random verse
    document.getElementById("verse").innerHTML = `
      <p>${randomVerse.text}</p>
      <p><i>${randomVerse.reference}</i></p>
    `;

    // Add event listener to the button to reload the page on click
    document.getElementById("refreshButton").addEventListener("click", function() {
      window.location.reload();
    });
  });

// Function to randomly apply animation class to the container
function randomizeAnimation() {
  const animations = ['slideInFromTop', 'scaleUp', 'rotateIn'];
  const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
  const container = document.querySelector('.container');

  // Clear any previous animation
  container.style.animation = '';

  // Apply a new random animation
  container.style.animation = `${randomAnimation} 1s ease-out`;  // Faster animation
}

// Call the function on page load
window.onload = randomizeAnimation;

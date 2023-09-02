const fetchAndDisplayButtons = async () => {
  try {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();
    const buttonContainer = document.getElementById('button-container');

    data.data.forEach((button) => {
      const buttonElement = document.createElement('button');
      buttonElement.textContent = button.category;
      buttonElement.classList.add('btn');

      buttonElement.addEventListener('click', () => {
        document.querySelectorAll('.btn').forEach((otherButton) => {
          otherButton.classList.toggle('red', otherButton === buttonElement);
        });
      });

      buttonContainer.appendChild(buttonElement);

      if (button.category_id === '1000') {
        buttonElement.classList.add('red');
      }
    });
  } catch (error) {
    console.error('Error fetching and displaying buttons:', error);
  }
};

const fetchAndDisplayPhones = async () => {
  try {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/category/1000');
    const data = await response.json();
    const phoneContainer = document.getElementById('card-container');

    data.data.forEach((phone) => {
      const timeAgo = phone.others.posted_date
        ? `${Math.floor(phone.others.posted_date / 3600)} hour${phone.others.posted_date >= 7200 ? 's' : ''} ${Math.floor((phone.others.posted_date % 3600) / 60)} minute${phone.others.posted_date >= 120 ? 's ago' : ''}`
        : '';

      const phoneCard = document.createElement('div');
      phoneCard.className = 'card card-compact bg-base-100';
      phoneCard.innerHTML = `
        <figure>
          <div>
            <div><img src="${phone.thumbnail}" alt="${phone.title}" class="w-96 h-56 rounded-xl" /></div>
            <div class="absolute left-48 bottom-28">${timeAgo ? `<p class="posted-time bg-black text-white text-xs p-2 rounded-lg">${timeAgo}</p>` : ''}</div>
          </div>
        </figure>
        <div class="card-body">
          <div class="flex gap-4">
            <div><img src="${phone.authors[0].profile_picture}" alt="${phone.authors[0].profile_name}" class="w-10 h-10 rounded-full"></div>
            <div>
              <h2 class="text-xl font-semibold">${phone.title}</h2>
              <p class="text-sm flex gap-2">${phone.authors[0].profile_name} ${phone.authors[0].verified ? '<span class="verified-icon"><img src="images/vip.png" alt="Verified"></span>' : ''}</p>
              <p class="views">${phone.others.views} views</p>
            </div>
          </div>
        </div>
      `;
      phoneContainer.appendChild(phoneCard);
    });

    // Sorting by Views
    document.getElementById('sort-by-views').style.display = 'block';
    document.getElementById('sort-by-views').addEventListener('click', () => {
      const phoneCards = Array.from(phoneContainer.children);
      phoneCards.sort((a, b) => parseInt(b.querySelector('.views').textContent, 10) - parseInt(a.querySelector('.views').textContent, 10));
      phoneContainer.innerHTML = '';
      phoneCards.forEach((card) => phoneContainer.appendChild(card));
    });
  } catch (error) {
    console.error('Error fetching and displaying phones:', error);
  }
};

// Call the functions to fetch and display buttons and phones
fetchAndDisplayButtons();
fetchAndDisplayPhones();

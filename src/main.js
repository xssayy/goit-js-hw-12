import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

form.addEventListener('submit', e => {
  e.preventDefault();
  const searchRequestValue = e.target.elements.input.value;
  loaderOn();
  getImages(searchRequestValue)
    .then(res => {
      gallery.innerHTML = '';
      renderImages(res);
    })
    .then(() => {
      loaderOff();
      e.target.reset();
      lightbox.refresh();
    })
    .catch(() => {
      loaderOff();
    });
});

function getImages(searchRequestValue) {
  if (searchRequestValue.trim() === '') {
    return Promise.reject(new Error('Поле не може бути порожнім.')).catch(
      err => {
        loaderOff();
        iziToast.error({
          title: 'Помилка',
          message: 'Поле не може бути порожнім.',
          position: 'topRight',
        });
      }
    );
  }

  const params = {
    key: '42321641-23e42709c41860fd235775557',
    q: `${searchRequestValue.trim()}`
      .split(' ')
      .map(word => {
        return word.toLowerCase().trim();
      })
      .join('+'),
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };
  const url = `https://pixabay.com/api/?key=${params.key}&q=${params.q}&image_type=${params.image_type}&orientation=${params.orientation}&safesearch=${params.safesearch}`;

  return fetch(url)
    .then(res => res.json())
    .then(res => {
      if (res.totalHits === 0) {
        throw new Error();
      }

      return res.hits;
    })
    .catch(() => {
      iziToast.error({
        title: 'Помилка',
        message: 'Відсутні результати пошуку. Спробуйте знову!',
        position: 'topRight',
      });
    });
}

function templateImage(images) {
  const markup = images
    .map(image => {
      return `<li class="gallery-item">
 <a href="${image.largeImageURL}"> <img
    class="galery-img"
    src="${image.webformatURL}"
    alt="${image.tags}"
    
    width="360"
    height="200px"/>
    </a>
  <div class="description">
    <p class="description-item">
      Likes<span>${image.likes}</span>
    </p>
    <p class="description-item">
      Views<span>${image.views}</span>
    </p>
    <p class="description-item">
      Comments<span>${image.comments}</span>
    </p>
    <p class="description-item">
      Downloads<span>${image.downloads}</span>
    </p>
  </div>
</li>`;
    })
    .join('');
  return markup;
}

function renderImages(searchRequestValue) {
  const markup = templateImage(searchRequestValue);
  gallery.innerHTML = markup;
}

function loaderOff() {
  loader.classList.add('is-hidden');
}

function loaderOn() {
  loader.classList.remove('is-hidden');
}

var lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

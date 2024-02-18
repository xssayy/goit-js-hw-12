import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';

// import {
//   showError,
//   showMessage,
//   showLoader,
//   hideLoader,
//   scrollPage,
// } from './js/helpers';

export const refs = {
  form: document.querySelector('.form'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
  loadMoreBtn: document.querySelector('.load-more-btn'),
};
const { form, gallery, loader, loadMoreBtn } = refs;

let page;
let query;
let perPageValue = 15;

form.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onFormSubmit(e) {
  e.preventDefault();
  showLoader();

  query = e.target.elements.input.value.toLowerCase().trim();
  page = 1;

  gallery.innerHTML = '';
  if (query === '') {
    showError('Поле не може бути порожнім.');
    loadMoreBtn.classList.add('is-hidden');
    hideLoader();
    return;
  }

  const data = await getImages(query);
  if (data.totalHits === 0) {
    showError('Відсутні результати пошуку. Спробуйте ще раз!');
    hideLoader();
    loadMoreBtn.classList.add('is-hidden');
    return;
  }
  renderImages(data);
  checkLoadMore(data);

  e.target.reset();
  hideLoader();
}

async function getImages(searchRequestValue) {
  const params = {
    key: '42321641-23e42709c41860fd235775557',
    q: `${searchRequestValue}`
      .split(' ')
      .map(word => {
        return word.toLowerCase().trim();
      })
      .join('+'),
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };

  const url = `https://pixabay.com/api/?key=${params.key}&q=${params.q}&image_type=${params.image_type}&orientation=${params.orientation}&safesearch=${params.safesearch}&page=${page}&per_page=${perPageValue}`;
  const data = await axios.get(url);

  return data.data;
}

async function templateImage(data) {
  //===============================================
  const markup = data
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

async function renderImages(data) {
  const markup = await templateImage(data.hits);
  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

async function onLoadMore() {
  showLoader();
  const data = await getImages(query);
  checkLoadMore(data);
  renderImages(data);
  scrollPage();
  hideLoader();
}

function checkLoadMore(data) {
  const maxPage = Math.ceil(data.totalHits / page);

  if (page >= maxPage) {
    loadMoreBtn.classList.add('is-hidden');
    showMessage("We're sorry, but you've reached the end of search results.");
    return;
  } else if (page < maxPage) {
    loadMoreBtn.classList.remove('is-hidden');
    page++;
  }
}

function scrollPage() {
  const height = document
    .querySelector('.gallery-item')
    .getBoundingClientRect().height;

  setTimeout(() => {
    window.scrollBy({
      top: height * 2,
      behavior: 'smooth',
    });
  }, 100);
}

function showLoader() {
  loader.classList.remove('is-hidden');
}

function hideLoader() {
  loader.classList.add('is-hidden');
}

function showError(error) {
  iziToast.error({
    title: 'Помилка',
    message: `${error}`,
    position: 'topRight',
  });
}
function showMessage(msg) {
  iziToast.info({
    title: '',
    message: `${msg}`,
    position: 'topRight',
  });
}

var lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

// HELPERS: showError, showMessage, hideLoader, showLoader, scroll
// LOAD_MORE: checkLoadMore, onLoadMore
// RENDER: templateImage, renderImages, getImages

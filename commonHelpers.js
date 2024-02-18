import{a as w,i as p,S as $}from"./assets/vendor-b42c18af.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))l(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&l(d)}).observe(document,{childList:!0,subtree:!0});function o(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(s){if(s.ep)return;s.ep=!0;const r=o(s);fetch(s.href,r)}})();const v={form:document.querySelector(".form"),gallery:document.querySelector(".gallery"),loader:document.querySelector(".loader"),loadMoreBtn:document.querySelector(".load-more-btn")},{form:b,gallery:m,loader:f,loadMoreBtn:a}=v;let i,n,q=15;b.addEventListener("submit",M);a.addEventListener("click",P);async function M(e){if(e.preventDefault(),L(),n=e.target.elements.input.value.toLowerCase().trim(),i=1,m.innerHTML="",n===""){u("Поле не може бути порожнім."),a.classList.add("is-hidden"),c();return}const t=await h(n);if(t.totalHits===0){u("Відсутні результати пошуку. Спробуйте ще раз!"),c(),a.classList.add("is-hidden");return}g(t),y(t),e.target.reset(),c()}async function h(e){const t={key:"42321641-23e42709c41860fd235775557",q:`${e}`.split(" ").map(s=>s.toLowerCase().trim()).join("+"),image_type:"photo",orientation:"horizontal",safesearch:!0},o=`https://pixabay.com/api/?key=${t.key}&q=${t.q}&image_type=${t.image_type}&orientation=${t.orientation}&safesearch=${t.safesearch}&page=${i}&per_page=${q}`;return(await w.get(o)).data}async function S(e){return e.map(o=>`<li class="gallery-item">
 <a href="${o.largeImageURL}"> <img
    class="galery-img"
    src="${o.webformatURL}"
    alt="${o.tags}"

    width="360"
    height="200px"/>
    </a>
  <div class="description">
    <p class="description-item">
      Likes<span>${o.likes}</span>
    </p>
    <p class="description-item">
      Views<span>${o.views}</span>
    </p>
    <p class="description-item">
      Comments<span>${o.comments}</span>
    </p>
    <p class="description-item">
      Downloads<span>${o.downloads}</span>
    </p>
  </div>
</li>`).join("")}async function g(e){const t=await S(e.hits);m.insertAdjacentHTML("beforeend",t),k.refresh()}async function P(){L();const e=await h(n);y(e),g(e),x(),c()}function y(e){const t=Math.ceil(e.totalHits/i);if(i>=t){a.classList.add("is-hidden"),O("We're sorry, but you've reached the end of search results.");return}else i<t&&(a.classList.remove("is-hidden"),i++)}function x(){const e=document.querySelector(".gallery-item").getBoundingClientRect().height;setTimeout(()=>{window.scrollBy({top:e*2,behavior:"smooth"})},100)}function L(){f.classList.remove("is-hidden")}function c(){f.classList.add("is-hidden")}function u(e){p.error({title:"Помилка",message:`${e}`,position:"topRight"})}function O(e){p.info({title:"",message:`${e}`,position:"topRight"})}var k=new $(".gallery a",{captionsData:"alt",captionDelay:250});
//# sourceMappingURL=commonHelpers.js.map

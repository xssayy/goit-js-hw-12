import{a as $,i as p,S as v}from"./assets/vendor-b42c18af.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))l(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&l(d)}).observe(document,{childList:!0,subtree:!0});function s(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(o){if(o.ep)return;o.ep=!0;const r=s(o);fetch(o.href,r)}})();const b={form:document.querySelector(".form"),gallery:document.querySelector(".gallery"),loader:document.querySelector(".loader"),loadMoreBtn:document.querySelector(".load-more-btn")},{form:q,gallery:m,loader:f,loadMoreBtn:i}=b;let a,n,g=15;q.addEventListener("submit",M);i.addEventListener("click",P);async function M(e){if(e.preventDefault(),w(),n=e.target.elements.input.value.toLowerCase().trim(),a=1,m.innerHTML="",n===""){u("Поле не може бути порожнім."),i.classList.add("is-hidden"),c();return}const t=await h(n);if(t.totalHits===0){u("Відсутні результати пошуку. Спробуйте ще раз!"),c(),i.classList.add("is-hidden");return}y(t),L(t),e.target.reset(),c()}async function h(e){const t={key:"42321641-23e42709c41860fd235775557",q:`${e}`.split(" ").map(o=>o.toLowerCase().trim()).join("+"),image_type:"photo",orientation:"horizontal",safesearch:!0},s=`https://pixabay.com/api/?key=${t.key}&q=${t.q}&image_type=${t.image_type}&orientation=${t.orientation}&safesearch=${t.safesearch}&page=${a}&per_page=${g}`;return(await $.get(s)).data}async function S(e){return e.map(s=>`<li class="gallery-item">
 <a href="${s.largeImageURL}"> <img
    class="galery-img"
    src="${s.webformatURL}"
    alt="${s.tags}"

    width="360"
    height="200px"/>
    </a>
  <div class="description">
    <p class="description-item">
      Likes<span>${s.likes}</span>
    </p>
    <p class="description-item">
      Views<span>${s.views}</span>
    </p>
    <p class="description-item">
      Comments<span>${s.comments}</span>
    </p>
    <p class="description-item">
      Downloads<span>${s.downloads}</span>
    </p>
  </div>
</li>`).join("")}async function y(e){const t=await S(e.hits);m.insertAdjacentHTML("beforeend",t),k.refresh()}async function P(){w();const e=await h(n);L(e),y(e),x(),c()}function L(e){const t=Math.ceil(e.totalHits/g);if(a>=t){i.classList.add("is-hidden"),O("We're sorry, but you've reached the end of search results.");return}else a<t&&(i.classList.remove("is-hidden"),a++,console.log("Max page: ",t),console.log("Page: ",a))}function x(){const e=document.querySelector(".gallery-item").getBoundingClientRect().height;setTimeout(()=>{window.scrollBy({top:e*2,behavior:"smooth"})},100)}function w(){f.classList.remove("is-hidden")}function c(){f.classList.add("is-hidden")}function u(e){p.error({title:"Помилка",message:`${e}`,position:"topRight"})}function O(e){p.info({title:"",message:`${e}`,position:"topRight"})}var k=new v(".gallery a",{captionsData:"alt",captionDelay:250});
//# sourceMappingURL=commonHelpers.js.map

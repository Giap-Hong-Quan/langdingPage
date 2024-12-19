const gallery = document.querySelector(".gallery");
const images = document.querySelectorAll(".three__item__img");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const close = document.querySelector(".close");
const galleryImg = document.querySelector(".gallery__inner img");
console.log(galleryImg);

var currentIndex=0
images.forEach((image,index) => {
  image.addEventListener("click", () => {
      currentIndex=index
      galleryImg.src=images[currentIndex].src
    gallery.classList.add("show")
  });
});
close.addEventListener('click',()=>{
    gallery.classList.remove('show')
})

prev.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    galleryImg.src = images[currentIndex].src;
  });
next.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    galleryImg.src = images[currentIndex].src;
  });
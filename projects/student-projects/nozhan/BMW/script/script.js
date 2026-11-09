const searchInput = document.getElementById("searchInput");
const questionButtons = document.querySelectorAll(".question-btn");

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

function resizeInput() {

    const style = getComputedStyle(searchInput);

    ctx.font = style.font;

    const text = searchInput.value || searchInput.placeholder;

    const textWidth = ctx.measureText(text).width;

    searchInput.style.width = (textWidth + 2) + "px";
}

// تنظیم عرض اولیه
resizeInput();

// تغییر عرض هنگام تایپ
searchInput.addEventListener("input", resizeInput);

// انتخاب سوالات پیشنهادی
questionButtons.forEach(button => {

    button.addEventListener("click", function () {

        searchInput.value = this.textContent.trim();

        resizeInput();

        searchInput.focus();

    });

});

const siteHeader = document.querySelector(".site-header");

let lastState = false;

window.addEventListener("scroll", () => {

    const scrollPosition = window.scrollY;

    const shouldScroll = scrollPosition > 80;

    if (shouldScroll !== lastState) {

        siteHeader.classList.toggle(
            "is-scrolled",
            shouldScroll
        );

        lastState = shouldScroll;
    }

}, { passive: true });



const insightsSwiper = new Swiper(".insights-swiper", {

    slidesPerView: "auto",
    spaceBetween: 35,
    speed: 900,
    grabCursor: true,
    rewind: true,

    navigation: {
        nextEl: ".insights-next",
        prevEl: ".insights-prev",
    },

    pagination: {
        el: ".insights-pagination",
        type: "bullets",
        clickable: true,
    },

    on: {
        init: function () {
            updateActiveSlide(this);
        },

        slideChange: function () {
            updateActiveSlide(this);
        }
    }
});

function updateActiveSlide(swiper) {

    swiper.slides.forEach((slide, index) => {

        slide.classList.toggle(
            "is-current",
            index === swiper.activeIndex
        );

    });

}
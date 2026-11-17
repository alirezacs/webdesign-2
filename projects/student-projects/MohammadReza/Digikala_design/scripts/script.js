const secondSwiper = new Swiper(".secondSwiper", {
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },

    pagination: {
        el: ".secondSwiper-pagination",
        type: "progressbar",
    },

    navigation: {
        nextEl: ".secondSwiper-button-next",
        prevEl: ".secondSwiper-button-prev",
    },
});
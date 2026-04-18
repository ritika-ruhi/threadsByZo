document.addEventListener("DOMContentLoaded", () => {
    // Intersection Observer for fade-in animations
    const faders = document.querySelectorAll(".fade-in");
    
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add("appear");
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);
    
    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
    
    // Category Filtering
    const tabBtns = document.querySelectorAll(".tab-btn");
    const productItems = document.querySelectorAll(".product-item");

    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            tabBtns.forEach(t => t.classList.remove("active"));
            btn.classList.add("active");

            const filterValue = btn.getAttribute("data-filter");

            productItems.forEach(item => {
                if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
                    item.classList.remove("hidden");
                    item.style.animation = 'none';
                    item.offsetHeight; // trigger reflow
                    item.style.animation = null; 
                } else {
                    item.classList.add("hidden");
                }
            });
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelector(".nav-links");
    const menuToggle = document.querySelector(".menu-toggle");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("nav-active");

            // Hide the toggle button when menu is open
            menuToggle.classList.toggle("hidden");
        });
    }


    // ✅ Testimonial Slider
    const container = document.querySelector(".testimonial-container");
    const slides = document.querySelectorAll(".testimonial-slide");
    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");

    let index = 0;

    function updateSlide() {
        if (container) {
            container.style.transform = `translateX(-${index * 100}%)`;
        }
    }

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener("click", () => {
            index = (index + 1) % slides.length;
            updateSlide();
        });

        prevBtn.addEventListener("click", () => {
            index = (index - 1 + slides.length) % slides.length;
            updateSlide();
        });

        // Auto-Slide Every 5 Seconds
        setInterval(() => {
            index = (index + 1) % slides.length;
            updateSlide();
        }, 5000);
    } else {
        console.error("Error: Prev or Next button not found!");
    }

    // ✅ CTA Section Animation
    const ctaSection = document.querySelector(".cta");
    if (ctaSection) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    ctaSection.classList.add("fade-in");
                }
            });
        }, { threshold: 0.5 });

        observer.observe(ctaSection);
    }

    // ✅ CTA Button Click (Redirect)
    const ctaButton = document.querySelector(".cta-btn");
    if (ctaButton) {
        ctaButton.addEventListener("click", (e) => {
            e.preventDefault();
            if (confirm("Are you sure you want to enroll?")) {
                alert("You are being redirected to the enrollment page!");
                window.location.href = "enroll.html";
            } else {
                alert("Enrollment canceled.");
            }
        });
    } else {
        console.error("Error: .cta-btn not found!");
    }

    // ✅ Enroll Form Handling
    const enrollForm = document.getElementById("enrollForm");
    const successMessage = document.getElementById("successMessage");

    if (enrollForm) {
        enrollForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const course = document.getElementById("course").value;

            if (!name || !email || !phone || !course) {
                alert("Please fill in all fields before submitting.");
                return;
            }

            successMessage.classList.remove("hidden"); // Show success message

            // ✅ Clear form after 3 seconds
            setTimeout(() => {
                enrollForm.reset();
                successMessage.classList.add("hidden");
            }, 3000);
        });
    } else {
        console.error("Error: enrollForm not found!");
    }
});

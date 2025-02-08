document.addEventListener("DOMContentLoaded", function () {
    const portfolioItems = document.querySelectorAll(".portfolio-item");

    portfolioItems.forEach((item) => {
        const details = item.querySelector(".portfolio-details");

        // Desktop: Expande no hover
        if (window.innerWidth > 768) {
            item.addEventListener("mouseenter", function () {
                details.style.maxHeight = "500px"; // Define um valor grande o suficiente
                details.style.padding = "0";
            });

            item.addEventListener("mouseleave", function () {
                details.style.maxHeight = "0";
                details.style.padding = "0";
            });
        }

        // Mobile: Expande no clique
        else {
            item.addEventListener("click", function () {
                const isVisible = details.style.maxHeight !== "0px";

                // Fecha todos os outros
                document.querySelectorAll(".portfolio-details").forEach(d => {
                    d.style.maxHeight = "0";
                    d.style.padding = "0";
                });

                // Alterna o estado do item clicado
                details.style.maxHeight = isVisible ? "0" : "500px";
                details.style.padding = isVisible ? "0" : "10px";
            });
        }
    });
});

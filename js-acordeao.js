document.addEventListener("DOMContentLoaded", function () {
	const menu = document.querySelector(".menu-container"); // Substitui pelo seletor real do menu
	const portfolioItems = document.querySelectorAll(".portfolio-item");
	const portfolioHeader = document.querySelector(".portfolio-header-bar");

	function updateHeaderPosition() {
		if (menu && portfolioHeader) {
			const menuHeight = menu.offsetHeight; // Obtém a altura do menu
			portfolioHeader.style.top = menuHeight + "px"; // Define a posição correta
		}
	}

	// Atualiza no carregamento e ao redimensionar a janela
	updateHeaderPosition();
	window.addEventListener("resize", updateHeaderPosition);

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
		} else {
			item.addEventListener("click", function () {
				// Verifica se o conteúdo está visível com base na altura máxima
				const isVisible = details.style.maxHeight === "1500px";

				// Fecha todos os outros
				document.querySelectorAll(".portfolio-details").forEach(d => {
					d.style.maxHeight = "0";
					d.style.padding = "0";
				});

				// Alterna o estado do item clicado
				if (!isVisible) {
					details.style.maxHeight = "1500px";
					details.style.padding = "0";
				} else {
					details.style.maxHeight = "0";
					details.style.padding = "0";
				}
			});
		}
	});
});

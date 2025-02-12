// Efeito Acordeão

function portfolio_list_shortcode() {
    $args = array(
        'post_type' => 'post',
        'category_name' => 'portfolio',
        'posts_per_page' => -1,
        'no_found_rows' => true,
    );

    $query = new WP_Query($args);
    ob_start();

    if ($query->have_posts()) {
        echo '<div class="portfolio-container">'; // Contém tudo

        // Cabeçalho da listagem
        echo '	<div class="portfolio-header-bar">';
        echo '		<span class="portfolio-title">T</span>';
        echo '		<span class="portfolio-category">C</span>';
        echo '		<span class="portfolio-excerpt">D</span>';
        echo '		<span class="portfolio-year">Y</span>';
        echo '	</div>';

        echo '	<div class="portfolio-list">'; // Lista de portfólio

        while ($query->have_posts()) {
            $query->the_post();
            $categories = get_the_category();
            $subcategory_name = '';

            if (!empty($categories)) {
                foreach ($categories as $category) {
                    if ($category->parent !== 0 && strtolower($category->name) !== 'portfolio') {
                        $subcategory_name = $category->name;
                        break; // Obtém apenas a primeira subcategoria válida
                    }
                }
            }

            $title = wp_trim_words(get_the_title(), 5, '...'); /* limita a x palavras */
            // $title = mb_strimwidth(get_the_title(), 0, 20, '...'); /* limita a x letras */
            $category = wp_trim_words($subcategory_name, 15, '...');
            $excerpt = wp_trim_words(get_the_excerpt(), 30, '...');
			// $short_description = get_post_meta(get_the_ID(), 'short_description', true); /* versão inicial */
			$short_description = get_field('short_description') ? esc_html(get_field('short_description')) : 'N/A';
			$year = get_field('year') ? esc_html(get_field('year')) : 'N/A';

            $image_url = get_the_post_thumbnail_url();

            echo '		<div class="portfolio-item">';
            echo '			<div class="portfolio-header">';
            echo '				<span class="portfolio-title">' . esc_html($title) . '</span>';
            echo '				<span class="portfolio-category">' . esc_html($category) . '</span>';
            echo '				<span class="portfolio-excerpt">' . esc_html($excerpt) . '</span>';
            echo '				<span class="portfolio-year">' . esc_html($year) . '</span>';
            echo '			</div>';
            echo '			<div class="portfolio-details">';
            echo '				<div class="portfolio-detail-content">';
            echo '					<div class="portfolio-image">';
            if ($image_url) {
				echo '						<img src="' . esc_url($image_url) . '" alt="' . esc_attr(get_the_title()) . '" />';
            }
            echo '					</div>';
            echo '					<div class="portfolio-text">';
            echo '						<p>' . wp_kses_post(get_the_content()) . '</p>';
			// Verifica se existe descrição breve ou conteúdo e adiciona o link no final do texto
			if (!empty($excerpt) || !empty(get_the_content())) {
				echo '					<a href="' . esc_url(get_permalink()) . '" class="portfolio-read-more">[LINK]</a>';
}
            echo '					</div>'; // Fecha portfolio-text
            echo '				</div>'; // Fecha portfolio-detail-content
            echo '			</div>'; // Fecha portfolio-details
            echo '		</div>'; // Fecha portfolio-item
        }

        echo '	</div>'; // Fecha portfolio-list
        echo '</div>'; // Fecha portfolio-container
    } else {
        echo '<p>No items found in the portfolio.</p>';
    }

    wp_reset_postdata();
    return ob_get_clean();
}
add_shortcode('portfolio_list', 'portfolio_list_shortcode');

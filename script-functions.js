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
        echo '<div class="portfolio-header-bar">';
        echo '    <span class="portfolio-title">T</span>';
        echo '    <span class="portfolio-category">C</span>';
        echo '    <span class="portfolio-excerpt">D</span>';
        echo '    <span class="portfolio-year">Y</span>';
        echo '</div>';

        echo '<div class="portfolio-list">'; // Lista de portfólio

        while ($query->have_posts()) {
            $query->the_post();
            $categories = get_the_category();
            $subcategory_name = '';

            foreach ($categories as $category) {
                if ($category->cat_name !== 'portfolio' && $category->parent !== 0) {
                    $subcategory_name = $category->cat_name;
                }
            }

            $title = wp_trim_words(get_the_title(), 5, '...');
            $category = wp_trim_words($subcategory_name, 15, '...');
            $excerpt = wp_trim_words(get_the_excerpt(), 10, '...');
            $year = get_post_meta(get_the_ID(), 'ano', true);
            $image_url = get_the_post_thumbnail_url();

            echo '<div class="portfolio-item">';
            echo '    <div class="portfolio-header">';
            echo '        <span class="portfolio-title">' . esc_html($title) . '</span>';
            echo '        <span class="portfolio-category">' . esc_html($category) . '</span>';
            echo '        <span class="portfolio-excerpt">' . esc_html($excerpt) . '</span>';
            echo '        <span class="portfolio-year">' . esc_html($year) . '</span>';
            echo '    </div>';
            echo '    <div class="portfolio-details">';
            echo '        <div class="portfolio-detail-content">';
            echo '            <div class="portfolio-image">';
            if ($image_url) {
                echo '                <img src="' . esc_url($image_url) . '" alt="' . esc_attr(get_the_title()) . '" />';
            }
            echo '            </div>';
            echo '            <div class="portfolio-text">';
            echo '                <p>' . wp_kses_post(get_the_content()) . '</p>';
            echo '            </div>';
            echo '        </div>';
            echo '    </div>';
            echo '</div>';
        }

        echo '</div>'; // Fecha portfolio-list
        echo '</div>'; // Fecha portfolio-container
    } else {
        echo '<p>Nenhum item encontrado no portfólio.</p>';
    }

    wp_reset_postdata();
    return ob_get_clean();
}
add_shortcode('portfolio_list', 'portfolio_list_shortcode');

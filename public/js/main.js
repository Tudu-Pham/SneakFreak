(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner(0);

    // Fixed Navbar
    $(window).scroll(function () {
        if ($(window).width() < 992) {
            $('.fixed-top').toggleClass('shadow', $(this).scrollTop() > 55);
        } else {
            $('.fixed-top').toggleClass('shadow', $(this).scrollTop() > 55).css('top', 0);
        }
    });

    // Back to top button
    $(window).scroll(function () {
        $('.back-to-top').fadeToggle($(this).scrollTop() > 300);
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });

    // Testimonial carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 2000,
        center: false,
        dots: true,
        loop: true,
        margin: 25,
        nav: true,
        navText: ['<i class="bi bi-arrow-left"></i>', '<i class="bi bi-arrow-right"></i>'],
        responsiveClass: true,
        responsive: {
            0: { items: 1 },
            576: { items: 1 },
            768: { items: 1 },
            992: { items: 2 },
            1200: { items: 2 }
        }
    });

    // vegetable carousel
    $(".vegetable-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        center: false,
        dots: true,
        loop: true,
        margin: 25,
        nav: true,
        navText: ['<i class="bi bi-arrow-left"></i>', '<i class="bi bi-arrow-right"></i>'],
        responsiveClass: true,
        responsive: {
            0: { items: 1 },
            576: { items: 1 },
            768: { items: 2 },
            992: { items: 3 },
            1200: { items: 4 }
        }
    });

    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });

        $('#videoModal').on('shown.bs.modal', function () {
            $("#video").attr('src', $videoSrc + "?autoplay=1&modestbranding=1&showinfo=0");
        });

        $('#videoModal').on('hide.bs.modal', function () {
            $("#video").attr('src', $videoSrc);
        });
    });

    // Quantity change handler
    $('.quantity button').on('click', function () {
        const button = $(this);
        const input = button.closest('.quantity').find('input');
        const oldVal = parseInt(input.val());
        let newVal = oldVal;

        if (button.hasClass('btn-plus')) {
            newVal = oldVal + 1;
        } else {
            newVal = oldVal > 1 ? oldVal - 1 : 1;
        }
        input.val(newVal);

        const price = parseFloat(input.attr("data-cart-detail-price"));
        const id = input.attr("data-cart-detail-id");
        const priceElement = $(`p[data-cart-detail-id='${id}']`);

        if (priceElement.length) {
            const newLineTotal = price * newVal;
            priceElement.text(formatCurrency(newLineTotal));
        }

        updateSubtotal();
    });

    function updateSubtotal() {
        let subtotal = 0;

        $('input[data-cart-detail-id]').each(function () {
            const qty = parseInt($(this).val());
            const price = parseFloat($(this).attr("data-cart-detail-price"));
            subtotal += qty * price;
        });

        const shipping = subtotal > 500 ? 0 : 3;
        const total = subtotal + shipping;

        $('[data-shipping-price]').text(formatCurrency(shipping));

        $('[data-cart-total-price]').each(function () {
            const isTotal = $(this).text().includes("3.00") || $(this).text().includes("Shipping");
            const value = isTotal ? total : subtotal;

            $(this).text(formatCurrency(value));
            $(this).attr("data-cart-total-price", value);
        });
    }


    function formatCurrency(value) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(value);
    }

})(jQuery);

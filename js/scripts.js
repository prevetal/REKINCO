WW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth
WH = window.innerHeight || document.clientHeight || document.getElementsByTagName('body')[0].clientHeight
BODY = document.getElementsByTagName('body')[0]


document.addEventListener('DOMContentLoaded', function() {
	// Main slider
	let mainSlider = document.querySelector('.main_slider .swiper')

	if (mainSlider) {
		new Swiper('.main_slider .swiper', {
			loop: true,
			speed: 750,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 0,
			slidesPerView: 1,
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			lazy: true
		})
	}


	// Product titles slider
	const productTitlesSliders = [],
		productTitles = document.querySelectorAll('.products .titles .swiper')

	productTitles.forEach((el, i) => {
		el.classList.add('product_titles_s' + i)

		let options = {
			loop: true,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 0,
			slidesPerView: 1,
			allowTouchMove: false
		}

		productTitlesSliders.push(new Swiper('.product_titles_s' + i, options))
	})


	// Product
	const productThumbSliders = [],
		productBigSliders = []

	const productThumb = document.querySelectorAll('.products .product .thumbs .swiper'),
		productBig = document.querySelectorAll('.products .product .big .swiper')

	productThumb.forEach((el, i) => {
		el.classList.add('product_thumb_s' + i)

		let options = {
			loop: true,
			loopAdditionalSlides: 1,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			lazy: true,
			nested: true,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			breakpoints: {
				0: {
					slidesPerView: 4,
					spaceBetween: 8
				},
				1024: {
					slidesPerView: 5,
					spaceBetween: 10
				}
			},
		}

		productThumbSliders.push(new Swiper('.product_thumb_s' + i, options))
	})

	productBig.forEach((el, i) => {
		el.classList.add('product_big_s' + i)

		let options = {
			loop: true,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 0,
			slidesPerView: 1,
			lazy: true,
			nested: true,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			thumbs: {
				swiper: productThumbSliders[i]
			}
		}

		productBigSliders.push(new Swiper('.product_big_s' + i, options))
	})


	// Product slider
	const productMainSliders = [],
		productMain = document.querySelectorAll('.products .main.swiper')

	productMain.forEach((el, i) => {
		el.previousElementSibling.setAttribute('data-slider-index', i)
		el.classList.add('product_main_s' + i)

		let options = {
			loop: true,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 24,
			slidesPerView: 1,
			navigation: {
				nextEl: '.swiper-button-next-main',
				prevEl: '.swiper-button-prev-main'
			},
			on: {
				activeIndexChange: swiper => setTimeout(() => {
					$('.products .toggles .btn').removeClass('active')
					$('.products .toggles .btn').eq(swiper.realIndex).addClass('active')
				})
			}
		}

		productMainSliders.push(new Swiper('.product_main_s' + i, options))

		productMainSliders[i].controller.control = productTitlesSliders[i]
	})

	$('.products .toggles .btn').click(function(e) {
		e.preventDefault()

		const sliderIndex = parseInt($(this).closest('.toggles').data('slider-index'))

		productMainSliders[sliderIndex].slideToLoop(parseInt($(this).data('slide-index')), 500)
	})


	// Smooth scrolling to products
	const productsBtns = document.querySelectorAll('.products_btn')

	if (productsBtns) {
		productsBtns.forEach(element => {
			element.addEventListener('click', e => {
				e.preventDefault()

				let sliderIndex = parseInt(element.getAttribute('data-slider-index')),
					slideIndex = parseInt(element.getAttribute('data-slide-index'))

				productMainSliders[sliderIndex].slideToLoop(slideIndex, 500)

				document.getElementById('products').scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				}, 1000)
			})
		})
	}


	// Smooth scrolling to anchor
	const scrollBtns = document.querySelectorAll('.scroll_btn')

	if (scrollBtns) {
		scrollBtns.forEach(element => {
			element.addEventListener('click', e => {
				e.preventDefault()

				let anchor = element.getAttribute('data-anchor')

				document.getElementById(anchor).scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				}, 1000)
			})
		})
	}


	// Collection
	$('.collection .points:not(.mob) .point').click(function(e) {
		e.preventDefault()

		$('.collection .point_wrap').removeClass('active')

		$(this).toggleClass('active')

		$(this).hasClass('active')
			? $(this).closest('.point_wrap').addClass('active')
			: $(this).closest('.point_wrap').removeClass('active')
	})


	// Mob. menu
	$('.mob_header .mob_menu_btn').click((e) => {
		e.preventDefault()

		$('.mob_header .mob_menu_btn').toggleClass('active')
		$('body').toggleClass('lock')
		$('header').toggleClass('show')

		$('.mob_header .mob_menu_btn').hasClass('active')
			? $('.overlay').fadeIn(300)
			: $('.overlay').fadeOut(300)
	})


	// Phone input mask
	const phoneInputs = document.querySelectorAll('input[type=tel]')

	if (phoneInputs) {
		phoneInputs.forEach(el => {
			IMask(el, {
				mask: '+{7} (000) 000-00-00',
				lazy: true
			})
		})
	}


	// Mob. collection points
	$('.collection .points.mob .point').click(function(e) {
		e.preventDefault()

		const parent = $(this).closest('.points'),
			infoIndex = $(this).data('point-index')

		parent.find(`.point${infoIndex}_info`).addClass('show')
	})


	$('.collection .point_info .close_btn').click(function(e) {
		e.preventDefault()

		const parent = $(this).closest('.point_info')

		parent.removeClass('show')
	})


	// Mob. menu
	$('header .mob_menu_btn, .mob_menu .close_btn').click(function(e) {
		e.preventDefault()

		$('body').toggleClass('lock')
		$('.mob_menu').toggleClass('show')
	})


	// 'Up' button
	document.querySelector('.btnUp').addEventListener('click', (e) => {
		e.preventDefault()

		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		})
	})
})



window.addEventListener('load', () => {
	// Main slider height
	mainSliderVar()
})



window.addEventListener('scroll', () => {
	const viewportHeight = window.innerHeight

	document.querySelectorAll('.parallax').forEach(el => {
		const speed = parseFloat(el.dataset.speed) || 0.1,
			rect = el.getBoundingClientRect(),
			offset = (rect.top - viewportHeight / 2) * speed

		el.style.transform = `translateY(${offset}px)`
	})
})



window.addEventListener('resize', function () {
	WH = window.innerHeight || document.clientHeight || BODY.clientHeight

	let windowW = window.outerWidth

	if (typeof WW !== 'undefined' && WW != windowW) {
		// Overwrite window width
		WW = window.innerWidth || document.clientWidth || BODY.clientWidth
	}

	// Main slider height
	mainSliderVar()
})



// Main slider height
function mainSliderVar() {
  const el = document.querySelector('.main_slider .cont')

  if (!el) return

  document.documentElement.style.setProperty('--main_slider_height', `${el.offsetHeight}px`)
}
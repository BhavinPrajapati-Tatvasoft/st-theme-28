$(document).ready(function () {
	//Prevent Page Reload on all # links
	$("body").on("click", "a[href='#']", function (e) {
		e.preventDefault();
	});

	//placeholder
	$("[placeholder]").each(function () {
		$(this).attr("data-placeholder", this.placeholder);
		$(this).bind("focus", function () {
			this.placeholder = '';
		});
		$(this).bind("blur", function () {
			this.placeholder = $(this).attr("data-placeholder");
		});
	});

	// On scroll Add Class
	$(window).scroll(function (e) {
		if ($(window).scrollTop() > 200) {
			$(".wrapper").addClass('page-scrolled');
		}
		else {
			$(".wrapper").removeClass('page-scrolled');
		}
	});


	// Add remove class when window resize finished
	var $resizeTimer;
	$(window).on("resize", function (e) {
		if (!$("body").hasClass("window-resizing")) {
			$("body").addClass("window-resizing");
		}
		clearTimeout($resizeTimer);
		$resizeTimer = setTimeout(function () {
			$("body").removeClass("window-resizing");
		}, 250);
	});

	// Add new js functions here -----------------------------------------------------------------
	// setTimeout(
	// 	function () {
	// 		var el = document.getElementById("inputUsername");
	// 		(el != null) ? el.focus() : setTimeout(arguments.callee, 10);
	// 	}
	// 	, 10);

	var $mainClass = $(".tab-heading");
	$mainClass.each(function () {
		var $tab = $(this);
		function ulWidth() {
			var navW = 0;
			$tab.find("> .nav-tabs > a").each(function () {
				navW = navW + $(this).outerWidth(true);
			});
			$tab.find("> .nav-tabs").css({ "width": navW + 2 });
		}
		ulWidth();
		$(window).resize(function () {
			ulWidth();
		});

		$tab.jScrollPane({
			showArrows: true
		});

		function scrollAdj() {
			$tab.data('jsp').reinitialise();
		};
		scrollAdj();
		$(window).resize(function () {
			scrollAdj();
		});

		$tab.find(".nav-tabs a").click(function (e) {
			var $this = $(this);
			e.preventDefault();
			if ($tab.attr('active-center') == "true") {
				$tab.data('jsp').scrollByX(parseInt(($this.offset().left - $tab.offset().left) + ($this.innerWidth() / 2)) - ($tab.innerWidth() / 2));
			}
			$(window).resize();
		});
	});

	$(".nav-toggle").click(function () {
		$("body").addClass("menu-open");
	});
	$(".canvas-background").click(function () {
		$("body").removeClass("menu-open");
	});
	$(".tab-search-btn").click(function (e) {
		e.stopImmediatePropagation();
		$(".search").toggleClass("show-search");
	});
	$(".search").click(function (e) {
		e.stopImmediatePropagation();
	});
	$("body").click(function () {
		$(".search").removeClass("show-search");
	});

	$("body").on("show.bs.select", ".selectpicker", function () {
		$(this).closest(".bootstrap-select-outer").css({ "z-index": "1", "position": "relative" });
	})

	$("body").on("hide.bs.select", ".selectpicker", function () {
		$(this).closest(".bootstrap-select-outer").css("z-index", "0");
	})

	// Don't add anything below this --------------------------------------------------------------
	// Add Class on Window Load
	$("body").addClass("page-loaded");
});
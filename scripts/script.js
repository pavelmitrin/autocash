// header 
const burgerButton = document.querySelector('button[data-toggle="collapse"]');

burgerButton.addEventListener('click', () => {
	burgerButton.classList.toggle('active');
	burgerButton.nextElementSibling.classList.toggle('collapse');
})


const navLinks = document.querySelectorAll('.nav-link');
for (const link of navLinks) {
	link.addEventListener('click', () => {
		burgerButton.classList.remove('active');
		burgerButton.nextElementSibling.classList.remove('collapse');
	})
}



// accordion
let categoryDocs = document.querySelectorAll('.doc__title');

for (const categoryDoc of categoryDocs) {
	categoryDoc.addEventListener('click', () => {
		categoryDoc.classList.toggle('active')
		let docs = categoryDoc.nextElementSibling.children;
		let height = 0;
		for (const doc of docs) {
			height += doc.offsetHeight + 10;
			if (!categoryDoc.classList.contains('active')) {
				height = 0;
			}
		}
		categoryDoc.nextElementSibling.style.height = `${height}px`;
	})
}

// modal 

	const popupLinks = document.querySelectorAll('.popup-link');
	const body = document.body;
	const lockPadding = document.querySelectorAll('.lock-padding');

	let unlock = true;

	const timeout = 800;


	if (popupLinks.length > 0) {
		for (let index = 0; index < popupLinks.length; index++) {
			const popupLink = popupLinks[index];
			popupLink.addEventListener('click', function (e) {
				const popupName = popupLink.getAttribute('href').replace('#', '');
				const curentPopup = document.getElementById(popupName);
				popupOpen(curentPopup);
				e.preventDefault();
			});
		}
	}

	const popupCloseIcon = document.querySelectorAll('.modal__close');
	if (popupCloseIcon.length > 0) {
		for (let index = 0; index < popupCloseIcon.length; index++) {
			const el = popupCloseIcon[index];
			el.addEventListener('click', function (e) {
				popupClose(el.closest('.modal'));
				e.preventDefault();
			});
		}
	}

	function popupOpen(curentPopup) {
		if (curentPopup && unlock) {
			const popupActive = document.querySelector('.modal.active');
			if (popupActive) {
				popupClose(popupActive, false);
			} else {
				bodyLock();
			}
			curentPopup.classList.add('active');
			curentPopup.addEventListener('click', function (e) {
				if (!e.target.closest('.modal__content')) {
					popupClose(e.target.closest('.modal'));
				}
			})
		};
	}
	function popupClose(popupActive, doUnlock = true) {
		if (unlock) {
			popupActive.classList.remove('active');
			if (doUnlock) {
				bodyUnLock();
			}
		}
	}
	function bodyLock() {
		const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

		if (lockPadding.length > 0) {
			for (let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index];
				el.getElementsByClassName.PaddingRight = lockPaddingValue;
			}
		}
		body.style.paddingRight = lockPaddingValue;
		body.classList.add('lock');

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, timeout)
	}
	function bodyUnLock() {
		setTimeout(function () {
			for (let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index];
				el.style.paddingRight = '0px';
			}
			body.style.paddingRight = '0px';
			body.classList.remove('lock');
		}, timeout);
	}

	document.addEventListener('keydown', function (e) {
		if (e.which === 27) {
			const popupActive = document.querySelector('.modal.active');
			popupClose(popupActive);
		}
	});
	(function () {
		//Проверяем поддержку
		if (!Element.prototype.closest) {
			//реализуем
			Element.prototype.closest = function (css) {
				var node = this;
				while (node) {
					if (node.matches(css)) return node;
					else node = node.parentElement;
				}
				return null;
			};
		}
	})();
	(function () {
		// Проверяем поддержку
		if (!Element.prototype.matches) {
			//определяем свойство
			Element.prototype.matches = Element.prototype.matchesSelector ||
				Element.prototype.webkitMatchesSelector ||
				Element.prototype.mozMatchesSelector ||
				Element.prototype.msMatchesSelector;
		}
	})();
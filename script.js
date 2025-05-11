const searchInput = document.querySelector('.input-with-icon');
const iconContainer = document.querySelector('.search_and_cart');
const priceItem = document.querySelector('#old_price');

const textUnderLogo = document.querySelector('.text_under_logo');
const containerTextUnderLogo = document.querySelector('.payment_methods');
const originalParentLogo = textUnderLogo.parentElement;

let searchIcon = null;

function toggleElement() {
    const isInRange = window.innerWidth >= 771 && window.innerWidth <= 1702;

    searchInput.style.display = isInRange ? 'none' : 'block';

    if (searchIcon) {
        searchIcon.remove();
        searchIcon = null;
    }

    if (isInRange) {
        searchIcon = document.createElement('img');
        searchIcon.src = './pictures/icons/black_scope.svg';
        searchIcon.alt = 'Лупа';
        iconContainer.prepend(searchIcon);
        priceItem.textContent = '22 060 ₽';
    } else {
        priceItem.textContent = '6 060 ₽';
    }
}

function relocateText() {
    const isInRange = window.innerWidth >= 390 && window.innerWidth <= 770;

    if (isInRange && textUnderLogo.parentElement !== containerTextUnderLogo) {
        const textUnderLogoWrapper = document.createElement('div');
        textUnderLogoWrapper.appendChild(textUnderLogo);
        containerTextUnderLogo.appendChild(textUnderLogoWrapper);
    } else if (!isInRange && textUnderLogo.parentElement !== originalParentLogo) {
        originalParentLogo.appendChild(textUnderLogo);
    }
}

const legalLinks = document.querySelector('.legal_links');
const address = document.querySelector('.address_container');
const originalParentLegal = legalLinks.parentElement;

function relocateLegalLinks() {
    const currentWidth = window.innerWidth;
    
    if (currentWidth <= 770 && currentWidth !== 390 && legalLinks.parentElement !== address) {
        address.appendChild(legalLinks);
    } else if ((currentWidth > 770 || currentWidth === 390) && legalLinks.parentElement !== originalParentLegal) {
        originalParentLegal.appendChild(legalLinks);
    }
}

function wrapElements() {
    const screenWidth = window.innerWidth;
    const wrapperClass = 'address-contacts-services_container';

    // Элементы, которые нужно обернуть
    const addressContactsContainer = document.querySelector('.address-contacts_container');
    const servicesContainer = document.querySelector('.services_container');

    // Проверяем, существует ли уже обертка
    let wrapper = document.querySelector(`.${wrapperClass}`);

    if (screenWidth <= 770) {
        // Если обертки нет и экран <= 770px - создаем ее
        if (!wrapper && addressContactsContainer && servicesContainer) {
            wrapper = document.createElement('div');
            wrapper.className = wrapperClass;

            // Вставляем обертку перед первым элементом
            addressContactsContainer.parentNode.insertBefore(wrapper, addressContactsContainer);

            // Добавляем элементы в обертку
            wrapper.appendChild(addressContactsContainer);
            wrapper.appendChild(servicesContainer);
        }
    } else {
        // Если экран > 770px и обертка существует - удаляем ее
        if (wrapper) {
            // Вставляем элементы обратно на место перед удалением обертки
            wrapper.parentNode.insertBefore(addressContactsContainer, wrapper);
            wrapper.parentNode.insertBefore(servicesContainer, wrapper);

            // Удаляем обертку
            wrapper.parentNode.removeChild(wrapper);
        }
    }
}

// Вызываем при загрузке и при изменении размера окна
wrapElements();
window.addEventListener('resize', wrapElements);

window.addEventListener('resize', relocateLegalLinks);
window.addEventListener('DOMContentLoaded', relocateLegalLinks);

// Добавляем оба обработчика по-отдельности
window.addEventListener('resize', toggleElement);
window.addEventListener('resize', relocateText);
window.addEventListener('DOMContentLoaded', toggleElement);
window.addEventListener('DOMContentLoaded', relocateText);
window.addEventListener('DOMContentLoaded', () => {
    const servicesSections = document.querySelector('.services__sections'),
          serviceSectionsItems = document.querySelectorAll('.services__sections__item');

    servicesSections.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('services__sections__item')) {
            serviceSectionsItems.forEach(element => {
                element.classList.remove('services__sections__item_active');
            });
            e.target.classList.add('services__sections__item_active');
        }
    });
});
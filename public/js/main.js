window.addEventListener('DOMContentLoaded', () => {
    // активация кнопок вверхку секций
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


    // Скрытие и раскрытие дочерних элементов
  class ServicesBlock {
    constructor(block) {
      this.block = block;
      this.expandButton = this.block.querySelector('#services-expand');
      this.hiddenButtons = this.block.querySelectorAll('#services-expand-hidden-button');
      this.cards = this.block.querySelectorAll('.services__block__line__card');
      this.mobileCardsToShow = 3;
      this.desktopCardsToShow = 6;
      this.isExpanded = false;

      this.checkWindowWidth();
      this.hideExtraCards();
      this.checkServiceBlockLineVisibility();

      window.addEventListener('resize', this.checkWindowWidth.bind(this));
      this.expandButton.addEventListener('click', this.toggleExpand.bind(this));
    }

    checkWindowWidth() {
      const prevCardsToShow = this.cardsToShow;
      this.cardsToShow = window.innerWidth < 992 ? this.mobileCardsToShow : this.desktopCardsToShow;

      if (prevCardsToShow !== this.cardsToShow) {
        this.hideExtraCards();
      }

      if (window.innerWidth < 992) {
        this.hiddenButtons.forEach(button => {
          button.classList.remove('hidden');
        });
      } else {
        this.hiddenButtons.forEach(button => {
          button.classList.add('hidden');
        });
      }
    }

    hideExtraCards() {
      for (let i = 0; i < this.cards.length; i++) {
        if (i >= this.cardsToShow) {
          this.cards[i].classList.add('hidden');
        } else {
          this.cards[i].classList.remove('hidden');
        }
      }
    }

    checkServiceBlockLineVisibility() {
      document.querySelectorAll('.services__block__line').forEach(line => {
        const cards = line.querySelectorAll('.services__block__line__card');

        if (Array.from(cards).every(card => card.classList.contains('hidden'))) {
          line.classList.add('hidden');
        } else {
          line.classList.remove('hidden');
        }
      });
    }

    toggleExpand() {
      for (let i = this.cardsToShow; i < this.cards.length; i++) {
        if (!this.isExpanded) {
          this.cards[i].classList.remove('hidden');
          this.expandButton.querySelector('img').classList.remove('arrow-down');
          this.expandButton.querySelector('img').classList.add('arrow-up');
        } else {
          this.cards[i].classList.add('hidden');
          this.expandButton.querySelector('img').classList.remove('arrow-up');
          this.expandButton.querySelector('img').classList.add('arrow-down');
        }
        this.checkServiceBlockLineVisibility();
      }
      this.isExpanded = !this.isExpanded;
    }
  }

  function expandServices() {
    document.querySelectorAll('.services__block').forEach(block => {
      new ServicesBlock(block);
    });
  }
  expandServices();

  // Прокурутка меню услуг
  let sectionsWrapper = document.querySelector('.services__sections-wrapper');
  let sections = document.querySelector('.services__sections');

  let touchStartX = 0;
  let touchEndX = 0;

  sectionsWrapper.addEventListener('touchstart', function(event) {
    touchStartX = event.touches[0].clientX;
  });

  sectionsWrapper.addEventListener('touchmove', function(event) {
    touchEndX = event.touches[0].clientX;
    var diffX = touchStartX - touchEndX;
    sectionsWrapper.scrollLeft += diffX;
    touchStartX = touchEndX;
  });

  // Прокрутка меню курсором на десктопной версии

  let isMousePressed = false;
  let mouseStartX;
  let scrollStartPosition;
  
  sectionsWrapper.addEventListener('mousedown', (event) => {
    isMousePressed = true;
    sectionsWrapper.classList.add('active');
    mouseStartX = event.pageX - sectionsWrapper.offsetLeft;
    scrollStartPosition = sectionsWrapper.scrollLeft;
  });
  
  sectionsWrapper.addEventListener('mouseleave', () => {
    isMousePressed = false;
    sectionsWrapper.classList.remove('active');
  });
  
  sectionsWrapper.addEventListener('mouseup', () => {
    isMousePressed = false;
    sectionsWrapper.classList.remove('active');
  });
  
  sectionsWrapper.addEventListener('mousemove', (event) => {
    if (!isMousePressed) {
      return;
    }
    event.preventDefault();
    const mouseX = event.pageX - sectionsWrapper.offsetLeft;
    const distance = (mouseX - mouseStartX) * 1; // можно изменить чувствительность скролла
    sectionsWrapper.scrollLeft = scrollStartPosition - distance;
  });
  
  


 
});


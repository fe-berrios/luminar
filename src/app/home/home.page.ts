import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  private slides: HTMLElement[] = [];
  private currentIndex: number = 0;
  private slideInterval: number = 5000; // Tiempo en milisegundos (5 segundos)
  private intervalId?: number;

  constructor() {}

 ngOnInit(): void {
    this.initCarousel();
  }

  private initCarousel(): void {
    const carouselElement = document.getElementById('default-carousel');
    if (carouselElement) {
      this.slides = Array.from(carouselElement.querySelectorAll('[data-carousel-item]'));
      this.showSlide(this.currentIndex);

      // Configurar rotación automática
      this.intervalId = window.setInterval(() => this.nextSlide(), this.slideInterval);

      // Agregar eventos a los botones de navegación
      const prevButton = carouselElement.querySelector('[data-carousel-prev]');
      const nextButton = carouselElement.querySelector('[data-carousel-next]');

      prevButton?.addEventListener('click', () => this.prevSlide());
      nextButton?.addEventListener('click', () => this.nextSlide());

      // Pausar y reanudar rotación al pasar el mouse
      carouselElement.addEventListener('mouseenter', () => this.stopAutoSlide());
      carouselElement.addEventListener('mouseleave', () => this.startAutoSlide());
    }
  }

  private showSlide(index: number): void {
    this.slides.forEach((slide, i) => {
      slide.classList.toggle('opacity-100', i === index);
      slide.classList.toggle('opacity-0', i !== index);
    });
    this.currentIndex = index;
  }

  private nextSlide(): void {
    const nextIndex = (this.currentIndex + 1) % this.slides.length;
    this.showSlide(nextIndex);
  }

  private prevSlide(): void {
    const prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.showSlide(prevIndex);
  }

  private stopAutoSlide(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }

  private startAutoSlide(): void {
    if (!this.intervalId) {
      this.intervalId = window.setInterval(() => this.nextSlide(), this.slideInterval);
    }
  }
}

import RestaurantSource from '../../data/restaurant-source';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Home = {
  async render() {
    return `
      <div tabindex="0" class="hero">
        <div class="hero__inner">
          <h1 tabindex="0" class="hero__title">Bingung Mau Makan Apa Hari Ini?</h1>
          <p tabindex="0" class="hero__tagline">Pilihlah tempat makan favorit dari berbagai rekomendasi restorant yang sudah kami sediakan</p>
        </div>
      </div>

      <div class="content">
        <h2 class="content__heading" tabindex="0">Daftar Restoran</h2>
        <div id="restaurants" class="restaurants">
          <div class="loading-indicator">Loading...</div>
        </div>
        <div id="error-message" class="error-message hidden">Terjadi kesalahan saat memuat data.</div>
      </div>
    `;
  },

  async afterRender() {
    try {
      const restaurants = await RestaurantSource.listRestaurants();
      const restaurantsContainer = document.querySelector('#restaurants');
      restaurantsContainer.innerHTML = '';
      restaurants.forEach((restaurant) => {
        restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
      });

      const loadingIndicator = document.querySelector('.loading-indicator');
      if (loadingIndicator) {
        loadingIndicator.classList.add('hidden');
      }

      const errorMessage = document.querySelector('#error-message');
      if (errorMessage) {
        errorMessage.classList.add('hidden');
      }
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      const loadingIndicator = document.querySelector('.loading-indicator');
      if (loadingIndicator) {
        loadingIndicator.classList.add('hidden');
      }
      const errorMessage = document.querySelector('#error-message');
      if (errorMessage) {
        errorMessage.classList.remove('hidden');
      }
    }
  }
};

export default Home;
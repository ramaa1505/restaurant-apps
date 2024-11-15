import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Favorite = {
  async render() {
    return `
      <div class="content">
      <h2 class="content__heading" tabindex="0">Daftar Restoran Favorit</h2>
      <div id="restaurants" class="restaurants">
        <div class="loading-indicator">Loading...</div>
      </div>
      <div id="error-message" class="error-message hidden">Terjadi kesalahan saat memuat data.</div>
    </div>
    `;
  },

  async afterRender() {
    try {
      const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
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

export default Favorite;
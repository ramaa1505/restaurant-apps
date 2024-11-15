import CONFIG from '../../globals/config';

const createRestaurantItemTemplate = (restaurant) => `
  <div class="restaurant-item">
    <div class="restaurant-item__header">
      <img loading="lazy" tabindex="0" class="restaurant-item__header__image" alt="${restaurant.name}"
           src="${CONFIG.BASE_IMAGE_URL}${restaurant.pictureId}">
      <div class="restaurant-item__header__rating">
        <p tabindex="0">⭐️<span class="restaurant-item__header__rating__score">${restaurant.rating}</span></p>
      </div>
      <div class="restaurant-item__header__city">
        <p tabindex="0">📍${restaurant.city}</p>
      </div>
    </div>
    <div class="restaurant-item__content">
      <h3 class="restaurant-item__content__name">
        <a tabindex="0" href="#/detail/${restaurant.id}">${restaurant.name}</a>
      </h3>
      <p tabindex="0" class="restaurant-item__content__description">${restaurant.description}</p>
    </div>
  </div>
`;

const createRestaurantDetailTemplate = (restaurant) => `
  <img loading="lazy" tabindex="0" class="restaurant__poster" src="${CONFIG.BASE_IMAGE_URL}${restaurant.pictureId}" alt="${restaurant.name}" />
  <h2 tabindex="0" class="restaurant__name">${restaurant.name}</h2>
  <div class="restaurant__info">
    <h3 tabindex="0">Information</h3>
    <h4 tabindex="0">Alamat</h4>
    <p tabindex="0">${restaurant.address}</p>
    <h4 tabindex="0">Kota</h4>
    <p tabindex="0">${restaurant.city}</p>
    <h4 tabindex="0">Deskripsi</h4>
    <p tabindex="0">${restaurant.description}</p>
  </div>
  <div class="restaurant__menus">
    <h3 tabindex="0">Menu Makanan</h3>
    <ul tabindex="0">
      ${restaurant.menus.foods.map((food) => `<li>${food.name}</li>`).join('')}
    </ul>
    <h3 tabindex="0">Menu Minuman</h3>
    <ul tabindex="0">
      ${restaurant.menus.drinks.map((drink) => `<li>${drink.name}</li>`).join('')}
    </ul>
  </div>
  <div class="restaurant__reviews">
    <h3 tabindex="0">Customer Reviews</h3>
    ${restaurant.customerReviews
    .map(
      (review) => `
          <div class="review">
            <p tabindex="0"><strong>${review.name}</strong></p>
            <p tabindex="0">${review.review}</p>
            <p tabindex="0"><em>${review.date}</em></p>
          </div>
        `,
    )
    .join('')}
  </div>
`;

const createLikeRestaurantButtonTemplate = () => `
  <button tabindex="0" aria-label="like this restaurant" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createUnlikeRestaurantButtonTemplate = () => `
  <button tabindex="0" aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  createLikeRestaurantButtonTemplate,
  createUnlikeRestaurantButtonTemplate,
};
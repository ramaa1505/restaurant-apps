const assert = require('assert');

Feature('Like and Unlike Restaurant');

Scenario('liking a restaurant', async ({ I }) => {
  // Buka halaman home
  I.amOnPage('/#/home');

  // Pilih restaurant 
  I.seeElement('.restaurant-item');
  I.seeElement('.restaurant-item__content__name');
  const firstRestaurant = locate('.restaurant-item__content__name a').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  
  // Klik restaurant yg dipilih untuk melihat detailnya
  I.click(firstRestaurant);

  // Pastikan kita berada di halaman detail dan melihat tombol like
  I.seeElement('#likeButton');
  
  // Klik tombol like
  I.click('#likeButton');

  // Buka halaman favorite
  I.amOnPage('/#/favorite');
  
  // Pastikan restaurant yg disukai muncul di halaman favorit
  I.seeElement('.restaurant-item');
  const likedRestaurantTitle = await I.grabTextFrom('.restaurant-item__content__name a');
  
  // Verifikasi restaurant yg disukai sesuai dengan yang kita pilih
  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});

Scenario('unliking a restaurant', async ({ I }) => {
  // Buka halaman home
  I.amOnPage('/#/home');
  
  // Pilih restaurant yg disukai dan klik tombol like 
  I.click(locate('.restaurant-item__content__name a').first());
  I.seeElement('#likeButton');
  I.click('#likeButton');
  
  // Buka halaman favorite
  I.amOnPage('/#/favorite');
  
  // Pilih restaurant di halaman favorite
  I.seeElement('.restaurant-item__content__name a');
  I.click(locate('.restaurant-item__content__name a').first());
  
  // Unlike restaurant
  I.seeElement('#likeButton');
  I.click('#likeButton');
  
  // Kembali ke halaman favorite
  I.amOnPage('/#/favorite');
  
  // Pastikan tidak ada restaurant yg sudah di unlike barusan
  I.dontSeeElement('.restaurant-item');
});
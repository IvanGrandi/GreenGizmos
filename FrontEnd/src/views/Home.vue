<template>
  <div class="banner">
    <img src="../imgs/laptop_586.webp" alt="Refurbished laptop" width="400" height="273" />
    <div class="banner-text">
      <h1>Upgrade Your Tech Today</h1>
      <h1>by taking care of the environment</h1>
    </div>
  </div>

  <div class="site_description">
    <div class="site_description_text">
      <h1>Corporate IT Equipment Focused Version</h1>
      <p>
        GreenGizmos is your trusted source for high-quality refurbished
        corporate IT equipment. We help businesses save money and reduce e-waste
        by offering tested, reliable laptops, desktops, servers, and
        accessories—at a fraction of the original price. Whether you're
        upgrading your office tech or equipping a remote team, GreenGizmos
        delivers performance and sustainability in one smart package.
      </p>
    </div>
    <img src="../imgs/logo.webp" alt="GreenGizmos logo" loading="lazy" width="200" height="200" />
  </div>

  <section class="featured_products_section">
    <h1>Refurbished & Recommended products</h1>
    <hr />
    <div class="featured_products_container">
      <div v-for="product in featuredProducts" :key="product.name" class="featured_product">
        <img :src="optimizeImageUrl(product.img, 400)" :alt="product.name" loading="lazy" />
        <h3>{{ product.name }}</h3>
      </div>
    </div>
  </section>
</template>

<script setup>
import { optimizeImageUrl } from "../images.js";

const featuredProducts = [
  {
    name: "Dell Latitude",
    img: "https://res.cloudinary.com/dvnylhnro/image/upload/v1745414395/dell-latitude-e5490-i5-8350u-1663567421_dfbeo7.jpg",
  },
  {
    name: "Intel Core i7",
    img: "https://res.cloudinary.com/dvnylhnro/image/upload/v1745414788/1549-intel-core-i7-14700kf-34-56ghz-box_bdy7ax.jpg",
  },
  {
    name: "NVIDIA GeForce RTX 3060",
    img: "https://res.cloudinary.com/dvnylhnro/image/upload/v1745524558/71tduSp8ooL._AC_SX679__j1c7mn.jpg",
  },
  {
    name: "Logitech MX Master 3",
    img: "https://res.cloudinary.com/dvnylhnro/image/upload/v1745488633/shopping_ahy0b4.webp",
  },
];
</script>

<style scoped>
.banner {
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(../imgs/Home_background.webp);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  min-height: 520px;
  gap: 60px;
  padding: 40px 20px;
}

.banner > img {
  width: 400px;
  max-width: 100%;
  height: auto;
}

.site_description {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 20px;
  padding: 10px;
  background-color: #215249;
}

.site_description > img {
  width: 20%;
  max-width: 200px;
  height: auto;
  background-color: white;
  border-radius: 50%;
}

.site_description_text {
  width: 60%;
  display: flex;
  flex-direction: column;
}

.site_description_text > h1 {
  color: white;
  margin: 10px 0 20px 0;
}

.site_description_text > p {
  color: white;
  width: 90%;
  line-height: 25px;
}

.featured_products_section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin: 20px;
  padding: 10px;
  background-color: white;
}

.featured_products_section hr {
  border: none;
  height: 1px;
  background-color: #ccc;
  width: 100%;
  margin: 0;
}

.featured_products_container {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.featured_product {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: #f3f3f5;
  border-radius: 10px;
}

.featured_product > img {
  width: 100%;
  max-width: 300px;
  aspect-ratio: 1;
  object-fit: contain;
  padding: 20px;
}

.featured_product > h3 {
  width: 100%;
  text-align: center;
  margin: 0;
  padding: 10px;
  background-color: #215249;
  color: white;
  border-radius: 0 0 10px 10px;
}

@media (max-width: 900px) {
  .banner {
    flex-direction: column;
    gap: 24px;
    min-height: 0;
    text-align: center;
  }

  .banner > img {
    width: 300px;
  }

  /* Keeps the text readable over the background's decorative shapes */
  .banner-text {
    padding: 12px 16px;
    border-radius: 12px;
    background-color: rgba(255, 255, 255, 0.85);
  }

  .site_description {
    flex-direction: column-reverse;
    padding: 30px 16px;
  }

  .site_description > img {
    width: 120px;
  }

  .site_description_text,
  .site_description_text > p {
    width: 100%;
  }

  .featured_products_container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .banner h1 {
    font-size: 1.5rem;
  }

  .site_description_text > h1 {
    font-size: 1.5rem;
  }

  .featured_products_section {
    margin: 20px 16px;
    padding: 0;
  }

  .featured_products_section > h1 {
    font-size: 1.5rem;
    text-align: center;
  }

  .featured_product > img {
    padding: 10px;
  }

  .featured_product > h3 {
    font-size: 0.95rem;
  }
}
</style>

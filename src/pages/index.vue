<template>
  <main class="home-page">
    <section>
      <h1>Hi, I'm Devin.</h1>
      <h1>I am a full stack web developer.</h1>
    </section>
    <section id="about">
      <h2>&lt;about&gt;</h2>
      <div>
        <figure>
          <div class="text-box">
            <p>Currently, I work at Inside Real Estate in Draper, Utah.</p>
            <p>
              Creating beautiful, responsive, easy-to-use web and native
              applications is my passion.
            </p>
            <p>I am experienced with:</p>
            <ul>
              <li>JavaScript</li>
              <li>HTML</li>
              <li>CSS</li>
              <li>Vue</li>
              <li>React Native</li>
              <li>Laravel/PHP</li>
              <li>Node</li>
            </ul>
          </div>
        </figure>
        <figure>
          <img
            class="profile-img"
            src="http://res.cloudinary.com/dcenatiempo/image/upload/v1497286705/devin_profile_d5cwsl.jpg"
          />
        </figure>
      </div>
    </section>
    <section id="portfolio">
      <h2>&lt;portfolio&gt;</h2>
      <div class="portfolio-list">
        <PortfolioItem
          title="Weather App"
          content="This is a mobile first responsive PWA</br></br>Skills Used: service workers, AJAX, Transitions, Animations Touch Events, Browser Storage, Geolocation API, Responsive Layout, Grid"
          link="https://devins-weather-app.herokuapp.com"
          image="/images/weather-app-screen-shot.jpeg"
        />
        <figure>
          <h3>Classic 80's Simon Game</h3>
          <a
            class="simon-game"
            target="_blank"
            href="./simon-game/index.html"
          ></a>
        </figure>
        <figure>
          <h3>Tic-Tac-Toe</h3>
          <a
            class="tic-tac-toe"
            target="_blank"
            href="./tic-tac-toe/index.html"
          ></a>
        </figure>
        <figure>
          <h3>Markdown Previewer</h3>
          <a
            class="markdown"
            target="_blank"
            href="./markdown-previewer/index.html"
          ></a>
        </figure>
        <figure>
          <h3>Random Quote Machine</h3>
          <a
            class="quotes"
            target="_blank"
            href="./random-quote-machine/index.html"
          ></a>
        </figure>
        <figure>
          <h3>Basic Calculator</h3>
          <a
            class="calculator"
            target="_blank"
            href="./basic-calculator/index.html"
          ></a>
        </figure>
        <figure>
          <h3>Wikipedia Search</h3>
          <a
            class="wikipedia"
            target="_blank"
            href="./wikipedia-search/index.html"
          ></a>
        </figure>
        <figure>
          <h3>Rogue-Like</h3>
          <a
            class="rogue-like"
            target="_blank"
            href="https://codepen.io/dcenatiempo/pen/ayWxBR/"
          ></a>
        </figure>
        <figure>
          <h3>Conway's Game of Life</h3>
          <a
            class="game-of-life"
            target="_blank"
            href="https://codepen.io/dcenatiempo/pen/zdOzrL/"
          ></a>
        </figure>
        <figure>
          <h3>Recipe Box</h3>
          <a
            class="recipe"
            target="_blank"
            href="https://codepen.io/dcenatiempo/pen/awrgMZ/"
          ></a>
        </figure>
        <figure>
          <h3>Meteorite Crash Sites</h3>
          <a
            class="meteorite"
            target="_blank"
            href="https://codepen.io/dcenatiempo/pen/QMxVJQ/"
          ></a>
        </figure>
      </div>
    </section>
    <section id="contact">
      <h2>&lt;contact&gt;</h2>
      <address>
        Devin Cenatiempo<br />
        Salt Lake City, UT<br />
        (480) 277-1160<br />
        dcenatiempo@gmail.com<br />
      </address>
      <div class="flex-contact">
        <!-- <button><a target='_blank' href="https://www.instagram.com/coachdevin/">instagram</a></button>
          <button><a target='_blank' href="https://twitter.com/devincenatiempo">twitter</a></button> -->
        <button>
          <a target="_blank" href="https://github.com/dcenatiempo">GitHub</a>
        </button>
        <button>
          <a target="_blank" href="https://www.linkedin.com/in/devincenatiempo/"
            >Linkedin</a
          >
        </button>
      </div>
    </section>
  </main>
</template>

<script>
import PortfolioItem from '~/components/home/PortfolioItem.vue';

export default {
  components: { PortfolioItem },
};
</script>

<style lang="scss">
.home-page {
  #about > div {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  }

  .flex-contact {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    align-content: space-between;
    margin: 20px 0;
  }

  .text-box {
    margin: 10px;
  }

  .profile-img {
    padding: 20px;
    /* float: right; */
    max-width: 100%;
  }

  address {
    padding: 10px;
    margin-left: 60px;
  }
  figure {
    margin: 1rem;
  }
  section {
    padding-top: 30px; /* so when you click link to navigate to section, the heading is not hidden by header */
  }

  h1,
  h2 {
    padding: 10px 0 0 50px;
    font-family: 'Averia Libre';
    color: rgb(80, 80, 80);
    font-size: 3em;
  }

  h2 {
    font-size: 2em;
  }
  @media screen and (max-width: 420px) {
    main {
      padding: 0;
    }
    h1 {
      padding-left: 40px;
      font-size: 48px;
    }
    h2 {
      padding-left: 0;
      font-size: 32px;
      text-align: center;
    }
  }
}
</style>

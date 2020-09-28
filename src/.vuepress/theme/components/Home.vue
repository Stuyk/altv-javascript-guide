<template>
    <main class="home" :aria-labelledby="data.heroText !== null ? 'main-title' : null">
        <header class="hero">
            <img v-if="data.heroImage" :src="$withBase(data.heroImage)" :alt="data.heroAlt" />

            <h1 v-if="data.heroText !== null" id="main-title">
                {{ $title }}
            </h1>

            <p v-if="data.tagline !== null" class="description">
                {{ data.tagline }}
            </p>
        </header>

        <Content class="theme-default-content custom singleline" style="text-align: center !important" />

        <p v-if="data.actionText && data.actionLink" class="action-holder">
            <NavLink class="action-button" :item="actionLink" />
        </p>

        <div class="footer">
            <h3>Sponsors</h3>
            <div class="footerSponsors">
                <a href="mailto:stuykgaming@gmail.com"><img src="logo_placeholder.svg" width="150" /></a>
                <a href="mailto:stuykgaming@gmail.com"><img src="logo_placeholder.svg" width="150" /></a>
                <a href="mailto:stuykgaming@gmail.com"><img src="logo_placeholder.svg" width="150" /></a>
            </div>
            <div class="footerExcerpt" v-if="data.sponsor">
                {{ data.sponsor }}
            </div>
            <div class="footerExcerpt" v-if="data.footer">
                {{ data.footer }}
            </div>
        </div>
    </main>
</template>

<script>
import NavLink from '@theme/components/NavLink.vue';

export default {
    name: 'Home',
    components: { NavLink },
    computed: {
        data() {
            return this.$page.frontmatter;
        },

        actionLink() {
            return {
                link: this.data.actionLink,
                text: this.data.actionText,
            };
        },
    },
};
</script>

<style lang="stylus">
.home {
  padding: $navbarHeight 2rem 0;
  max-width: $homePageWidth;
  margin: 0px auto;
  display: block;

  .hero {
    text-align: center;

    img {
      max-width: 100px !important;
      display: block;
      margin: 3rem auto 1.5rem;
    }

    h1 {
      font-size: 1.5rem;
    }

    h1, .description, .action {
      margin: 1.8rem auto;
    }

    .description {
      max-width: 50rem;
      font-size: 1.3rem;
      line-height: 1.3;
      color: lighten($textColor, 20%);
      text-align: center;
    }

    .singleline {
      text-align: center !imporant;
    }
  }

  .action-holder {
    display: flex;
    width: 100%;
    justify-content: center;
    align-content: center;
    align-items: center;
    justify-items: center;
    margin-top: 2.5rem;

    .action-button {
      display: inline-block;
      font-size: 1.2rem;
      color: #fff;
      background-color: darken($altvColor, 50%);
      padding: 0.8rem 1.6rem;
      border-radius: 4px;
      transition: background-color 0.1s ease;
      box-sizing: border-box;
      border-bottom: 3px solid darken($altvColor, 60%);
      width: 400px;
      text-align: center;

      &:hover {
        background-color: darken($altvColor, 40%);
      }
    }
  }

  .features {
    border-top: 1px solid $borderColor;
    padding: 1.2rem 0;
    margin-top: 2.5rem;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: stretch;
    justify-content: space-between;
  }

  .feature {
    flex-grow: 1;
    flex-basis: 30%;
    max-width: 30%;

    h2 {
      font-size: 1.4rem;
      font-weight: 500;
      border-bottom: none;
      padding-bottom: 0;
      color: lighten($textColor, 10%);
    }

    p {
      color: lighten($textColor, 25%);
    }
  }

  .footer {
    // padding: 2.5rem;
    margin-top: 2.5rem;
    border-top: 0px solid $borderColor;
    text-align: center;
    color: lighten($textColor, 25%);

    h3 {
      margin-bottom: 3.5rem;
      opacity: 0.8;
    }

    .footerSponsors {
      display: flex;
      width: 100%;
      justify-content: space-evenly;
      flex-wrap: wrap;

      img {
        opacity: 0.4;
      }
    }

    .footerExcerpt {
      margin-top: 2.5rem;
    }
  }
}

@media (max-width: $MQMobile) {
  .home {
    .features {
      flex-direction: column;
    }

    .feature {
      max-width: 100%;
      padding: 0 2.5rem;
    }

    .footer {
      .footerSponsors {
        a {
          margin-top: 2.5rem;
        }
      }
    }
  }
}

@media (max-width: $MQMobileNarrow) {
  .home {
    padding-left: 1.5rem;
    padding-right: 1.5rem;

    .hero {
      img {
        max-height: 210px;
        margin: 2rem auto 1.2rem;
      }

      h1 {
        font-size: 2rem;
      }

      h1, .description, .action {
        margin: 1.2rem auto;
      }

      .description {
        font-size: 1.2rem;
      }

      .action-button {
        font-size: 1rem;
        padding: 0.6rem 1.2rem;
      }
    }

    .feature {
      h2 {
        font-size: 1.25rem;
      }
    }
  }
}
</style>

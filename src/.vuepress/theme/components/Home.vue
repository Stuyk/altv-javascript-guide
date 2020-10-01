<template>
    <main class="home" :aria-labelledby="data.heroText !== null ? 'main-title' : null">
        <header class="hero">
            <div class="left">
                <h1 v-if="data.heroText !== null" id="main-title">
                    {{ $title }}
                </h1>
                <p v-if="tagline !== null" class="description" ref="tagline">
                    {{ tagline }}
                </p>
            </div>
            <div class="right">
                <img src="laptop.svg" class="laptop" />
            </div>
        </header>

        <div class="section">
            <div class="action-holder">
                <p>
                    Start your journey with programming your very own GTA:V server by learning how to use the alt:V API.
                </p>
                <NavLink class="action-button" :item="actionLink" />
            </div>
        </div>

        <div class="footer">
            <h3>Sponsors</h3>
            <div class="footerSponsors">
                <a href="mailto:stuykgaming@gmail.com"><img src="logo_placeholder.svg" width="150"/></a>
                <a href="mailto:stuykgaming@gmail.com"><img src="logo_placeholder.svg" width="150"/></a>
                <a href="mailto:stuykgaming@gmail.com"><img src="logo_placeholder.svg" width="150"/></a>
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
    data() {
        return {
            tagline: 'Hand-crafted documentation for writing your own custom GTA:V server using alt:V with Javascript.'
        };
    },
    computed: {
        data() {
            return this.$page.frontmatter;
        },
        actionLink() {
            return {
                link: this.data.actionLink,
                text: this.data.actionText
            };
        }
    }
};
</script>

<style lang="stylus">
.home {
  padding: $navbarHeight 2rem 0;
  margin: 0px auto;
  display: block;
  justify-content: center;
  align-items: center;

  .hero {
    text-align: left;
    display: flex;
    word-wrap break-word;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-evenly;
    width: 80%;
    padding: 2.5rem;
    margin: 0 auto;
    background: rgba(255, 255, 255, 0.075);
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    border: 2px solid rgba(0, 0, 0, 0.4);
    border-top-color: transparent;

    .left {
      box-sizing: border-box;
      margin-right: 2.5rem;
    }

    .right {
      width: 100%;
      max-width: 400px;

      .laptop {
        max-width: 100%;
        max-height: 100%;
        display: block;
      }
    }

    h1 {
      font-size: 2rem;
    }

    h1, .description, .action {
      margin: 1.8rem auto;
    }

    .description {
      font-size: 1.3rem;
      line-height: 1.3;
      word-wrap: break-word;
      color: lighten($altvColor, 5%);
      text-align: left;
      transition: 2s;
    }

    .singleline {
      text-align: center !imporant;
    }
  }

  .section {
      display: flex;
      text-align: left;
      flex-direction: row;
      flex-wrap: wrap;
      word-wrap break-word;
      box-sizing: border-box;
      align-items: center;
      justify-content: space-evenly;
      width: 100%;

      p {
        display: block;
        padding-left: 2.5rem;
        padding-right: 2.5rem;
        text-align: center;
        min-width: 200px;
        box-sizing: border-box;
      }

      a {
        display: block;
        box-sizing: border-box;
        margin-right: 2.5rem;
        min-width: 225px;
      }
  }

  .action-holder {
    display: flex;
    flex-direction: row;
    width: 80%;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-content: center;
    align-items: center;
    justify-items: center;
    padding-top: 2.5rem;
    padding-bottom: 2.5rem;
    background: rgba(255, 255, 255, 0.075);
    border: 2px solid rgba(0, 0, 0, 0.4);
    border-radius: 12px;
    margin-top: 2.5rem;
    margin-bottom: 2.5rem;

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
    border-top: 0px solid $borderColor;
    text-align: center;
    color: lighten($textColor, 25%);
    width: 80%;
    margin: 0 auto;
    background: rgba(255, 255, 255, 0.075);
    border: 2px solid rgba(0, 0, 0, 0.4);
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    border-bottom-color: transparent;
    box-sizing: border-box;
    padding: 2.5rem;

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
        transition: 0.5s;

        &:hover {
          opacity: 1;
        }
      }
    }

    .footerExcerpt {
      margin-top: 2.5rem;
    }
  }
}

@media (max-width: $mobileResponsive) {
  .home {
    .hero {
      flex-wrap: wrap;
      width: 95%;

      .left {
        margin: 0;
      }

      h1 {
        font-size: 1.5rem !important;
      }

      p {
        font-size: 1rem !important;
      }

      .left {
        text-align: center;
      }

      .right {
        display: none;
      }

      .description {
        text-align: center;
      }
    }

    .features {
      flex-direction: column;
    }

    .feature {
      max-width: 100%;
      padding: 0 2.5rem;
    }

    .section {
      .action-holder {
        width: 95%;
      }
    }

    .footer {
      width: 95%;

      img {
        margin-bottom: 2.5rem;
      }
    }

    .section a {
      margin-right: 0;
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

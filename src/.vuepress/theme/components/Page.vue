<template>
    <main class="page">
        <slot name="top" />

        <Content class="theme-default-content" />
        <PageEdit />
        <PageNav v-bind="{ sidebarItems }" />
        <slot name="bottom" />
    </main>
</template>

<script>
import PageEdit from '@theme/components/PageEdit.vue';
import PageNav from '@theme/components/PageNav.vue';

export default {
    components: { PageEdit, PageNav },
    props: ['sidebarItems']
};
</script>

<style lang="stylus">
@require '../styles/wrapper.styl';

.page {
  padding-bottom: 2rem;
  display: block;

  h1, h2, h3, h4 {
      font-weight bold
      letter-spacing 0.02em
  }

  img {
      max-height 400px !important;
  }
}
</style>

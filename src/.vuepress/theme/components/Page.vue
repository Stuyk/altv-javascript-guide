<template>
    <main class="page">
        <slot name="top" />

        <Content class="theme-default-content" />
        <PageEdit />

        <PageNav v-bind="{ sidebarItems }" />
        <div id="447954467" style="margin-top: 100px"></div>
        <slot name="bottom" />
    </main>
</template>

<script>
import PageEdit from '@theme/components/PageEdit.vue';
import PageNav from '@theme/components/PageNav.vue';

export default {
    components: { PageEdit, PageNav },
    props: ['sidebarItems'],
    mounted() {
        window._mNHandle.queue.push(function () {
            window._mNDetails.loadTag('447954467', '728x90', '447954467');
        });
    },
};
</script>

<style lang="stylus">
@require '../styles/wrapper.styl';

.page {
  padding-bottom: 2rem;
  display: block;
}
</style>

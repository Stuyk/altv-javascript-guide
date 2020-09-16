<template>
    <main class="page">
        <slot name="top" />

        <Content class="theme-default-content" />
        <PageEdit />

        <PageNav v-bind="{ sidebarItems }" />
        <div id="421256859"></div>
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
            console.log('media.net');
            window._mNDetails.loadTag('421256859', '160x600', '421256859');
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

<template>
    <main class="page">
        <slot name="top" />

        <Content class="theme-default-content" />
        <PageEdit />

        <PageNav v-bind="{ sidebarItems }" />

        <slot name="bottom" />

        <div id="421256859">
            <script type="text/javascript">
    try {
        window._mNHandle.queue.push(function() {
            window._mNDetails.loadTag('421256859', '160x600', '421256859');
        });
    } catch (error) {}
            </script>
        </div>
    </main>
</template>

<script>
import PageEdit from '@theme/components/PageEdit.vue';
import PageNav from '@theme/components/PageNav.vue';

export default {
    components: { PageEdit, PageNav },
    props: ['sidebarItems'],
};
</script>

<style lang="stylus">
@require '../styles/wrapper.styl';

.page {
  padding-bottom: 2rem;
  display: block;
}
</style>

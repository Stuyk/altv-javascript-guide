<template>
    <main class="page">
        <slot name="top" />

        <Content class="theme-default-content" />
        <PageEdit />

        <PageNav v-bind="{ sidebarItems }" />
        <div class="ad" id="522369680">
            <script type="text/javascript">
    try {
        window._mNHandle.queue.push(function() {
            window._mNDetails.loadTag('522369680', '728x90', '522369680');
        });
    } catch (error) {}
            </script>
        </div>
        <slot name="bottom" />
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

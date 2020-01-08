<template>
    <div id="reading" class="item">
        {{title}}  by {{author}} <span v-if="part != 'Index'"> | {{part}} / {{total}}</span>
    </div>
</template>

<script>
export default {
props: ["title", "author", "part", "total"],
}
</script>

<style>
.item {
    padding: 2em;
    background: #ccc;
}
</style>
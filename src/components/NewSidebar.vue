<template>
    <div class="sidebar">
        <h1>
            <span v-if="collapsed">
                <div>V</div>
                <div>S</div>
            </span>
            <span v-else>Vue Sidebar</span>
        </h1>
        <span class="collapse-icon" @click="toggleSidebar">
            <b-icon :icon="'chevron-double-right'" ></b-icon>    
        </span>
    </div>
</template>

<script>
export default {
    data() {
        return {
            collapsed: false,            
        }
    },
    methods: {
        toggleSidebar () {
            this.collapsed = !this.collapsed
            console.log("Toggle Sidebar!")
        }
    }
}
</script>

<style scoped>
:root {
    --sidebar-bg-color: #2f855a;
    --sidebar-item-hover: #38a169;
    --sidebar-item-active: #276749;
}

.sidebar {
    color: white;
    background-color: var(--sidebar-bg-color);

    float: left;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    padding: 0.5em;

    transition: 0.3s ease;

    display: flex;
    flex-direction: column;
}

.collapse-icon {
    position: absolute;
    bottom: 0;
    padding: 0.75em;

    color: rgba(255, 255, 255, 0.7);
    transform: rotate(180deg);
    transition: 0.2s linear;
}
</style>
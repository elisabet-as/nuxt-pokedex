<template>
    <v-app class="medium">
        <v-content>
            <v-flex text-xs-center>
                <Character/>
            </v-flex>
        </v-content>
    </v-app>
</template>

<script>
import Character from '~/components/Character.vue';

export default {
    components: {
        Character
    }
};
</script>

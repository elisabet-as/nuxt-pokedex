<template>
    <v-app class="medium">
        <v-content>
            <v-flex>
                <Characters/>
            </v-flex>
        </v-content>
    </v-app>
</template>

<script>
import Characters from '~/components/Characters.vue';

export default {
    components: {
        Characters
    }
};
</script>

<script setup lang="ts">
import type { EventOrganizer } from '@/type';
import type { PropType } from 'vue';
defineProps({
    label: {
        type: String,
        default: ''
    },
    modelValue: {
        type: [String, Number, Object],
        require: false,
        default: ''
    },
    options: {
        type: Array as PropType<EventOrganizer[]>,
        require: true,        
    }
})
const emit = defineEmits(['update:modelValue'])
</script>
<template>
    <label v-if="label">{{ label }}</label>
    <select class="field" :value="modelValue" v-bind="{
        ...$attrs,
        onChange: ($event) => { emit('update:modelValue', ($event.target as HTMLInputElement)?.value) }
    }">
        <option v-for="option in options" :value="option.id" :key="option.id" :selected="option.id === modelValue">{{
            option.name }}</option>
    </select>
</template>
    
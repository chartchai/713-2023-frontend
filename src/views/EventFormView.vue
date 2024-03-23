<script setup lang="ts">
import { type EventOrganizer, type EventItem } from '@/type'
import { ref } from 'vue'
import EventService from '@/services/EventService';
import { useRouter } from 'vue-router'
import OrganizerService from '@/services/OrganizerService'
import ImageUpload from '@/components/ImageUpload.vue';
const event = ref<EventItem>({
    id: 0,
    category: '',
    title: '',
    description: '',
    location: '',
    date: '',
    time: '',
    organizer: { id: 0, name: '', roles: [] },
    images: []
})
const router = useRouter()
import { useMessageStore } from '@/stores/message'
import BaseInput from '@/components/BaseInput.vue';
import BaseSelect from '@/components/BaseSelect.vue';
const store = useMessageStore()
function saveEvent() {
    EventService.saveEvent(event.value)
        .then((response) => {
            console.log(response.data)
            router.push({
                name: 'event-detail',
                params: { id: response.data.id }
            })
            store.updateMessage('You are successfully add a new event for ' + response.data.title)
            setTimeout(() => {
                store.resetMessage()
            }, 3000)
        }).catch(() => {
            router.push({ name: 'network-error' })
        })
}

const organizers = ref<EventOrganizer[]>([])
OrganizerService.getOrganizers()
    .then((response) => {
        organizers.value = response.data
    })
    .catch(() => {
        router.push({ name: 'network-error' })
    })


</script>
<template>
    <div>
        <h1>Create an event</h1>
        <form @submit.prevent="saveEvent">
            <BaseInput v-model="event.category" label="Category" placeholder="Category" />
            <h3>Name & describe your event</h3>
            <BaseInput v-model="event.title" label="Title" placeholder="Title" />
            <BaseInput v-model="event.description" label="Description" placeholder="Description" />


            <h3>Where is your event?</h3>

            <BaseInput v-model="event.location" label="Location" placeholder="Location" />
            <h3>Who is your organizer?</h3>
            <BaseSelect v-model="event.organizer.id" label="Organizer" :options="organizers" />
            <h3>The image of the Event</h3>
            <ImageUpload v-model="event.images" />
            <button type="submit">Submit</button>
        </form>


        <pre>{{ event }}</pre>
    </div>
</template>

    
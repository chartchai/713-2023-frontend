<script setup lang="ts">
import EventCard from '../components/EventCard.vue'
import type { EventItem } from '@/type'
import type { Ref } from 'vue'
import { ref, computed } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'
import type { AxiosResponse } from 'axios'
// import axios from 'axios'
import EventService from '@/services/EventService'
import NProgress from 'nprogress'
import BaseInput from '@/components/BaseInput.vue'
import { useRouter } from 'vue-router'
const events: Ref<EventItem[]> = ref([])
const totalEvent = ref<number>(0)
const props = defineProps({
  page: {
    type: Number,
    required: true
  }
})
const router = useRouter()

EventService.getEvent(3, props.page)
  .then((response: AxiosResponse<EventItem[]>) => {
    events.value = response.data
    totalEvent.value = response.headers['x-total-count']
  })
  .catch(() => {
    router.push({ name: 'network-error' })
  })

onBeforeRouteUpdate((to, from, next) => {
  const toPage = Number(to.query.page)
  let queryFunction;
  if (keyword.value === null || keyword.value === '') {
    queryFunction = EventService.getEvent(3, toPage)
  }else{
    queryFunction = EventService.getEventsByKeyword(keyword.value, 3, toPage)
  }
   queryFunction.then((response: AxiosResponse<EventItem[]>) => {
      events.value = response.data
      totalEvent.value = response.headers['x-total-count']
      next()
    })
    .catch(() => {
      next({ name: 'NetworkError' })
    })
})
const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvent.value / 2)
  return props.page.valueOf() < totalPages
})

const keyword = ref('')
function updateKeyword (value: string) {
  let queryFunction;
  if (keyword.value === ''){
    queryFunction = EventService.getEvent(3, 1)
  }else {
    queryFunction = EventService.getEventsByKeyword(keyword.value, 3, 1)
  }
  queryFunction.then((response: AxiosResponse<EventItem[]>) => {
    events.value = response.data
    console.log('events',events.value)
    totalEvent.value = response.headers['x-total-count']
    console.log('totalEvent',totalEvent.value)
  }).catch(() => {
    router.push({ name: 'NetworkError' })
  })
}
</script>

<template>
  <h1>Events For Good</h1>
  <main class="flex flex-col items-center">
    <div class="w-64">
      <BaseInput
        v-model="keyword"
        placeholder="Search..."
        class="w-full"
        @input="updateKeyword"/>
    </div>    
    <EventCard v-for="event in events" :key="event.id" :event="event"></EventCard>

    <div class="pagination">
      <RouterLink
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
        id="page-prev"
      >
        Prev Page
      </RouterLink>

      <RouterLink
        :to="{ name: 'event-list', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
        id="page-next"
      >
        Next Page
      </RouterLink>
    </div>
  </main>
</template>

<style scoped>


.pagination {
  display: flex;
  width: 290px;
}

.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>

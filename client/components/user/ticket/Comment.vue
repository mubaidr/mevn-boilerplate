<script setup>
const props = defineProps(['comment'])

import { timeDisplay } from '@/utils/time'
import { useUserStore } from '@/store'
const userStore = useUserStore()
</script>

<template>
  <div id="Comment" :class="userStore.getUserId === comment.user ? 'text-end' : 'text-left'">
    <p>{{ comment.comment }}</p>
    <span>
      <template v-if="userStore.getUserId === comment.user">{{ userStore?.getUser.username }}</template> -
      {{ timeDisplay(comment.createdTime) }}
    </span>
  </div>
</template>

<style scoped lang="scss">
#Comment {
  margin-bottom: 20px;

  &:after {
    content: '';
    clear: both;
    display: block;
    width: 100%;
    height: 1px;
    background-color: #eee;
    margin-top: 15px;
  }

  span {
    font-size: 0.75rem;
  }
}
</style>

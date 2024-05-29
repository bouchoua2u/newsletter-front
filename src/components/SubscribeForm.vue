<template>
  <form v-if="!isUserSubscribed" @submit.prevent="submitForm">
    <input type="email" v-model="email" placeholder="Enter your email">
    <p>{{ emailError }}</p>
    <button type="submit">Subscribe</button>
    <p v-if="apiError" style="color: red;">{{ apiError }}</p>
  </form>
    <p v-else>You have successfully subscribed</p>
</template>

<script>
import { ref } from 'vue'
import apiService from '../services/subscribeApiService'

export default {
  setup() {
    const email = ref('')
    const emailError = ref('')
    const apiError = ref('')
    const isUserSubscribed = ref(false)

    const isValidEmail = (email) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      return emailPattern.test(email)
    }

    const submitForm = async () => {
      emailError.value = ''
      apiError.value = ''
      if (!email.value) {
        emailError.value = 'Email is required'
        return
      }

      if (!isValidEmail(email.value)) {
        emailError.value = 'Invalid email format'
        return
      }

      try {
        await apiService.subscribe(email.value)
        isUserSubscribed.value = true
      } catch (error) {
        handleApiError(error)
      }
    }

    const handleApiError = (error) => {
      apiError.value = ''
      if (error.response && error.response.status === 409) {
        apiError.value = 'User with this email already exists'
      } else {
        apiError.value = 'An error occurred: ' + error.message
      }
    }

    return { email, emailError, submitForm, apiError, isUserSubscribed }
  }
}
</script>
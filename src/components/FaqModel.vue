<template>
  <div class="faq-modal">
    <div class="add-button-container">
      <q-btn color="primary" label="Add FAQ" @click="showModal = true" class="add-button" />
    </div>
    <q-dialog v-model="showModal" class="add-modal">
      <q-card>
        <q-card-section>
          <q-input v-model="question" label="Question" outlined dense class="add-input" />
        </q-card-section>
        <q-card-section>
          <q-input v-model="answer" label="Answer" outlined dense class="add-input" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Cancel" color="primary" @click="cancel" class="cancel-button" />
          <q-btn label="Save" color="primary" @click="save" :disable="!question || !answer" class="save-button" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<style scoped>
.faq-modal {
  text-align: center;
  padding: 20px;
}

.add-button-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.add-modal {
  max-width: 400px;
  width: 100%;
}

.add-input {
  margin-bottom: 10px;
}

.cancel-button {
  margin-right: 10px;
}

.save-button {
  margin-right: 0;
}
</style>

<script>
export default {
  data() {
    return {
      showModal: false,
      question: '',
      answer: ''
    }
  },
  methods: {
    cancel() {
      this.showModal = false
      this.question = ''
      this.answer = ''
    },
    save() {
      const faq = {
        id: Date.now(),
        question: this.question,
        answer: this.answer
      }
      this.$store.dispatch('createFaq', faq)
      this.cancel()
    }
  }
}
</script>

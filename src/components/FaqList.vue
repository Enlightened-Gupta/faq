<template>
  <div class="faq-list">
    <q-input v-model="search" label="Search" outlined dense class="search-input" />
    <div class="faq-container">
      <div class="faq-row" v-for="faq in filteredFaqs" :key="faq.id">
        <q-card class="faq-card">
          <q-card-section>
            <div class="faq-question">{{ faq.question }}</div>
            <div class="faq-answer">{{ faq.answer }}</div>
          </q-card-section>
          <q-card-actions align="center">
            <q-btn icon="edit" color="primary" size="sm" @click="edit(faq)" />
            <q-btn icon="delete" color="negative" size="sm" @click="confirmDelete(faq.id)" />
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <q-dialog v-model="showEditModal" class="edit-modal">
      <q-card>
        <q-card-section>
          <q-input v-model="editedFaq.question" label="Question" outlined dense class="edit-input" />
        </q-card-section>
        <q-card-section>
          <q-input v-model="editedFaq.answer" label="Answer" outlined dense class="edit-input" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Cancel" color="primary" @click="cancelEdit" class="cancel-button" />
          <q-btn label="Save" color="primary" @click="saveEdit" :disable="!editedFaq.question || !editedFaq.answer"
            class="save-button" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      showEditModal: false,
      editedFaq: {
        id: '',
        question: '',
        answer: ''
      }
    }
  },
  computed: {
    faqs() {
      return this.$store.getters.getFaqs
    },
    filteredFaqs() {
      if (this.search) {
        const query = this.search.toLowerCase()
        return this.faqs.filter(
          faq =>
            faq.question.toLowerCase().includes(query) ||
            faq.answer.toLowerCase().includes(query)
        )
      } else {
        return this.faqs
      }
    }
  },
  methods: {
    edit(faq) {
      this.editedFaq = { ...faq }
      this.showEditModal = true
    },
    cancelEdit() {
      this.showEditModal = false
      this.editedFaq = {
        id: '',
        question: '',
        answer: ''
      }
    },
    saveEdit() {
      this.$store.dispatch('updateFaq', { id: this.editedFaq.id, updatedFaq: this.editedFaq })
      this.cancelEdit()
    },
    confirmDelete(id) {
      if (window.confirm('Are you sure you want to delete this FAQ?')) {
        this.$store.dispatch('deleteFaq', id)
      }
    }
  }
}
</script>
<style scoped>
.faq-list {
  max-width: 900px;
  margin: 0 auto;
}

.search-input {
  margin-bottom: 20px;
}

.faq-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.faq-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 20px;
}

.faq-card {
  width: 300px;
  margin: 10px;
  padding: 15px;
}

.faq-question {
  font-weight: bold;
  margin-bottom: 10px;
}

.faq-answer {
  color: #777;
  margin-bottom: 10px;
}

.edit-modal {
  max-width: 400px;
  width: 100%;
}

.edit-input {
  margin-bottom: 10px;
}

.cancel-button {
  margin-right: 10px;
}

.save-button {
  margin-right: 0;
}
</style>


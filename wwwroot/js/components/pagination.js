

export default {
    data() {
        return {
        currentPage: 1
        }
    },
    template:
    `
    <div class="overflow-auto">
        <div>
        <b-pagination size="md" :total-rows="100" v-model="currentPage" :per-page="10" />
        </div>
        <div class="mt-3">Current Page: {{ currentPage }}</div>
    </div>
    `
}

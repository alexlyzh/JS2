export const Search = {
    data() {
        return {
            userSearch: '',
        }
    },
    template: `
        <form action="#" method="post" class="search-form" @submit.prevent>
            <input type="text" class="search-field" v-model.lazy="userSearch">
            <button class="btn-search" type="submit">
                <i class="fas fa-search"></i>
            </button>
        </form>
    `,
}
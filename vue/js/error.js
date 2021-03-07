export const Error = {
    data() {
        return {
            text: '',
        }
    },
    methods: {
        setText(val) {
            this.text = val;
        }
    },
    template: `
        <div class="error" v-if="text">
            <p class="error__msg">
                <button class="error__close-btn" @click="setText('')">&times;</button>
                <span class="error__text">{{text}}</span>
            </p>
        </div>
    `,
}
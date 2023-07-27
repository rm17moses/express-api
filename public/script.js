document.addEventListener('alpine:init', () => {
    Alpine.data('LanguageWidget', function () {
        return {
            username: "",
            greeting: "Hello",
            language: "English",
            new_language: '',
            new_greet: '',
            new_message: '',
            //open: false,
            //show: false,
            greet() {

                //call the API and get greeting back

                axios.get(`/api/greet?username=${this.username}&language=${this.language}`)
                    .then(result => {

                        if (result.data.error) {
                            console.log(result.data)
                            this.greeting = result.data.error;
                        } else {
                            this.greeting = result.data.message;
                        }
                    });

                setTimeout(() => {
                    this.greeting = '';
                }, 3000)

                //this.greeting = this.username
            },

            addGreeting() {

                axios
                    .post('/api/greet', {
                        "language": this.new_language,
                        "greeting": this.new_greet
                    })
                    .then(result => {
                        if (this.new_language && this.new_greet) {
                            //console.log(result.data)
                            this.new_message = result.data.message;
                        } else {
                            this.new_message = 'Enter valid language and greeting'
                        }
                    });
                setTimeout(() => {
                    this.new_message = '';
                }, 3000)
            },

            init() {

                this.greet();
                this.addGreeting();

            }
        }
    })
})
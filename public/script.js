document.addEventListener('alpine:init', () => {
    Alpine.data('LanguageWidget', function() {
        return {
            username : "",
                greeting : "Hello",
                language : "English",
                new_language: '',
                new_greet: '',
                new_message: '',
                validMessage: 'Enter a valid language and greeting',
                open: false,
                show: false,
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
                    })
        
                    this.greeting = this.username
                },

                addGreeting(){

                         axios
                                .post('http://localhost:4009/api/greet', {
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
                                this.new_message = this.validMessage;
                },

            init() {
                
                this.greet();
                this.addGreeting();
                
            }
        }
    })
})
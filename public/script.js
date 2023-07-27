document.addEventListener('alpine:init', () => {
    Alpine.data('LanguageWidget', function() {
        return {
            username : "",
                greeting : "Hello",
                language : "English",
                new_language: '',
                new_greet: '',
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
        
                        this.greeting = result.data.message
                    })
        
                    this.greeting = this.username
                },

                addGreeting(){

                    return axios
                                .post('http://localhost:4009/api/greet', {
                                    "language": this.new_language,
                                    "greeting": this.new_greet
                                })
                                .then(result => {
                                    console.log(result.data)
                                });
                },

            init() {
                
                this.greet();
                
            }
        }
    })
})
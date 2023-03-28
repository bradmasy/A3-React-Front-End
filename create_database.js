function create_database() {

    axios.get(POKEMON_API_URL)
        .then((response) => {
            console.log(response.data);
            Pokemon.insertMany(response.data, (err, pokemon) => {

            });
        });


};


create_database();
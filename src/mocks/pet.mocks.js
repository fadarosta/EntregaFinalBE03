export const generateMockPets = (count) => {
    if (typeof count !== 'number' || count <= 0) {
        throw new Error('Count must be a positive number');
    }

    const species = ['perro', 'gato', 'conejo', 'tortuga', 'hamster', 'pez', 'pato'];
    const names = ['Max', 'Luna', 'Boby', 'Mia', 'Rocky', 'Bella', 'Toby', 'Lucy', 'Charli', 'Daisy'];
    
    const pets = [];
    
    for (let i = 1; i <= count; i++) {
        // Seleccionar nombre y especie aleatorios
        const randomName = names[Math.floor(Math.random() * names.length)];
        const randomSpecie = species[Math.floor(Math.random() * species.length)];
        
        // Generar fecha de nacimiento aleatoria
        const currentYear = new Date().getFullYear();
        const randomYear = currentYear - Math.floor(Math.random() * 10) - 1;
        const birthDate = new Date(
            randomYear,
            Math.floor(Math.random() * 12),    // mes (0-11)
            Math.floor(Math.random() * 28) + 1 // día (1-28)
        );

        pets.push({
            name: `${randomName} ${i}`,
            specie: randomSpecie,
            birthDate: birthDate,
            image: `https://placehold.co/400x300?text=${encodeURIComponent(randomName)}`,
            adopted: false
        });
    }
    
    return pets;
};
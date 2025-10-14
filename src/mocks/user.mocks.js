import bcrypt from 'bcrypt';

export const generateMockUsers = (count) => {
    if (typeof count !== 'number' || count <= 0) {
        throw new Error('Count must be a positive number');
    }

    // Datos nombres y apellidos
    const firstNames = ['Juan', 'María', 'Carlos', 'Ana', 'Luis', 'Laura', 'Pedro', 'Sofía', 'Miguel', 'Lucía'];
    const lastNames = ['García', 'Rodríguez', 'López', 'Martínez', 'Hernández', 'González', 'Pérez', 'Sánchez', 'Ramírez', 'Torres'];

    // Encriptar
    const hashedPassword = bcrypt.hashSync('coder123', 10);

    const users = [];

    for (let i = 1; i <= count; i++) {
        // Nombres aleatorios
        const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];

        // Generar email
        const email = `${randomFirstName.toLowerCase()}.${randomLastName.toLowerCase()}${i}@example.com`;

        // Generar edad
        const age = Math.floor(Math.random() * 53) + 18;

        // Rol user/admin
        const role = Math.random() > 1.8 ? 'admin' : 'user';

        users.push({
            first_name: randomFirstName,
            last_name: randomLastName,
            email: email,
            age: age,
            password: hashedPassword,
            role: role,
            pets: []
        });
    }

    return users;
};
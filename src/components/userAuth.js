function toggleProfileOptions() {
    const profileOptions = document.querySelector("#profileOptions");
    if (profileOptions) {
        profileOptions.style.display =
            profileOptions.style.display === "none" ? "block" : "none";
    }
}

function redirectToLogin() {
    // Redirigir a la página de inicio de sesión
    window.location.href = "#login";
}

function login() {
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;
    const resultContainer = document.getElementById("loginResult");

    // Validar campos obligatorios
    if (!username || !password) {
        resultContainer.textContent = "Todos los campos son obligatorios";
        resultContainer.style.color = "#ff0000"; // Color rojo
        return;
    }

    // Comprobar si el usuario existe en el almacenamiento local
    const storedUser = localStorage.getItem(username);
    if (storedUser) {
        const userData = JSON.parse(storedUser);

        // Verificar la contraseña
        if (verifyPassword(userData.password, password)) {
            // Inicio de sesión exitoso
            resultContainer.textContent = "Inicio de sesión exitoso";
            resultContainer.style.color = "#00ff00"; // Color verde

            // Redirigir a la página principal después de 2 segundos (ajusta según sea necesario)
            setTimeout(function () {
                window.location.href = "#inicio";
                document.getElementById("loginForm").reset();
            }, 2000);
        } else {
            resultContainer.textContent = "Contraseña incorrecta";
            resultContainer.style.color = "#ff0000"; // Color rojo
        }
    } else {
        resultContainer.textContent = "Usuario no encontrado";
        resultContainer.style.color = "#ff0000"; // Color rojo
    }
}

function verifyPassword(storedPassword, enteredPassword) {
    // Implementa la lógica de verificación de contraseñas aquí
    return storedPassword === enteredPassword; // Este es un ejemplo básico
}

function redirectToRegister() {
    // Redirigir a la página de registro
    window.location.href = "#register";
}

function register() {
    const firstName = document.getElementById("registerFirstName").value;
    const lastName = document.getElementById("registerLastName").value;
    const username = document.getElementById("registerUsername").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    const resultContainer = document.getElementById("registerResult");

    // Validar campos obligatorios
    if (!firstName || !lastName || !username || !email || !password) {
        resultContainer.textContent = "Todos los campos son obligatorios";
        resultContainer.className = "error";
        return;
    }

    // Validar el formato del correo electrónico usando una expresión regular básica
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        resultContainer.textContent =
            "Formato de correo electrónico no válido";
        resultContainer.className = "error";
        return;
    }

    // Comprobar si el usuario ya existe en el almacenamiento local
    const existingUser = localStorage.getItem(username);
    const existingEmail = Object.values(localStorage).some((userData) => {
        const user = JSON.parse(userData);
        return user.email === email;
    });

    if (existingUser) {
        resultContainer.textContent = "El usuario ya existe";
        resultContainer.className = "error";
    } else if (existingEmail) {
        resultContainer.textContent =
            "El correo electrónico ya está registrado";
        resultContainer.className = "error";
    } else {
        // Almacenar los datos del usuario en el almacenamiento local
        const userData = {
            firstName,
            lastName,
            email,
            password,
        };
        localStorage.setItem(username, JSON.stringify(userData));

        resultContainer.textContent = "Registro exitoso";
        resultContainer.className = "success";

        // Redirigir a la página de inicio de sesión después de 2 segundos (ajusta según sea necesario)
        setTimeout(function () {
            window.location.href = "#login";
            document.getElementById("registrationForm").reset();
        }, 2000);
    }
}

function validateInput(event) {
    const regex = /^[a-zA-Z0-9 ]+$/; // Only allow alphanumeric characters and spaces
    const key = String.fromCharCode(event.keyCode);
    if (!regex.test(key)) {
        event.preventDefault(); // Prevent the input event
        return false;
    }
}
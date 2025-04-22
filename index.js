document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registrationForm");
    const table = document.getElementById("userTableBody");
    const dobInput = document.getElementById("dob");

    const today = new Date();
    const maxAge = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    const minAge = new Date(today.getFullYear() - 55, today.getMonth(), today.getDate());
    const formattedmax = maxAge.toISOString().split("T")[0];
    const formattedmin = minAge.toISOString().split("T")[0];
    dobInput.setAttribute("max", formattedmax);
    dobInput.setAttribute("min", formattedmin);

    loadUserEntries();

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const dob = new Date(dobInput.value);

        if (dob > maxAge) {
            dobInput.setCustomValidity(`Date must be before ${formattedmax}`);
            dobInput.reportValidity();
            return;
        } else if (dob < minAge) {
            dobInput.setCustomValidity(`Date must be after ${formattedmin}`);
            dobInput.reportValidity();
            return;
        } else {
            dobInput.setCustomValidity("");
        }

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const acceptTerms = document.getElementById("terms").checked;

        const data = { name, email, password, dob: dobInput.value, acceptTerms };
        const userEntries = JSON.parse(localStorage.getItem("userEntries")) || [];
        userEntries.push(data);
        localStorage.setItem("userEntries", JSON.stringify(userEntries));

        addTableRow(data);
        form.reset();
    });

    function loadUserEntries() {
        const userEntries = JSON.parse(localStorage.getItem("userEntries")) || [];
        userEntries.forEach(entry => addTableRow(entry));
    }

    function addTableRow(data) {
        const row = table.insertRow();
        row.innerHTML = `
            <td class="border border-black p-2 w-[200px]">${data.name}</td>
            <td class="border border-black p-2 w-[250px]">${data.email}</td>
            <td class="border border-black p-2 w-[200px]">${data.password}</td>
            <td class="border border-black p-2 w-[200px]">${data.dob}</td>
            <td class="border border-black p-2 w-[150px]">${data.acceptTerms ? "True" : "False"}</td>
        `;
    }
});

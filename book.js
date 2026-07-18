import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("bookingForm");
    const successMessage = document.getElementById("successMessage");

    // ===============================
    // CREATE POPUP
    // ===============================

    const popupOverlay = document.createElement("div");

    popupOverlay.className = "popup-overlay";

    popupOverlay.innerHTML = `
        <div class="popup-box">

            <i class="fa-solid fa-circle-check"></i>

            <h2>Booking Confirmed!</h2>

            <p>Your booking has been submitted successfully.</p>

            <button class="popup-btn" id="popupCloseBtn">
                OK
            </button>

        </div>
    `;

    document.body.appendChild(popupOverlay);

    const popup = document.querySelector(".popup-overlay");
    const popupCloseBtn = document.getElementById("popupCloseBtn");

    // When OK is clicked, go to the home page
popupCloseBtn.addEventListener("click", () => {
    window.location.href = "INDEX.html";
});
    // ===============================
    // TODAY DATE
    // ===============================

    const today = new Date().toISOString().split("T")[0];

    document.getElementById("checkinDate").min = today;

    document.getElementById("checkinDate").addEventListener("change", function () {

        document.getElementById("checkoutDate").min = this.value;

    });

    // ===============================
    // DEFAULT TIME
    // ===============================

    document.getElementById("checkinTime").value = "12:00";

    document.getElementById("checkoutTime").value = "10:00";

    // ===============================
    // PHONE NUMBER
    // ===============================

    document.getElementById("phone").addEventListener("input", function () {

        this.value = this.value.replace(/\D/g, "").slice(0, 10);

    });

    // ===============================
    // FORM SUBMIT
    // ===============================

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const booking = {

            name: document.getElementById("name").value.trim(),

            phone: document.getElementById("phone").value.trim(),

            email: document.getElementById("email").value.trim(),

            address: document.getElementById("address").value.trim(),

            guests: document.getElementById("guests").value,

            rooms: document.getElementById("rooms").value,

            checkin: document.getElementById("checkinDate").value +
                      " " +
                      document.getElementById("checkinTime").value,

            checkout: document.getElementById("checkoutDate").value +
                       " " +
                       document.getElementById("checkoutTime").value,

            request: document.getElementById("request").value.trim()

        };

        // ===============================
        // VALIDATION
        // ===============================

        if (

            booking.name === "" ||

            booking.phone === "" ||

            booking.address === "" ||

            booking.guests === "" ||

            booking.rooms === "" ||

            booking.checkin === "" ||

            booking.checkout === ""

        ) {

            successMessage.style.color = "yellow";

            successMessage.innerHTML = "⚠ Please fill all required fields.";

            return;

        }

        if (!/^[0-9]{10}$/.test(booking.phone)) {

            successMessage.style.color = "red";

            successMessage.innerHTML = "❌ Enter a valid 10-digit mobile number.";

            return;

        }

        if (!document.getElementById("agree").checked) {

            successMessage.style.color = "red";

            successMessage.innerHTML = "❌ Please accept the confirmation.";

            return;

        }

        // ===============================
// SAVE TO FIREBASE
// ===============================

try {

    await addDoc(collection(db, "bookings"), {

        ...booking,

        status: "Pending",

        createdAt: serverTimestamp()

    });

} catch (error) {

    console.error(error);

    successMessage.style.color = "red";

    successMessage.innerHTML = "❌ Booking failed. Please try again.";

    return;

}

        // ===============================
        // SUCCESS
        // ===============================

        successMessage.innerHTML = "";

       console.log("Popup should open now...");
console.log("Popup should open now...");
popup.style.display = "flex";
        form.reset();

        document.getElementById("checkinTime").value = "12:00";

        document.getElementById("checkoutTime").value = "10:00";

    });

    // ===============================
    // CLOSE POPUP
    // ===============================

    popupCloseBtn.addEventListener("click", function () {

        popup.classList.remove("active");

    });

    popup.addEventListener("click", function (e) {

        if (e.target === popup) {

            popup.classList.remove("active");

        }

    });

});
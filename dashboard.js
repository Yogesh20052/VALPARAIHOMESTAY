// Firebase Imports
import { db } from "./firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// HTML Elements
const bookingTable = document.getElementById("bookingTable");

const totalBookings = document.getElementById("totalBookings");
const pendingBookings = document.getElementById("pendingBookings");
const confirmedBookings = document.getElementById("confirmedBookings");
const rejectedBookings = document.getElementById("rejectedBookings");

async function loadBookings() {

    bookingTable.innerHTML = "";

    const snapshot = await getDocs(collection(db, "bookings"));

    let total = 0;
    let pending = 0;
    let confirmed = 0;
    let rejected = 0;

    snapshot.forEach((doc) => {

        const booking = doc.data();

        total++;
const status = booking.status || "Pending";

if (status === "Pending") pending++;
if (status === "Confirmed") confirmed++;
if (status === "Rejected") rejected++;

        bookingTable.innerHTML += `
            <tr>

                <td>${booking.name}</td>

                <td>${booking.phone}</td>

                <td>${booking.guests}</td>

                <td>${booking.address}</td>

                <td>${booking.checkin}</td>


                <td>${booking.checkout}</td>
            
                    <td class="${(booking.status || "pending").toLowerCase()}">
                           ${booking.status || "Pending"}
                    </td>
                <td>
                    Coming Soon...
                </td>

            </tr>
        `;

    });

    totalBookings.textContent = total;
    pendingBookings.textContent = pending;
    confirmedBookings.textContent = confirmed;
    rejectedBookings.textContent = rejected;

}

loadBookings();
document.getElementById("logoutBtn").addEventListener("click", function () {
    window.location.href = "index.html";
});
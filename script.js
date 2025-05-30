// Firebase config — Replace with your project's config from Firebase Console
 const firebaseConfig = {
    apiKey: "AIzaSyBkEW0B3IWItEwzcKRwEBAMJEWq9afka3k",
    authDomain: "authentication-1682e.firebaseapp.com",
    projectId: "authentication-1682e",
    storageBucket: "authentication-1682e.firebasestorage.app",
    messagingSenderId: "127269483678",
    appId: "1:127269483678:web:9c27ad9f3005b71d41f78f",
    measurementId: "G-G2PL249YJY"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

const signInBtn = document.getElementById("signInBtn");
const signOutBtn = document.getElementById("signOutBtn");
const userDetailsDiv = document.getElementById("userDetails");

// Sign in with Google
signInBtn.addEventListener("click", () => {
    auth.signInWithPopup(provider)
        .then((result) => {
            const user = result.user;
            displayUser(user);
        })
        .catch((error) => {
            alert("Sign-in failed: " + error.message);
        });
});

// Sign out
signOutBtn.addEventListener("click", () => {
    auth.signOut().then(() => {
        userDetailsDiv.innerHTML = "";
        signInBtn.style.display = "inline-block";
        signOutBtn.style.display = "none";
    });
});

// On auth state change (page load or sign-in/out)
auth.onAuthStateChanged((user) => {
    if (user) {
        displayUser(user);
    } else {
        userDetailsDiv.innerHTML = "";
        signInBtn.style.display = "inline-block";
        signOutBtn.style.display = "none";
    }
});

function displayUser(user) {
    userDetailsDiv.innerHTML = `
        <p>Welcome, ${user.displayName}!</p>
        <p>Email: ${user.email}</p>
        <img src="${user.photoURL}" alt="Profile Photo" width="80" style="border-radius:50%;" />
    `;
    signInBtn.style.display = "none";
    signOutBtn.style.display = "inline-block";
}

// Your existing loan calculator function and helpers
function calculateLoan() {
    const startInput = document.getElementById("startDate").value.trim();
    const endInput = document.getElementById("endDate").value.trim();
    const interestRate = parseFloat(document.getElementById("interestRate").value);
    const principalAmount = parseFloat(document.getElementById("principalAmount").value);

    const startDate = parseDDMMYYYY(startInput);
    const endDate = parseDDMMYYYY(endInput);

    if (!startDate) {
        alert("ప్రారంభ తేదీ తప్పు ఉంది. దయచేసి DDMMYYYY ఫార్మాట్‌లో సరైన తేదీని నమోదు చేయండి.");
        return;
    }
    if (!endDate) {
        alert("ముగింపు తేదీ తప్పు ఉంది. దయచేసి DDMMYYYY ఫార్మాట్‌లో సరైన తేదీని నమోదు చేయండి.");
        return;
    }
    if (isNaN(interestRate) || isNaN(principalAmount)) {
        alert("దయచేసి వడ్డీ రేటు మరియు అసలు మొత్తం చెల్లుబాటు అయ్యే సంఖ్యలుగా నమోదు చేయండి.");
        return;
    }

    const teluguMonths = [
        "జనవరి", "ఫిబ్రవరి", "మార్చి", "ఏప్రిల్", "మే", "జూన్",
        "జూలై", "ఆగస్టు", "సెప్టెంబర్", "అక్టోబర్", "నవంబర్", "డిసెంబర్"
    ];

    function formatDate(date) {
        const day = date.getDate();
        const month = teluguMonths[date.getMonth()];
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    }

    const diffMonths = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());
    const diffDays = endDate.getDate() - startDate.getDate();

    const numMonths = diffDays >= 0 ? diffMonths : diffMonths - 1;
    const numDays = diffDays >= 0 ? diffDays : 30 + diffDays;

    const interestForMonths = (interestRate / 100) * principalAmount * numMonths;
    const interestForDays = (interestRate / 100 / 30) * principalAmount * numDays;
    const totalInterest = interestForMonths + interestForDays;
    const totalAmount = principalAmount + totalInterest;

    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `
        ${formatDate(startDate)} --నుండి-- ${formatDate(endDate)} వరకు<hr>
        ${numMonths} నెలల ${numDays} రోజులు<hr>
        వడ్డీ: &#x20B9;${totalInterest.toFixed(2)}<hr>
        మొత్తం: &#x20B9;${totalAmount.toFixed(2)}
    `;
}

// Parses DDMMYYYY string into Date object; returns null if invalid
function parseDDMMYYYY(input) {
    const raw = input.replace(/\D/g, "");
    if (raw.length !== 8) return null;

    const dd = parseInt(raw.slice(0, 2), 10);
    const mm = parseInt(raw.slice(2, 4), 10);
    const yyyy = parseInt(raw.slice(4, 8), 10);

    if (mm < 1 || mm > 12 || dd < 1 || dd > 31) return null;

    const date = new Date(yyyy, mm - 1, dd);
    if (date.getFullYear() !== yyyy || date.getMonth() !== mm - 1 || date.getDate() !== dd) return null;

    return date;
}

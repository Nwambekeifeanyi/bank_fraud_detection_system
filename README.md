# bank_fraud_detection_system
Bank Fraud Detection System is designed to safeguard your finances with real-time monitoring, instant alerts, and intelligent rule-based detection. We ensure every transaction is secure, every login is verified, and every suspicious activity is stopped before it causes harm—keeping your money and trust protected at all times.


## 🚀 Overview
The Bank Fraud Detection System is a non-AI, deterministic security solution that monitors transactions in real-time. By utilizing a sophisticated rule engine, the system identifies suspicious patterns, triggers instant alerts, and prevents unauthorized financial activity before it occurs.

## ✨ Key Features
* **High-Value Transfer Alerts:** Automatically flags and requires secondary confirmation for transactions exceeding a specific threshold.
* **Insufficient Funds Validation:** Real-time balance checks to prevent overdrafts and system errors during high-frequency requests.
* **Brute-Force Protection:** Intelligent tracking of incorrect login attempts to lock accounts or trigger security notifications.
* **Real-Time Transaction Monitoring:** Screens every transaction against security protocols as it happens.
* **Rule-Based Engine:** Implements deterministic logic (Velocity, Geography, and Value) without the overhead of AI models.

## ⚙️ How the Detection Logic Works
This system relies on **Deterministic Security Logic**—meaning every action is predictable, auditable, and fast.

1.  **Amount Validation:** If `transactionAmount > USER_THRESHOLD`, the system pauses the transfer and initiates a `Confirmation Required` state.
2.  **Fund Verification:** Before any ledger update, a `pre-check` compares `currentBalance` against the requested `debitAmount`, returning a clear `Insufficient Funds` status code if the math doesn't clear.
3.  **Login Sentinel:** A counter tracks `failedLoginAttempts`. After $N$ attempts, the system flags the IP and restricts further access for a set duration to prevent automated attacks.

   
## 🛠️ Tech Stack
* **Frontend:** HTML, CSS and Javascript (Lucide Icons)
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Security:** JWT (JSON Web Tokens), Bcrypt for hashing, and custom middleware for rule validation.

## ⚙️ How the Detection Logic Works
Unlike black-box AI models, this system uses a **Rule-Based Detection Engine**. It evaluates transactions based on predefined parameters:
1.  **Threshold Analysis:** Flags any transaction exceeding a specific limit.
2.  **Velocity Checks:** Monitors the frequency of transactions within a short window.
3.  **Pattern Recognition:** Identifies inconsistencies in user behavior compared to historical data logs.

// Interactive Features for NetFit Platform
class NetfitInteractions {
    constructor() {
        this.streak = 0;
        this.xp = 0;
        this.neftCoins = 0;
    }

    // Daily Check-in Mechanism
    checkIn() {
        const today = new Date().toDateString();
        const lastCheckIn = localStorage.getItem('lastCheckIn');

        if (lastCheckIn !== today) {
            this.streak++;
            this.xp += 10;
            this.neftCoins += 5;

            localStorage.setItem('lastCheckIn', today);
            localStorage.setItem('streak', this.streak);
            
            this.updateUI();
            return true;
        }
        return false;
    }

    // Quest System
    completeQuest(questType) {
        const quests = {
            'daily': 20,
            'weekly': 50,
            'special': 100
        };

        if (quests[questType]) {
            this.xp += quests[questType];
            this.neftCoins += quests[questType] / 2;
            
            this.updateUI();
            return true;
        }
        return false;
    }

    // Referral System
    generateReferralCode() {
        return 'NETFIT-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    }

    // UI Update Method
    updateUI() {
        const streakElement = document.getElementById('streak-count');
        const xpElement = document.getElementById('xp-count');
        const neftElement = document.getElementById('neft-count');

        if (streakElement) streakElement.textContent = this.streak;
        if (xpElement) xpElement.textContent = this.xp;
        if (neftElement) neftElement.textContent = this.neftCoins;
    }

    // Wallet Connection Enhanced
    async connectWallet() {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ 
                    method: 'eth_requestAccounts' 
                });
                
                // Generate Referral Code on Wallet Connection
                const referralCode = this.generateReferralCode();
                
                // Store Wallet Details
                localStorage.setItem('walletAddress', accounts[0]);
                localStorage.setItem('referralCode', referralCode);

                // Update UI or Show Modal
                alert(`Wallet Connected: ${accounts[0]}\nYour Referral Code: ${referralCode}`);
                
                return accounts[0];
            } catch (error) {
                console.error('Wallet Connection Failed', error);
                return null;
            }
        } else {
            alert('Please install MetaMask!');
            return null;
        }
    }
}

// Initialize Interactions
const netfitInteractions = new NetfitInteractions();

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    const checkInButton = document.getElementById('check-in-btn');
    const walletConnectBtn = document.getElementById('wallet-connect-btn');

    if (checkInButton) {
        checkInButton.addEventListener('click', () => {
            const result = netfitInteractions.checkIn();
            alert(result ? 'Check-in Successful!' : 'Already Checked In Today');
        });
    }

    if (walletConnectBtn) {
        walletConnectBtn.addEventListener('click', () => {
            netfitInteractions.connectWallet();
        });
    }
});

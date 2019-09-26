new Vue({
    el: '#app',
    data: {
        monsterHealth: 100,
        playerHealth: 100,
        gameIsRunning: false,
    },
    methods: {
        startNewGame() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
        },
        playerAttack(playerMax, playerMin) {
            const damage = this.generateDamage(playerMax, playerMin);

            this.monsterHealth -= damage;

            if(this.checkWin()) {
                //no reason to continue so return
                return;
            }
        },
        monsterAttack() {
            const monsterMax = 12;
            const monsterMin = 3

            const monsterDamage = this.generateDamage(monsterMax, monsterMin);
            this.playerHealth -= monsterDamage;

            if(this.checkWin()) {
                //no reason to continue so return
                return;
            }
        },
        specialAttack() {
            this.playerAttack(20, 10);
            this.monsterAttack();
        },
        attack() {
            this.playerAttack(10, 1);
            this.monsterAttack();
        },
        heal() {
            if(this.playerHealth <= 90) {
                this.playerHealth += 10;
            } else {
                this.playerHealth = 100;
            }
            this.monsterAttack();
        },
        giveUp() {
            this.gameIsRunning = false;
        },
        generateDamage(max, min) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },

        checkWin() {
            if(this.playerHealth <= 0) {
                this.checkMessage('You lost! New Game?');
                return true;
            } else if(this.monsterHealth <= 0){
                this.checkMessage('You win! New Game?');
                return true;
            }
            return false;
        },
        checkMessage(message) {
            if(confirm(message)) {
                this.startNewGame()
            } else {
                this.gameIsRunning = false;
            }
        }
    }
})
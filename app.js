new Vue({
    el: '#app',
    data: {
        monsterHealth: 100,
        playerHealth: 100,
        gameIsRunning: false,
        turns: [],
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

            this.addMessageToLog(`Player hits Monster for ${damage}` , true);
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

            this.addMessageToLog(`Monster hits Player for ${monsterDamage}` , false);
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
                this.addMessageToLog('Player is healed by 10 points.' , true);

            } else {
                this.playerHealth = 100;
                this.addMessageToLog('Player is fully healed.' , true);
            }
            this.monsterAttack();
        },
        giveUp() {
            this.gameIsRunning = false;
            this.turns = [];
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
                this.startNewGame();
            } else {
                this.gameIsRunning = false;
            }
        },

        addMessageToLog(message, isPlayer) {
            this.turns.unshift({
                isPlayer: isPlayer,
                message: message,
            });
        }
    }
})
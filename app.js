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
        attack() {
            const playerMax = 10;
            const playerMin = 1;
            const damage = this.generateDamage(playerMax, playerMin);

            this.monsterHealth -= damage;

            if(this.checkWin()) {
                //no reason to continue so return
                return;
            }

            const monsterMax = 12;
            const monsterMin = 3

            const monsterDamage = this.generateDamage(monsterMax, monsterMin);
            this.playerHealth -= monsterDamage;

            //damage to the monster
            this.checkWin();


        },
        specialAttack() {

        },
        heal() {

        },
        giveUp() {

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
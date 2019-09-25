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
        }
    }
})
const Main = {
    admUser: {
        user: 'admin',
        password: '1234'
    },
    init: function () {
        this.cacheSelectors();
        this.bindEvents();
    },
    cacheSelectors: function () {
        /**************Painel**********************/
        this.$user = document.querySelector('#user');
        this.$password = document.querySelector('#password');
        this.$buttonPainel = document.querySelector('#buttonPainel');
        /******************************************/
        /**************Home*************************/
        this.$home = document.querySelector("#home");
        /******************************************/
    },
    bindEvents: function () {
        const self = this;
        if (this.$buttonPainel != null)
            this.$buttonPainel.onsubmit = self.Events.checkUser.bind(self);
        if (this.$home != null)
            this.$home.onclick=self.Events.home.bind(self);
    },
    Events: {
        home: function () {
            location.replace('../frontend/painel.html');
        },
        checkUser: function (e) {
            e.preventDefault();
            if (this.$user.value != this.admUser.user || this.$password.value != this.admUser.password) {
                alert("Usuario ou senha invalidos");
            }
            else {
                location.replace('../frontend/painel.html');
            }
        }
    }
}
Main.init();
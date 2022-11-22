const Main = {
    admUser: {
        user: 'admin',
        password: '1234'
    },
    init: function () {
        this.cacheSelectors();
        this.bindEvents();
        if (this.$formClients != null)
            this.getClientList();
    },
    cacheSelectors: function () {
        /*****************URL********************/
        this.$API_URLCLIENTS = 'http://192.168.18.25:8080/api/clients';
        this.$API_URLPRODUCTS = 'http://192.168.18.25:8080/api/products';
        /******************************************/
        /**************Painel**********************/
        this.$user = document.querySelector('#user');
        this.$password = document.querySelector('#password');
        this.$buttonPainel = document.querySelector('#buttonPainel');
        /******************************************/
        /**************Home************************/
        this.$home = document.querySelector("#home");
        /******************************************/
        /*****************Formulario***************/
        this.$formClients = document.querySelector("#form-clients");
        this.$formProducts = document.querySelector("#form-products");
        /******************************************/
        /*****************Lista********************/
        this.$clientsList = document.querySelector("#client-list");
        this.$productsList = document.querySelector("#product-list");
        /******************************************/
    },
    bindEvents: function () {
        const self = this;
        if (this.$buttonPainel != null)
            this.$buttonPainel.onsubmit = self.Events.checkUser.bind(self);
        if (this.$formClients != null)
            this.$formClients.onsubmit = self.Events.formClients.bind(self);
            if (this.$formProducts != null)
            this.$formProducts.onsubmit = self.Events.formProducts.bind(self);
    },
    getClientList: function () {
        fetch(this.$API_URLCLIENTS).then(
            Response => {
                Response.json().then(data => {
                    const clientsHtml = data.map(client => `
                    <li>
                        ${client.name} - ${client.price}
                        <a href="#" 
                        class="botao-editar" 
                        data-id="${client._id}"
                        data-name="${client.name}"
                        data-price="${client.price}"
                        >
                        </a>
                        <a href="#" class="botao-excluir" data-id="${client._id}">[excluir]</a>
                    </li>
                    `).join('');
                    this.$clientsList.innerHTML = clientsHtml;

                    const botoesExcluir = document.querySelectorAll('.botao-excluir');
                    botoesExcluir.forEach(element => {
                        element.onclick = function (e) {
                            e.preventDefault();

                            const id = this.dataset.id;
                            fetch(`${Main.$API_URLCLIENTS}/${id}`, {
                                method: 'DELETE'
                            }).then(Response => {
                                Main.getClientList();
                            })
                        }
                    });
                }).catch(err => console.log(err));
            });
    },
    getProductList: function () {
        fetch(this.$API_URLPRODUCTS).then(
            Response => {
                Response.json().then(data => {
                    const productsHtml = data.map(product => `
                    <li>
                        ${product.name} - ${product.price}
                        <a href="#" 
                        class="botao-editar" 
                        data-id="${product._id}"
                        data-name="${product.name}"
                        data-price="${product.price}"
                        >
                        </a>
                        <a href="#" class="botao-excluir" data-id="${product._id}">[excluir]</a>
                    </li>
                    `).join('');
                    this.$productsList.innerHTML = productsHtml;

                    const botoesExcluir = document.querySelectorAll('.botao-excluir');
                    botoesExcluir.forEach(element => {
                        element.onclick = function (e) {
                            e.preventDefault();

                            const id = this.dataset.id;
                            fetch(`${Main.$API_URLPRODUCTS}/${id}`, {
                                method: 'DELETE'
                            }).then(Response => {
                                Main.getProductList();
                            })
                        }
                    });
                }).catch(err => console.log(err));
            });
    },
    Events: {
        checkUser: function (e) {
            e.preventDefault();
            if (this.$user.value != this.admUser.user || this.$password.value != this.admUser.password) {
                alert("Usuario ou senha invalidos");
            }
            else {
                location.replace('../frontend/painel.html');
            }
        },
        formClients: function (e) {
            e.preventDefault();

            const name = document.forms['form-clients'].name.value;
            const price = document.forms['form-clients'].price.value;
            if (name == '' || price == '') {
                alert("Preencha os campos corretamente");
                return
            }
            fetch(this.$API_URLCLIENTS, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    price
                })
            }).then(Response => {
                document.forms['form-clients'].reset();
                this.getClientList();
            })
        },
        formProducts: function (e) {
            e.preventDefault();

            const name = document.forms['form-products'].name.value;
            const price = document.forms['form-products'].price.value;
            if (name == '' || price == '') {
                alert("Preencha os campos corretamente");
                return
            }
            fetch(this.$API_URLPRODUCTS, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    price
                })
            }).then(Response => {
                document.forms['form-products'].reset();
                this.getProductList();
            })
        }
    }
}
Main.init();
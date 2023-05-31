<template>
    <div class="body">

        <h1 class="main-heading">Bank</h1>
        <a href="/userLogin"><button type="button" class="btn btn-secondary btn-lg login-button">Customer Login</button></a>
        <a href="/employeeLogin"><button type="button" class="btn btn-secondary btn-lg login-button">Employee Login</button></a>
    </div>
</template>

<style scoped>
    .main-heading{
        font-size: 20em;
        color: rgb(199, 237, 251)
    }
    .body{
        position: fixed;
        width: 100%;
        height: 100%;
        background-image: url(../assets/background.jpg);
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-size: 100% 100%;
    }
    .login-button{
        margin: 5%;
        height: 10rem;
        width: 40%;
        background-color: rgba(15, 15, 34, 0.4);
    }
</style>
<template>
    <nav class="navbar navbar-expand-lg navbar navbar-dark bg-dark blue">
    <div class="container-fluid">
        <a class="navbar-brand" href="#"><b>Banking Application</b></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
            <li class="nav-item">
            <a class="nav-link active" aria-current="page" :href="'/user/' + $route.params.id">Home</a>
            </li>
            <li class="nav-item">
            <a class="nav-link" :href="'/user/' + $route.params.id + '/atm'">ATM</a> <!-- hardcoded for now-->
            </li>
            <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-expanded="false">
                User
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <li><a class="dropdown-item" :href="'/user/' + $route.params.id + '/profile'">Profile</a></li>
                <li><a class="dropdown-item" href="#">Logout</a></li>
            </ul>
            </li>
            <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-expanded="false">
                Accounts(for employees)
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <li><a class="dropdown-item" :href="'/accounts/getIbanByCustomerName/'">Find accounts based on customer name</a></li>
                <li><a class="dropdown-item" :href="'/accounts/'">Get all accounts</a></li>
                <li><a class="dropdown-item" :href="'/accountsCreate/'">Create accounts</a></li>
                <li><a class="dropdown-item" :href="'/accounts/accountStatus/'">Update accounts</a></li>
            </ul>
            </li>
        </ul>
        </div>
    </div>
    </nav>
</template>

<style scoped>
  .blue{
    background-image: url(../assets/background2.jpg);
  }
</style>
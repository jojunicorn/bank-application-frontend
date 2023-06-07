<template>
  <div class="container">
    <form class="row g-3">
      <div class="form-group col-12">
        <label for="userInput">User:</label>
        <input type="text" class="form-control" id="userInput" placeholder="Enter user" />
      </div>
      <div class="form-group col-md-6">
        <label for="startDateInput">Start Date:</label>
        <input type="date" class="form-control" id="startDateInput" />
      </div>
      <div class="form-group col-md-6">
        <label for="endDateInput">End Date:</label>
        <input type="date" class="form-control" id="endDateInput" />
      </div>
      <div class="form-group col-md-3">
        <label for="amountLowerInput">Amount Lower than:</label>
        <input
          type="number"
          class="form-control"
          id="amountLowerInput"
          placeholder="Enter amount"
        />
      </div>
      <div class="form-group col-md-3">
        <label for="amountHigherInput">Amount Higher than:</label>
        <input
          type="number"
          class="form-control"
          id="amountHigherInput"
          placeholder="Enter amount"
        />
      </div>
      <div class="form-group col-md-3">
        <label for="amountEqualsInput">Amount Equals:</label>
        <input
          type="number"
          class="form-control"
          id="amountEqualsInput"
          placeholder="Enter amount"
        />
      </div>
      <button type="submit" class="btn btn-primary col-12">Filter</button>
    </form>
  </div>
</template>

<script></script>

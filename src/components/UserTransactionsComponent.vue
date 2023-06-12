<template>
  <div class="container">
    <div class="radio-tile-group">
      <div class="input-container">
        <input id="current" class="radio-button" type="radio" name="radio" />
        <div class="radio-tile">
          <label for="current" class="radio-tile-label">Current</label>
          <div class="row card-info">
            <label class="col text-left font-weight-bold">Balance</label>
            <div class="col text-right">
              <label for="balance">0.00</label>
              <label for="currency">&euro;</label>
            </div>
          </div>
          <div class="row card-info">
            <label class="col text-left font-weight-bold">Account holder</label>
            <label class="col text-right" for="name">Alba Placeres</label>
          </div>
          <div class="row card-info">
            <label class="col text-left font-weight-bold">IBAN</label>
            <label class="col text-right" for="iban">31231657543</label>
          </div>
        </div>
      </div>

      <div class="input-container">
        <input id="savings" class="radio-button" type="radio" name="radio" />
        <div class="radio-tile">
          <label for="savings" class="radio-tile-label">Savings</label>
          <div class="row card-info">
            <label class="col text-left font-weight-bold">Balance</label>
            <div class="col text-right">
              <label for="balance">0.00</label>
              <label for="currency">&euro;</label>
            </div>
          </div>
          <div class="row card-info">
            <label class="col text-left font-weight-bold">Account holder</label>
            <label class="col text-right" for="name">Alba Placeres</label>
          </div>
          <div class="row card-info">
            <label class="col text-left font-weight-bold">IBAN</label>
            <label class="col text-right" for="iban">31231657543</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script></script>

<style>
@import '../assets/transaction.css';
</style>

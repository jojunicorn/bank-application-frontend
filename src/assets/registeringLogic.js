const registeringLogic = {

    passwordCheck(password, registeringMessage) {
        var passwordRegex = /^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
        if (!passwordRegex.test(password)) {
        return registeringMessage +
            'Password must contain: \n-at least 8 characters\n-one uppercase letter\n-one lowercase letter\n-one number\n-one special character \n\n'
        }else{
            return registeringMessage;
        }
    },

    phoneNumberCheck(phoneNumber,registeringMessage ) {
        var phoneNumberRegex = /^(?:[0-9+]+|\+[0-9]+\s[0-9]+\s[0-9]+)$/
        if (!phoneNumberRegex.test(phoneNumber)) {
        return registeringMessage + 'Phonenumber is not in the correct format.\n'
        }else{
            return registeringMessage;
        }
    },

    birthdateCheck(birthdate, registeringMessage) {
        var today = new Date()
        var birthdateObj = new Date(birthdate)

        // Calculate the difference in years
        var age = today.getFullYear() - birthdateObj.getFullYear()

        // Adjust the age based on the current month and day
        if (
        today.getMonth() < birthdateObj.getMonth() ||
        (today.getMonth() === birthdateObj.getMonth() && today.getDate() < birthdateObj.getDate())
        ) {
        age--
        }

        if (age < 18) {
        return registeringMessage + 'You need to be 18 or older to make an Account. \n'
        }else{
            return registeringMessage;
        }
    },

    addressCheck(country, city, streetName, zipCode, registeringMessage) {
        if (
        country.length < 3 ||
        city.length < 3 ||
        streetName.length < 2 ||
        zipCode.length < 3
        ) {
        return registeringMessage + 'Make sure to enter a valid address \n'
        }else{
            return registeringMessage;
        }
    },

    bsnCheck(bsn, registeringMessage) {
        var bsnRegex = /^(?:[0-9+]+|\+[0-9]+\s[0-9]+\s[0-9]+)$/
        if (!bsnRegex.test(bsn)) {
        return registeringMessage + 'BSN is not in the correct format.\n'
        }else{
            return registeringMessage;

        }
    }
};
export default registeringLogic;

import inquirer from 'inquirer';
class Person {
    firstName = '';
    lastName = '';
    gender = '';
    age = 0;
    mobileNumber = '';
    constructor() { }
    async setPersonalInformation() {
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'firstName',
                message: 'Enter your first name:',
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'Enter your last name:',
            },
            {
                type: 'input',
                name: 'gender',
                message: 'Enter your gender:',
            },
            {
                type: 'input',
                name: 'age',
                message: 'Enter your age:',
            },
            {
                type: 'input',
                name: 'mobileNumber',
                message: 'Enter your mobile number:',
            },
        ]);
        this.firstName = answers.firstName;
        this.lastName = answers.lastName;
        this.gender = answers.gender;
        this.age = parseInt(answers.age);
        this.mobileNumber = answers.mobileNumber;
    }
    displayPersonalInformation() {
        console.log('\nPersonal Information:');
        console.log(`Name: ${this.firstName} ${this.lastName}`);
        console.log(`Gender: ${this.gender}`);
        console.log(`Age: ${this.age}`);
        console.log(`Mobile Number: ${this.mobileNumber}\n`);
    }
}
class BankAccount {
    balance = 0;
    constructor() { }
    async performTransaction() {
        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'transactionType',
                message: 'Choose a transaction type:',
                choices: ['Credit', 'Debit', 'Check Balance'],
            },
            {
                type: 'input',
                name: 'amount',
                message: 'Enter the transaction amount:',
                when: (answers) => answers.transactionType !== 'Check Balance',
            },
        ]);
        switch (answers.transactionType) {
            case 'Credit':
                const creditAmount = parseFloat(answers.amount);
                if (creditAmount > 100) {
                    console.log('A fee of $1 will be deducted for credit amounts over $100.');
                    this.balance += creditAmount - 1;
                }
                else {
                    this.balance += creditAmount;
                }
                console.log(`Credit successful. Updated balance: $${this.balance}`);
                break;
            case 'Debit':
                const debitAmount = parseFloat(answers.amount);
                if (debitAmount > this.balance) {
                    console.log('Insufficient funds. Transaction canceled.');
                }
                else {
                    this.balance -= debitAmount;
                    console.log(`Debit successful. Updated balance: $${this.balance}`);
                }
                break;
            case 'Check Balance':
                console.log(`Current balance: $${this.balance}`);
                break;
        }
    }
}
async function runBankAccountSystem() {
    const person = new Person();
    const bankAccount = new BankAccount();
    await person.setPersonalInformation();
    person.displayPersonalInformation();
    while (true) {
        await bankAccount.performTransaction();
        const continueTransaction = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'continue',
                message: 'Do you want to perform another transaction?',
                default: true,
            },
        ]);
        if (!continueTransaction.continue) {
            console.log('Thank you for using the bank account system. Goodbye!');
            break;
        }
    }
}
runBankAccountSystem();

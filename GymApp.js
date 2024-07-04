"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
// Class to manage activities and calculate calories burned
var CalorieTracker = /** @class */ (function () {
    function CalorieTracker() {
        this.activities = [];
        // Initialize some default activities
        this.activities.push({ name: 'Running', caloriesPerMinute: 10 });
        this.activities.push({ name: 'Swimming', caloriesPerMinute: 8 });
        this.activities.push({ name: 'Cycling', caloriesPerMinute: 7 });
        this.activities.push({ name: 'Jumping Jacks', caloriesPerMinute: 12 });
    }
    // Method to add a new activity
    CalorieTracker.prototype.addActivity = function (name, caloriesPerMinute) {
        var activity = { name: name, caloriesPerMinute: caloriesPerMinute };
        this.activities.push(activity);
        console.log("Activity added: ".concat(name, " - ").concat(caloriesPerMinute, " calories/minute"));
    };
    // Method to calculate calories burned based on activity and duration
    CalorieTracker.prototype.calculateCaloriesBurned = function (activityName, durationInMinutes) {
        var activity = this.activities.find(function (act) { return act.name.toLowerCase() === activityName.toLowerCase(); });
        if (activity) {
            var caloriesBurned = activity.caloriesPerMinute * durationInMinutes;
            console.log("Calories burned for ".concat(activityName, " (for ").concat(durationInMinutes, " minutes): ").concat(caloriesBurned, " calories"));
        }
        else {
            console.log("Activity \"".concat(activityName, "\" not found."));
        }
    };
    // Method to display available activities
    CalorieTracker.prototype.displayActivities = function () {
        console.log('=== Available Activities ===');
        this.activities.forEach(function (activity) {
            console.log("".concat(activity.name, " - ").concat(activity.caloriesPerMinute, " calories/minute"));
        });
        console.log('============================');
    };
    return CalorieTracker;
}());
// Function to display menu options
function displayMenu() {
    console.log('=== Calorie Tracker Menu ===');
    console.log('1. Add Activity');
    console.log('2. Calculate Calories Burned');
    console.log('3. View Available Activities');
    console.log('4. Exit');
}
var calorieTracker = new CalorieTracker();
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.on('close', function () {
    console.log('Exiting Calorie Tracker. Goodbye!');
    process.exit(0);
});
// Function to start the calorie tracker application
function startCalorieTracker() {
    displayMenu();
    rl.question('Select an option: ', function (option) {
        switch (option.trim()) {
            case '1':
                rl.question('Enter activity name: ', function (name) {
                    rl.question('Enter calories burned per minute: ', function (caloriesPerMinuteStr) {
                        var caloriesPerMinute = parseFloat(caloriesPerMinuteStr);
                        if (!isNaN(caloriesPerMinute)) {
                            calorieTracker.addActivity(name, caloriesPerMinute);
                        }
                        else {
                            console.log('Invalid calories per minute. Please enter a valid number.');
                        }
                        startCalorieTracker();
                    });
                });
                break;
            case '2':
                rl.question('Enter activity name: ', function (activityName) {
                    rl.question('Enter duration in minutes: ', function (durationStr) {
                        var durationInMinutes = parseInt(durationStr);
                        if (!isNaN(durationInMinutes)) {
                            calorieTracker.calculateCaloriesBurned(activityName, durationInMinutes);
                        }
                        else {
                            console.log('Invalid duration. Please enter a valid number.');
                        }
                        startCalorieTracker();
                    });
                });
                break;
            case '3':
                calorieTracker.displayActivities();
                startCalorieTracker();
                break;
            case '4':
                rl.close();
                break;
            default:
                console.log('Invalid option. Please select a number from 1 to 4.');
                startCalorieTracker();
                break;
        }
    });
}
console.log('Welcome to the Calorie Tracker App!');
startCalorieTracker();

import * as readline from 'readline';

// Interface for activity with its name and calories burned per minute
interface Activity {
  name: string;
  caloriesPerMinute: number;
}

// Class to manage activities and calculate calories burned
class CalorieTracker {
  private activities: Activity[] = [];

  constructor() {
    // Initialize some default activities
    this.activities.push({ name: 'Running', caloriesPerMinute: 10 });
    this.activities.push({ name: 'Swimming', caloriesPerMinute: 8 });
    this.activities.push({ name: 'Cycling', caloriesPerMinute: 7 });
    this.activities.push({ name: 'Jumping Jacks', caloriesPerMinute: 12 });
  }

  // Method to add a new activity
  addActivity(name: string, caloriesPerMinute: number) {
    const activity: Activity = { name, caloriesPerMinute };
    this.activities.push(activity);
    console.log(`Activity added: ${name} - ${caloriesPerMinute} calories/minute`);
  }

  // Method to calculate calories burned based on activity and duration
  calculateCaloriesBurned(activityName: string, durationInMinutes: number) {
    const activity = this.activities.find(act => act.name.toLowerCase() === activityName.toLowerCase());
    if (activity) {
      const caloriesBurned = activity.caloriesPerMinute * durationInMinutes;
      console.log(`Calories burned for ${activityName} (for ${durationInMinutes} minutes): ${caloriesBurned} calories`);
    } else {
      console.log(`Activity "${activityName}" not found.`);
    }
  }

  // Method to display available activities
  displayActivities() {
    console.log('=== Available Activities ===');
    this.activities.forEach(activity => {
      console.log(`${activity.name} - ${activity.caloriesPerMinute} calories/minute`);
    });
    console.log('============================');
  }
}

// Function to display menu options
function displayMenu() {
  console.log('=== Calorie Tracker Menu ===');
  console.log('1. Add Activity');
  console.log('2. Calculate Calories Burned');
  console.log('3. View Available Activities');
  console.log('4. Exit');
}

const calorieTracker = new CalorieTracker();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('close', () => {
  console.log('Exiting Calorie Tracker. Goodbye!');
  process.exit(0);
});

// Function to start the calorie tracker application
function startCalorieTracker() {
  displayMenu();
  rl.question('Select an option: ', (option: string) => {
    switch (option.trim()) {
      case '1':
        rl.question('Enter activity name: ', (name: string) => {
          rl.question('Enter calories burned per minute: ', (caloriesPerMinuteStr: string) => {
            const caloriesPerMinute = parseFloat(caloriesPerMinuteStr);
            if (!isNaN(caloriesPerMinute)) {
              calorieTracker.addActivity(name, caloriesPerMinute);
            } else {
              console.log('Invalid calories per minute. Please enter a valid number.');
            }
            startCalorieTracker();
          });
        });
        break;
      case '2':
        rl.question('Enter activity name: ', (activityName: string) => {
          rl.question('Enter duration in minutes: ', (durationStr: string) => {
            const durationInMinutes = parseInt(durationStr);
            if (!isNaN(durationInMinutes)) {
              calorieTracker.calculateCaloriesBurned(activityName, durationInMinutes);
            } else {
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

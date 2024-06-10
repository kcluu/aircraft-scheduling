# About

This aircraft scheduling application assists users in creating a daily rotation of flights for a specific aircraft in order to optimize aircraft utilization. Aircraft options are displayed on the left-side section with an overview of details like the aircraft type, number of seats, base, and running utilization percentage. As flights are scheduled for each aircraft, this utilization percentage will change dynamically to reflect how long aircrafts are in the air during scheduled flights out of a 24 hour day. Users are able to create rotations for aircrafts, clicking one aircraft at a time, by clicking on available flights from the right-side section. Each aircraft has a default, base flight where it will start its journey from that cannot be removed from schedule. There are a few rules and validations to note about selecting flights when creating a rotation schedule.

## Scheduling Rules

1. A flight to be scheduled and added to the rotation should not have a departure or arrival time during any scheduled flights in the rotation.
2. Each flight must have a turnaround time of at least 20 minutes.
3. The rotation schedule should follow a sequence where the destination airport matches the origin airport of the proceeding scheduled flight.
4. A flight can be assigned to only one aircraft, so once a flight is scheduled to an aircraft, it can no longer be scheduled anywhere else.

## Usability/Features

Scheduling flights has a lot of strict rules, so there are some features provided to help address scheduling grievances:

1. To help visualize and brainstorm scheduling, users are able to schedule flights that don't have connecting desination to origin airports. Although this is eventually necessary to create a valid schedule, a warning message will be displayed to prompt the user to correct their schedule a pick a flight with the correct origin/desination airport. The warning message will disappear if the validation has been addressed.
2. Flights that are already scheduled across all aircrafts are disabled in grey to prevent duplicate flights from being scheduled. To help active scheduling efforts, there is a "Hide Scheduled Flights" toggle which will filter out all of the already scheduled flights so the user can focus on only available flights.
3. The list of flights on the right side can be searched by origin airport, destination airport, and flight ID. This can be useful, for example, if the user is looking for a flight with a specific origin airport to connect with a scheduled flight's desination airport.
4. The list of flights can be sorted by departure time descending/ascending or by arrival time descending/ascending as a way to help schedule a flight based on time.
5. If a desired flight has a time conflict with the existing rotation, a pop-up warning will inform the user on why that flight cannot be added to the rotation schedule.
6. A flight can be removed from the rotation by clicking on the trashcan icon on the top right corner, or by simply clicking on the card itself. The removed flight will then be available for scheduling under the Flights list.
7. The user is able to visualize aircraft utilization from the timeline UI at the bottom of the Rotation section. As the user adds flights to the rotation schedule, the timeline dynamically updates, showing the user how much the aircraft is being used in a 24 hour period. The green blocks of time represent the duration of a scheduled flight. The purple blocks of time represent the duration between scheduled flights (20 minutes mininum). The grey blocks of time represent periods where the aircraft is idle.
8. All times are shown in UTC and can be formatted either by standard, 12 hour time or by military time using a toggle at the top right corner.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts & How To Run

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
# aircraft-scheduling
